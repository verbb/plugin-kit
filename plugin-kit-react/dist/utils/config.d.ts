import { TranslateParams } from './translation';
import { PluginKitReactHostBridge } from './hostBridge';
type TranslateFunction = (category: string, message: string, params?: TranslateParams) => string;
export type PluginKitReactConfig = {
    portalClassName?: string;
    portalContainer?: HTMLElement | ShadowRoot | null;
    shadowRootSelectors?: string[];
    translationCategory?: string;
    translate?: TranslateFunction;
    hostBridge?: Partial<PluginKitReactHostBridge>;
};
export declare const configurePluginKitReact: (config: PluginKitReactConfig) => void;
export {};
//# sourceMappingURL=config.d.ts.map