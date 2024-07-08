var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Entity, Fields } from 'remult';
import { KitFields } from '../KitFields';
let Customer = class Customer {
    id;
    name;
};
__decorate([
    Fields.cuid()
], Customer.prototype, "id", void 0);
__decorate([
    KitFields.string({ caption: 'Nom de la société', placeholder: 'Dynamic Process' })
], Customer.prototype, "name", void 0);
Customer = __decorate([
    Entity('customers', {
        allowApiCrud: true,
    })
], Customer);
export { Customer };
