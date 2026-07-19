import { defineComponent, h, type Component } from 'vue';
import { togglePlaygroundSections } from '@verbb/plugin-kit-playground';

import { Icon, Toggle } from '@verbb/plugin-kit-vue/components';

const { basicUsage, disabled } = togglePlaygroundSections;

function FormatToggle(props: {
    id: string;
    icon: string;
    label?: string;
    variant?: 'default' | 'outline';
    size?: 'sm' | 'lg';
    pressed?: boolean;
    disabled?: boolean;
}) {
    return h(
        Toggle,
        {
            id: props.id,
            variant: props.variant,
            size: props.size,
            pressed: props.pressed,
            disabled: props.disabled,
            'aria-label': props.label,
        },
        {
            default: () => [
                h(Icon, { icon: props.icon, 'aria-hidden': true }),
                props.label ?? null,
            ],
        },
    );
}

/** Vue previews — one component per section id from togglePlaygroundSpec. */
export const toggleVueSectionComponents: Record<string, Component> = {
    basicUsage: defineComponent({
        name: 'ToggleBasicUsageSection',
        setup: () => () => FormatToggle({ id: 'pg-toggle-basic', icon: 'bold', label: basicUsage.label }),
    }),

    variants: defineComponent({
        name: 'ToggleVariantsSection',
        setup: () => () => h('div', { class: 'pg-card__inner--row' }, [
            FormatToggle({ id: 'pg-toggle-default', icon: 'bold', label: 'Bold' }),
            FormatToggle({ id: 'pg-toggle-outline', icon: 'italic', label: 'Italic', variant: 'outline' }),
        ]),
    }),

    sizes: defineComponent({
        name: 'ToggleSizesSection',
        setup: () => () => h('div', { class: 'pg-card__inner--row' }, [
            FormatToggle({ id: 'pg-toggle-sm', icon: 'bold', label: 'Bold', size: 'sm' }),
            FormatToggle({ id: 'pg-toggle-md', icon: 'italic', label: 'Italic' }),
            FormatToggle({ id: 'pg-toggle-lg', icon: 'underline', label: 'Underline', size: 'lg' }),
        ]),
    }),

    pressed: defineComponent({
        name: 'TogglePressedSection',
        setup: () => () => h('div', { class: 'pg-card__inner--row' }, [
            FormatToggle({ id: 'pg-toggle-pressed-default', icon: 'italic', label: 'Italic', pressed: true }),
            FormatToggle({ id: 'pg-toggle-pressed-outline', icon: 'italic', label: 'Italic', variant: 'outline', pressed: true }),
        ]),
    }),

    disabled: defineComponent({
        name: 'ToggleDisabledSection',
        setup: () => () => FormatToggle({ id: 'pg-toggle-disabled', icon: 'bold', label: disabled.label, disabled: true }),
    }),
};
