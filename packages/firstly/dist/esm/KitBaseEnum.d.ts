import { type IdFilter } from 'remult';
import type { ClassType, FindOptionsBase } from 'remult';
export type KitIcon = {
    data?: string | string[];
    size?: string | number;
    class?: string | string[];
    style?: string | string[];
    caption?: string;
};
export type KitBaseEnumOptions<Entity = any> = {
    caption?: string;
    icon?: KitIcon;
    where?: IdFilter<Entity> | FindOptionsBase<Entity>['where'];
    class?: string;
};
export declare class KitBaseEnum<Entity = any> {
    id: string;
    caption?: string;
    icon?: KitIcon;
    where?: IdFilter<Entity> | FindOptionsBase<Entity>['where'];
    class?: string;
    constructor(_id: string | number, options?: KitBaseEnumOptions<Entity>);
    getWhere: () => this | Entity[] | {
        $ne?: Entity | Entity[] | undefined;
        '!='?: Entity | Entity[] | undefined;
        $in?: Entity[] | undefined;
        $nin?: Entity[] | undefined;
    } | {
        $id: import("remult").ValueFilter<Entity extends {
            id?: number;
        } ? number : string>;
    } | import("remult").EntityFilter<Entity> | NonNullable<Entity>;
}
export declare const getEnum: <T extends KitBaseEnum>(baseEnum: ClassType<T>, id: string | undefined | null) => T | undefined;
export declare const getEnums: <T extends KitBaseEnum>(baseEnum: ClassType<T>) => T[];
