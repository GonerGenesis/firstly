import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        [x: string]: any;
        name?: string | null | undefined;
        id?: string | undefined;
        rows?: number | undefined;
        placeholder?: string | undefined;
        focus?: boolean | undefined;
        value?: string | undefined;
        readonly?: boolean | undefined;
        error?: false | undefined;
        align?: "left" | "right" | undefined;
    };
    events: {
        input: CustomEvent<any>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
    exports?: undefined;
    bindings?: undefined;
};
export type TextareaProps = typeof __propDef.props;
export type TextareaEvents = typeof __propDef.events;
export type TextareaSlots = typeof __propDef.slots;
export default class Textarea extends SvelteComponent<TextareaProps, TextareaEvents, TextareaSlots> {
    get error(): false;
}
export {};
