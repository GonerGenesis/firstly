import {} from '@sveltejs/kit';
import nodemailer from 'nodemailer';
import { remult } from 'remult';
import { remultSveltekit } from 'remult/remult-sveltekit';
import { Log } from '@kitql/helpers';
import { building } from '$app/environment';
import { mailInit } from '../mail';
/**
 * it's basically `remultSveltekit` with the `modules` option
 */
export const firstly = (o) => {
    const modulesSorted = modulesFlatAndOrdered(o.modules ?? []);
    const entities = modulesSorted.flatMap((m) => m.entities ?? []);
    mailInit(nodemailer, o.mail);
    return {
        modulesSorted: modulesSorted,
        entities,
        server: remultSveltekit({
            // Changing the default default of remult
            logApiEndPoints: false,
            admin: true,
            defaultGetLimit: 25,
            error: o.error
                ? o.error
                : async (e) => {
                    // if 500 we move to 501 to avoid the default retry mechanism
                    if (e.httpStatusCode == 500) {
                        e.sendError(501, e.responseBody);
                    }
                },
            // Add user configuration
            ...o,
            // Module part
            entities,
            controllers: modulesSorted.flatMap((m) => m.controllers ?? []),
            initRequest: async (kitEvent, op) => {
                // usefull for later...
                remult.context.url = kitEvent.url;
                for (let i = 0; i < modulesSorted.length; i++) {
                    const f = modulesSorted[i].initRequest;
                    if (f) {
                        try {
                            await f(kitEvent, op);
                        }
                        catch (error) {
                            const log = new Log(`firstly | ${modulesSorted[i].name}`);
                            log.error(error);
                        }
                    }
                }
                remult.context.setHeaders = (headers) => {
                    kitEvent.setHeaders(headers);
                };
                remult.context.setCookie = (name, value, opts) => {
                    kitEvent.cookies.set(name, value, opts);
                };
                remult.context.deleteCookie = (name, opts) => {
                    kitEvent.cookies.delete(name, opts);
                };
            },
            initApi: async (r) => {
                if (!building) {
                    for (let i = 0; i < modulesSorted.length; i++) {
                        const f = modulesSorted[i].initApi;
                        if (f) {
                            try {
                                await f(r);
                            }
                            catch (error) {
                                const log = new Log(`firstly | ${modulesSorted[i].name}`);
                                log.error(error);
                            }
                        }
                    }
                }
            },
        }),
    };
};
/**
 * Full flat and ordered list by index and concatenaining the modules name
 */
export const modulesFlatAndOrdered = (modules) => {
    const flattenModules = (modules, parentName = '') => {
        return modules.reduce((acc, module) => {
            const fullName = parentName ? `${parentName}-${module.name}` : module.name;
            // Create a new module object without the 'modules' property
            const { modules: _, ...flatModule } = module;
            const newModule = { ...flatModule, name: fullName };
            const subModules = module.modules ? flattenModules(module.modules, fullName) : [];
            return [...acc, newModule, ...subModules];
        }, []);
    };
    const flatModules = flattenModules(modules);
    flatModules.sort((a, b) => (a.index || 0) - (b.index || 0));
    return flatModules;
};
