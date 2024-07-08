import { redirect } from '@sveltejs/kit';
import { DEV } from 'esm-env';
import { Lucia, TimeSpan } from 'lucia';
import { remult } from 'remult';
import { Log, red } from '@kitql/helpers';
import { read } from '@kitql/internals';
import { KitRole } from '../';
import { RemultLuciaAdapter } from './Adapter';
import { AuthController } from './AuthController';
import { AuthProvider, KitAuthAccount, KitAuthRole, KitAuthUser, KitAuthUserSession, } from './Entities';
import { createSession } from './helper';
import { RoleController } from './RoleController';
export { KitAuthUser, KitAuthAccount, AuthProvider, KitAuthUserSession } from './Entities';
export { AuthController } from './AuthController';
export const logAuth = new Log('firstly | auth');
export { KitAuthRole } from './Entities';
export let AUTH_OPTIONS = {};
export const getSafeOptions = () => {
    const signUp = AUTH_OPTIONS.signUp ?? true;
    const base = AUTH_OPTIONS.ui === false ? 'NO_BASE_PATH' : AUTH_OPTIONS.ui?.paths?.base ?? '/kit/auth';
    const oAuths = AUTH_OPTIONS.providers?.oAuths?.map((o) => {
        return o.name;
    }) ?? [];
    const firstlyData = {
        module: 'auth',
        props: {
            ui: {
                paths: {
                    base,
                },
                providers: {
                    password: {
                        dico: {
                            email: 'Email',
                            email_placeholder: 'Your email address',
                            password: 'Password',
                            btn_sign_up: 'Sign up',
                            btn_sign_in: 'Sign in',
                            forgot_password: 'Forgot your password?',
                            send_password_reset_instructions: 'Send password reset instructions',
                            back_to_sign_in: 'Back to sign in',
                        },
                        paths: {
                            sign_up: signUp ? `${base}/sign-up` : false,
                            sign_in: `${base}/sign-in`,
                            forgot_password: `${base}/forgot-password`,
                            reset_password: `${base}/reset-password`,
                            verify_email: `${base}/verify-email`,
                        },
                    },
                    oAuths,
                },
            },
        },
    };
    let redirectUrl = AUTH_OPTIONS.defaultRedirect ?? '/';
    if (!redirectUrl.startsWith('/')) {
        logAuth.error(`Invalid redirect url ${red(redirectUrl)} (it should be a local one starting with /)`);
        redirectUrl = '/';
    }
    return {
        User: AUTH_OPTIONS.customEntities?.User ?? KitAuthUser,
        Session: AUTH_OPTIONS.customEntities?.Session ?? KitAuthUserSession,
        Account: AUTH_OPTIONS.customEntities?.Account ?? KitAuthAccount,
        signUp,
        password_enabled: AUTH_OPTIONS.providers?.password ? true : false,
        otp_enabled: AUTH_OPTIONS.providers?.otp ? true : false,
        verifiedMethod: AUTH_OPTIONS.verifiedMethod ?? 'auto',
        redirectUrl,
        firstlyData,
    };
};
/**
 * To enable authentication in your app in a few lines of code.
 * _Info: index: -777_
 */
export const auth = (o) => {
    AUTH_OPTIONS = o;
    const oSafe = getSafeOptions();
    return {
        name: 'auth',
        index: -777,
        entities: [oSafe.User, oSafe.Session, oSafe.Account],
        controllers: [AuthController],
        initRequest: async (event) => {
            // std session
            const sessionId = event.cookies.get(lucia.sessionCookieName);
            if (sessionId) {
                const { session, user } = await lucia.validateSession(sessionId);
                if (session && session.fresh) {
                    const sessionCookie = lucia.createSessionCookie(session.id);
                    event.cookies.set(sessionCookie.name, sessionCookie.value, {
                        path: '/',
                        ...sessionCookie.attributes,
                    });
                }
                remult.user = user ?? undefined;
            }
        },
        earlyReturn: async ({ event, resolve }) => {
            if (AUTH_OPTIONS.ui === false) {
                return { early: false };
            }
            const oSafe = getSafeOptions();
            if (event.url.pathname === oSafe.firstlyData.props.ui.providers.password.paths.verify_email) {
                // TODO need to verify the token and set the verifiedAt in the database and we are good.
                // It's 2 minutes, but I'll be it later :D
                const token = event.url.searchParams.get('token') ?? '';
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
                await lucia.invalidateUserSessions(account.userId);
                // update elements
                account.token = undefined;
                account.expiresAt = undefined;
                account.lastVerifiedAt = new Date();
                await remult.repo(oSafe.Account).save(account);
                await createSession(account.userId);
                redirect(302, oSafe.redirectUrl);
            }
            if (event.url.pathname.startsWith(oSafe.firstlyData.props.ui.paths.base)) {
                const content = read('src/lib/auth/static/index.html') ??
                    read('node_modules/firstly/esm/auth/static/index.html');
                return {
                    early: true,
                    resolve: new Response(content + `<script>const firstlyData = ${JSON.stringify(oSafe.firstlyData)}</script>`, {
                        headers: { 'content-type': 'text/html' },
                    }),
                };
            }
            if (event.url.pathname.startsWith('/api/static')) {
                const content = read(`src/lib/auth/static/${event.url.pathname.replaceAll('/api/static/', '')}`);
                if (content) {
                    const seg = event.url.pathname.split('.');
                    const map = {
                        js: 'text/javascript',
                        css: 'text/css',
                        svg: 'image/svg+xml',
                    };
                    return {
                        early: true,
                        resolve: new Response(content, {
                            headers: { 'content-type': map[seg[seg.length - 1]] ?? 'text/plain' },
                        }),
                    };
                }
            }
            if (event.url.pathname === '/api/auth_callback') {
                const code = event.url.searchParams.get('code');
                const state = event.url.searchParams.get('state');
                const keys = AUTH_OPTIONS.providers?.oAuths?.map((c) => c.name) ?? [];
                let storedState = null;
                let keyState = null;
                for (const key of keys) {
                    storedState = event.cookies.get(`${key}_oauth_state`) ?? null;
                    if (storedState) {
                        keyState = key;
                        break;
                    }
                }
                const redirectUrlCookie = event.cookies.get(`remult_redirect`);
                if (redirectUrlCookie) {
                    event.cookies.delete(`remult_redirect`, { path: '/' });
                }
                const redirectUrl = redirectUrlCookie ?? oSafe.redirectUrl;
                if (!code || !state || !storedState || state !== storedState || !keyState) {
                    redirect(302, redirectUrl);
                }
                const selectedOAuth = AUTH_OPTIONS.providers?.oAuths?.find((c) => c.name === keyState);
                if (selectedOAuth && code) {
                    const tokens = await selectedOAuth.getArcticProvider().validateAuthorizationCode(code);
                    let info;
                    try {
                        info = await selectedOAuth.getUserInfo(tokens);
                    }
                    catch (error) {
                        redirect(302, redirectUrl);
                    }
                    if (!info.providerUserId) {
                        redirect(302, redirectUrl);
                    }
                    let account = await remult
                        .repo(oSafe.Account)
                        .findFirst({ provider: keyState, providerUserId: info.providerUserId });
                    if (!account) {
                        if (!oSafe.signUp) {
                            // throw Error("You can't signup by yourself! Contact the administrator.")
                            redirect(302, redirectUrl);
                        }
                        // for each info.name, we check if it exists take the first option
                        // and add the providerUserId to the name if no option available
                        let nameToUse = '';
                        for (let i = 0; i < info.nameOptions.length; i++) {
                            const existingUser = await remult
                                .repo(oSafe.User)
                                .findOne({ where: { name: info.nameOptions[i] } });
                            if (existingUser) {
                                // Don't do anything
                            }
                            else {
                                nameToUse = info.nameOptions[i];
                                break;
                            }
                        }
                        if (nameToUse === '') {
                            nameToUse = `${info.nameOptions[0]}-${info.providerUserId}`;
                        }
                        const user = remult.repo(oSafe.User).create();
                        user.name = nameToUse;
                        account = remult.repo(oSafe.Account).create();
                        account.provider = keyState;
                        account.providerUserId = info.providerUserId;
                        account.token = tokens.accessToken;
                        account.userId = user.id;
                        account.lastVerifiedAt = new Date();
                        await remult.repo(oSafe.User).save(user);
                        await remult.repo(oSafe.Account).save(account);
                    }
                    else {
                        account.token = tokens.accessToken;
                        await remult.repo(oSafe.Account).save(account);
                    }
                    await createSession(account.userId);
                    event.cookies.delete(`${keyState}_oauth_state`, { path: '/' });
                    event.cookies.delete(`code_verifier`, { path: '/' });
                }
                redirect(302, redirectUrl);
            }
            return { early: false };
        },
        initApi: async () => {
            await RoleController.initRoleFromEnv(logAuth, oSafe.User, 'KIT_ADMIN', KitRole.Admin);
            await RoleController.initRoleFromEnv(logAuth, oSafe.User, 'KIT_AUTH_ADMIN', KitAuthRole.Admin);
        },
    };
};
const adapter = new RemultLuciaAdapter();
const defaultExpiresIn = 60 * 60 * 24 * 15; // 15 days
export const lucia = new Lucia(adapter, {
    sessionExpiresIn: new TimeSpan(AUTH_OPTIONS.sessionExpiresIn ?? defaultExpiresIn, 's'),
    sessionCookie: {
        name: AUTH_OPTIONS.sessionCookie?.name ?? 'remult_auth_session',
        expires: AUTH_OPTIONS.sessionCookie?.expires,
        attributes: {
            // set to `true` when using HTTPS
            secure: !DEV,
            ...AUTH_OPTIONS.sessionCookie?.attributes,
        },
    },
    getSessionAttributes: (attributes) => {
        return {
            ...attributes,
        };
    },
    getUserAttributes(attributes) {
        // @ts-expect-error
        delete attributes['createdAt'];
        // @ts-expect-error
        delete attributes['updatedAt'];
        // to remove relations
        for (const key in attributes) {
            if (attributes[key] === undefined) {
                delete attributes[key];
            }
        }
        return attributes;
        // return {
        // 	...attributes,
        // }
    },
});
