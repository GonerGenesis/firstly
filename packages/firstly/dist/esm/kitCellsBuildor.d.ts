import type { SvelteComponent } from 'svelte';
import { type EntityFilter, type FieldMetadata, type Repository } from 'remult';
import type { UnArray } from './utils/types.js';
export type VisibilityMode = 'view' | 'edit' | 'hide';
type KitCellInternal<Entity> = {
    col?: keyof Entity;
    kind?: 'field' | 'field_link' | 'entity_link' | 'slot' | 'header' | 'component';
    class?: string;
    header?: string;
    headerSlot?: boolean;
    modeEdit?: VisibilityMode;
    modeView?: VisibilityMode;
    clipboardable?: boolean;
    clearable?: boolean;
    component?: new (...args: any[]) => SvelteComponent;
    props?: any;
    rowToProps?: (row: any) => any;
};
export type KitCell<Entity> = KitCellInternal<Entity> & {
    field?: FieldMetadata<any, Entity>;
};
export type KitCellsInput<Entity> = (keyof Entity | KitCellInternal<Entity>)[];
/**
 * kitCellsBuildor is a function to build cells for a <Grid /> or <FieldGroup /> component.
 *
 * ```html
 * <script lang="ts">
 *   import { repo } from 'remult'
 *
 *   const cells = kitCellsBuildor(repo(Site), ['name', 'description'])
 *   const store = kitStoreList( repo(Site) )
 *   $: store.fetch()
 * </script>
 *
 * <Grid {cells} {store} />
 * ```
 *
 */
export declare function kitCellsBuildor<Entity>(repo: Repository<Entity>, inputBuildor: KitCellsInput<Entity>): KitCell<Entity>[];
export declare function kitCellBuildor<Entity>(repo: Repository<Entity>, inputBuildor: UnArray<KitCellsInput<Entity>>): KitCell<Entity>;
export declare const fieldsOf: <Entity>(b: KitCell<Entity>[]) => FieldMetadata<any, Entity>[];
export declare const getPlaceholder: <Entity>(fields: FieldMetadata<any, Entity>[]) => string;
export declare const buildSearchWhere: <Entity>(fields: FieldMetadata<any, Entity>[], search?: string | null) => EntityFilter<Entity>[];
export declare const buildWhere: <Entity>(defaultWhere: EntityFilter<Entity> | undefined, fields_filter: FieldMetadata<any, Entity>[], fields_search: FieldMetadata<any, Entity>[], obj: Record<string, string>) => EntityFilter<Entity>;
export {};
