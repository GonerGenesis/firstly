import { SvelteComponent } from "svelte";
import type { EntityOrderBy } from 'remult';
import { type KitStoreList } from '../index.js';
import type { KitCell } from '../kitCellsBuildor.js';
declare class __sveltets_Render<T extends Record<any, any>> {
    props(): {
        cells: KitCell<T>[];
        store: KitStoreList<T>;
        withAdd?: boolean;
        withEdit?: boolean;
        withDelete?: boolean;
        loadingRows?: number;
        classes?: {
            table: string;
        } | undefined;
        orderBy?: EntityOrderBy<T> | undefined;
        orderByCols?: true | (keyof T)[] | undefined;
        dicoNoResult?: string;
    };
    events(): {
        refresh: any;
        add: CustomEvent<any>;
        rowclick: CustomEvent<any>;
        edit: CustomEvent<any>;
        delete: CustomEvent<any>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots(): {
        header: {
            field: import("remult").FieldMetadata<any, T> | undefined;
        };
        cell: {
            row: T;
            field: import("remult").FieldMetadata<any, T> | undefined;
            cell: KitCell<T>;
        };
        extra: {};
    };
}
export type GridProps<T extends Record<any, any>> = ReturnType<__sveltets_Render<T>['props']>;
export type GridEvents<T extends Record<any, any>> = ReturnType<__sveltets_Render<T>['events']>;
export type GridSlots<T extends Record<any, any>> = ReturnType<__sveltets_Render<T>['slots']>;
export default class Grid<T extends Record<any, any>> extends SvelteComponent<GridProps<T>, GridEvents<T>, GridSlots<T>> {
}
export {};
