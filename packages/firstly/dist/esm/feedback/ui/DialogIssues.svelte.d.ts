import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        dialogId: number;
        milestoneNumber: number;
        milestoneId: string;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
    exports?: {} | undefined;
    bindings?: string | undefined;
};
export type DialogIssuesProps = typeof __propDef.props;
export type DialogIssuesEvents = typeof __propDef.events;
export type DialogIssuesSlots = typeof __propDef.slots;
export default class DialogIssues extends SvelteComponent<DialogIssuesProps, DialogIssuesEvents, DialogIssuesSlots> {
}
export {};
