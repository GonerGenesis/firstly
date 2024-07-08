import type { SvelteComponent } from 'svelte';
import type { Repository } from 'remult';
import { type KitBaseItemLight, type KitCellsInput, type KitStoreItem } from '../../';
export type DialogClasses = {
    /**
     * for example `overflow-auto` to have a scrollbar in the dialog
     */
    root?: string;
    formGrid?: FormGrid;
};
export type FormGrid = 'grid-cols-1' | 'grid-cols-2' | 'grid-cols-3' | 'grid-cols-4' | 'grid-cols-1 lg:grid-cols-4';
export type DialogMetaData<entityType = any> = {
    detail?: KitBaseItemLight;
    repo?: Repository<entityType>;
    store?: KitStoreItem<entityType>;
    cells?: KitCellsInput<entityType>;
    defaults?: Partial<entityType>;
    classes?: DialogClasses;
    component?: new (...args: any[]) => SvelteComponent;
    props?: any;
    children?: any;
    noThrow?: boolean;
    wDelete?: boolean;
    topicPrefixText?: string;
};
type ResultClose<entityType = any> = {
    success: boolean;
    item?: entityType;
};
export type DialogType = 'custom' | 'confirm' | 'confirmDelete' | 'insert' | 'update' | 'view';
export type DialogMetaDataInternal<entityType = any> = DialogMetaData<entityType> & {
    id: number;
    type: DialogType;
    resolve: (result: ResultClose) => void;
};
export declare const dialog: {
    confirm: (topic: string, text: string, icon?: string) => Promise<ResultClose<any>>;
    confirmDelete: (topic: string) => Promise<ResultClose<any>>;
    form: <entityType>(type: 'insert' | 'update' | 'view', topic: string, repo: Repository<entityType>, cells: KitCellsInput<entityType>, options?: {
        defaults?: Partial<entityType>;
        classes?: DialogClasses;
        noThrow?: boolean;
        wDelete?: boolean;
        topicPrefixText?: string;
    }) => Promise<ResultClose<any>>;
    show: (dialog: DialogMetaData) => Promise<ResultClose<any>>;
    close: (id: number, result: ResultClose) => void;
    closeAll: () => void;
    subscribe: (this: void, run: import("svelte/store").Subscriber<DialogMetaDataInternal<any>[]>, invalidate?: import("svelte/store").Invalidator<DialogMetaDataInternal<any>[]> | undefined) => import("svelte/store").Unsubscriber;
};
export {};
