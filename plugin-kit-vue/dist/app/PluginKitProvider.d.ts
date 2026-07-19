import { PropType, VNodeChild } from 'vue';
import { PluginKitHostBridge } from '@verbb/plugin-kit-core';
import { PortalContainer } from '@verbb/plugin-kit-web/plugin-kit';
import { PluginKitVueConfig, TranslateFunction } from './configure.js';
export type PluginKitProviderProps = PluginKitVueConfig & {
    /** Default slot — the app tree. */
    default?: () => VNodeChild;
};
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
export declare const PluginKitProvider: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    translationCategory: {
        type: StringConstructor;
        default: undefined;
    };
    translate: {
        type: PropType<TranslateFunction>;
        default: undefined;
    };
    hostBridge: {
        type: PropType<Partial<PluginKitHostBridge>>;
        default: undefined;
    };
    portalClassName: {
        type: StringConstructor;
        default: undefined;
    };
    portalContainer: {
        type: PropType<PortalContainer>;
        default: undefined;
    };
    shadowRootSelectors: {
        type: PropType<string[]>;
        default: undefined;
    };
}>, () => import('vue').VNode<import('vue').RendererNode, import('vue').RendererElement, {
    [key: string]: any;
}>[] | undefined, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    translationCategory: {
        type: StringConstructor;
        default: undefined;
    };
    translate: {
        type: PropType<TranslateFunction>;
        default: undefined;
    };
    hostBridge: {
        type: PropType<Partial<PluginKitHostBridge>>;
        default: undefined;
    };
    portalClassName: {
        type: StringConstructor;
        default: undefined;
    };
    portalContainer: {
        type: PropType<PortalContainer>;
        default: undefined;
    };
    shadowRootSelectors: {
        type: PropType<string[]>;
        default: undefined;
    };
}>> & Readonly<{}>, {
    translationCategory: string;
    translate: TranslateFunction;
    hostBridge: Partial<PluginKitHostBridge>;
    portalClassName: string;
    portalContainer: PortalContainer;
    shadowRootSelectors: string[];
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
/** Read the nearest {@link PluginKitProvider} config (empty object when absent). */
export declare const usePluginKitConfig: () => PluginKitVueConfig;
//# sourceMappingURL=PluginKitProvider.d.ts.map