import type { OAuth2Provider as ArcticOAuth2Provider, OAuth2ProviderWithPKCE as ArcticOAuth2ProviderWithPKCE } from 'arctic';
import { Lucia, type SessionCookieOptions } from 'lucia';
import type { ClassType, UserInfo } from 'remult';
import { Log } from '@kitql/helpers';
import type { Module } from '../api';
import type { ResolvedType } from '../utils/types';
import { KitAuthAccount, KitAuthUser, KitAuthUserSession } from './Entities';
import type { firstlyData } from './types';
export type { firstlyData };
export { KitAuthUser, KitAuthAccount, AuthProvider, KitAuthUserSession } from './Entities';
export { AuthController } from './AuthController';
export type AuthorizationURLOptions = Record<string, {
    scopes?: string[];
}>;
export type DynamicAuthorizationURLOptions<T extends KitOAuth2Provider[] = KitOAuth2Provider[]> = T extends Array<infer O> ? O extends KitOAuth2Provider ? {
    [P in O['name']]: ReturnType<O['authorizationURLOptions']>;
} : never : never;
export declare const logAuth: Log;
export { KitAuthRole } from './Entities';
type OAuth2UserInfo = {
    raw?: any;
    providerUserId: string;
    /** Will take the first option available */
    nameOptions: string[];
};
export type KitOAuth2Provider<LitName extends string = string, T extends ArcticOAuth2Provider | ArcticOAuth2ProviderWithPKCE = ArcticOAuth2Provider> = {
    name: LitName;
    getArcticProvider: () => T;
    isPKCE: T extends ArcticOAuth2Provider ? false : T extends ArcticOAuth2ProviderWithPKCE ? true : never;
    authorizationURLOptions: () => T extends ArcticOAuth2Provider ? Parameters<T['createAuthorizationURL']>[1] : T extends ArcticOAuth2ProviderWithPKCE ? Parameters<T['createAuthorizationURL']>[2] : never;
    getUserInfo(tokens: ResolvedType<ReturnType<T['validateAuthorizationCode']>>): Promise<OAuth2UserInfo>;
};
type AuthOptions<TUserEntity extends KitAuthUser = KitAuthUser, TSessionEntity extends KitAuthUserSession = KitAuthUserSession, TAccountEntity extends KitAuthAccount = KitAuthAccount> = {
    customEntities?: {
        User?: ClassType<TUserEntity>;
        Session?: ClassType<TSessionEntity>;
        Account?: ClassType<TAccountEntity>;
    };
    ui?: {
        paths?: {
            base?: string;
        };
    } | false;
    /** in secondes @default 15 days */
    sessionExpiresIn?: number;
    sessionCookie?: SessionCookieOptions;
    defaultRedirect?: string;
    /**
     * Can a user sign up by itself? Or we can join only by invitation ?
     * If false, no one can sign up alone.
     * @default true
     **/
    signUp?: boolean;
    /**
     * To be able to sign in user needs to be verified or not?
     * ```
     *  `Auto` =>  noting will be checked
     *  `Email` => users needs to click a link in an email
     *  `Manual` => an admin needs to verify the user and set verifiedAt in the database
     * ```
     * @default auto
     **/
    verifiedMethod?: 'auto' | 'email' | 'manual';
    invitationSend?: (args: {
        email: string;
        url: string;
    }) => Promise<void>;
    providers?: {
        demo?: {
            name: string;
            roles?: string[];
        }[];
        password?: {
            /**
             * Reseting the password
             */
            resetPasswordSend?: (args: {
                email: string;
                url: string;
            }) => Promise<void>;
            /** in secondes @default 5 minutes */
            resetPasswordExpiresIn?: number;
            /**
             * Verify the Mail
             */
            verifyMailSend?: (args: {
                email: string;
                url: string;
            }) => Promise<void>;
            /** in secondes @default 5 minutes */
            verifyMailExpiresIn?: number;
            /**
             * Some settings for the password hashing algorithm _(using argon2 under the hood)_
             */
            argon2Settings?: {
                memorySize?: number | undefined;
                iterations?: number | undefined;
                tagLength?: number | undefined;
                parallelism?: number | undefined;
                secret?: ArrayBuffer | undefined;
            };
        };
        otp?: {
            issuer?: string;
            /** in secondes @default 30 seconds */
            expiresIn?: number;
            /** Number of digits @default 6 */
            digits?: number;
            send?: (data: {
                name: string;
                otp: string;
                uri: string;
            }) => Promise<void>;
        };
        oAuths?: KitOAuth2Provider[];
    };
};
export declare let AUTH_OPTIONS: AuthOptions;
export declare const getSafeOptions: () => {
    User: ClassType<KitAuthUser>;
    Session: ClassType<KitAuthUserSession>;
    Account: ClassType<KitAuthAccount>;
    signUp: boolean;
    password_enabled: boolean;
    otp_enabled: boolean;
    verifiedMethod: "email" | "auto" | "manual";
    redirectUrl: string;
    firstlyData: firstlyData;
};
/**
 * To enable authentication in your app in a few lines of code.
 * _Info: index: -777_
 */
export declare const auth: (o: AuthOptions) => Module;
export declare const lucia: Lucia<Record<any, any>, UserInfo>;
declare module 'lucia' {
    interface Register {
        Lucia: typeof lucia;
        DatabaseSessionAttributes: DatabaseSessionAttributes;
        DatabaseUserAttributes: DatabaseUserAttributes;
    }
    interface DatabaseSessionAttributes {
    }
}
interface DatabaseUserAttributes {
    id: string;
    name: string;
    roles: string[];
    session: {
        id: string;
        expiresAt: Date;
    };
}
