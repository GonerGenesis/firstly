import { SvelteComponent } from "svelte";
import { type KitBaseItem } from '../../../';
declare const __propDef: {
    props: {
        id: string;
        disabled?: boolean | undefined;
        placeholder?: string | undefined;
        items?: KitBaseItem[] | undefined;
        focus?: boolean | undefined;
        loadOptions?: ((str: string) => Promise<{
            items: KitBaseItem[];
            totalCount: number;
        }>) | undefined;
        value?: string | undefined;
        clearable?: boolean | undefined;
        createOptionWhenNoResult?: boolean | undefined;
        default_select_if_one_item?: boolean | undefined;
    };
    events: {
        selected: CustomEvent<any>;
        issue: CustomEvent<any>;
        createRequest: CustomEvent<any>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
    exports?: {} | undefined;
    bindings?: string | undefined;
};
export type SelectMeltProps = typeof __propDef.props;
export type SelectMeltEvents = typeof __propDef.events;
export type SelectMeltSlots = typeof __propDef.slots;
export default class SelectMelt extends SvelteComponent<SelectMeltProps, SelectMeltEvents, SelectMeltSlots> {
}
export {};
