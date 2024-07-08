var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { generateCodeVerifier, generateState } from 'arctic';
import { DEV } from 'esm-env';
import { generateId } from 'lucia';
import { createDate, TimeSpan } from 'oslo';
import { BackendMethod, remult } from 'remult';
import { green, yellow } from '@kitql/helpers';
import { AUTH_OPTIONS, getSafeOptions, logAuth, lucia } from '.';
import { sendMail } from '../mail';
import { AuthProvider } from './Entities.js';
import { createSession } from './helper';
import { mergeRoles } from './RoleController';
async function getArgon() {
    const { Argon2id } = await import('oslo/password');
    return new Argon2id({
        ...AUTH_OPTIONS.providers?.password?.argon2Settings,
    });
}
async function passwordVerify(hash, password) {
    const argon = await getArgon();
    return await argon.verify(hash, password);
}
async function passwordHash(password) {
    const argon = await getArgon();
    return await argon.hash(password);
}
function checkPassword(password) {
    if (typeof password !== 'string' || password.length < 6 || password.length > 255) {
        throw Error('Invalid password');
    }
}
export class AuthController {
    /**
     * Sign out the current user
     */
    static async signOut() {
        if (remult.user?.session.id) {
            await lucia.invalidateSession(remult.user?.session.id);
        }
        // Lucia is advertising for createBlankSessionCookie (and not delete Cookie)
        // remult.context.deleteCookie(lucia.sessionCookieName, { path: '/' })
        const sessionCookie = lucia.createBlankSessionCookie();
        remult.context.setCookie(sessionCookie.name, sessionCookie.value, {
            path: '/',
            ...sessionCookie.attributes,
        });
    }
    /**
     * Sign in with a demo account
     * _(The easiest way to demo & test your application)_
     */
    static async signInDemo(name) {
        const accounts = AUTH_OPTIONS.providers?.demo ?? [];
        if (accounts.length === 0) {
            throw new Error(`Demo accounts are not enabled!`);
        }
        const account = accounts.find((a) => a.name === name);
        if (!account) {
            throw new Error(`${name} not found as demo account!`);
        }
        const oSafe = getSafeOptions();
        let user = await remult.repo(oSafe.User).findFirst({ name });
        if (!user) {
            user = remult.repo(oSafe.User).create();
        }
        user.name = name;
        const r = mergeRoles(user.roles, account.roles);
        user.roles = r.roles;
        await remult.repo(oSafe.User).save(user);
        await createSession(user.id);
        return "You're in with demo account!";
    }
    /**
     * This is for login / password authentication SignUp
     * _(The first param `name` can be "anything")_
     */
    static async invite(email) {
        const oSafe = getSafeOptions();
        const existingUser = await remult.repo(oSafe.User).findOne({ where: { name: email } });
        if (existingUser) {
            // throw Error("Already invited !")
        }
        else {
            const user = await remult.repo(oSafe.User).insert({
                name: email,
            });
            const url = `${remult.context.url.origin}`;
            if (AUTH_OPTIONS?.invitationSend) {
                await AUTH_OPTIONS?.invitationSend({ email, url });
                logAuth.success(`Done with custom ${green('invitationSend')} (${yellow(url)})`);
                return 'Mail sent !';
            }
            else {
                await sendMail('invite', {
                    to: email,
                    subject: 'Invitation',
                    text: `You were invited here: ${url}`,
                    html: `You were invited <a href="${url}">here</a>`,
                });
                logAuth.success(`Done with ${green('sendMail')} (${url})`);
                return 'Demo Mail sent !';
            }
        }
        return 'ok';
    }
    /**
     * This is for login / password authentication SignUp
     * _(The first param `email` can be "anything")_
     */
    static async signUpPassword(email, password) {
        const oSafe = getSafeOptions();
        if (!oSafe.signUp) {
            throw Error("You can't signup by yourself! Contact the administrator.");
        }
        if (!oSafe.password_enabled) {
            throw Error('Password is not enabled!');
        }
        const existingUser = await remult.repo(oSafe.User).findOne({ where: { name: email } });
        if (existingUser) {
            throw Error("You can't signup twice !");
        }
        checkPassword(password);
        const user = await remult.repo(oSafe.User).insert({
            name: email,
        });
        const token = generateId(40);
        await remult.repo(oSafe.Account).insert({
            provider: AuthProvider.PASSWORD.id,
            providerUserId: email,
            userId: user.id,
            hashPassword: await passwordHash(password),
            token: oSafe.verifiedMethod === 'auto' ? undefined : token,
            expiresAt: oSafe.verifiedMethod === 'auto'
                ? undefined
                : createDate(new TimeSpan(AUTH_OPTIONS.providers?.password?.verifyMailExpiresIn ?? 5 * 60, 's')),
            lastVerifiedAt: oSafe.verifiedMethod === 'auto' ? new Date() : undefined,
        });
        if (oSafe.verifiedMethod === 'auto') {
            await createSession(user.id);
        }
        else {
            const url = `${remult.context.url.origin}${oSafe.firstlyData.props.ui.providers.password.paths.verify_email}?token=${token}`;
            if (AUTH_OPTIONS.providers?.password?.verifyMailSend) {
                await AUTH_OPTIONS.providers?.password.verifyMailSend({ email, url });
                logAuth.success(`Done with custom ${green('verifyMailSend')} (${yellow(url)})`);
            }
            else {
                await sendMail('signUpPassword', {
                    to: email,
                    subject: 'Wecome!',
                    text: `You can validate your account here: ${url}`,
                    html: `You can validate your account <a href="${url}">here</a>`,
                });
                logAuth.success(`Done with ${green('sendMail')} (${url})`);
            }
        }
        return 'ok';
    }
    /**
     * This is for login / password authentication SignIn
     * _(The first param `email` can be "anything")_
     */
    static async signInPassword(email, password) {
        const oSafe = getSafeOptions();
        if (!oSafe.password_enabled) {
            throw Error('Password is not enabled!');
        }
        const existingUser = await remult
            .repo(oSafe.User)
            .findOne({ where: { name: email }, include: { accounts: true } });
        const accountPassword = existingUser?.accounts.find((c) => c.provider === AuthProvider.PASSWORD.id);
        if (accountPassword) {
            const validPassword = await passwordVerify(accountPassword?.hashPassword ?? '', password ?? '');
            if (validPassword) {
                await createSession(existingUser.id);
                return 'ok';
            }
            throw Error('Incorrect username or password');
        }
        throw Error('Incorrect username or password.');
    }
    /**
     * Forgot your password ? Send a mail to reset it.
     */
    static async forgotPassword(email) {
        const oSafe = getSafeOptions();
        if (!oSafe.password_enabled) {
            throw Error('Password is not enabled!');
        }
        const u = await remult.repo(getSafeOptions().User).findFirst({ name: email });
        if (u) {
            let authAccount = await remult.repo(oSafe.Account).findFirst({
                userId: u.id,
            });
            if (!authAccount) {
                authAccount = remult.repo(oSafe.Account).create();
                authAccount.userId = u.id;
                authAccount.provider = AuthProvider.PASSWORD.id;
                authAccount.providerUserId = email;
            }
            const token = generateId(40);
            authAccount.token = token;
            authAccount.expiresAt = createDate(new TimeSpan(AUTH_OPTIONS.providers?.password?.resetPasswordExpiresIn ?? 5 * 60, 's'));
            await remult.repo(oSafe.Account).save(authAccount);
            const url = `${remult.context.url.origin}${oSafe.firstlyData.props.ui.providers.password.paths.reset_password}?token=${token}`;
            if (AUTH_OPTIONS.providers?.password?.resetPasswordSend) {
                await AUTH_OPTIONS.providers?.password.resetPasswordSend({ email, url });
                logAuth.success(`Done with custom ${green('resetPasswordSend')} (${yellow(url)})`);
                return 'Mail sent !';
            }
            else {
                await sendMail('forgotPassword', {
                    to: email,
                    subject: 'Reset your password',
                    text: `You can reset your password here: ${url}`,
                    html: `You can reset your password <a href="${url}">here</a>`,
                });
                logAuth.success(`Done with ${green('sendMail')} (${url})`);
                return 'Demo Mail sent !';
            }
        }
        throw new Error("Une erreur est survenue, contacte l'administrateur!");
    }
    /**
     * Reset your password with a token
     */
    static async resetPassword(token, password) {
        const oSafe = getSafeOptions();
        if (!oSafe.password_enabled) {
            throw Error('Password is not enabled!');
        }
        const account = await remult
            .repo(oSafe.Account)
            .findFirst({ token, provider: AuthProvider.PASSWORD.id });
        if (!account) {
            throw new Error('Invalid token');
        }
        if (account.expiresAt && account.expiresAt < new Date()) {
            throw new Error('token expired');
        }
        checkPassword(password);
        await lucia.invalidateUserSessions(account.userId);
        // update elements
        account.hashPassword = await passwordHash(password);
        account.token = undefined;
        account.expiresAt = undefined;
        account.lastVerifiedAt = new Date();
        await remult.repo(oSafe.Account).save(account);
        await createSession(account.userId);
        return 'reseted';
    }
    /** OTP */
    static async signInOTP(email) {
        const oSafe = getSafeOptions();
        if (!oSafe.otp_enabled) {
            throw new Error(`OPT is not enabled!`);
        }
        if (AUTH_OPTIONS.providers?.otp?.send) {
            const { createTOTPKeyURI } = await import('oslo/otp');
            const { encodeHex } = await import('oslo/encoding');
            const { TOTPController } = await import('oslo/otp');
            const secret = crypto.getRandomValues(new Uint8Array(20));
            const otp = await new TOTPController({
                period: new TimeSpan(AUTH_OPTIONS.providers?.otp.expiresIn ?? 30, 's'),
                digits: AUTH_OPTIONS.providers?.otp.digits ?? 6,
            }).generate(secret);
            const secretEncoded = encodeHex(secret);
            const issuer = AUTH_OPTIONS.providers.otp.issuer ?? 'firstly';
            const uri = createTOTPKeyURI(issuer, email, secret);
            const oSafe = getSafeOptions();
            let user = await remult.repo(oSafe.User).findFirst({ name: email });
            if (!user) {
                user = remult.repo(oSafe.User).create();
            }
            user.name = email;
            user = await remult.repo(oSafe.User).save(user);
            let account = await remult
                .repo(oSafe.Account)
                .findFirst({ userId: user.id, provider: AuthProvider.OTP.id });
            if (!account) {
                account = remult.repo(oSafe.Account).create();
            }
            account.userId = user.id;
            account.provider = AuthProvider.OTP.id;
            account.token = otp;
            account.hashPassword = secretEncoded;
            await remult.repo(oSafe.Account).save(account);
            await AUTH_OPTIONS.providers.otp?.send({ name: email, otp, uri });
            logAuth.success(`name: ${yellow(email)}, otp: ${yellow(otp)}, uri: ${yellow(uri)}`);
            return 'Mail sent !';
        }
        else {
            logAuth.error(`You need to provide a otp.send hook in the auth options!`);
        }
        return 'Hum, something went wrong !';
    }
    /**
     * Verify the OTP code
     */
    static async verifyOtp(email, otp) {
        const oSafe = getSafeOptions();
        const accounts = await remult.repo(oSafe.Account).find({
            where: { token: String(otp), provider: AuthProvider.OTP.id },
        });
        if (accounts.length === 0) {
            throw new Error('Invalid otp');
        }
        const account = accounts[0];
        const user = await remult.repo(oSafe.User).findId(account.userId);
        if (user.name !== email) {
            throw new Error('Invalid otp.');
        }
        const { decodeHex } = await import('oslo/encoding');
        const { TOTPController } = await import('oslo/otp');
        const secretDecoded = decodeHex(account.hashPassword ?? '');
        const validOTP = await new TOTPController().verify(String(otp), secretDecoded);
        if (!validOTP) {
            throw new Error('Invalid otp!');
        }
        await lucia.invalidateUserSessions(account.userId);
        // update elements
        account.hashPassword = undefined;
        account.token = undefined;
        account.expiresAt = undefined;
        await remult.repo(oSafe.Account).save(account);
        await createSession(account.userId);
        return 'verified';
    }
    /** OAUTH */
    /**
     * The the url to redirect to for the OAuth provider
     * @param provider Has to mach one of `AUTH_OPTIONS.providers.oAuths` your configured
     *
     * To be used like this for example:
     * ```
     * const url = await AuthController.signInOAuthGetUrl('github')
     * window.location.href = url
     * ```
     *
     * _(popup example should work too, and a nice example/componant would be appreciated)_
     */
    static async signInOAuthGetUrl(o) {
        const selectedOAuth = AUTH_OPTIONS.providers?.oAuths?.find((c) => c.name === o.provider);
        if (selectedOAuth) {
            const state = generateState();
            try {
                const arcticProvider = selectedOAuth.getArcticProvider();
                const args = [state];
                if (selectedOAuth.isPKCE) {
                    const codeVerifier = generateCodeVerifier();
                    args.push(codeVerifier);
                    // store code verifier as cookie
                    remult.context.setCookie('code_verifier', codeVerifier, {
                        secure: true, // set to false in localhost
                        path: '/',
                        httpOnly: true,
                        maxAge: 60 * 10, // 10 min
                    });
                }
                if (o.options) {
                    args.push(o.options);
                }
                else {
                    if (selectedOAuth.authorizationURLOptions) {
                        args.push(selectedOAuth.authorizationURLOptions());
                    }
                }
                // @ts-ignore
                const url = await arcticProvider.createAuthorizationURL(...args);
                if (!url) {
                    throw new Error('No url returned');
                }
                remult.context.setCookie(`${o.provider}_oauth_state`, state, {
                    path: '/',
                    secure: !DEV,
                    httpOnly: true,
                    maxAge: 60 * 10,
                    sameSite: 'lax',
                });
                if (o.redirect) {
                    remult.context.setCookie(`remult_redirect`, o.redirect, {
                        path: '/',
                        secure: !DEV,
                        httpOnly: true,
                        maxAge: 60 * 10,
                        sameSite: 'lax',
                    });
                }
                return url.toString();
            }
            catch (error) {
                // display error for the server only
                logAuth.error(error);
                throw new Error(`${o.provider} not well configured!`);
            }
        }
        throw new Error(`${o.provider} is not configured!`);
    }
}
__decorate([
    BackendMethod({ allowed: true })
], AuthController, "signOut", null);
__decorate([
    BackendMethod({ allowed: true })
], AuthController, "signInDemo", null);
__decorate([
    BackendMethod({ allowed: false })
], AuthController, "invite", null);
__decorate([
    BackendMethod({ allowed: true })
], AuthController, "signUpPassword", null);
__decorate([
    BackendMethod({ allowed: true })
], AuthController, "signInPassword", null);
__decorate([
    BackendMethod({ allowed: true })
], AuthController, "forgotPassword", null);
__decorate([
    BackendMethod({ allowed: true })
], AuthController, "resetPassword", null);
__decorate([
    BackendMethod({ allowed: true })
], AuthController, "signInOTP", null);
__decorate([
    BackendMethod({ allowed: true })
], AuthController, "verifyOtp", null);
__decorate([
    BackendMethod({ allowed: true })
], AuthController, "signInOAuthGetUrl", null);
