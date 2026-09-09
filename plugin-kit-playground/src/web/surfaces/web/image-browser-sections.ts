import type { PlaygroundSectionRendererMap } from '../../../catalog/types.js';
import {
    demoIconGroups,
    demoIconItems,
    demoImageGroups,
    demoImageLabeledItems,
} from '../../../catalog/data/image-browser-fixtures.js';
import type {
    PkImageBrowser,
    PkImageBrowserMode,
    PkImageBrowserGroup,
    PkImageBrowserItem,
    PkImageBrowserLabelMode,
} from '@verbb/plugin-kit-web/components/image-browser/pk-image-browser.js';

import '@verbb/plugin-kit-web/components/image-browser.js';

function createBrowser(options: {
    value?: string;
    mode?: PkImageBrowserMode;
    items?: PkImageBrowserItem[];
    groups?: PkImageBrowserGroup[];
    disabled?: boolean;
    invalid?: boolean;
    loading?: boolean;
    selectedLabel?: string;
    selectedPreview?: string;
    labelMode?: PkImageBrowserLabelMode;
    placeholder?: string;
    searchPlaceholder?: string;
} = {}): PkImageBrowser {
    const el = document.createElement('pk-image-browser') as PkImageBrowser;

    if (options.value) {
        el.value = options.value;
    }

    if (options.mode) {
        el.mode = options.mode;
    }

    if (options.items) {
        el.items = options.items;
    }

    if (options.groups) {
        el.groups = options.groups;
    }

    if (options.placeholder) {
        el.placeholder = options.placeholder;
    }

    if (options.searchPlaceholder) {
        el.searchPlaceholder = options.searchPlaceholder;
    }

    if (options.labelMode) {
        el.labelMode = options.labelMode;
    }

    if (options.disabled) {
        el.disabled = true;
    }

    if (options.invalid) {
        el.invalid = true;
    }

    if (options.loading) {
        el.loading = true;
    }

    if (options.selectedLabel) {
        el.selectedLabel = options.selectedLabel;
    }

    if (options.selectedPreview) {
        el.selectedPreview = options.selectedPreview;
    }

    return el;
}

function createValueReadout(browser: PkImageBrowser): HTMLElement {
    const output = document.createElement('div');
    output.className = 'pg-demo-output';
    output.style.fontSize = '11px';
    output.style.color = 'var(--pk-color-gray-500)';

    const sync = (): void => {
        output.innerHTML = `Value: <code>${browser.value || '(empty)'}</code>`;
    };

    browser.addEventListener('pk-change', () => sync());
    sync();
    return output;
}

function createCaption(text: string): HTMLElement {
    const caption = document.createElement('div');
    caption.style.fontSize = '12px';
    caption.style.fontWeight = '600';
    caption.style.color = 'var(--pk-color-gray-600)';
    caption.textContent = text;
    return caption;
}

function createStatefulDemo(
    options: Parameters<typeof createBrowser>[0],
    { caption }: { caption?: string } = {},
): HTMLElement {
    const stack = document.createElement('div');
    stack.style.display = 'flex';
    stack.style.flexDirection = 'column';
    stack.style.gap = '0.35rem';

    if (caption) {
        stack.append(createCaption(caption));
    }

    const browser = createBrowser(options);
    stack.append(browser, createValueReadout(browser));
    return stack;
}

function createComparisonRow(...demos: HTMLElement[]): HTMLElement {
    const row = document.createElement('div');
    row.style.display = 'flex';
    row.style.flexWrap = 'wrap';
    row.style.gap = '1.5rem';
    row.style.alignItems = 'flex-start';
    row.append(...demos);
    return row;
}

/** Web component previews — one function per section id from imageBrowserPlaygroundSpec. */
export const imageBrowserWebSectionRenderers: PlaygroundSectionRendererMap = {
    icons(preview) {
        preview.append(createComparisonRow(
            createStatefulDemo({
                value: 'star',
                items: demoIconItems,
                placeholder: 'Choose an icon',
                searchPlaceholder: 'Search icons',
            }, { caption: 'Default (tooltip)' }),
            createStatefulDemo({
                value: 'star',
                items: demoIconItems,
                labelMode: 'inline',
                placeholder: 'Choose an icon',
                searchPlaceholder: 'Search icons',
            }, { caption: 'Inline' }),
            createStatefulDemo({
                value: 'star',
                items: demoIconItems,
                labelMode: 'none',
                placeholder: 'Choose an icon',
                searchPlaceholder: 'Search icons',
            }, { caption: 'None' }),
        ));
    },
    images(preview) {
        preview.append(createComparisonRow(
            createStatefulDemo({
                value: 'seagulls.jpg',
                mode: 'image',
                items: demoImageLabeledItems,
                placeholder: 'Choose a preview image',
                searchPlaceholder: 'Search images',
            }, { caption: 'Default (tooltip)' }),
            createStatefulDemo({
                value: 'seagulls.jpg',
                mode: 'image',
                items: demoImageLabeledItems,
                labelMode: 'inline',
                placeholder: 'Choose a preview image',
                searchPlaceholder: 'Search images',
            }, { caption: 'Inline' }),
            createStatefulDemo({
                value: 'seagulls.jpg',
                mode: 'image',
                items: demoImageLabeledItems,
                labelMode: 'none',
                placeholder: 'Choose a preview image',
                searchPlaceholder: 'Search images',
            }, { caption: 'None' }),
        ));
    },
    groups(preview) {
        preview.append(createComparisonRow(
            createStatefulDemo({
                groups: demoIconGroups,
                placeholder: 'Choose an icon',
                searchPlaceholder: 'Search icons',
            }, { caption: 'Icons' }),
            createStatefulDemo({
                mode: 'image',
                groups: demoImageGroups,
                value: 'seagulls.jpg',
                placeholder: 'Choose a preview image',
                searchPlaceholder: 'Search images',
            }, { caption: 'Images' }),
        ));
    },
    states(preview) {
        const loadingStar = demoIconItems.find((item) => item.value === 'star');

        preview.append(createComparisonRow(
            createStatefulDemo({
                value: 'star',
                loading: true,
                selectedLabel: loadingStar?.label,
                selectedPreview: loadingStar?.preview,
                placeholder: 'Choose an icon',
                searchPlaceholder: 'Search icons',
            }, { caption: 'Loading (open panel)' }),
            createStatefulDemo({
                value: 'bolt',
                items: demoIconItems,
                invalid: true,
            }, { caption: 'Invalid' }),
            createStatefulDemo({
                value: 'leaf',
                items: demoIconItems,
                disabled: true,
            }, { caption: 'Disabled' }),
            createStatefulDemo({
                items: demoIconItems,
            }, { caption: 'Cleared' }),
        ));
    },
};
