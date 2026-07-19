<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';
import tokensStyles from '@verbb/plugin-kit-web/tokens.css?inline';
import fouceStyles from '@verbb/plugin-kit-web/styles/utilities/fouce.css?inline';
import overlayContentStyles from '@verbb/plugin-kit-web/styles/overlay-content.css?inline';
import type { WebPreviewEnhance, WebPreviewLayout } from './codeBlocks';

const props = defineProps<{
    html: string;
    layout?: WebPreviewLayout;
    enhance?: WebPreviewEnhance;
}>();

const previewHost = ref<HTMLDivElement | null>(null);
let disposeEnhance: (() => void) | undefined;

const previewShellStyles = `
:host {
    /* Isolate from VitePress chrome without wiping custom properties we inject below. */
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

[data-plugin-kit-preview-layout="row"] {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    align-items: center;
}

[data-plugin-kit-preview-layout="stack"] {
    display: flex;
    flex-direction: column;
    gap: 12px;
    max-width: 420px;
}

/* Icon gallery tiles — mirrors playground gallery chrome. */
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

function shadowTokensCss(cssText: string) {
    // tokens.css targets document `:root`; inside this preview shadow that never
    // reaches `pk-*` hosts. Bind the same variables to `:host` instead.
    return cssText.replace(/:root\b/g, ':host');
}

function paint() {
    const host = previewHost.value;

    if (!host) {
        return;
    }

    disposeEnhance?.();
    disposeEnhance = undefined;

    const shadowRoot = host.shadowRoot ?? host.attachShadow({ mode: 'open' });
    const shellStyleTag = document.createElement('style');
    shellStyleTag.textContent = previewShellStyles;

    const tokensStyleTag = document.createElement('style');
    tokensStyleTag.textContent = shadowTokensCss(tokensStyles);

    const fouceStyleTag = document.createElement('style');
    fouceStyleTag.textContent = fouceStyles;

    // Light-DOM overlay chrome (dialog header/body/close) — same sheet the playground loads.
    const overlayStyleTag = document.createElement('style');
    overlayStyleTag.textContent = overlayContentStyles;

    let mountNode = shadowRoot.querySelector<HTMLElement>('[data-plugin-kit-preview-root]');

    if (!mountNode) {
        mountNode = document.createElement('div');
        mountNode.setAttribute('data-plugin-kit-preview-root', '');
    }

    const layout = props.layout ?? 'plain';
    mountNode.setAttribute('data-plugin-kit-preview-layout', layout);
    mountNode.innerHTML = props.html;

    shadowRoot.replaceChildren(
        shellStyleTag,
        tokensStyleTag,
        fouceStyleTag,
        overlayStyleTag,
        mountNode,
    );

    const cleanup = props.enhance?.(mountNode);

    if (typeof cleanup === 'function') {
        disposeEnhance = cleanup;
    }
}

onMounted(() => {
    paint();
});

watch(() => [props.html, props.layout, props.enhance], () => {
    paint();
});

onBeforeUnmount(() => {
    disposeEnhance?.();
    disposeEnhance = undefined;
    const host = previewHost.value;
    host?.shadowRoot?.replaceChildren();
});
</script>

<template>
    <div ref="previewHost" class="component-preview__preview" />
</template>
