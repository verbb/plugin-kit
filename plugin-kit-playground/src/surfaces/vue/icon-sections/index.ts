import { defineComponent, h, ref, type Component } from 'vue';
import {
    iconColorSwatches,
    iconCommonNames,
    iconGalleryNames,
    iconSizeScale,
} from '@verbb/plugin-kit-playground';

import {
    Button,
    DropdownItem,
    DropdownMenu,
    Icon,
} from '@verbb/plugin-kit-vue/components';

import { CodeBlock, gridStyle } from '../shared/sectionHelpers.js';

const captionStyle = { fontSize: '12px', color: '#6b7280' };

const IconTile = defineComponent({
    name: 'IconTile',
    props: {
        name: { type: String, required: true },
    },
    setup(props) {
        const copied = ref(false);
        const labelText = ref(props.name);

        const copy = () => {
            void navigator.clipboard?.writeText(`<pk-icon name="${props.name}"></pk-icon>`);
            copied.value = true;
            labelText.value = 'Copied!';
            window.setTimeout(() => {
                copied.value = false;
                labelText.value = props.name;
            }, 1000);
        };

        return () => h(
            'button',
            {
                type: 'button',
                title: `Copy <pk-icon name="${props.name}">`,
                onClick: copy,
                style: {
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    padding: '16px 8px',
                    border: '1px solid #e5e7eb',
                    borderRadius: '10px',
                    background: '#fff',
                    cursor: 'pointer',
                    font: 'inherit',
                    color: '#374151',
                },
            },
            [
                h(Icon, { icon: props.name, style: { fontSize: '22px' } }),
                h('code', {
                    style: {
                        fontSize: '11.5px',
                        color: copied.value ? '#10b981' : '#6b7280',
                        wordBreak: 'break-word',
                        textAlign: 'center',
                    },
                }, labelText.value),
            ],
        );
    },
});

/** Vue previews — one component per section id from iconPlaygroundSpec. */
export const iconVueSectionComponents: Record<string, Component> = {
    common: defineComponent({
        name: 'IconCommonSection',
        setup: () => () => h('div', {}, [
            h('div', { style: gridStyle(110) },
                iconCommonNames.map((name) => h(IconTile, { key: name, name })),
            ),
            h(CodeBlock, { code: '<pk-icon name="plus"></pk-icon>' }),
        ]),
    }),

    sizing: defineComponent({
        name: 'IconSizingSection',
        setup: () => () => h('div', {}, [
            h('div', { class: 'cmp-row-items', style: { alignItems: 'flex-end', gap: '24px' } },
                iconSizeScale.map(({ label, size }) => h(
                    'div',
                    {
                        key: size,
                        style: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' },
                    },
                    [
                        h(Icon, { icon: 'gear', style: { fontSize: `${size}px` } }),
                        h('span', { style: captionStyle }, label),
                    ],
                )),
            ),
            h(CodeBlock, { code: '<pk-icon name="gear" style="font-size: 32px"></pk-icon>' }),
        ]),
    }),

    color: defineComponent({
        name: 'IconColorSection',
        setup: () => () => h('div', {}, [
            h('div', { class: 'cmp-row-items', style: { gap: '24px' } },
                iconColorSwatches.map(({ label, color }) => h(
                    'div',
                    {
                        key: label,
                        style: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' },
                    },
                    [
                        h(Icon, { icon: 'triangle-exclamation', style: { fontSize: '26px', color } }),
                        h('span', { style: captionStyle }, label),
                    ],
                )),
            ),
            h(CodeBlock, { code: '<pk-icon name="triangle-exclamation" style="color: #ef4444"></pk-icon>' }),
        ]),
    }),

    inContext: defineComponent({
        name: 'IconInContextSection',
        setup: () => () => h('div', {}, [
            h('div', { class: 'cmp-row-items', style: { gap: '16px', alignItems: 'center' } }, [
                h(Button, { variant: 'dashed' }, {
                    start: () => h(Icon, { icon: 'plus' }),
                    default: () => 'Add a link',
                }),
                h(Button, { variant: 'transparent', 'aria-label': 'Settings' }, {
                    start: () => h(Icon, { icon: 'gear' }),
                }),
                h(
                    DropdownMenu,
                    { placement: 'bottom-start' },
                    {
                        trigger: () => h(Button, { withCaret: true }, () => 'Actions'),
                        default: () => [
                            h(DropdownItem, { value: 'edit' }, {
                                prefix: () => h(Icon, { icon: 'pen' }),
                                default: () => 'Edit',
                            }),
                            h(DropdownItem, { value: 'duplicate' }, {
                                prefix: () => h(Icon, { icon: 'copy' }),
                                default: () => 'Duplicate',
                            }),
                            h(DropdownItem, { value: 'delete', destructive: true }, {
                                prefix: () => h(Icon, { icon: 'trash' }),
                                default: () => 'Delete',
                            }),
                        ],
                    },
                ),
            ]),
            h(CodeBlock, {
                code: [
                    '<pk-button variant="dashed">',
                    '  <pk-icon slot="start" name="plus"></pk-icon>',
                    '  Add a link',
                    '</pk-button>',
                ].join('\n'),
            }),
        ]),
    }),

    accessibility: defineComponent({
        name: 'IconAccessibilitySection',
        setup: () => () => h('div', {}, [
            h('p', { style: { display: 'flex', alignItems: 'center', gap: '10px', margin: 0 } }, [
                h(Icon, { icon: 'check', style: { fontSize: '18px', color: '#10b981' } }),
                'Decorative — hidden from screen readers (default).',
            ]),
            h('p', { style: { display: 'flex', alignItems: 'center', gap: '10px', margin: '12px 0 0' } }, [
                h(Icon, { icon: 'trash', label: 'Delete', style: { fontSize: '18px', color: '#ef4444' } }),
                'Meaningful — exposed as an image titled “Delete”.',
            ]),
            h(CodeBlock, { code: '<pk-icon name="trash" label="Delete"></pk-icon>' }),
        ]),
    }),

    gallery: defineComponent({
        name: 'IconGallerySection',
        setup: () => () => h('div', { style: gridStyle(120) },
            iconGalleryNames.map((name) => h(IconTile, { key: name, name })),
        ),
    }),
};
