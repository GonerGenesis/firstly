import { SvelteComponent } from "svelte";
import type { HTMLInputAttributes } from 'svelte/elements';
import { type KitCell } from '../';
declare class __sveltets_Render<T extends Record<any, any>> {
    props(): {
        [x: string]: any;
        cell: KitCell<T>;
        value?: HTMLInputAttributes["value"];
        cellsValues?: any;
        withDedounce?: boolean;
        error?: string;
        mode?: "edit" | "view" | "filtre";
        focus?: boolean;
        clearable?: boolean | undefined;
        disabled?: boolean;
    };
    events(): {
        createRequest: CustomEvent<any>;
        selected: CustomEvent<any>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots(): {};
}
export type FieldProps<T extends Record<any, any>> = ReturnType<__sveltets_Render<T>['props']>;
export type FieldEvents<T extends Record<any, any>> = ReturnType<__sveltets_Render<T>['events']>;
export type FieldSlots<T extends Record<any, any>> = ReturnType<__sveltets_Render<T>['slots']>;
export default class Field<T extends Record<any, any>> extends SvelteComponent<FieldProps<T>, FieldEvents<T>, FieldSlots<T>> {
}
export {};
