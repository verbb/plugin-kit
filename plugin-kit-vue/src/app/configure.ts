import { setHostBridge, type PluginKitHostBridge } from '@verbb/plugin-kit-core';
import {
    configurePluginKitWeb,
    setPortalClassName,
    setPortalContainer,
    type PluginKitWebConfig,
} from '@verbb/plugin-kit-web/plugin-kit';
import { setTranslateFunction, setTranslationCategory, type TranslateParams } from '@verbb/plugin-kit-forms';

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

type CraftTranslateHost = {
    t?: TranslateFunction;
};

const resolveCraftTranslate = (): TranslateFunction | undefined => {
    const craft = (globalThis as typeof globalThis & { Craft?: CraftTranslateHost }).Craft;

    if (typeof craft?.t === 'function') {
        return (category, message, params) => craft.t!(category, message, params);
    }

    return undefined;
};

/**
 * Configure the Vue facade stack. Translation is forwarded to the form engine;
 * portal/shadow settings are forwarded to the web-component layer.
 *
 * Prefer {@link PluginKitProvider} for app trees — call this directly only for
 * secondary mounts that need a different portal target.
 */
export const configure = (config: PluginKitVueConfig): void => {
    const {
        translationCategory,
        translate,
        hostBridge,
        portalClassName,
        portalContainer,
        shadowRootSelectors,
    } = config;

    if (translationCategory) {
        setTranslationCategory(translationCategory);
    }

    const resolvedTranslate = translate ?? resolveCraftTranslate();

    if (resolvedTranslate) {
        setTranslateFunction(resolvedTranslate);
    }

    if (hostBridge) {
        setHostBridge(hostBridge);
    }

    if (portalClassName) {
        setPortalClassName(portalClassName);
    }

    if (portalContainer !== undefined) {
        setPortalContainer(portalContainer);
    }

    const webConfig: PluginKitWebConfig = {
        ...(portalContainer !== undefined ? { portalContainer } : {}),
        ...(shadowRootSelectors !== undefined ? { shadowRootSelectors } : {}),
    };

    if (webConfig.portalContainer !== undefined || webConfig.shadowRootSelectors !== undefined) {
        configurePluginKitWeb(webConfig);
    }
};

/** Alias for `configure()`. */
export const configurePluginKitVue = configure;
