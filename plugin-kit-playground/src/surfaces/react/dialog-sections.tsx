import React, { useRef, useState } from 'react';
import { dialogPlaygroundSections } from '@verbb/plugin-kit-playground';

import { Button } from '@verbb/plugin-kit-react/components';
import { Dialog } from '@verbb/plugin-kit-react/components';
import { Field } from '@verbb/plugin-kit-react/components';
import { Icon } from '@verbb/plugin-kit-react/components';
import { Input } from '@verbb/plugin-kit-react/components';
import type { PlaygroundSectionReactRendererMap } from './shared/PlaygroundFromSpec.js';

const { basicUsage, confirmation, scrollable, initialFocus } = dialogPlaygroundSections;

type FooterButton = {
    label: string;
    variant?: 'default' | 'primary';
    close?: boolean;
};

function DialogCloseButton() {
    return (
        <Button variant="none" className="pk-dialog__close" aria-label="Close" data-dialog-close>
            <Icon slot="start" icon="xmark" />
        </Button>
    );
}

function DialogFooter({ buttons }: { buttons: readonly FooterButton[] }) {
    return (
        <>
            {buttons.map((buttonConfig) => (
                <Button
                    key={buttonConfig.label}
                    slot="footer"
                    variant={buttonConfig.variant ?? 'default'}
                    {...(buttonConfig.close ? { 'data-dialog-close': true } : {})}
                >
                    {buttonConfig.label}
                </Button>
            ))}
        </>
    );
}

function DialogHeader({
    title,
    description,
}: {
    title: string;
    description: string;
}) {
    return (
        <div slot="header" className="pk-dialog__header">
            <h3 className="pk-dialog__title">{title}</h3>
            <p data-slot="dialog-description" style={{ margin: 0, fontSize: 12, lineHeight: 1.5, color: '#64748b' }}>
                {description}
            </p>
            <DialogCloseButton />
        </div>
    );
}

function BasicDialogDemo({
    id,
    triggerLabel,
    triggerVariant = 'default',
    title,
    description,
    body,
    footer,
    disablePointerDismissal,
}: {
    id: string;
    triggerLabel: string;
    triggerVariant?: 'default' | 'primary';
    title: string;
    description: string;
    body: React.ReactNode;
    footer: readonly FooterButton[];
    disablePointerDismissal?: boolean;
}) {
    return (
        <Dialog
            id={id}
            {...(disablePointerDismissal ? { 'disable-pointer-dismissal': true } : {})}
        >
            <Button slot="trigger" variant={triggerVariant}>{triggerLabel}</Button>
            <DialogHeader title={title} description={description} />
            <div className="pk-dialog__body">{body}</div>
            <DialogFooter buttons={footer} />
        </Dialog>
    );
}

function ScrollableBody() {
    return (
        <>
            {Array.from({ length: 10 }, (_, index) => (
                <p key={index} style={{ margin: '0 0 12px' }}>
                    {`Setting group ${index + 1}: long forms and review screens should scroll inside the dialog body instead of pushing actions off screen.`}
                </p>
            ))}
        </>
    );
}

/** React previews — one function per section id from dialogPlaygroundSpec. */
export const dialogReactSectionRenderers: PlaygroundSectionReactRendererMap = {
    basicUsage: () => (
        <BasicDialogDemo
            id="pg-dialog-basic"
            triggerLabel={basicUsage.triggerLabel}
            title={basicUsage.titleText}
            description={basicUsage.descriptionText}
            body={<p style={{ margin: 0 }}>{basicUsage.body}</p>}
            footer={basicUsage.footer}
        />
    ),

    confirmation: () => (
        <BasicDialogDemo
            id="pg-dialog-confirmation"
            triggerLabel={confirmation.triggerLabel}
            triggerVariant={confirmation.triggerVariant}
            title={confirmation.titleText}
            description={confirmation.descriptionText}
            body={<p style={{ margin: 0 }}>{confirmation.body}</p>}
            footer={confirmation.footer}
            disablePointerDismissal
        />
    ),

    scrollable: () => (
        <BasicDialogDemo
            id="pg-dialog-scrollable"
            triggerLabel={scrollable.triggerLabel}
            title={scrollable.titleText}
            description={scrollable.descriptionText}
            body={<ScrollableBody />}
            footer={scrollable.footer}
        />
    ),

    initialFocus: () => {
        const labelInputId = 'pg-dialog-initial-focus-label';

        return (
            <Dialog id="pg-dialog-initial-focus">
                <Button slot="trigger">{initialFocus.triggerLabel}</Button>
                <div slot="header" className="pk-dialog__header">
                    <h3 className="pk-dialog__title">{initialFocus.titleText}</h3>
                    <DialogCloseButton />
                </div>
                <div className="pk-dialog__body" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <Field
                        label="Label"
                        instructions="The label that describes this field."
                        required
                        translatable
                        for={labelInputId}
                    >
                        <Input id={labelInputId} value="Test" autoFocus />
                    </Field>
                    <Field
                        label="Placeholder"
                        instructions="The text that will be shown if the field doesn’t have a value."
                    >
                        <Input placeholder="Placeholder text" />
                    </Field>
                </div>
                <DialogFooter buttons={initialFocus.footer} />
            </Dialog>
        );
    },
};
