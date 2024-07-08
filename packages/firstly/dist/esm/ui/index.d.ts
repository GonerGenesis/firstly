import type { FieldMetadata } from 'remult';
import type { KitCell } from '../';
export type Align = 'text-left' | 'text-center' | 'text-right';
export declare const align: (f?: FieldMetadata, isSlot?: boolean) => Align;
export declare const getAligns: (cells: KitCell<any>[], withAction: boolean) => Align[];
