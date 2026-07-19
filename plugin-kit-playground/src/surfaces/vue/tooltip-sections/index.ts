import { defineComponent, h, type Component } from 'vue';
import { tooltipPlaygroundSections } from '@verbb/plugin-kit-playground';

import { Button, Tooltip } from '@verbb/plugin-kit-vue/components';

function TooltipDemo(props: {
    id: string;
    triggerLabel: string;
    content: string;
    triggerVariant?: string;
    placement?: string;
}) {
    return h(
        Tooltip,
        {
            id: props.id,
            content: props.content,
            ...(props.placement ? { placement: props.placement } : {}),
        },
        {
            trigger: () => h(Button, { variant: props.triggerVariant ?? 'default' }, () => props.triggerLabel),
        },
    );
}

/** Vue previews — one function per section id from tooltipPlaygroundSpec. */
export const tooltipVueSectionComponents: Record<string, Component> = {
    basicUsage: defineComponent({
        name: 'TooltipBasicUsageSection',
        setup: () => () => {
            const { triggerLabel, content } = tooltipPlaygroundSections.basicUsage;

            return TooltipDemo({ id: 'pg-tooltip-basic', triggerLabel, content });
        },
    }),

    actionHints: defineComponent({
        name: 'TooltipActionHintsSection',
        setup: () => () => {
            const { triggerLabel, content } = tooltipPlaygroundSections.actionHints;

            return TooltipDemo({
                id: 'pg-tooltip-action',
                triggerLabel,
                content,
                triggerVariant: 'outline',
            });
        },
    }),

    placement: defineComponent({
        name: 'TooltipPlacementSection',
        setup: () => () => h('div', { id: 'pg-tooltip-placement', class: 'pg-card__inner--row' },
            tooltipPlaygroundSections.placement.sides.map((side) => TooltipDemo({
                id: `pg-tooltip-${side}`,
                triggerLabel: side,
                content: `Tooltip on the ${side}`,
                triggerVariant: 'outline',
                placement: side,
            })),
        ),
    }),

    keyboard: defineComponent({
        name: 'TooltipKeyboardSection',
        setup: () => () => {
            const { triggerLabel, content } = tooltipPlaygroundSections.keyboard;

            return TooltipDemo({
                id: 'pg-tooltip-keyboard',
                triggerLabel,
                content,
                triggerVariant: 'transparent',
            });
        },
    }),
};
