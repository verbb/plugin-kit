export type MountShadowAppOptions = {
    /** Host element (or CSS selector) that receives the open shadow root. */
    element: HTMLElement | string;
    /**
     * CSS text to inject into the shadow root.
     * Typically `[pluginKitStyles, screenStyles]` from `?inline` imports —
     * head FOUCE/tokens alone do not pierce shadow.
     */
    styles?: readonly string[];
    /** Attribute on injected `<style>` nodes. Defaults to `data-pk-shadow-style`. */
    styleAttr?: string;
    /** Attribute on the inner mount node. Defaults to `data-pk-shadow-root`. */
    rootAttr?: string;
    /** Optional class on the mount node (defaults to `w-full` when omitted). */
    mountClassName?: string;
};
export type ShadowAppMount = {
    host: HTMLElement;
    shadowRoot: ShadowRoot;
    /** Node to pass to the framework mount API (`createRoot`, `createApp().mount`, etc.). */
    mountNode: HTMLElement;
    /** Pass to the adapter Provider as `portalContainer` so overlays stay in-shadow. */
    portalContainer: ShadowRoot;
};
/**
 * Attach an open shadow root, inject CSS, and return a mount node for framework apps.
 *
 * Framework-agnostic — React/Vue adapters re-export this for Craft CP style isolation.
 */
export declare const mountShadowApp: ({ element, styles, styleAttr, rootAttr, mountClassName, }: MountShadowAppOptions) => ShadowAppMount;
//# sourceMappingURL=mount-shadow-app.d.ts.map