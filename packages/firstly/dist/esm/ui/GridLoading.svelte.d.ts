import { SvelteComponent } from "svelte";
import type { Align } from './index.js';
declare const __propDef: {
    props: {
        columns: Align[];
        loadingRows?: number | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
    exports?: {} | undefined;
    bindings?: string | undefined;
};
export type GridLoadingProps = typeof __propDef.props;
export type GridLoadingEvents = typeof __propDef.events;
export type GridLoadingSlots = typeof __propDef.slots;
export default class GridLoading extends SvelteComponent<GridLoadingProps, GridLoadingEvents, GridLoadingSlots> {
}
export {};
