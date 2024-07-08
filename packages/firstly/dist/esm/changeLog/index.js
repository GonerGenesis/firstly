var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Entity, Fields, getEntityRef, IdEntity, isBackend, remult, } from 'remult';
let WithChangeLogs = class WithChangeLogs {
};
WithChangeLogs = __decorate([
    Entity('change_logs', {
        saved: async (entity, e) => {
            await recordSaved(entity, e);
        },
        deleted: async (entity, e) => {
            await recordDeleted(entity, e);
        },
    })
], WithChangeLogs);
export { WithChangeLogs };
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
export const changeLog = () => {
    return {
        name: 'changeLog',
        entities: [ChangeLog],
    };
};
let ChangeLog = class ChangeLog {
    id = '';
    entity = '';
    entityId = '';
    changeDate = new Date();
    userId = '';
    changes = [];
    newRow = false;
    deleted = false;
};
__decorate([
    Fields.cuid()
], ChangeLog.prototype, "id", void 0);
__decorate([
    Fields.string()
], ChangeLog.prototype, "entity", void 0);
__decorate([
    Fields.string()
], ChangeLog.prototype, "entityId", void 0);
__decorate([
    Fields.date()
], ChangeLog.prototype, "changeDate", void 0);
__decorate([
    Fields.string()
], ChangeLog.prototype, "userId", void 0);
__decorate([
    Fields.json({ dbName: 'changesJson' })
], ChangeLog.prototype, "changes", void 0);
__decorate([
    Fields.boolean()
], ChangeLog.prototype, "newRow", void 0);
__decorate([
    Fields.boolean()
], ChangeLog.prototype, "deleted", void 0);
ChangeLog = __decorate([
    Entity('change_logs', {
        caption: 'Change Logs',
        allowApiCrud: false,
        defaultOrderBy: {
            changeDate: 'desc',
        },
    })
], ChangeLog);
export { ChangeLog };
export async function recordSaved(entity, e, options) {
    if (isBackend()) {
        const changes = [];
        const decider = new FieldDecider(entity, options);
        const isNew = options?.forceNew || e.isNew;
        const changeDate = options?.forceDate || new Date();
        for (const c of decider.fields.filter((c) => c.valueChanged() || (isNew && c.value))) {
            try {
                const noVal = decider.excludedValues.includes(c);
                changes.push({
                    key: c.metadata.key,
                    newValue: noVal
                        ? '***'
                        : c.value instanceof IdEntity
                            ? c.value.id
                            : c.metadata.options.valueConverter.toJson(c.value),
                    oldValue: e.isNew
                        ? '---'
                        : noVal
                            ? '***'
                            : c.originalValue instanceof IdEntity
                                ? c.originalValue.id
                                : c.metadata.options.valueConverter.toJson(c.originalValue),
                });
            }
            catch (err) {
                console.error(c);
                throw err;
            }
        }
        if (changes.length > 0) {
            await remult.repo(ChangeLog).insert({
                changeDate,
                changes,
                entity: e.metadata.key,
                entityId: e.metadata.idMetadata.getId(entity),
                userId: remult.user?.id || '',
                newRow: isNew,
            });
        }
    }
}
export async function recordDeleted(entity, e, options) {
    const changes = [];
    const decider = new FieldDecider(entity, options);
    const changeDate = options?.forceDate || new Date();
    for (const c of decider.fields) {
        try {
            const noVal = decider.excludedValues.includes(c);
            changes.push({
                key: c.metadata.key,
                newValue: noVal ? '***' : '---',
                oldValue: noVal
                    ? '***'
                    : c.originalValue instanceof IdEntity
                        ? c.originalValue.id
                        : c.metadata.options.valueConverter.toJson(c.originalValue),
            });
        }
        catch (err) {
            console.error(c);
            throw err;
        }
    }
    await remult.repo(ChangeLog).insert({
        changeDate,
        changes,
        entity: e.metadata.key,
        entityId: e.metadata.idMetadata.getId(entity),
        userId: remult.user?.id || '',
        deleted: true,
    });
}
export class FieldDecider {
    fields;
    excludedFields;
    excludedValues;
    constructor(entity, options) {
        const meta = getEntityRef(entity);
        if (!options?.excludeColumns)
            this.excludedFields = [];
        // @ts-ignore
        else
            this.excludedFields = options.excludeColumns(meta.fields);
        if (!options?.excludeValues)
            this.excludedValues = [];
        // @ts-ignore
        else
            this.excludedValues = options.excludeValues(meta.fields);
        this.excludedFields.push(...meta.fields.toArray().filter((c) => c.metadata.options.serverExpression));
        this.excludedFields.push(...meta.fields.toArray().filter((c) => c.metadata.options.sqlExpression));
        this.fields = meta.fields.toArray().filter((f) => !this.excludedFields.includes(f));
    }
}
