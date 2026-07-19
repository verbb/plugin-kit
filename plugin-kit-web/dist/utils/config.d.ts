import { PortalContainer } from './portal.js';
export type PluginKitWebConfig = {
    /**
     * @deprecated Popups use the Popover API top layer — not DOM reparenting. Ignored if set.
     */
    portalClassName?: string;
    /**
     * When a `ShadowRoot`, enables document scroll-gutter stability for overlay scroll lock
     * in embedded hosts (e.g. Craft CP). React/Base UI compat still uses this as a portal target.
     */
    portalContainer?: PortalContainer;
    shadowRootSelectors?: string[];
};
export declare const configurePluginKitWeb: (config: PluginKitWebConfig) => void;
//# sourceMappingURL=config.d.ts.map