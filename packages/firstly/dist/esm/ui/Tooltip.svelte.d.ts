import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        text?: string | undefined;
        hideTooltip?: boolean | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
        tooltip: {};
    };
    exports?: {} | undefined;
    bindings?: string | undefined;
};
export type TooltipProps = typeof __propDef.props;
export type TooltipEvents = typeof __propDef.events;
export type TooltipSlots = typeof __propDef.slots;
export default class Tooltip extends SvelteComponent<TooltipProps, TooltipEvents, TooltipSlots> {
}
export {};
