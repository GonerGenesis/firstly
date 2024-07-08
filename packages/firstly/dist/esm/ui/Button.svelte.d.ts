import { SvelteComponent } from "svelte";
import { KitBaseEnum } from '../';
declare const __propDef: {
    props: {
        [x: string]: any;
        isLoading?: boolean;
        class?: string | undefined | null;
        permission?: KitBaseEnum[] | KitBaseEnum | undefined;
    };
    events: {
        click: MouseEvent;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
        tooltip: {};
    };
    exports?: undefined;
    bindings?: undefined;
};
export type ButtonProps = typeof __propDef.props;
export type ButtonEvents = typeof __propDef.events;
export type ButtonSlots = typeof __propDef.slots;
export default class Button extends SvelteComponent<ButtonProps, ButtonEvents, ButtonSlots> {
}
export {};
