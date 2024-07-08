import { SvelteComponent } from "svelte";
import type { HTMLInputAttributes } from 'svelte/elements';
declare const __propDef: {
    props: {
        [x: string]: any;
        value?: HTMLInputAttributes['value'];
        focus?: boolean | undefined;
        withDedounce?: boolean | undefined;
        class?: string | undefined | null;
    };
    events: {
        blur: FocusEvent;
        change: Event;
        click: MouseEvent;
        focus: FocusEvent;
        keydown: KeyboardEvent;
        keypress: KeyboardEvent;
        mouseover: MouseEvent;
        mouseenter: MouseEvent;
        mouseleave: MouseEvent;
        paste: ClipboardEvent;
        input: CustomEvent<any>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
    exports?: undefined;
    bindings?: undefined;
};
export type InputProps = typeof __propDef.props;
export type InputEvents = typeof __propDef.events;
export type InputSlots = typeof __propDef.slots;
export default class Input extends SvelteComponent<InputProps, InputEvents, InputSlots> {
}
export {};
