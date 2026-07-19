import {
    comboboxPlaygroundAsyncFruits,
    comboboxPlaygroundColorOptions,
    comboboxPlaygroundCountryOptions,
    comboboxPlaygroundFormOptions,
    comboboxPlaygroundFruitOptions,
    comboboxPlaygroundProduceGroups,
    comboboxPlaygroundSizes,
} from '../../../catalog/data/meta-combobox.js';
import type { PlaygroundSectionRendererMap } from '../../../catalog/types.js';
import type { PkCombobox, PkComboboxFetchHandler } from '../../../../plugin-kit-web/src/components/combobox/pk-combobox.js';

function appendOptions(
    combobox: HTMLElement,
    options: ReadonlyArray<{ value: string; label: string }>,
): void {
    for (const { value, label } of options) {
        const option = document.createElement('pk-option');
        option.value = value;
        option.textContent = label;
        combobox.append(option);
    }
}

function appendGroupedOptions(
    combobox: HTMLElement,
    groups: ReadonlyArray<{ label: string; options: ReadonlyArray<{ value: string; label: string }> }>,
): void {
    for (const [index, group] of groups.entries()) {
        if (index > 0) {
            combobox.append(document.createElement('pk-separator'));
        }

        const optionGroup = document.createElement('pk-option-group');
        optionGroup.label = group.label;

        for (const { value, label } of group.options) {
            const option = document.createElement('pk-option');
            option.value = value;
            option.textContent = label;
            optionGroup.append(option);
        }

        combobox.append(optionGroup);
    }
}

function createSizeLabelRow(control: HTMLElement, label: string): HTMLElement {
    const row = document.createElement('div');
    row.className = 'pg-select-size-row';
    const text = document.createElement('div');
    text.className = 'pg-select-size-row__label';
    text.textContent = label;
    row.append(text, control);
    return row;
}

/** Web component previews — one function per section id from comboboxPlaygroundSpec. */
export const comboboxWebSectionRenderers: PlaygroundSectionRendererMap = {
    basic(preview) {
        const combobox = document.createElement('pk-combobox');
        combobox.style.minWidth = '16rem';
        combobox.placeholder = 'Search forms…';
        appendOptions(combobox, comboboxPlaygroundFormOptions);
        preview.append(combobox);
    },

    withClear(preview) {
        const combobox = document.createElement('pk-combobox');
        combobox.style.minWidth = '16rem';
        combobox.placeholder = 'Search forms…';
        combobox.withClear = true;
        combobox.value = 'contact';
        appendOptions(combobox, comboboxPlaygroundFormOptions);
        preview.append(combobox);
    },

    grouped(preview) {
        const combobox = document.createElement('pk-combobox');
        combobox.style.minWidth = '16rem';
        combobox.placeholder = 'Select produce…';
        appendGroupedOptions(combobox, comboboxPlaygroundProduceGroups);
        preview.append(combobox);
    },

    multiple(preview) {
        const combobox = document.createElement('pk-combobox');
        combobox.style.maxWidth = '20rem';
        combobox.multiple = true;
        combobox.autoHighlight = true;
        combobox.placeholder = 'Add frameworks…';
        combobox.values = ['next-js'];
        appendOptions(combobox, [
            { value: 'next-js', label: 'Next.js' },
            { value: 'sveltekit', label: 'SvelteKit' },
            { value: 'nuxt-js', label: 'Nuxt.js' },
            { value: 'remix', label: 'Remix' },
            { value: 'astro', label: 'Astro' },
        ]);
        preview.append(combobox);
    },

    popupMode(preview) {
        const combobox = document.createElement('pk-combobox');
        combobox.popupMode = true;
        combobox.placeholder = 'Select a country';
        combobox.searchPlaceholder = 'Search';
        combobox.value = 'argentina';
        appendOptions(combobox, comboboxPlaygroundCountryOptions);
        preview.append(combobox);
    },

    sizes(preview) {
        preview.classList.add('pg-demo-stack', 'pg-demo-narrow');

        for (const { label, size } of comboboxPlaygroundSizes) {
            const combobox = document.createElement('pk-combobox');
            combobox.size = size;
            combobox.placeholder = 'Select a fruit';
            combobox.value = 'apple';
            appendOptions(combobox, comboboxPlaygroundFruitOptions);
            preview.append(createSizeLabelRow(combobox, label));
        }
    },

    allowCreate(preview) {
        const combobox = document.createElement('pk-combobox');
        combobox.style.minWidth = '16rem';
        combobox.placeholder = 'Search or create tags…';
        combobox.allowCreate = true;
        appendOptions(combobox, [
            { value: 'design', label: 'Design' },
            { value: 'engineering', label: 'Engineering' },
            { value: 'marketing', label: 'Marketing' },
        ]);
        preview.append(combobox);
    },

    allowCustomValue(preview) {
        const combobox = document.createElement('pk-combobox');
        combobox.style.minWidth = '16rem';
        combobox.placeholder = 'Type or select a color…';
        combobox.allowCustomValue = true;
        appendOptions(combobox, comboboxPlaygroundColorOptions);
        preview.append(combobox);
    },

    asyncSearch(preview) {
        const combobox = document.createElement('pk-combobox') as PkCombobox;
        combobox.style.minWidth = '16rem';
        combobox.placeholder = 'Search fruits…';
        combobox.async = true;
        combobox.withClear = true;
        combobox.emptyMessage = 'Try a different search term.';
        combobox.fetchOptions = (async (query, signal) => {
            await new Promise((resolve, reject) => {
                const timeout = window.setTimeout(resolve, 400);

                signal.addEventListener('abort', () => {
                    window.clearTimeout(timeout);
                    reject(new DOMException('Aborted', 'AbortError'));
                }, { once: true });
            });

            const normalized = query.trim().toLowerCase();

            if (!normalized) {
                return [];
            }

            return comboboxPlaygroundAsyncFruits.filter((fruit) => {
                return fruit.label.toLowerCase().includes(normalized);
            });
        }) satisfies PkComboboxFetchHandler;
        preview.append(combobox);
    },
};
