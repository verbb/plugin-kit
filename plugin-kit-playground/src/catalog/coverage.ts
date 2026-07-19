import { componentRegistry } from './data/component-registry.js';

/** Components with a native web playground renderer in `src/web/mount.ts`. */
export const WEB_PREVIEW_IDS = new Set([
    'button',
    'button-group',
    'spinner',
    'icon',
    'checkbox',
    'field',
    'input',
    'textarea',
    'separator',
    'status',
    'toggle',
    'dialog',
    'dropdown-menu',
    'popover',
    'tooltip',
    'lightswitch',
    'toggle-group',
    'select',
    'combobox',
    'radio-group',
    'checkbox-select',
    'tabs',
    'scroll-area',
    'color-input',
    'copy-button',
    'calendar',
    'code-editor',
    'editable-table',
    'date-picker',
    'time-picker',
    'tiptap-editor',
    'tiptap-input',
    'tiptap-content',
]);

/** Spec-driven workshop previews (shared catalog spec + surface section renderers). */
export const REACT_SPEC_PREVIEW_IDS = new Set([
    'button',
    'button-group',
    'calendar',
    'checkbox',
    'checkbox-select',
    'spinner',
    'icon',
    'input',
    'select',
    'textarea',
    'separator',
    'status',
    'toggle',
    'dialog',
    'dropdown-menu',
    'popover',
    'tooltip',
    'lightswitch',
    'toggle-group',
    'radio-group',
    'tabs',
    'scroll-area',
    'color-input',
    'copy-button',
    'field',
    'date-picker',
    'time-picker',
    'combobox',
    'code-editor',
    'tiptap-editor',
    'tiptap-input',
    'tiptap-content',
]);
export const VUE_SPEC_PREVIEW_IDS = new Set([
    'button',
    'button-group',
    'calendar',
    'checkbox',
    'checkbox-select',
    'spinner',
    'icon',
    'input',
    'select',
    'textarea',
    'separator',
    'status',
    'toggle',
    'dialog',
    'dropdown-menu',
    'popover',
    'tooltip',
    'lightswitch',
    'toggle-group',
    'radio-group',
    'tabs',
    'scroll-area',
    'color-input',
    'copy-button',
    'field',
    'date-picker',
    'time-picker',
    'combobox',
    'code-editor',
    'tiptap-editor',
    'tiptap-input',
    'tiptap-content',
]);

/** Dedicated full preview pages (legacy or hand-built before spec migration). */
export const REACT_FULL_PREVIEW_IDS = new Set([
    'button',
    'button-group',
    'editable-table',
]);

export const VUE_FULL_PREVIEW_IDS = new Set([
    'button',
    'button-group',
]);

/** All catalog components have React `@lit/react` facades in plugin-kit-react. */
export const REACT_ADAPTER_IDS = new Set(componentRegistry.map((entry) => entry.id));

/**
 * Vue `@verbb/plugin-kit-vue` facades — kept in sync with `plugin-kit-vue/src/components`.
 * Editable Table has a WC but no Vue facade yet (React-only composite).
 */
export const VUE_ADAPTER_IDS = new Set([
    'button',
    'button-group',
    'spinner',
    'icon',
    'checkbox',
    'lightswitch',
    'calendar',
    'checkbox-select',
    'code-editor',
    'color-input',
    'combobox',
    'copy-button',
    'date-picker',
    'dialog',
    'dropdown-menu',
    'field',
    'input',
    'input-group',
    'popover',
    'popup',
    'radio-group',
    'scroll-area',
    'select',
    'separator',
    'status',
    'tabs',
    'textarea',
    'time-picker',
    'tiptap-editor',
    'tiptap-input',
    'tiptap-content',
    'toggle',
    'toggle-group',
    'tooltip',
]);

export type PreviewCoverage = 'spec' | 'full' | 'basic' | 'none';

export type ComponentCoverageRow = {
    id: string;
    title: string;
    webPreview: boolean;
    reactAdapter: boolean;
    vueAdapter: boolean;
    reactPreview: PreviewCoverage;
    vuePreview: PreviewCoverage;
};

function resolveReactPreview(id: string): PreviewCoverage {
    if (REACT_SPEC_PREVIEW_IDS.has(id)) {
        return 'spec';
    }

    if (REACT_FULL_PREVIEW_IDS.has(id)) {
        return 'full';
    }

    if (REACT_ADAPTER_IDS.has(id)) {
        return 'basic';
    }

    return 'none';
}

function resolveVuePreview(id: string): PreviewCoverage {
    if (VUE_SPEC_PREVIEW_IDS.has(id)) {
        return 'spec';
    }

    if (VUE_FULL_PREVIEW_IDS.has(id)) {
        return 'full';
    }

    if (VUE_ADAPTER_IDS.has(id)) {
        return 'basic';
    }

    return 'none';
}

/** 33-row matrix for migration tracking — web / React pkg / Vue pkg / workshop previews. */
export const componentCoverage: ComponentCoverageRow[] = componentRegistry.map((entry) => ({
    id: entry.id,
    title: entry.title,
    webPreview: WEB_PREVIEW_IDS.has(entry.id),
    reactAdapter: REACT_ADAPTER_IDS.has(entry.id),
    vueAdapter: VUE_ADAPTER_IDS.has(entry.id),
    reactPreview: resolveReactPreview(entry.id),
    vuePreview: resolveVuePreview(entry.id),
}));

export function getComponentCoverage(id: string): ComponentCoverageRow | undefined {
    return componentCoverage.find((row) => row.id === id);
}
