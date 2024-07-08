import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        dialogId: number;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
    exports?: {} | undefined;
    bindings?: string | undefined;
};
export type DialogMilestonesProps = typeof __propDef.props;
export type DialogMilestonesEvents = typeof __propDef.events;
export type DialogMilestonesSlots = typeof __propDef.slots;
export default class DialogMilestones extends SvelteComponent<DialogMilestonesProps, DialogMilestonesEvents, DialogMilestonesSlots> {
}
export {};
