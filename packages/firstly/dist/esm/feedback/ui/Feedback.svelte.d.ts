import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: Record<string, never>;
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
    exports?: {} | undefined;
    bindings?: string | undefined;
};
export type FeedbackProps = typeof __propDef.props;
export type FeedbackEvents = typeof __propDef.events;
export type FeedbackSlots = typeof __propDef.slots;
export default class Feedback extends SvelteComponent<FeedbackProps, FeedbackEvents, FeedbackSlots> {
}
export {};
