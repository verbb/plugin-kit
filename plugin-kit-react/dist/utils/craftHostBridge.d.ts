import { HostElementSelectorOptions, HostRequestConfig, HostRequestMethod, PluginKitReactHostBridge } from './hostBridge';
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
export declare const createCraftHostBridge: () => Partial<PluginKitReactHostBridge>;
export {};
//# sourceMappingURL=craftHostBridge.d.ts.map