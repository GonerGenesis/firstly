var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var StateDemoEnum_1;
import { ValueListFieldType } from 'remult';
import { KitBaseEnum } from '../KitBaseEnum';
import '../ui/LibIcon';
import { LibIcon_Add, LibIcon_Delete, LibIcon_Edit } from '../ui/LibIcon';
let StateDemoEnum = class StateDemoEnum extends KitBaseEnum {
    static { StateDemoEnum_1 = this; }
    static CHECK = new StateDemoEnum_1('CHECK', {
        caption: 'Check',
        icon: {
            data: LibIcon_Add,
            class: 'text-primary',
        },
    });
    static EDIT = new StateDemoEnum_1('EDIT', {
        caption: 'Edit',
        icon: {
            data: LibIcon_Edit,
            class: 'text-secondary',
        },
    });
    static DELETE = new StateDemoEnum_1('DELETE', {
        caption: 'Delete',
        icon: {
            data: LibIcon_Delete,
            class: 'text-error',
        },
    });
    constructor(id, options) {
        super(id, options);
    }
};
StateDemoEnum = StateDemoEnum_1 = __decorate([
    ValueListFieldType()
], StateDemoEnum);
export { StateDemoEnum };
