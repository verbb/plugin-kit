import { defineComponent, h, type Component, type VNodeChild } from 'vue';
import { dialogPlaygroundSections } from '@verbb/plugin-kit-playground';

import { Button, Dialog, Field, Icon, Input } from '@verbb/plugin-kit-vue/components';

const { basicUsage, confirmation, scrollable, initialFocus } = dialogPlaygroundSections;

type FooterButton = {
    label: string;
    variant?: 'default' | 'primary';
    close?: boolean;
};

function DialogCloseButton() {
    return h(
        Button,
        {
            variant: 'none',
            class: 'pk-dialog__close',
            'aria-label': 'Close',
            'data-dialog-close': true,
        },
        { start: () => h(Icon, { icon: 'xmark' }) },
    );
}

function DialogFooter(buttons: readonly FooterButton[]) {
    return buttons.map((buttonConfig) => h(
        Button,
        {
            key: buttonConfig.label,
            slot: 'footer',
            variant: buttonConfig.variant ?? 'default',
            ...(buttonConfig.close ? { 'data-dialog-close': true } : {}),
        },
        () => buttonConfig.label,
    ));
}

function DialogHeader(props: { title: string; description: string }) {
    return h('div', { slot: 'header', class: 'pk-dialog__header' }, [
        h('h3', { class: 'pk-dialog__title' }, props.title),
        h('p', {
            'data-slot': 'dialog-description',
            style: { margin: 0, fontSize: '12px', lineHeight: 1.5, color: '#64748b' },
        }, props.description),
        DialogCloseButton(),
    ]);
}

function BasicDialogDemo(props: {
    id: string;
    triggerLabel: string;
    triggerVariant?: 'default' | 'primary';
    title: string;
    description: string;
    body: VNodeChild;
    footer: readonly FooterButton[];
    disablePointerDismissal?: boolean;
}) {
    return h(
        Dialog,
        {
            id: props.id,
            ...(props.disablePointerDismissal ? { 'disable-pointer-dismissal': true } : {}),
        },
        {
            trigger: () => h(Button, { variant: props.triggerVariant ?? 'default' }, () => props.triggerLabel),
            default: () => [
                DialogHeader({ title: props.title, description: props.description }),
                h('div', { class: 'pk-dialog__body' }, [props.body]),
                ...DialogFooter(props.footer),
            ],
        },
    );
}

function ScrollableBody() {
    return Array.from({ length: 10 }, (_, index) => h(
        'p',
        { key: index, style: { margin: '0 0 12px' } },
        `Setting group ${index + 1}: long forms and review screens should scroll inside the dialog body instead of pushing actions off screen.`,
    ));
}

/** Vue previews — one component per section id from dialogPlaygroundSpec. */
export const dialogVueSectionComponents: Record<string, Component> = {
    basicUsage: defineComponent({
        name: 'DialogBasicUsageSection',
        setup: () => () => BasicDialogDemo({
            id: 'pg-dialog-basic',
            triggerLabel: basicUsage.triggerLabel,
            title: basicUsage.titleText,
            description: basicUsage.descriptionText,
            body: h('p', { style: { margin: 0 } }, basicUsage.body),
            footer: basicUsage.footer,
        }),
    }),

    confirmation: defineComponent({
        name: 'DialogConfirmationSection',
        setup: () => () => BasicDialogDemo({
            id: 'pg-dialog-confirmation',
            triggerLabel: confirmation.triggerLabel,
            triggerVariant: confirmation.triggerVariant,
            title: confirmation.titleText,
            description: confirmation.descriptionText,
            body: h('p', { style: { margin: 0 } }, confirmation.body),
            footer: confirmation.footer,
            disablePointerDismissal: true,
        }),
    }),

    scrollable: defineComponent({
        name: 'DialogScrollableSection',
        setup: () => () => BasicDialogDemo({
            id: 'pg-dialog-scrollable',
            triggerLabel: scrollable.triggerLabel,
            title: scrollable.titleText,
            description: scrollable.descriptionText,
            body: ScrollableBody(),
            footer: scrollable.footer,
        }),
    }),

    initialFocus: defineComponent({
        name: 'DialogInitialFocusSection',
        setup: () => () => {
            const labelInputId = 'pg-dialog-initial-focus-label';

            return h(Dialog, { id: 'pg-dialog-initial-focus' }, {
                trigger: () => h(Button, {}, () => initialFocus.triggerLabel),
                default: () => [
                    h('div', { slot: 'header', class: 'pk-dialog__header' }, [
                        h('h3', { class: 'pk-dialog__title' }, initialFocus.titleText),
                        DialogCloseButton(),
                    ]),
                    h('div', {
                        class: 'pk-dialog__body',
                        style: { display: 'flex', flexDirection: 'column', gap: '1rem' },
                    }, [
                        h(
                            Field,
                            {
                                label: 'Label',
                                instructions: 'The label that describes this field.',
                                required: true,
                                translatable: true,
                                for: labelInputId,
                            },
                            () => h(Input, { id: labelInputId, value: 'Test', autoFocus: true }),
                        ),
                        h(
                            Field,
                            {
                                label: 'Placeholder',
                                instructions: 'The text that will be shown if the field doesn’t have a value.',
                            },
                            () => h(Input, { placeholder: 'Placeholder text' }),
                        ),
                    ]),
                    ...DialogFooter(initialFocus.footer),
                ],
            });
        },
    }),
};
