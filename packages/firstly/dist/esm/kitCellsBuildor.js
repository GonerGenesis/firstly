import {} from 'remult';
import { getRelationFieldInfo } from 'remult/internals';
import { getEnum, KitBaseEnum } from './KitBaseEnum.js';
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
export function kitCellsBuildor(repo, inputBuildor) {
    const buildor = [];
    for (let i = 0; i < inputBuildor.length; i++) {
        const item = inputBuildor[i];
        let b;
        if (item instanceof Object) {
            b = { ...item, field: repo.fields[item.col] };
        }
        else {
            b = { col: item, field: repo.fields[item] };
        }
        // Let's tweak defaults...
        if (b.kind === undefined) {
            if (b.field?.options.href) {
                b.kind = 'field_link';
            }
        }
        buildor.push(b);
    }
    return buildor;
}
export function kitCellBuildor(repo, inputBuildor) {
    return kitCellsBuildor(repo, [inputBuildor])[0];
}
export const fieldsOf = (b) => {
    return b.filter((c) => c.field).map((c) => c.field) ?? [];
};
export const getPlaceholder = (fields) => {
    return fields.map((c) => c.caption).join(', ');
};
export const buildSearchWhere = (fields, search) => {
    if (!search) {
        return [];
    }
    const f = [
        {
            $or: fields.map((f) => {
                if (f.inputType === 'number') {
                    return { [f.key]: search };
                }
                const sSplitted = search.split(' ');
                return {
                    $and: sSplitted.map((s) => ({ [f.key]: { $contains: s } })),
                };
            }),
        },
    ];
    return f;
};
export const buildWhere = (defaultWhere, fields_filter, fields_search, obj) => {
    const and = [];
    if (defaultWhere) {
        and.push(defaultWhere);
    }
    if (obj.search) {
        and.push(...buildSearchWhere(fields_search, obj.search));
    }
    for (const field of fields_filter) {
        const rfi = getRelationFieldInfo(field);
        // if there is a value
        if (obj[field.key]) {
            if (field.inputType === 'checkbox') {
                // @ts-ignore
                and.push({ [field.key]: obj[field.key] });
            }
            else if (field.inputType === 'selectEnum') {
                // @ts-ignore
                const theEnum = getEnum(field, obj[field.key]);
                // Take the where of the enum if it exists, or it's using this selection as a filter
                // @ts-ignore
                const wheretoUse = theEnum?.where ?? new KitBaseEnum(obj[field.key]);
                // @ts-ignore
                and.push({ [field.key]: wheretoUse });
            }
            else if (rfi.type === 'toOne') {
                // @ts-ignore (stting the id of the relation)
                and.push({ [field.key]: obj[field.key] });
            }
            else {
                console.info(`Not handled filter field ${field.key} ${field.inputType}`);
            }
        }
    }
    // @ts-ignore
    return { $and: and };
};
