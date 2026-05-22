<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { createRoot, type Root } from 'react-dom/client';
import type { ReactElement } from 'react';
import previewStyles from '../../../../src/css/style.css?inline';
import { configurePluginKitReact as configureSourcePluginKitReact, createCraftHostBridge } from '../../../../src/utils';
import { configurePluginKitReact as configurePublishedPluginKitReact } from '@verbb/plugin-kit-react/utils';
import { createDocsPreviewHostBridge } from '../../../preview/docsPreviewHostBridge';

const DOCS_PORTAL_HOST_ID = 'plugin-kit-react-docs-portal-host';

const props = defineProps<{
    render: () => ReactElement;
}>();

const previewHost = ref<HTMLDivElement | null>(null);

let root: Root | null = null;

const previewShellStyles = `
:host {
    all: initial;
    display: block;
    contain: content;
}

*, *::before, *::after {
    box-sizing: border-box;
}

[data-plugin-kit-preview-root] {
    display: block;
    color: #1f2937;
    font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    font-size: 14px;
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
`;

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
    all: initial;
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

    const shadowRoot = host.shadowRoot ?? host.attachShadow({ mode: 'open' });
    const shellStyleTag = document.createElement('style');
    shellStyleTag.textContent = previewShellStyles;

    const styleTag = document.createElement('style');
    styleTag.textContent = previewStyles;

    let mountNode = shadowRoot.querySelector<HTMLElement>('[data-plugin-kit-preview-root]');

    if (!mountNode) {
        mountNode = document.createElement('div');
        mountNode.setAttribute('data-plugin-kit-preview-root', '');
    }

    shadowRoot.replaceChildren(shellStyleTag, styleTag, mountNode);

    const portalShadow = getOrCreatePortalShadow(previewStyles);

    // Previews and components use mixed resolution (`src/...` vs `@verbb/plugin-kit-react/...`), which
    // can load two copies of the host-bridge/portal singleton. Configure both so helper APIs and
    // portaled UI behave consistently across direct source imports and package-alias imports.
    const pluginKitConfig = {
        portalContainer: portalShadow,
        portalClassName: 'plugin-kit-docs-demo',
        shadowRootSelectors: ['[data-plugin-kit-preview-root]'],
        hostBridge: typeof window !== 'undefined' && window.Craft ? createCraftHostBridge() : createDocsPreviewHostBridge(),
    };
    configureSourcePluginKitReact(pluginKitConfig);
    configurePublishedPluginKitReact(pluginKitConfig);

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
