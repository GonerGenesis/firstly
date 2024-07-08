import { SvelteComponent } from "svelte";
import './LibIcon';
declare const __propDef: {
    props: {
        /**
           * directly <svg ... /> or d of <path ... />
           *
           * with \@mdi/js
           * ```js
           * import { mdiAccountTieWoman } from "@mdi/js";
           * <Icon data={mdiAccountTieWoman} style="background-color: blue;" size={"4rem"}></Icon>
           * ```
           *
           * with \@iconify-json/mdi && unplugin-icons with Icons({ compiler: "raw" })
           * ```js
           * import Woman from "virtual:icons/mdi/account-tie-woman";
           * <Icon data={mdiAccountTieWoman} style="background-color: blue;" size={"4rem"}></Icon>
           * ```
           */ data?: string | string[] | undefined;
        size?: string | number | undefined;
        caption?: string | undefined;
        /**
           * By default, svg are not rendered on the server side.
           * But the size will be respected to not have glitch on the client side when the icon is coming.
           * @default false
           */ ssr?: boolean | undefined;
        class?: string | string[] | undefined;
        style?: string | string[] | undefined;
    };
    events: {
        click: MouseEvent;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
    exports?: {} | undefined;
    bindings?: string | undefined;
};
export type IconProps = typeof __propDef.props;
export type IconEvents = typeof __propDef.events;
export type IconSlots = typeof __propDef.slots;
export default class Icon extends SvelteComponent<IconProps, IconEvents, IconSlots> {
}
export {};
