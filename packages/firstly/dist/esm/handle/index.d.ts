import type { Handle } from '@sveltejs/kit';
import type { RemultSveltekitServer } from 'remult/remult-sveltekit';
import type { Module } from '../api';
export declare const firstly: (api: {
    server: RemultSveltekitServer;
    modulesSorted: Module[];
}) => Handle;
