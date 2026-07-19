import { defineComponent, h, type Component, type VNodeChild } from 'vue';
import {
    comboboxPlaygroundAsyncFruits,
    comboboxPlaygroundColorOptions,
    comboboxPlaygroundCountryOptions,
    comboboxPlaygroundFormOptions,
    comboboxPlaygroundFruitOptions,
    comboboxPlaygroundProduceGroups,
    comboboxPlaygroundSizes,
} from '@verbb/plugin-kit-playground';

import {
    Combobox,
    Option,
    OptionGroup,
    Separator,
} from '@verbb/plugin-kit-vue/components';

function SelectSizeRow(props: { label: string; children: VNodeChild }) {
    return h('div', { class: 'pg-select-size-row' }, [
        h('div', { class: 'pg-select-size-row__label' }, props.label),
        props.children,
    ]);
}

function FormOptions() {
    return comboboxPlaygroundFormOptions.map(({ value, label }) => h(Option, { key: value, value }, () => label));
}

function FruitOptions() {
    return comboboxPlaygroundFruitOptions.map(({ value, label }) => h(Option, { key: value, value }, () => label));
}

function GroupedProduceOptions() {
    return comboboxPlaygroundProduceGroups.flatMap((group, index) => [
        ...(index > 0 ? [h(Separator, { key: `${group.label}-sep` })] : []),
        h(OptionGroup, { key: group.label, label: group.label }, () =>
            group.options.map(({ value, label }) => h(Option, { key: value, value }, () => label))),
    ]);
}

/** Vue previews — one component per section id from comboboxPlaygroundSpec. */
export const comboboxVueSectionComponents: Record<string, Component> = {
    basic: defineComponent({
        name: 'ComboboxBasicSection',
        setup: () => () => h(Combobox, { style: { minWidth: '16rem' }, placeholder: 'Search forms…' }, {
            default: () => FormOptions(),
        }),
    }),

    withClear: defineComponent({
        name: 'ComboboxWithClearSection',
        setup: () => () => h(Combobox, {
            style: { minWidth: '16rem' },
            placeholder: 'Search forms…',
            withClear: true,
            value: 'contact',
        }, {
            default: () => FormOptions(),
        }),
    }),

    grouped: defineComponent({
        name: 'ComboboxGroupedSection',
        setup: () => () => h(Combobox, { style: { minWidth: '16rem' }, placeholder: 'Select produce…' }, {
            default: () => GroupedProduceOptions(),
        }),
    }),

    multiple: defineComponent({
        name: 'ComboboxMultipleSection',
        setup: () => () => h(Combobox, {
            style: { maxWidth: '20rem' },
            multiple: true,
            autoHighlight: true,
            placeholder: 'Add frameworks…',
            values: ['next-js'],
        }, {
            default: () => [
                h(Option, { value: 'next-js' }, () => 'Next.js'),
                h(Option, { value: 'sveltekit' }, () => 'SvelteKit'),
                h(Option, { value: 'nuxt-js' }, () => 'Nuxt.js'),
                h(Option, { value: 'remix' }, () => 'Remix'),
                h(Option, { value: 'astro' }, () => 'Astro'),
            ],
        }),
    }),

    popupMode: defineComponent({
        name: 'ComboboxPopupModeSection',
        setup: () => () => h(Combobox, {
            popupMode: true,
            placeholder: 'Select a country',
            searchPlaceholder: 'Search',
            value: 'argentina',
        }, {
            default: () => comboboxPlaygroundCountryOptions.map(({ value, label }) => h(
                Option,
                { key: value, value },
                () => label,
            )),
        }),
    }),

    sizes: defineComponent({
        name: 'ComboboxSizesSection',
        setup: () => () => h('div', { class: 'pg-demo-stack pg-demo-narrow' },
            comboboxPlaygroundSizes.map(({ label, size }) => SelectSizeRow({
                label,
                children: h(Combobox, { size, placeholder: 'Select a fruit', value: 'apple' }, {
                    default: () => FruitOptions(),
                }),
            })),
        ),
    }),

    allowCreate: defineComponent({
        name: 'ComboboxAllowCreateSection',
        setup: () => () => h(Combobox, {
            style: { minWidth: '16rem' },
            placeholder: 'Search or create tags…',
            allowCreate: true,
        }, {
            default: () => [
                h(Option, { value: 'design' }, () => 'Design'),
                h(Option, { value: 'engineering' }, () => 'Engineering'),
                h(Option, { value: 'marketing' }, () => 'Marketing'),
            ],
        }),
    }),

    allowCustomValue: defineComponent({
        name: 'ComboboxAllowCustomValueSection',
        setup: () => () => h(Combobox, {
            style: { minWidth: '16rem' },
            placeholder: 'Type or select a color…',
            allowCustomValue: true,
        }, {
            default: () => comboboxPlaygroundColorOptions.map(({ value, label }) => h(
                Option,
                { key: value, value },
                () => label,
            )),
        }),
    }),

    asyncSearch: defineComponent({
        name: 'ComboboxAsyncSearchSection',
        setup: () => () => h(Combobox, {
            style: { minWidth: '16rem' },
            placeholder: 'Search fruits…',
            async: true,
            withClear: true,
            emptyMessage: 'Try a different search term.',
            fetchOptions: async (query: string, signal: AbortSignal) => {
                await new Promise<void>((resolve, reject) => {
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
            },
        }),
    }),
};
