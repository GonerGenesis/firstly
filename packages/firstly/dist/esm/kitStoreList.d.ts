import type { FindOptions, Repository } from 'remult';
type TheStoreList<T> = {
    items: T[];
    loading: boolean;
    totalCount: number | undefined;
};
export type FindOptionsPlus<T> = FindOptions<T> & {
    withCount?: boolean;
    withItems?: boolean;
};
/**
 * @param repo remult repository to listen to
 * @param initValues usually the data coming from SSR
 * @returns a store with the initial values and a listen() method to subscribe to changes
 *
 * Example
 * ```ts
 * // get the repo
 * const taskRepo = remult.repo(Task)
 *
 * const tasks = kitStore(taskRepo, data.tasks)
 * $: browser && tasks.listen(data.options)
 * ```
 */
export declare const kitStoreList: <T>(repo: Repository<T>, initValues?: TheStoreList<T>) => {
    subscribe: (this: void, run: import("svelte/store").Subscriber<TheStoreList<T>>, invalidate?: import("svelte/store").Invalidator<TheStoreList<T>> | undefined) => import("svelte/store").Unsubscriber;
    manualSet: (info: TheStoreList<T>) => void;
    fetch: (options?: FindOptionsPlus<T>, onNewData?: (items?: T[], totalCount?: number) => void) => Promise<void>;
    listen: (options?: FindOptionsPlus<T>) => Promise<void>;
    getRepo: () => Repository<T>;
};
export {};
