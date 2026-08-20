import { ensureDocumentScrollStability } from './documentScrollStability.js';
import {
    setShadowRootSelectors,
    type PortalContainer,
} from './portal.js';

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

export const configurePluginKitWeb = (config: PluginKitWebConfig): void => {
    if (config.portalContainer instanceof ShadowRoot) {
        // Historically forced `html { scrollbar-gutter: stable }`; that is a no-op now.
        ensureDocumentScrollStability();
    }

    if (config.shadowRootSelectors) {
        setShadowRootSelectors(config.shadowRootSelectors);
    }
};
