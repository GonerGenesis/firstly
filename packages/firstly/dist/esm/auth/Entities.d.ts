import { KitBaseEnum } from '../';
import type { KitBaseEnumOptions } from '../';
export declare const KitAuthRole: {
    readonly Admin: "KitAuthAdmin";
};
export declare class KitAuthUser {
    id: string;
    createdAt: Date;
    updatedAt?: Date;
    name: string;
    roles: string[];
    accounts: KitAuthAccount[];
    sessions: KitAuthUserSession[];
}
export declare class KitAuthAccount {
    createdAt: Date;
    updatedAt?: Date;
    userId: string;
    user: KitAuthUser;
    provider: string;
    providerUserId: string;
    hashPassword?: string;
    token?: string;
    expiresAt?: Date;
    lastVerifiedAt?: Date;
}
export declare class KitAuthUserSession {
    id: string;
    expiresAt: Date;
    userId: string;
    user: KitAuthUser;
}
export declare class AuthProvider extends KitBaseEnum {
    static DEMO: AuthProvider;
    static PASSWORD: AuthProvider;
    static OTP: AuthProvider;
    static OAUTH: AuthProvider;
    constructor(id: string, o?: KitBaseEnumOptions);
}
