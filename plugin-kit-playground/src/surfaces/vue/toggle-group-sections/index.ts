import { defineComponent, h, type Component } from 'vue';
import { toggleGroupPlaygroundSections } from '@verbb/plugin-kit-playground';

import { Icon, Toggle, ToggleGroup } from '@verbb/plugin-kit-vue/components';

const {
    basicUsage,
    variants,
    sizes,
    orientation,
    spacing,
    selection,
} = toggleGroupPlaygroundSections;

const formatIcons = {
    bold: 'bold',
    italic: 'italic',
    underline: 'underline',
} as const;

const alignIcons = {
    left: 'align-left',
    center: 'align-center',
    right: 'align-right',
} as const;

function IconToggle(props: {
    value: string;
    icon: string;
    label?: string;
    ariaLabel?: string;
    pressed?: boolean;
}) {
    return h(
        Toggle,
        {
            value: props.value,
            'aria-label': props.ariaLabel ?? props.label,
            pressed: props.pressed,
        },
        {
            default: () => [
                h(Icon, { icon: props.icon, 'aria-hidden': true }),
                props.label ?? null,
            ],
        },
    );
}

function AlignToggleGroup(props: {
    id: string;
    items: ReadonlyArray<{ value: string; ariaLabel: string }>;
    defaultValue: string[];
    variant?: 'default' | 'outline';
    orientation?: 'horizontal' | 'vertical';
    spacing?: number;
    size?: 'sm' | 'lg';
}) {
    return h(
        ToggleGroup,
        {
            id: props.id,
            variant: props.variant,
            spacing: props.spacing ?? 0,
            orientation: props.orientation,
            value: props.defaultValue,
            ...(props.size ? { size: props.size } : {}),
        },
        () => props.items.map((item) => {
            const alignKey = item.value.replace(/^(h-|v-)/, '') as keyof typeof alignIcons;

            return IconToggle({
                value: item.value,
                icon: alignIcons[alignKey] ?? 'align-left',
                ariaLabel: item.ariaLabel,
                pressed: props.defaultValue.includes(item.value),
            });
        }),
    );
}

function FormatToggleGroup(props: {
    id: string;
    items: ReadonlyArray<{ value: string; ariaLabel?: string; label?: string }>;
    variant?: 'default' | 'outline';
    size?: 'sm' | 'lg';
    defaultValue?: string[];
}) {
    return h(
        ToggleGroup,
        {
            id: props.id,
            variant: props.variant,
            spacing: 0,
            value: props.defaultValue,
            ...(props.size ? { size: props.size } : {}),
        },
        () => props.items.map((item) => {
            const formatKey = item.value.replace(/^(sm-|md-|lg-|outline-)/, '') as keyof typeof formatIcons;

            return IconToggle({
                value: item.value,
                icon: formatIcons[formatKey] ?? 'bold',
                label: item.label,
                ariaLabel: item.ariaLabel,
                pressed: props.defaultValue?.includes(item.value),
            });
        }),
    );
}

/** Vue previews — one component per section id from toggleGroupPlaygroundSpec. */
export const toggleGroupVueSectionComponents: Record<string, Component> = {
    basicUsage: defineComponent({
        name: 'ToggleGroupBasicUsageSection',
        setup: () => () => AlignToggleGroup({
            id: 'pg-toggle-group-basic',
            items: basicUsage.items,
            defaultValue: ['center'],
        }),
    }),

    variants: defineComponent({
        name: 'ToggleGroupVariantsSection',
        setup: () => () => h('div', { class: 'pg-demo-stack' }, [
            FormatToggleGroup({
                id: 'pg-toggle-group-default',
                variant: 'default',
                items: variants.defaultItems,
            }),
            FormatToggleGroup({
                id: 'pg-toggle-group-outline',
                variant: 'outline',
                items: variants.outlineItems,
            }),
        ]),
    }),

    sizes: defineComponent({
        name: 'ToggleGroupSizesSection',
        setup: () => () => h('div', { class: 'pg-demo-stack' },
            (['sm', 'default', 'lg'] as const).map((size) => FormatToggleGroup({
                id: `pg-toggle-group-size-${size}`,
                size: size === 'default' ? undefined : size,
                items: sizes.items.map((item) => ({
                    ...item,
                    value: `${size}-${item.value}`,
                })),
            })),
        ),
    }),

    orientation: defineComponent({
        name: 'ToggleGroupOrientationSection',
        setup: () => () => h('div', { class: 'pg-card__inner--row pg-toggle-group-orientation' }, [
            AlignToggleGroup({
                id: 'pg-toggle-group-horizontal',
                items: orientation.horizontalItems,
                defaultValue: ['h-center'],
            }),
            AlignToggleGroup({
                id: 'pg-toggle-group-vertical',
                items: orientation.verticalItems,
                defaultValue: ['v-center'],
                orientation: 'vertical',
            }),
        ]),
    }),

    spacing: defineComponent({
        name: 'ToggleGroupSpacingSection',
        setup: () => () => AlignToggleGroup({
            id: 'pg-toggle-group-spacing',
            items: spacing.items,
            defaultValue: ['center'],
            spacing: 2,
        }),
    }),

    selection: defineComponent({
        name: 'ToggleGroupSelectionSection',
        setup: () => () => h('div', { class: 'pg-demo-stack' }, [
            h(ToggleGroup, { id: 'pg-toggle-group-single', value: ['left'] }, () =>
                selection.singleItems.map((item) => h(
                    Toggle,
                    { key: item.value, value: item.value, pressed: item.value === 'left' },
                    () => item.label,
                ))),
            h(ToggleGroup, { id: 'pg-toggle-group-multiple', multiple: true, value: ['bold'] }, () =>
                selection.multipleItems.map((item) => h(
                    Toggle,
                    { key: item.value, value: item.value, pressed: item.value === 'bold' },
                    () => item.label,
                ))),
        ]),
    }),
};
