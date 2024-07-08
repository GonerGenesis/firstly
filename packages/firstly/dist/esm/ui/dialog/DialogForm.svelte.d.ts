import { SvelteComponent } from "svelte";
import { type DialogMetaDataInternal } from './dialog';
declare const __propDef: {
    props: {
        toShow: DialogMetaDataInternal;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
    exports?: {} | undefined;
    bindings?: string | undefined;
};
export type DialogFormProps = typeof __propDef.props;
export type DialogFormEvents = typeof __propDef.events;
export type DialogFormSlots = typeof __propDef.slots;
export default class DialogForm extends SvelteComponent<DialogFormProps, DialogFormEvents, DialogFormSlots> {
}
export {};
