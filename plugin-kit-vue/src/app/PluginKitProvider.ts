import { defineComponent, inject, provide, type InjectionKey, type PropType, type VNodeChild } from 'vue';
import type { PluginKitHostBridge } from '@verbb/plugin-kit-core';
import type { PortalContainer } from '@verbb/plugin-kit-web/plugin-kit';

import { configure, type PluginKitVueConfig, type TranslateFunction } from './configure.js';

export type PluginKitProviderProps = PluginKitVueConfig & {
    /** Default slot — the app tree. */
    default?: () => VNodeChild;
};

const PluginKitConfigKey: InjectionKey<PluginKitVueConfig> = Symbol('pluginKitConfig');

/**
 * Applies Plugin Kit environment config for a Vue tree.
 *
 * Importing Vue components already registers their underlying custom elements —
 * no `registerAll` / registration bootstrap. Pass `hostBridge` only when the tree
 * calls Craft action/selector helpers.
 *
 * @example
 * ```ts
 * import { createApp, h } from 'vue';
 * import { PluginKitProvider, Button } from '@verbb/plugin-kit-vue';
 *
 * createApp({
 *   setup() {
 *     return () => h(PluginKitProvider, { translationCategory: 'my-plugin' }, {
 *       default: () => h(Button, null, () => 'Save'),
 *     });
 *   },
 * }).mount(el);
 * ```
 */
export const PluginKitProvider = defineComponent({
    name: 'PluginKitProvider',
    props: {
        translationCategory: { type: String, default: undefined },
        translate: { type: Function as PropType<TranslateFunction>, default: undefined },
        hostBridge: { type: Object as PropType<Partial<PluginKitHostBridge>>, default: undefined },
        portalClassName: { type: String, default: undefined },
        portalContainer: {
            type: Object as PropType<PortalContainer>,
            default: undefined,
        },
        shadowRootSelectors: { type: Array as PropType<string[]>, default: undefined },
    },
    setup(props, { slots }) {
        // Sync apply before children render overlays — same timing as the old createVueApp path.
        const config: PluginKitVueConfig = {
            ...(props.translationCategory ? { translationCategory: props.translationCategory } : {}),
            ...(props.translate ? { translate: props.translate } : {}),
            ...(props.hostBridge ? { hostBridge: props.hostBridge } : {}),
            ...(props.portalClassName ? { portalClassName: props.portalClassName } : {}),
            ...(props.portalContainer !== undefined ? { portalContainer: props.portalContainer } : {}),
            ...(props.shadowRootSelectors ? { shadowRootSelectors: props.shadowRootSelectors } : {}),
        };

        configure(config);
        provide(PluginKitConfigKey, config);

        return () => slots.default?.();
    },
});

/** Read the nearest {@link PluginKitProvider} config (empty object when absent). */
export const usePluginKitConfig = (): PluginKitVueConfig => {
    return inject(PluginKitConfigKey, {});
};
