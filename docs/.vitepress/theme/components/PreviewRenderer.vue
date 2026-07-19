<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { createRoot, type Root } from 'react-dom/client';
import type { ReactElement } from 'react';
import previewStyles from '@verbb/plugin-kit-react/style.css?inline';
// Light-DOM overlay chrome (dialog header/body/close) — same sheet Web previews + playground load.
import overlayContentStyles from '@verbb/plugin-kit-web/styles/overlay-content.css?inline';
import { configurePluginKitReact, createCraftHostBridge } from '@verbb/plugin-kit-react/utils';
import { createDocsPreviewHostBridge } from '../../../preview/docsPreviewHostBridge';

const DOCS_PORTAL_HOST_ID = 'plugin-kit-react-docs-portal-host';

const props = defineProps<{
    render: () => ReactElement;
}>();

const previewHost = ref<HTMLDivElement | null>(null);

let root: Root | null = null;

const previewShellStyles = `
:host {
    /* Isolate from VitePress chrome without wiping custom properties we inject below.
     * Do not use \`all: initial\` — that resets inherited and host-defined --pk-* tokens. */
    display: block;
    contain: content;
    color: #1f2937;
    font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    font-size: 14px;
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

*, *::before, *::after {
    box-sizing: border-box;
}

[data-plugin-kit-preview-root] {
    display: block;
}

/* Icon gallery tiles — mirrors Web preview / playground gallery chrome. */
[data-pk-icon-gallery] {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: 12px;
    width: 100%;
}

[data-pk-icon-gallery] button {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    margin: 0;
    padding: 16px 8px;
    border: 1px solid #e5e7eb;
    border-radius: 10px;
    background: #fff;
    color: #374151;
    cursor: pointer;
    font: inherit;
    transition: border-color 0.15s, box-shadow 0.15s;
}

[data-pk-icon-gallery] button:hover {
    border-color: #94a3b8;
    box-shadow: 0 1px 2px rgba(15, 23, 42, 0.08);
}

[data-pk-icon-gallery] button code {
    font-size: 11.5px;
    color: #6b7280;
    word-break: break-word;
    text-align: center;
}

[data-pk-icon-gallery] button[data-copied] code {
    color: #10b981;
}
`;

/**
 * `style.css` / tokens.css target document `:root`. Inside this preview shadow that
 * never matches `pk-*` hosts — rewrite to `:host` (same as WebPreviewRenderer).
 */
function shadowTokensCss(cssText: string) {
    return cssText.replace(/:root\b/g, ':host');
}

/**
 * The preview app itself lives in a shadow root so VitePress styles do not leak in.
 * Portals cannot use that same shadow root: popovers/dialogs then get clipped by the
 * preview card and positioned like inline content. This body-level shadow gives
 * portaled UI a top-layer mount while still receiving the plugin-kit stylesheet.
 */
function getOrCreatePortalShadow(designStyles: string): ShadowRoot {
    let host = document.getElementById(DOCS_PORTAL_HOST_ID) as HTMLDivElement | null;

    if (!host) {
        host = document.createElement('div');
        host.id = DOCS_PORTAL_HOST_ID;
        host.setAttribute('data-plugin-kit-docs-portal-host', '');
        host.style.cssText = [
            'position:fixed',
            'inset:0',
            'z-index:80',
            'pointer-events:none',
        ].join(';');
        document.body.appendChild(host);
    }

    const portalShadow = host.shadowRoot ?? host.attachShadow({ mode: 'open' });

    let shellStyleTag = portalShadow.querySelector<HTMLStyleElement>('style[data-plugin-kit-docs-portal-shell]');

    if (!shellStyleTag) {
        shellStyleTag = document.createElement('style');
        shellStyleTag.setAttribute('data-plugin-kit-docs-portal-shell', '');
        portalShadow.prepend(shellStyleTag);
    }

    shellStyleTag.textContent = `
:host {
    color: #1f2937;
    font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    font-size: 14px;
    line-height: 1.5;
    pointer-events: none;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

*, *::before, *::after {
    box-sizing: border-box;
}

/* The host itself stays transparent to the docs page; actual portal surfaces remain interactive. */
[data-slot],
[data-slot] * {
    pointer-events: auto;
}
`;

    let designStyleTag = portalShadow.querySelector<HTMLStyleElement>('style[data-plugin-kit-docs-portal-design]');

    if (!designStyleTag) {
        designStyleTag = document.createElement('style');
        designStyleTag.setAttribute('data-plugin-kit-docs-portal-design', '');
        portalShadow.appendChild(designStyleTag);
    }

    designStyleTag.textContent = designStyles;

    return portalShadow;
}

onMounted(() => {
    const host = previewHost.value;

    if (!host) {
        return;
    }

    const designStyles = `${shadowTokensCss(previewStyles)}\n${overlayContentStyles}`;
    const shadowRoot = host.shadowRoot ?? host.attachShadow({ mode: 'open' });
    const shellStyleTag = document.createElement('style');
    shellStyleTag.textContent = previewShellStyles;

    const styleTag = document.createElement('style');
    styleTag.textContent = designStyles;

    let mountNode = shadowRoot.querySelector<HTMLElement>('[data-plugin-kit-preview-root]');

    if (!mountNode) {
        mountNode = document.createElement('div');
        mountNode.setAttribute('data-plugin-kit-preview-root', '');
    }

    shadowRoot.replaceChildren(shellStyleTag, styleTag, mountNode);

    const portalShadow = getOrCreatePortalShadow(designStyles);

    // Previews and components use mixed resolution (`src/...` vs `@verbb/plugin-kit-react/...`), which
    // can load two copies of the host-bridge/portal singleton. Configure both so helper APIs and
    // portaled UI behave consistently across direct source imports and package-alias imports.
    const pluginKitConfig = {
        portalContainer: portalShadow,
        portalClassName: 'plugin-kit-docs-demo',
        shadowRootSelectors: ['[data-plugin-kit-preview-root]'],
        hostBridge: typeof window !== 'undefined' && window.Craft ? createCraftHostBridge() : createDocsPreviewHostBridge(),
    };
    configurePluginKitReact(pluginKitConfig);

    root = createRoot(mountNode);
    root.render(props.render());
});

watch(() => props.render, (render) => {
    root?.render(render());
});

onBeforeUnmount(() => {
    root?.unmount();
});
</script>

<template>
    <div ref="previewHost" class="component-preview__preview" />
</template>
