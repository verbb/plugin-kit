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

const resolveHost = (element: HTMLElement | string): HTMLElement => {
    const resolved = typeof element === 'string' ? document.querySelector(element) : element;

    if (!(resolved instanceof HTMLElement)) {
        throw new Error(`mountShadowApp: could not resolve host element "${String(element)}".`);
    }

    return resolved;
};

const injectStyles = (
    parent: ShadowRoot,
    styles: readonly string[],
    styleAttr: string,
): void => {
    parent.querySelectorAll(`[${styleAttr}]`).forEach((node) => node.remove());

    styles.forEach((cssText, index) => {
        if (!cssText) {
            return;
        }

        const style = document.createElement('style');
        style.setAttribute(styleAttr, String(index));
        style.textContent = cssText;
        parent.append(style);
    });
};

/**
 * Attach an open shadow root, inject CSS, and return a mount node for framework apps.
 *
 * Framework-agnostic — React/Vue adapters re-export this for Craft CP style isolation.
 */
export const mountShadowApp = ({
    element,
    styles = [],
    styleAttr = 'data-pk-shadow-style',
    rootAttr = 'data-pk-shadow-root',
    mountClassName = 'w-full',
}: MountShadowAppOptions): ShadowAppMount => {
    const host = resolveHost(element);

    if (!host.attachShadow) {
        throw new Error('mountShadowApp: host element does not support Shadow DOM.');
    }

    const shadowRoot = host.shadowRoot ?? host.attachShadow({ mode: 'open' });

    injectStyles(shadowRoot, styles, styleAttr);

    let mountNode = shadowRoot.querySelector<HTMLElement>(`[${rootAttr}]`);

    if (!mountNode) {
        mountNode = document.createElement('div');
        mountNode.setAttribute(rootAttr, '');
        if (mountClassName) {
            mountNode.className = mountClassName;
        }
        shadowRoot.append(mountNode);
    }

    return {
        host,
        shadowRoot,
        mountNode,
        portalContainer: shadowRoot,
    };
};
