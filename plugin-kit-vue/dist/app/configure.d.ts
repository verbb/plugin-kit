import { PluginKitHostBridge } from '@verbb/plugin-kit-core';
import { PluginKitWebConfig } from '@verbb/plugin-kit-web/plugin-kit';
import { TranslateParams } from '@verbb/plugin-kit-forms';
export type TranslateFunction = (category: string, message: string, params?: TranslateParams) => string;
export type PluginKitVueConfig = PluginKitWebConfig & {
    /** Category passed to the translate function for engine/validation messages. */
    translationCategory?: string;
    /**
     * Custom translate implementation.
     * When omitted and `window.Craft.t` exists, Craft’s translator is used automatically.
     */
    translate?: TranslateFunction;
    /**
     * Partial merge into the global host bridge used by `hostRequest()` and related helpers.
     * Opt-in — only pass when the app calls Craft action/selector helpers.
     */
    hostBridge?: Partial<PluginKitHostBridge>;
};
/**
 * Configure the Vue facade stack. Translation is forwarded to the form engine;
 * portal/shadow settings are forwarded to the web-component layer.
 *
 * Prefer {@link PluginKitProvider} for app trees — call this directly only for
 * secondary mounts that need a different portal target.
 */
export declare const configure: (config: PluginKitVueConfig) => void;
/** Alias for `configure()`. */
export declare const configurePluginKitVue: (config: PluginKitVueConfig) => void;
//# sourceMappingURL=configure.d.ts.map