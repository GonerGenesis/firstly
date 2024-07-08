var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Entity, Field, Fields } from 'remult';
import { KitFields } from '../KitFields.js';
import { StateDemoEnum } from './StateDemoEnum.js';
let UIEntity = class UIEntity {
    id;
    createdAt = new Date();
    updatedAt = new Date();
    username;
    email;
    password;
    // @Field(() => Profile, {
    //
    // 	lazy: true,
    // 	allowNull: true,
    // 	inputType: 'selectEntity',
    // })
    // profile?: Profile
    state;
    permissions = [];
    cuid;
    isSubContractor;
    rate;
    arrivalDate;
    arrivalDateOnly;
};
__decorate([
    Fields.autoIncrement()
], UIEntity.prototype, "id", void 0);
__decorate([
    Fields.createdAt()
], UIEntity.prototype, "createdAt", void 0);
__decorate([
    Fields.updatedAt()
], UIEntity.prototype, "updatedAt", void 0);
__decorate([
    KitFields.string({ caption: "Nom de l'utilisateur", placeholder: 'Jean-Yves', suffix: 'sdsd' })
], UIEntity.prototype, "username", void 0);
__decorate([
    Fields.string({ caption: 'E Mail', inputType: 'email', placeholder: 'prénom.nom@se.com' })
], UIEntity.prototype, "email", void 0);
__decorate([
    KitFields.string({
        caption: 'Mot de passe',
        inputType: 'password',
        placeholder: '********',
        includeInApi: false,
        minLength: 6,
        allowNull: false,
    })
], UIEntity.prototype, "password", void 0);
__decorate([
    Field(() => StateDemoEnum, { inputType: 'selectEnum' })
], UIEntity.prototype, "state", void 0);
__decorate([
    Fields.json({ allowNull: true })
], UIEntity.prototype, "permissions", void 0);
__decorate([
    Fields.cuid()
], UIEntity.prototype, "cuid", void 0);
__decorate([
    Fields.boolean({ allowNull: true })
], UIEntity.prototype, "isSubContractor", void 0);
__decorate([
    Fields.number({ allowNull: true, suffix: '%' })
], UIEntity.prototype, "rate", void 0);
__decorate([
    Fields.date({ allowNull: true, allowApiUpdate: false })
], UIEntity.prototype, "arrivalDate", void 0);
__decorate([
    KitFields.dateOnly({ allowNull: true })
], UIEntity.prototype, "arrivalDateOnly", void 0);
UIEntity = __decorate([
    Entity('uiEntities', {
        allowApiCrud: true,
        defaultOrderBy: { username: 'asc' },
    })
], UIEntity);
export { UIEntity };
