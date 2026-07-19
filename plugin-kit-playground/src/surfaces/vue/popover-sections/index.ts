import { defineComponent, h, type Component, type VNodeChild } from 'vue';
import { popoverPlaygroundSections } from '@verbb/plugin-kit-playground';

import { Button, Input, Popover } from '@verbb/plugin-kit-vue/components';

const { basicUsage, placement, formContent, withArrow } = popoverPlaygroundSections;

function PopoverContent(props: {
    title: string;
    description: string;
    body?: VNodeChild;
}) {
    return h('div', {}, [
        h('div', { style: { display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '12px' } }, [
            h('strong', { style: { fontSize: '14px', color: '#0f172a' } }, props.title),
            h('p', { style: { margin: 0, fontSize: '13px', color: '#64748b', lineHeight: 1.5 } }, props.description),
        ]),
        props.body ?? null,
    ]);
}

function PopoverDemo(props: {
    id: string;
    triggerLabel: string;
    triggerVariant?: 'default' | 'outline' | 'primary';
    placement?: string;
    withArrow?: boolean;
    content: VNodeChild;
}) {
    return h(
        Popover,
        {
            id: props.id,
            ...(props.placement ? { placement: props.placement } : {}),
            ...(props.withArrow ? { withArrow: true } : {}),
        },
        {
            trigger: () => h(Button, { variant: props.triggerVariant ?? 'default' }, () => props.triggerLabel),
            default: () => props.content,
        },
    );
}

/** Vue previews — one component per section id from popoverPlaygroundSpec. */
export const popoverVueSectionComponents: Record<string, Component> = {
    basicUsage: defineComponent({
        name: 'PopoverBasicUsageSection',
        setup: () => () => PopoverDemo({
            id: 'pg-popover-basic',
            triggerLabel: basicUsage.triggerLabel,
            content: PopoverContent({
                title: basicUsage.title,
                description: basicUsage.descriptionText,
            }),
        }),
    }),

    placement: defineComponent({
        name: 'PopoverPlacementSection',
        setup: () => () => h('div', { id: 'pg-popover-placement', class: 'pg-card__inner--row' },
            placement.sides.map((side) => PopoverDemo({
                id: `pg-popover-${side}`,
                triggerLabel: side,
                triggerVariant: 'outline',
                placement: side,
                content: PopoverContent({
                    title: `${side} popover`,
                    description: 'Position popovers near the control they support.',
                }),
            })),
        ),
    }),

    withArrow: defineComponent({
        name: 'PopoverWithArrowSection',
        setup: () => () => h('div', { id: 'pg-popover-with-arrow', class: 'pg-card__inner--row' },
            withArrow.sides.map((side) => PopoverDemo({
                id: `pg-popover-arrow-${side}`,
                triggerLabel: side,
                triggerVariant: 'outline',
                placement: side,
                withArrow: true,
                content: PopoverContent({
                    title: withArrow.contentTitle,
                    description: withArrow.contentDescription,
                }),
            })),
        ),
    }),

    formContent: defineComponent({
        name: 'PopoverFormContentSection',
        setup: () => () => PopoverDemo({
            id: 'pg-popover-form',
            triggerLabel: formContent.triggerLabel,
            content: PopoverContent({
                title: formContent.titleText,
                description: formContent.descriptionText,
                body: h('div', { style: { display: 'flex', flexDirection: 'column', gap: '12px' } }, [
                    h(Input, { value: formContent.inputValue }),
                    h('div', { style: { display: 'flex', justifyContent: 'flex-end', gap: '8px' } }, [
                        h(Button, {}, () => 'Cancel'),
                        h(Button, { variant: 'primary' }, () => 'Save'),
                    ]),
                ]),
            }),
        }),
    }),
};
