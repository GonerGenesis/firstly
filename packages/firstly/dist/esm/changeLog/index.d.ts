import { type FieldRef, type FieldsRef, type LifecycleEvent } from 'remult';
import type { Module } from '../api';
export declare class WithChangeLogs {
}
/**
 * in an entity, add these 2 functions:
 * ```ts
 *
 * \@Entity<Task>('tasks', {
 *   saved: async (entity, e) => {
 *     await recordSaved(entity, e)
 *   },
 *   deleted: async (entity, e) => {
 *     await recordDeleted(entity, e)
 *   },
 * })
 *
 * ```
 */
export declare const changeLog: () => Module;
export declare class ChangeLog {
    id: string;
    entity: string;
    entityId: string;
    changeDate: Date;
    userId: string;
    changes: change[];
    newRow: boolean;
    deleted: boolean;
}
export interface changeEvent {
    date: Date;
    userId: string;
    changes: change[];
}
export interface change {
    key: string;
    oldValue: string;
    newValue: string;
}
export declare function recordSaved<entityType>(entity: entityType, e: LifecycleEvent<entityType>, options?: ColumnDeciderArgs<entityType>): Promise<void>;
export declare function recordDeleted<entityType>(entity: entityType, e: LifecycleEvent<entityType>, options?: ColumnDeciderArgs<entityType>): Promise<void>;
interface ColumnDeciderArgs<entityType> {
    excludeColumns?: (e: FieldsRef<entityType>) => FieldRef<entityType, any>[];
    excludeValues?: (e: FieldsRef<entityType>) => FieldRef<entityType, any>[];
    forceDate?: Date;
    forceNew?: boolean;
}
export declare class FieldDecider<entityType> {
    fields: FieldRef<entityType>[];
    excludedFields: FieldRef<entityType>[];
    excludedValues: FieldRef<entityType>[];
    constructor(entity: entityType, options?: ColumnDeciderArgs<entityType>);
}
export {};
