import { SvelteComponent } from "svelte";
import { type KitBaseItemLight } from '../..';
declare const __propDef: {
    props: {
        item: KitBaseItemLight | undefined;
        noIcon?: boolean;
        captionSubStyle?: "under" | "inline" | "none";
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
    exports?: {} | undefined;
    bindings?: string | undefined;
};
export type LinkPlusProps = typeof __propDef.props;
export type LinkPlusEvents = typeof __propDef.events;
export type LinkPlusSlots = typeof __propDef.slots;
export default class LinkPlus extends SvelteComponent<LinkPlusProps, LinkPlusEvents, LinkPlusSlots> {
}
export {};
