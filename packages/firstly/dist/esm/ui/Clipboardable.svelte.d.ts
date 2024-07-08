import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        /**
           * @param value to set in the clipboard if not null.
           *
           * Don't put this on an input, if not, when a user will select the input via the mouse, this clipboard will be copied (usually you wanted to paste)!
           */ value: string | null;
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
export type ClipboardableProps = typeof __propDef.props;
export type ClipboardableEvents = typeof __propDef.events;
export type ClipboardableSlots = typeof __propDef.slots;
export default class Clipboardable extends SvelteComponent<ClipboardableProps, ClipboardableEvents, ClipboardableSlots> {
}
export {};
