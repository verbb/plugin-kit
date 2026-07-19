/** Resolve an element id from the same root as the host (shadow or document), then the document. */
export function resolveElementById(host: HTMLElement, id: string): HTMLElement | null {
    if (!id) {
        return null;
    }

    const root = host.getRootNode();

    if (root instanceof Document || root instanceof ShadowRoot) {
        const match = root.getElementById(id);

        if (match) {
            return match;
        }
    }

    return host.ownerDocument.getElementById(id);
}
