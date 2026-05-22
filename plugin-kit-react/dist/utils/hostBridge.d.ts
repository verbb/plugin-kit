export type HostRequestMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
export type HostRequestConfig = {
    data?: Record<string, unknown>;
    [key: string]: unknown;
};
export type HostSelectedElement = {
    id?: number;
    siteId?: number;
    label?: string;
    url?: string;
    [key: string]: unknown;
};
export type HostElementSelectorOptions = {
    storageKey: string;
    sources?: string[];
    criteria?: Record<string, unknown>;
    multiSelect?: boolean;
    limit?: number | null;
    defaultSiteId?: number;
    autoFocusSearchBox?: boolean;
    showSiteMenu?: boolean;
    onShow?: () => void;
    onSelect: (elements: HostSelectedElement[]) => void;
    closeOtherModals?: boolean;
};
export type PluginKitReactHostBridge = {
    request: <T = unknown>(method: HostRequestMethod, action: string, config?: HostRequestConfig) => Promise<T>;
    openElementSelector: (elementType: string, options: HostElementSelectorOptions) => void;
    formatDate: (date: Date) => string;
    getTimepickerOptions: () => Record<string, unknown>;
    getLocale: () => string;
};
export declare const setHostBridge: (bridge?: Partial<PluginKitReactHostBridge>) => void;
export declare const getHostBridge: () => Partial<PluginKitReactHostBridge>;
export declare const hostRequest: <T = unknown>(method: HostRequestMethod, action: string, config?: HostRequestConfig) => Promise<T>;
export declare const hostOpenElementSelector: (elementType: string, options: HostElementSelectorOptions) => void;
export declare const hostFormatDate: (date: Date) => string;
export declare const hostGetTimepickerOptions: () => Record<string, unknown>;
export declare const hostGetLocale: () => string;
//# sourceMappingURL=hostBridge.d.ts.map