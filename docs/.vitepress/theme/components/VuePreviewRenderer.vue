<script setup lang="ts">
import { createApp, h, onBeforeUnmount, onMounted, ref, watch, type App, type VNode } from 'vue';
import previewStyles from '@verbb/plugin-kit-web/plugin-kit.css?inline';
import overlayContentStyles from '@verbb/plugin-kit-web/styles/overlay-content.css?inline';
import {
    configurePluginKitVue,
    createCraftHostBridge,
    PluginKitProvider,
} from '@verbb/plugin-kit-vue/app';
import { createDocsPreviewHostBridge } from '../../../preview/docsPreviewHostBridge';

const DOCS_PORTAL_HOST_ID = 'plugin-kit-vue-docs-portal-host';

const props = defineProps<{
    render: () => VNode;
}>();

const previewHost = ref<HTMLDivElement | null>(null);

let app: App | null = null;

const previewShellStyles = `
:host {
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
`;

function shadowTokensCss(cssText: string) {
    return cssText.replace(/:root\b/g, ':host');
}

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

function mountPreview(render: () => VNode) {
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

    const pluginKitConfig = {
        portalContainer: portalShadow,
        shadowRootSelectors: ['[data-plugin-kit-preview-root]'],
        hostBridge: typeof window !== 'undefined' && window.Craft
            ? createCraftHostBridge()
            : createDocsPreviewHostBridge(),
    };

    configurePluginKitVue(pluginKitConfig);

    app?.unmount();
    app = createApp({
        setup() {
            return () => h(PluginKitProvider, pluginKitConfig, {
                default: () => render(),
            });
        },
    });
    app.mount(mountNode);
}

onMounted(() => {
    mountPreview(props.render);
});

watch(() => props.render, (render) => {
    mountPreview(render);
});

onBeforeUnmount(() => {
    app?.unmount();
    app = null;
});
</script>

<template>
    <div ref="previewHost" class="component-preview__preview" />
</template>
