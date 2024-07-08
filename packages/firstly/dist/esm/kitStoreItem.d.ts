import type { ErrorInfo, FindOptions, Repository } from 'remult';
type TheStoreItem<T> = {
    item: T | undefined;
    loading?: boolean;
    errors: ErrorInfo<T> | undefined;
    globalError?: string | undefined;
};
export declare const kitStoreItem: <T>(repo: Repository<T>, initValues?: TheStoreItem<T>) => {
    subscribe: (this: void, run: import("svelte/store").Subscriber<TheStoreItem<T>>, invalidate?: import("svelte/store").Invalidator<TheStoreItem<T>> | undefined) => import("svelte/store").Unsubscriber;
    create: (item: Partial<T>) => void;
    set: (newItem: TheStoreItem<T>) => void;
    /**
     * if you have keys, build the id with
     * ```ts
     * const id = repo.metadata.idMetadata.getId({a:1,b:2})
     * store.fetch(id)
     * ```
     */
    fetch: (id: Parameters<Repository<T>["findId"]>[0], options?: FindOptions<T>, onNewData?: (item: T) => void) => Promise<void>;
    /**
     * `.save()` will `update` or `insert` the current item.
     */
    save: () => Promise<T | undefined>;
    delete: () => Promise<void>;
    onChange: (prop: keyof T, callback: (newValue: any, oldValue: any) => void) => void;
};
export {};
