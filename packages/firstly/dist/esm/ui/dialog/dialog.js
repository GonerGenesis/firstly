import { writable } from 'svelte/store';
import { LibIcon_Add, LibIcon_Delete, LibIcon_Edit, LibIcon_Search, } from '../../';
const createDialogManagement = () => {
    const { subscribe, update } = writable([]);
    // internal...
    const show = (dialog, type) => {
        let resolve;
        const promise = new Promise((res) => {
            resolve = res;
        });
        update((dialogs) => {
            return [...dialogs, { ...dialog, id: dialogs.length + 1, resolve, type }];
        });
        return promise;
    };
    return {
        confirm: (topic, text, icon) => {
            const detail = {
                detail: {
                    caption: 'Confirmez',
                    icon: { data: icon },
                },
                children: `
					<p>
						${topic}
						<br />
						${text}
					</p>
				`,
            };
            return show(detail, 'confirm');
        },
        confirmDelete: (topic) => {
            const detail = {
                detail: {
                    caption: 'Supprimer',
                    icon: { data: LibIcon_Delete },
                },
                children: topic
                    ? `<p>Confirmez vous la suppression de: <br />- <b>${topic}</b> ?</p>`
                    : 'Confirmer la suppression ?',
            };
            return show(detail, 'confirmDelete');
        },
        // FIXME JYC: refactor this (no need repo? options?)
        form: (type, topic, repo, cells, options) => {
            const topicPrefixText = options?.topicPrefixText
                ? options?.topicPrefixText + ' '
                : type === 'insert'
                    ? `Créer `
                    : type === 'update'
                        ? 'Modifier '
                        : 'Détail ';
            const detail = {
                detail: {
                    caption: (topicPrefixText + topic).trim(),
                    icon: {
                        data: type === 'insert' ? LibIcon_Add : type === 'update' ? LibIcon_Edit : LibIcon_Search,
                    },
                },
                repo,
                // store,
                cells,
                defaults: options?.defaults,
                classes: options?.classes,
                noThrow: options?.noThrow,
                wDelete: options?.wDelete,
                topicPrefixText,
            };
            return show(detail, type);
        },
        show: (dialog) => {
            return show(dialog, 'custom');
        },
        // next step, give a result typed!
        close: (id, result) => {
            update((dialogs) => {
                dialogs.forEach((dialog) => {
                    if (dialog.id === id) {
                        dialog.resolve(result);
                    }
                });
                return dialogs.filter((dialog) => dialog.id !== id);
            });
        },
        // usefull on navigation you want to close all popups
        closeAll: () => {
            update((dialogs) => {
                dialogs.forEach((dialog) => {
                    dialog.resolve({ success: false });
                });
                return [];
            });
        },
        subscribe,
    };
};
export const dialog = createDialogManagement();
