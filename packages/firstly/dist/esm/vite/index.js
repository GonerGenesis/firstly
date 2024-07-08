import { mergeConfig } from 'vite';
import { kitRoutes } from 'vite-plugin-kit-routes';
import { stripper } from 'vite-plugin-stripper';
// import { Log } from '@kitql/helpers'
const toRemove = ['oslo/password', 'oslo', '@kitql/internals', '$env/dynamic/private'];
export function firstly(options) {
    // const log = new Log('firstly')
    return [
        {
            name: 'vite-plugin-firstly',
            enforce: 'pre',
            config: async (a) => {
                return mergeConfig(a, {
                    build: {
                        // THE ERROR:
                        // RollupError: Unexpected character '�'
                        // This code (A) is to fix in `build` mode
                        rollupOptions: {
                            external: toRemove,
                        },
                    },
                    // This code (B) is to fix in `dev` mode
                    optimizeDeps: {
                        exclude: toRemove,
                    },
                });
            },
        },
        ...kitRoutes({
            ...(options?.kitRoutes ?? {}),
            ...{
                format_page_route_id: true,
                logs: {
                    ...options?.kitRoutes?.logs,
                    post_update_run: false,
                    update: false,
                },
            },
        }),
        ...stripper({
            decorators: ['BackendMethod'],
            hard: true,
            debug: options?.stripper?.debug ?? false,
            nullify: ['$env/static/private', '$env/dynamic/private'],
        }),
    ];
}
