import { SvelteComponent } from "svelte";
import './LibIcon';
declare const __propDef: {
    props: {
        label?: string;
        page: number;
        totalCount?: number | undefined | null;
        pageSize?: number;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
    exports?: {} | undefined;
    bindings?: string | undefined;
};
export type GridPaginateProps = typeof __propDef.props;
export type GridPaginateEvents = typeof __propDef.events;
export type GridPaginateSlots = typeof __propDef.slots;
export default class GridPaginate extends SvelteComponent<GridPaginateProps, GridPaginateEvents, GridPaginateSlots> {
}
export {};
