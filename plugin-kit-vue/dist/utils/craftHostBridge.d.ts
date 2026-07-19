import { HostElementSelectorOptions, HostRequestConfig, HostRequestMethod, PluginKitHostBridge } from '@verbb/plugin-kit-core';
type CraftApi = {
    sendActionRequest: <T = unknown>(method: HostRequestMethod, action: string, requestConfig?: HostRequestConfig) => Promise<T>;
    createElementSelectorModal: (elementType: string, options: HostElementSelectorOptions) => void;
    formatDate: (date: Date) => string;
    timepickerOptions?: Record<string, unknown>;
    locale?: string;
};
declare global {
    interface Window {
        Craft?: CraftApi;
    }
}
/** Wire package host utilities to `window.Craft` in the Craft control panel. */
export declare const createCraftHostBridge: () => Partial<PluginKitHostBridge>;
export {};
//# sourceMappingURL=craftHostBridge.d.ts.map