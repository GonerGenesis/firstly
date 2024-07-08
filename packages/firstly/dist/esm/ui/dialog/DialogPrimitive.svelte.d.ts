import { SvelteComponent } from "svelte";
import { type KitBaseItemLight } from '../../';
declare const __propDef: {
    props: {
        detail?: KitBaseItemLight | undefined;
        open?: boolean;
        classes?: {
            root?: string;
        };
    };
    events: {
        change: CustomEvent<any>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
        actions: {};
    };
    exports?: {} | undefined;
    bindings?: string | undefined;
};
export type DialogPrimitiveProps = typeof __propDef.props;
export type DialogPrimitiveEvents = typeof __propDef.events;
export type DialogPrimitiveSlots = typeof __propDef.slots;
export default class DialogPrimitive extends SvelteComponent<DialogPrimitiveProps, DialogPrimitiveEvents, DialogPrimitiveSlots> {
}
export {};
