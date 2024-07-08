import { type AuthorizationURLOptions } from '.';
export declare class AuthController {
    /**
     * Sign out the current user
     */
    static signOut(): Promise<void>;
    /**
     * Sign in with a demo account
     * _(The easiest way to demo & test your application)_
     */
    static signInDemo(name: string): Promise<string>;
    /**
     * This is for login / password authentication SignUp
     * _(The first param `name` can be "anything")_
     */
    static invite(email: string): Promise<"Mail sent !" | "Demo Mail sent !" | "ok">;
    /**
     * This is for login / password authentication SignUp
     * _(The first param `email` can be "anything")_
     */
    static signUpPassword(email: string, password: string): Promise<string>;
    /**
     * This is for login / password authentication SignIn
     * _(The first param `email` can be "anything")_
     */
    static signInPassword(email: string, password: string): Promise<string>;
    /**
     * Forgot your password ? Send a mail to reset it.
     */
    static forgotPassword(email: string): Promise<"Mail sent !" | "Demo Mail sent !">;
    /**
     * Reset your password with a token
     */
    static resetPassword(token: string, password: string): Promise<string>;
    /** OTP */
    static signInOTP(email: string): Promise<"Mail sent !" | "Hum, something went wrong !">;
    /**
     * Verify the OTP code
     */
    static verifyOtp(email: string, otp: string | number): Promise<string>;
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
    static signInOAuthGetUrl<T extends keyof AuthorizationURLOptions>(o: {
        provider: T;
        options?: AuthorizationURLOptions[T];
        redirect?: string;
    }): Promise<string>;
}
