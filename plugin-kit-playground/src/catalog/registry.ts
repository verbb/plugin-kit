import { componentRegistry } from './data/component-registry.js';
import { REACT_ADAPTER_IDS, VUE_ADAPTER_IDS, WEB_PREVIEW_IDS } from './coverage.js';

export type WebComponentImplementation = 'wc' | 'bridge' | 'planned';

export type WebComponentRegistryEntry = {
    id: string;
    title: string;
    implementation: WebComponentImplementation;
    web: boolean;
    react: boolean;
    vue: boolean;
    description: string;
};

const WC_IMPLEMENTED = WEB_PREVIEW_IDS;

export const webComponentRegistry: WebComponentRegistryEntry[] = componentRegistry.map((entry) => {
    const wc = WC_IMPLEMENTED.has(entry.id);
    const bridged = entry.vanilla && !wc;

    return {
        id: entry.id,
        title: entry.title,
        implementation: wc ? 'wc' : bridged ? 'bridge' : 'planned',
        web: entry.vanilla,
        react: REACT_ADAPTER_IDS.has(entry.id),
        vue: VUE_ADAPTER_IDS.has(entry.id),
        description: entry.description,
    };
});

export const getWebRegistryEntry = (id: string): WebComponentRegistryEntry | undefined => {
    return webComponentRegistry.find((entry) => entry.id === id);
};

export const isWebComponentImplemented = (id: string): boolean => {
    return WC_IMPLEMENTED.has(id);
};
