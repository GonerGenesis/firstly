import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        dialogId: number;
        milestoneId: string;
        issueNumber: number | null;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
    exports?: {} | undefined;
    bindings?: string | undefined;
};
export type DialogIssueProps = typeof __propDef.props;
export type DialogIssueEvents = typeof __propDef.events;
export type DialogIssueSlots = typeof __propDef.slots;
export default class DialogIssue extends SvelteComponent<DialogIssueProps, DialogIssueEvents, DialogIssueSlots> {
}
export {};
