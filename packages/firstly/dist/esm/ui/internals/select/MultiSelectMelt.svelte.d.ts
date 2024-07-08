import { SvelteComponent } from "svelte";
import { type KitBaseItem } from '../../..';
declare const __propDef: {
    props: {
        id: string;
        disabled?: boolean | undefined;
        placeholder?: string | undefined;
        items?: KitBaseItem[] | undefined;
        loadOptions?: ((str: string) => Promise<{
            items: KitBaseItem[];
            totalCount: number;
        }>) | undefined;
        values?: string[] | undefined;
        clearable?: boolean | undefined;
    };
    events: {
        selected: CustomEvent<any>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
    exports?: {} | undefined;
    bindings?: string | undefined;
};
export type MultiSelectMeltProps = typeof __propDef.props;
export type MultiSelectMeltEvents = typeof __propDef.events;
export type MultiSelectMeltSlots = typeof __propDef.slots;
export default class MultiSelectMelt extends SvelteComponent<MultiSelectMeltProps, MultiSelectMeltEvents, MultiSelectMeltSlots> {
}
export {};
