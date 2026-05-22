import type {
    HostElementSelectorOptions,
    HostRequestConfig,
    HostRequestMethod,
    PluginKitReactHostBridge,
} from './hostBridge';

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

const getCraft = (): CraftApi => {
    if (!window.Craft) {
        throw new Error('Craft host bridge is unavailable because window.Craft is not defined.');
    }

    return window.Craft;
};

export const createCraftHostBridge = (): Partial<PluginKitReactHostBridge> => {
    return {
        request: (method, action, requestConfig = {}) => {
            return getCraft().sendActionRequest(method, action, requestConfig);
        },
        openElementSelector: (elementType, options) => {
            return getCraft().createElementSelectorModal(elementType, options);
        },
        formatDate: (date) => {
            return getCraft().formatDate(date);
        },
        getTimepickerOptions: () => {
            return getCraft().timepickerOptions || {};
        },
        getLocale: () => {
            return getCraft().locale || 'en-US';
        },
    };
};
