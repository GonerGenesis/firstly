import { SvelteComponent } from "svelte";
import type { KitStoreItem } from '../..';
import type { DialogType } from './dialog';
declare class __sveltets_Render<T extends any> {
    props(): {
        [x: string]: any;
        store: KitStoreItem<T>;
        type: DialogType;
        wDelete?: boolean | undefined;
        textCreate?: string | undefined;
    };
    events(): {
        delete: CustomEvent<any>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots(): {};
}
export type FormEditActionProps<T extends any> = ReturnType<__sveltets_Render<T>['props']>;
export type FormEditActionEvents<T extends any> = ReturnType<__sveltets_Render<T>['events']>;
export type FormEditActionSlots<T extends any> = ReturnType<__sveltets_Render<T>['slots']>;
export default class FormEditAction<T extends any> extends SvelteComponent<FormEditActionProps<T>, FormEditActionEvents<T>, FormEditActionSlots<T>> {
}
export {};
