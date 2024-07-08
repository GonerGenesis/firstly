import { SvelteComponent } from "svelte";
import type { KitBaseItem } from '../../../';
declare const __propDef: {
    props: {
        id: string;
        disabled?: boolean;
        placeholder?: string;
        items?: KitBaseItem[];
        value?: string | number | undefined;
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
export type SelectRadioProps = typeof __propDef.props;
export type SelectRadioEvents = typeof __propDef.events;
export type SelectRadioSlots = typeof __propDef.slots;
export default class SelectRadio extends SvelteComponent<SelectRadioProps, SelectRadioEvents, SelectRadioSlots> {
}
export {};
