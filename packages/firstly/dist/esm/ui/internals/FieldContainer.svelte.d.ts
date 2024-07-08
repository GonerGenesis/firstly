import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        label?: string;
        forId: string;
        required?: boolean;
        error?: string;
        /**
           * example usage for paginate
           * classes={{ label: 'justify-end' }}
           */ classes?: {
            label?: string;
            slot?: string;
        };
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
export type FieldContainerProps = typeof __propDef.props;
export type FieldContainerEvents = typeof __propDef.events;
export type FieldContainerSlots = typeof __propDef.slots;
export default class FieldContainer extends SvelteComponent<FieldContainerProps, FieldContainerEvents, FieldContainerSlots> {
}
export {};
