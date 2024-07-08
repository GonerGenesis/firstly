import { type ErrorInfo, type FieldMetadata, type Repository } from 'remult';
import { type KitBaseItem } from './index.js';
export declare function isError<T>(object: any): object is ErrorInfo<T>;
export declare const getFirstInterestingField: <Entity>(repo: Repository<Entity>) => FieldMetadata<any, Entity>;
export declare const getEntityDisplayValue: <Entity>(repo: Repository<Entity>, row: Entity) => KitBaseItem;
export declare const getFieldLinkDisplayValue: (field: FieldMetadata, row: any) => KitBaseItem & {
    href: string;
};
export declare const getEntityDisplayValueFromField: (field: FieldMetadata, row: any) => KitBaseItem & {
    href: string;
};
export type MetaTypeRelation = {
    kind: 'relation';
    subKind: 'reference' | 'toOne' | 'toMany';
    repoTarget: Repository<any>;
    field: FieldMetadata;
};
type MetaTypeEnum = {
    kind: 'enum';
    subKind: 'single' | 'multi';
    values: KitBaseItem[];
    field: FieldMetadata;
};
type MetaTypePrimitive = {
    kind: 'primitive';
    subKind: string;
    field: FieldMetadata;
};
type MetaTypeSlot = {
    kind: 'slot';
    subKind: '???';
};
export type FieldMetaType = MetaTypeRelation | MetaTypeEnum | MetaTypePrimitive | MetaTypeSlot;
export declare const getFieldMetaType: (field?: FieldMetadata) => FieldMetaType;
export declare const displayWithDefaultAndSuffix: (field: FieldMetadata<any, any> | undefined, value: any) => string;
/**
 * same as `dbNamesOf` but with `tableName` set to `true` by default
 */
export declare const kitDbNamesOf: <Entity>(repo: import("remult/src/remult3/RepositoryImplementation.js").EntityMetadataOverloads<Entity>, wrapIdentifierOrOptions?: ((name: string) => string) | import("remult").dbNamesOfOptions | undefined) => Promise<import("remult").EntityDbNames<Entity>>;
export {};
