var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { BackendMethod, repo } from 'remult';
import { cyan, green, Log, yellow } from '@kitql/helpers';
import { KitAuthUser } from './Entities';
/**
 * will merge the roles and remove duplicates
 * will return a new array & a status if the array was changed
 */
export const mergeRoles = (existing, newOnes) => {
    const result = new Set(existing);
    let changed = false;
    for (const role of newOnes ?? []) {
        if (!result.has(role)) {
            result.add(role);
            changed = true;
        }
    }
    return { roles: Array.from(result), changed };
};
export class RoleController {
    // @ts-ignore (for pnpm check)
    static initRoleFromEnv = async (log, userEntity, envKey, role) => {
        // @ts-ignore (for pnpm check)
        const { env } = await import('$env/dynamic/private');
        const names = env[envKey] === undefined ? [] : (env[envKey] ?? '').split(',');
        for (let i = 0; i < names.length; i++) {
            const name = names[i].trim();
            if (name !== '') {
                let user = await repo(userEntity).findFirst({ name });
                if (!user) {
                    user = repo(userEntity).create({ name, roles: [role] });
                    await repo(userEntity).save(user);
                }
                else {
                    if (!user.roles.includes(role)) {
                        user.roles.push(role);
                        await repo(userEntity).save(user);
                    }
                }
            }
        }
        if (names.length > 0) {
            log.info(`${cyan(role)}: ${names.map((c) => green(c.trim())).join(', ')} added via ${yellow(envKey)}.`);
        }
        else {
            log.info(`${cyan(role)}: No users added via ${yellow(envKey)}.`);
        }
    };
}
__decorate([
    BackendMethod({ allowed: false })
], RoleController, "initRoleFromEnv", void 0);
