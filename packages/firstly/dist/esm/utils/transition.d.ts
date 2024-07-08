import type { TransitionConfig } from 'svelte/transition';
type FlyAndScaleOptions = {
    y: number;
    start: number;
    duration?: number;
};
export declare const flyAndScale: (node: HTMLElement, options: FlyAndScaleOptions) => TransitionConfig;
export type StyleObject = Record<string, number | string | undefined>;
export {};
