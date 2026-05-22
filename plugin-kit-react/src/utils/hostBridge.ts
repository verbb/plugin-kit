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

let hostBridge: Partial<PluginKitReactHostBridge> = {};

export const setHostBridge = (bridge: Partial<PluginKitReactHostBridge> = {}): void => {
    hostBridge = {
        ...hostBridge,
        ...bridge,
    };
};

export const getHostBridge = (): Partial<PluginKitReactHostBridge> => {
    return hostBridge;
};

const requireHostBridgeMethod = <K extends keyof PluginKitReactHostBridge>(methodName: K): NonNullable<PluginKitReactHostBridge[K]> => {
    const method = hostBridge[methodName];

    if (!method) {
        throw new Error(`Plugin Kit React host bridge method "${String(methodName)}" is required but was not configured.`);
    }

    return method as NonNullable<PluginKitReactHostBridge[K]>;
};

export const hostRequest = async<T = unknown>(method: HostRequestMethod, action: string, config?: HostRequestConfig): Promise<T> => {
    const request = requireHostBridgeMethod('request');
    return request(method, action, config);
};

export const hostOpenElementSelector = (elementType: string, options: HostElementSelectorOptions): void => {
    const openElementSelector = requireHostBridgeMethod('openElementSelector');
    openElementSelector(elementType, options);
};

export const hostFormatDate = (date: Date): string => {
    const formatDate = requireHostBridgeMethod('formatDate');
    return formatDate(date);
};

export const hostGetTimepickerOptions = (): Record<string, unknown> => {
    const getTimepickerOptions = requireHostBridgeMethod('getTimepickerOptions');
    return getTimepickerOptions();
};

export const hostGetLocale = (): string => {
    const getLocale = requireHostBridgeMethod('getLocale');
    return getLocale();
};
