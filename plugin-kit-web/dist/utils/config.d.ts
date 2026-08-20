import { PortalContainer } from './portal.js';
export type PluginKitWebConfig = {
    /**
     * @deprecated Popups use the Popover API top layer — not DOM reparenting. Ignored if set.
     */
    portalClassName?: string;
    /**
     * When a `ShadowRoot`, used as a React portal target for Base UI compat.
     * No longer injects document scroll-gutter CSS (see scroll-lock.ts).
     */
    portalContainer?: PortalContainer;
    shadowRootSelectors?: string[];
};
export declare const configurePluginKitWeb: (config: PluginKitWebConfig) => void;
//# sourceMappingURL=config.d.ts.map