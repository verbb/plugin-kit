import type { PlaygroundSectionRenderer } from '../../catalog/types.js';

/** Wraps a web playground section renderer for use in React or Vue preview shells. */
export function createWebSectionHostRenderer(render: PlaygroundSectionRenderer): () => { mount: (host: HTMLElement) => void } {
    return () => ({
        mount(host: HTMLElement) {
            host.replaceChildren();
            render(host);
        },
    });
}

/** Maps web section renderers to host mount factories keyed by section id. */
export function createWebSectionHostMap(
    webRenderers: Record<string, PlaygroundSectionRenderer>,
): Record<string, () => { mount: (host: HTMLElement) => void }> {
    return Object.fromEntries(
        Object.entries(webRenderers).map(([id, render]) => [
            id,
            createWebSectionHostRenderer(render),
        ]),
    );
}
