import type { ClassType } from 'remult';
import { Log } from '@kitql/helpers';
import { KitAuthUser } from './Entities';
/**
 * will merge the roles and remove duplicates
 * will return a new array & a status if the array was changed
 */
export declare const mergeRoles: (existing: string[], newOnes: string[] | undefined) => {
    roles: string[];
    changed: boolean;
};
export declare class RoleController {
    static initRoleFromEnv: (log: Log, userEntity: ClassType<KitAuthUser>, envKey: string, role: string) => Promise<void>;
}
