import { getValueList } from 'remult';
export class KitBaseEnum {
    id;
    caption;
    icon;
    where;
    class;
    constructor(_id, options) {
        this.id = _id.toString();
        this.caption = options?.caption ?? this.id;
        this.icon = options?.icon;
        this.where = options?.where;
        this.class = options?.class;
        if (options?.icon && options.icon.caption === undefined) {
            options.icon.caption = options?.caption;
        }
    }
    getWhere = () => {
        return this.where ? this.where : this;
    };
}
export const getEnum = (baseEnum, id) => {
    if (!id) {
        return undefined;
    }
    // @ts-ignore
    const found = getValueList(baseEnum).find((c) => c.id === id);
    return found;
};
export const getEnums = (baseEnum) => {
    return getValueList(baseEnum) || [];
};
