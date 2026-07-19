import { playgroundIconXmark } from '../../../catalog/data/icons.js';
import { dialogPlaygroundSections } from '../../../catalog/data/meta-dialog.js';
import type { PlaygroundSectionRendererMap } from '../../../catalog/types.js';

import { createPkButton, createPkField, createPkInput } from '../../dom.js';

type DialogFooterButton = {
    label: string;
    variant?: 'default' | 'primary';
    close?: boolean;
};

const { basicUsage, confirmation, scrollable, initialFocus } = dialogPlaygroundSections;

function buildScrollableBody(): string {
    return Array.from({ length: 10 }, (_, index) => {
        return `<p style="margin:0 0 12px">Setting group ${index + 1}: long forms and review screens should scroll inside the dialog body instead of pushing actions off screen.</p>`;
    }).join('');
}

function createDialogCloseButton(): HTMLElement {
    const closeButton = createPkButton({
        variant: 'none',
        ariaLabel: 'Close',
        startSlot: playgroundIconXmark,
    });
    closeButton.className = 'pk-dialog__close';
    closeButton.setAttribute('data-dialog-close', '');

    return closeButton;
}

function appendDialogFooter(dialog: HTMLElement, footer: readonly DialogFooterButton[]): void {
    for (const buttonConfig of footer) {
        const button = createPkButton({
            label: buttonConfig.label,
            variant: buttonConfig.variant ?? 'default',
        });
        button.setAttribute('slot', 'footer');

        if (buttonConfig.close) {
            button.setAttribute('data-dialog-close', '');
        }

        dialog.append(button);
    }
}

function mountDialogDemo(
    root: HTMLElement,
    id: string,
    options: {
        triggerLabel: string;
        triggerVariant?: 'default' | 'primary';
        title: string;
        description: string;
        bodyHtml: string;
        footer: readonly DialogFooterButton[];
        disablePointerDismissal?: boolean;
    },
): void {
    const dialog = document.createElement('pk-dialog');
    dialog.id = id;

    if (options.disablePointerDismissal) {
        dialog.setAttribute('disable-pointer-dismissal', '');
    }

    const trigger = createPkButton({
        label: options.triggerLabel,
        variant: options.triggerVariant ?? 'default',
    });
    trigger.setAttribute('slot', 'trigger');

    const header = document.createElement('div');
    header.className = 'pk-dialog__header';
    header.setAttribute('slot', 'header');
    const title = document.createElement('h3');
    title.className = 'pk-dialog__title';
    title.textContent = options.title;

    const description = document.createElement('p');
    description.dataset.slot = 'dialog-description';
    description.style.cssText = 'margin:0;font-size:12px;line-height:1.5;color:#64748b';
    description.textContent = options.description;

    header.append(title, description, createDialogCloseButton());

    const body = document.createElement('div');
    body.className = 'pk-dialog__body';
    body.innerHTML = options.bodyHtml;

    dialog.append(trigger, header, body);
    appendDialogFooter(dialog, options.footer);
    root.append(dialog);
}

function mountInitialFocusDialog(root: HTMLElement, id: string): void {
    const dialog = document.createElement('pk-dialog');
    dialog.id = id;

    const trigger = createPkButton({
        label: initialFocus.triggerLabel,
    });
    trigger.setAttribute('slot', 'trigger');

    const header = document.createElement('div');
    header.className = 'pk-dialog__header';
    header.setAttribute('slot', 'header');

    const title = document.createElement('h3');
    title.className = 'pk-dialog__title';
    title.textContent = initialFocus.titleText;

    header.append(title, createDialogCloseButton());

    const body = document.createElement('div');
    body.className = 'pk-dialog__body';
    body.style.cssText = 'display: flex; flex-direction: column; gap: 1rem;';

    const labelInputId = `${id}-label`;
    const labelInput = createPkInput({
        id: labelInputId,
        value: 'Test',
        autofocus: true,
    });

    body.append(
        createPkField(
            {
                label: 'Label',
                instructions: 'The label that describes this field.',
                required: true,
                translatable: true,
                for: labelInputId,
            },
            labelInput,
        ),
        createPkField(
            {
                label: 'Placeholder',
                instructions: 'The text that will be shown if the field doesn\u2019t have a value.',
            },
            createPkInput({ placeholder: 'Placeholder text' }),
        ),
    );

    dialog.append(trigger, header, body);
    appendDialogFooter(dialog, initialFocus.footer);
    root.append(dialog);
}

/** Web component previews — one function per section id from dialogPlaygroundSpec. */
export const dialogWebSectionRenderers: PlaygroundSectionRendererMap = {
    basicUsage(preview) {
        mountDialogDemo(preview, 'pg-dialog-basic', {
            triggerLabel: basicUsage.triggerLabel,
            title: basicUsage.titleText,
            description: basicUsage.descriptionText,
            bodyHtml: `<p style="margin:0">${basicUsage.body}</p>`,
            footer: basicUsage.footer,
        });
    },

    confirmation(preview) {
        mountDialogDemo(preview, 'pg-dialog-confirmation', {
            triggerLabel: confirmation.triggerLabel,
            triggerVariant: confirmation.triggerVariant,
            title: confirmation.titleText,
            description: confirmation.descriptionText,
            bodyHtml: `<p style="margin:0">${confirmation.body}</p>`,
            footer: confirmation.footer,
            disablePointerDismissal: true,
        });
    },

    scrollable(preview) {
        mountDialogDemo(preview, 'pg-dialog-scrollable', {
            triggerLabel: scrollable.triggerLabel,
            title: scrollable.titleText,
            description: scrollable.descriptionText,
            bodyHtml: buildScrollableBody(),
            footer: scrollable.footer,
        });
    },

    initialFocus(preview) {
        mountInitialFocusDialog(preview, 'pg-dialog-initial-focus');
    },
};
