import { SvelteComponent } from "svelte";
import type { FieldMetadata } from 'remult';
import { type KitStoreItem } from '..';
import type { KitCell } from '../kitCellsBuildor';
declare class __sveltets_Render<T extends Record<any, any>> {
    props(): {
        mode?: ("view" | "edit" | "filtre") | undefined;
        cells: KitCell<T>[];
        store: KitStoreItem<T>;
        focusKey?: string | null | undefined;
    };
    events(): {
        createRequest: CustomEvent<any>;
        changed: CustomEvent<any>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots(): {
        field: {
            field: FieldMetadata<any, T> | undefined;
            focus: typeof focus;
        };
    };
}
export type FieldGroupProps<T extends Record<any, any>> = ReturnType<__sveltets_Render<T>['props']>;
export type FieldGroupEvents<T extends Record<any, any>> = ReturnType<__sveltets_Render<T>['events']>;
export type FieldGroupSlots<T extends Record<any, any>> = ReturnType<__sveltets_Render<T>['slots']>;
export default class FieldGroup<T extends Record<any, any>> extends SvelteComponent<FieldGroupProps<T>, FieldGroupEvents<T>, FieldGroupSlots<T>> {
}
export {};
