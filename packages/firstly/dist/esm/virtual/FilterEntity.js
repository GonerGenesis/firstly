var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Entity, Fields } from 'remult';
// import { KitFields } from '../KitFields.js'
let FilterEntity = class FilterEntity {
    search = '';
    title = '';
    is = true;
    sameAdress = true;
    number = 200;
};
__decorate([
    Fields.string({ allowNull: true, caption: 'Rechercher par' })
], FilterEntity.prototype, "search", void 0);
__decorate([
    Fields.string({ allowNull: false, caption: 'Titre' })
], FilterEntity.prototype, "title", void 0);
__decorate([
    Fields.boolean()
], FilterEntity.prototype, "is", void 0);
__decorate([
    Fields.boolean({ caption: 'Même adresse', allowNull: true })
], FilterEntity.prototype, "sameAdress", void 0);
__decorate([
    Fields.number({ allowNull: false, caption: 'number' })
], FilterEntity.prototype, "number", void 0);
FilterEntity = __decorate([
    Entity('filterEntities', {})
], FilterEntity);
export { FilterEntity };
