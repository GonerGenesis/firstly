import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        class?: string | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
    exports?: {} | undefined;
    bindings?: string | undefined;
};
export type LoadingProps = typeof __propDef.props;
export type LoadingEvents = typeof __propDef.events;
export type LoadingSlots = typeof __propDef.slots;
export default class Loading extends SvelteComponent<LoadingProps, LoadingEvents, LoadingSlots> {
}
export {};
