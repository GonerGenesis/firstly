import { type Handle, type MaybePromise, type RequestEvent } from '@sveltejs/kit';
import { type ClassType } from 'remult';
import type { RemultServerOptions } from 'remult/server';
import { type MailOptions } from '../mail';
export type Module = {
    /**
     * The name of the module (usefull for logging and debugging purposes)
     */
    name: string;
    index?: number;
    entities?: ClassType<any>[];
    controllers?: ClassType<any>[];
    initApi?: RemultServerOptions<RequestEvent>['initApi'];
    initRequest?: RemultServerOptions<RequestEvent>['initRequest'];
    handlePreRemult?: Handle;
    handlePosRemult?: Handle;
    earlyReturn?: (input: Parameters<Handle>[0]) => MaybePromise<{
        early: false;
        resolve?: never;
    } | {
        early: true;
        resolve: ReturnType<Handle>;
    }>;
    modules?: Module[];
};
type Options = Omit<RemultServerOptions<RequestEvent<Partial<Record<string, string>>, string | null>> & {
    modules?: Module[] | undefined;
    mail?: MailOptions;
}, 'entities' | 'controllers' | 'initRequest' | 'initApi'>;
/**
 * it's basically `remultSveltekit` with the `modules` option
 */
export declare const firstly: (o: Options) => {
    modulesSorted: Module[];
    entities: ClassType<any>[];
    server: import("remult/remult-sveltekit").RemultSveltekitServer;
};
/**
 * Full flat and ordered list by index and concatenaining the modules name
 */
export declare const modulesFlatAndOrdered: (modules: Module[]) => Module[];
export {};
