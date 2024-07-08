var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var AuthProvider_1;
import { Entity, Fields, Relations, Validators, ValueListFieldType } from 'remult';
import { KitBaseEnum, KitRole } from '../';
export const KitAuthRole = {
    Admin: 'KitAuthAdmin',
};
let KitAuthUser = class KitAuthUser {
    id;
    createdAt;
    updatedAt;
    // @Fields.string<KitAuthUser>({
    name;
    roles = [];
    accounts;
    sessions;
};
__decorate([
    Fields.cuid()
], KitAuthUser.prototype, "id", void 0);
__decorate([
    Fields.createdAt()
], KitAuthUser.prototype, "createdAt", void 0);
__decorate([
    Fields.updatedAt()
], KitAuthUser.prototype, "updatedAt", void 0);
__decorate([
    Fields.string({
        validate: [
            Validators.unique(),
            (e) => {
                if (e.name.length < 2)
                    throw 'Must be at least 2 characters long';
            },
        ],
    })
], KitAuthUser.prototype, "name", void 0);
__decorate([
    Fields.object({
        valueConverter: {
            toDb: (x) => (x ? x.join(',') : undefined),
            fromDb: (x) => (x ? x.split(',') : undefined),
        },
    })
], KitAuthUser.prototype, "roles", void 0);
__decorate([
    Relations.toMany(() => KitAuthAccount, 'userId')
], KitAuthUser.prototype, "accounts", void 0);
__decorate([
    Relations.toMany(() => KitAuthUserSession, 'userId')
], KitAuthUser.prototype, "sessions", void 0);
KitAuthUser = __decorate([
    Entity('kit_auth_user', {
        allowApiCrud: [KitAuthRole.Admin, KitRole.Admin],
        dbName: 'auth.kit_auth_user',
    })
], KitAuthUser);
export { KitAuthUser };
let KitAuthAccount = class KitAuthAccount {
    createdAt;
    updatedAt;
    userId;
    user;
    provider = AuthProvider.PASSWORD.id;
    providerUserId = '';
    hashPassword;
    token;
    expiresAt;
    lastVerifiedAt;
};
__decorate([
    Fields.createdAt()
], KitAuthAccount.prototype, "createdAt", void 0);
__decorate([
    Fields.updatedAt()
], KitAuthAccount.prototype, "updatedAt", void 0);
__decorate([
    Fields.string()
], KitAuthAccount.prototype, "userId", void 0);
__decorate([
    Relations.toOne(() => KitAuthUser, 'userId')
], KitAuthAccount.prototype, "user", void 0);
__decorate([
    Fields.string()
], KitAuthAccount.prototype, "provider", void 0);
__decorate([
    Fields.string()
], KitAuthAccount.prototype, "providerUserId", void 0);
__decorate([
    Fields.string({ includeInApi: false, allowNull: true })
], KitAuthAccount.prototype, "hashPassword", void 0);
__decorate([
    Fields.string({ includeInApi: false, allowNull: true })
], KitAuthAccount.prototype, "token", void 0);
__decorate([
    Fields.date({ includeInApi: false, allowNull: true })
], KitAuthAccount.prototype, "expiresAt", void 0);
__decorate([
    Fields.date({ includeInApi: false, allowNull: true })
], KitAuthAccount.prototype, "lastVerifiedAt", void 0);
KitAuthAccount = __decorate([
    Entity('kit_auth_account', {
        allowApiCrud: [KitAuthRole.Admin, KitRole.Admin],
        dbName: 'auth.kit_auth_account',
        id: { provider: true, userId: true },
    })
], KitAuthAccount);
export { KitAuthAccount };
let KitAuthUserSession = class KitAuthUserSession {
    id;
    expiresAt;
    userId;
    user;
};
__decorate([
    Fields.cuid()
], KitAuthUserSession.prototype, "id", void 0);
__decorate([
    Fields.date()
], KitAuthUserSession.prototype, "expiresAt", void 0);
__decorate([
    Fields.string()
], KitAuthUserSession.prototype, "userId", void 0);
__decorate([
    Relations.toOne(() => KitAuthUser, 'userId')
], KitAuthUserSession.prototype, "user", void 0);
KitAuthUserSession = __decorate([
    Entity('kit_auth_session', {
        allowApiCrud: [KitAuthRole.Admin, KitRole.Admin],
        dbName: 'auth.kit_auth_session',
    })
], KitAuthUserSession);
export { KitAuthUserSession };
let AuthProvider = class AuthProvider extends KitBaseEnum {
    static { AuthProvider_1 = this; }
    static DEMO = new AuthProvider_1('DEMO', { caption: 'Demo' });
    static PASSWORD = new AuthProvider_1('PASSWORD', { caption: 'Password' });
    static OTP = new AuthProvider_1('OTP', { caption: 'TOTP' });
    static OAUTH = new AuthProvider_1('OAUTH', { caption: 'OAUTH' });
    constructor(id, o) {
        super(id, {
            ...o,
        });
    }
};
AuthProvider = AuthProvider_1 = __decorate([
    ValueListFieldType()
], AuthProvider);
export { AuthProvider };
