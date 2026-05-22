import { setPortalClassName, setPortalContainer, setShadowRootSelectors } from './portal';
import { setTranslationCategory, setTranslateFunction, type TranslateParams } from './translation';
import { setHostBridge, type PluginKitReactHostBridge } from './hostBridge';

type TranslateFunction = (category: string, message: string, params?: TranslateParams) => string;

export type PluginKitReactConfig = {
    portalClassName?: string;
    portalContainer?: HTMLElement | ShadowRoot | null;
    shadowRootSelectors?: string[];
    translationCategory?: string;
    translate?: TranslateFunction;
    hostBridge?: Partial<PluginKitReactHostBridge>;
};

export const configurePluginKitReact = (config: PluginKitReactConfig): void => {
    if (config.portalClassName) {
        setPortalClassName(config.portalClassName);
    }

    if (config.portalContainer) {
        setPortalContainer(config.portalContainer);
    }

    if (config.shadowRootSelectors) {
        setShadowRootSelectors(config.shadowRootSelectors);
    }

    if (config.translationCategory) {
        setTranslationCategory(config.translationCategory);
    }

    if (config.translate) {
        setTranslateFunction(config.translate);
    }

    if (config.hostBridge) {
        setHostBridge(config.hostBridge);
    }
};
