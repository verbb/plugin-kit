const DOCUMENT_SCROLL_STABILITY_STYLE_ID = 'plugin-kit-document-scroll-stability';

/**
 * Reserve scrollbar space on the document root so overlay scroll lock
 * can use the stable gutter path instead of body width compensation.
 * Safe to call multiple times; only injects once.
 *
 * tokens.css already sets `html { scrollbar-gutter: stable }` for kit surfaces
 * that import tokens. This injector covers hosts that load components without
 * tokens (e.g. craft CP early boot / ShadowRoot portal config).
 */
export const ensureDocumentScrollStability = (): void => {
    if (typeof document === 'undefined') {
        return;
    }

    if (document.querySelector(`style[data-plugin-kit-style-id="${DOCUMENT_SCROLL_STABILITY_STYLE_ID}"]`)) {
        return;
    }

    const style = document.createElement('style');
    style.setAttribute('data-plugin-kit-style-id', DOCUMENT_SCROLL_STABILITY_STYLE_ID);
    style.textContent = 'html { scrollbar-gutter: stable; }';
    document.head.appendChild(style);
};
