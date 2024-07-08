export declare const dateISOToPlainDate: (iso: string) => string;
export declare const offsetedToPlainDate: (dt: Date) => string;
export type KitPlainDateRange = {
    from: string;
    to: string;
};
/**
 * in `range`, `from` is inclusive and `to` is exclusive
 */
export declare const isBetween: (dt: string, range: KitPlainDateRange) => boolean;
export declare const plainDateCompare: (dt: string, op: {
    $gt?: string;
    /** From */
    $gte?: string;
    /** to */
    $lt?: string;
    $lte?: string;
}) => boolean;
