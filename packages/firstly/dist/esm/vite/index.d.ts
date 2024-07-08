import { type PluginOption } from 'vite';
import { type Options, type RouteMappings } from 'vite-plugin-kit-routes';
export declare function firstly<KIT_ROUTES extends RouteMappings>(options?: {
    stripper?: {
        debug?: boolean;
    };
    kitRoutes?: Options<KIT_ROUTES>;
}): PluginOption;
