import { popoverPlaygroundSections } from '../../../catalog/data/meta-popover.js';
import type { PlaygroundSectionRendererMap } from '../../../catalog/types.js';

import { createPkButton, createPkInput } from '../../dom.js';

const { basicUsage, placement, formContent, withArrow } = popoverPlaygroundSections;

function buildPopoverContent(options: {
    title: string;
    description: string;
    body?: HTMLElement;
}): HTMLElement {
    const content = document.createElement('div');
    content.innerHTML = `
        <div style="display:flex;flex-direction:column;gap:4px;margin-bottom:12px">
            <strong style="font-size:14px;color:#0f172a">${options.title}</strong>
            <p style="margin:0;font-size:13px;color:#64748b;line-height:1.5">${options.description}</p>
        </div>
    `;

    if (options.body) {
        content.append(options.body);
    }

    return content;
}

function mountPopoverDemo(
    root: HTMLElement,
    id: string,
    options: {
        triggerLabel: string;
        triggerVariant?: 'default' | 'outline' | 'primary';
        placement?: string;
        withArrow?: boolean;
        content: HTMLElement;
    },
): void {
    const popover = document.createElement('pk-popover');
    popover.id = id;

    if (options.placement) {
        popover.setAttribute('placement', options.placement);
    }

    if (options.withArrow) {
        popover.setAttribute('with-arrow', '');
    }

    const trigger = createPkButton({
        label: options.triggerLabel,
        variant: options.triggerVariant ?? 'default',
    });
    trigger.setAttribute('slot', 'trigger');

    const contentHost = document.createElement('div');
    contentHost.append(options.content);

    popover.append(trigger, contentHost);
    root.append(popover);
}

/** Web component previews — one function per section id from popoverPlaygroundSpec. */
export const popoverWebSectionRenderers: PlaygroundSectionRendererMap = {
    basicUsage(preview) {
        mountPopoverDemo(preview, 'pg-popover-basic', {
            triggerLabel: basicUsage.triggerLabel,
            content: buildPopoverContent({
                title: basicUsage.title,
                description: basicUsage.descriptionText,
            }),
        });
    },

    placement(preview) {
        const row = document.createElement('div');
        row.id = 'pg-popover-placement';
        row.className = 'pg-card__inner--row';

        for (const side of placement.sides) {
            const group = document.createElement('div');
            const popover = document.createElement('pk-popover');
            popover.id = `pg-popover-${side}`;
            popover.setAttribute('placement', side);

            const trigger = createPkButton({
                label: side,
                variant: 'outline',
            });
            trigger.setAttribute('slot', 'trigger');

            const contentHost = document.createElement('div');
            contentHost.append(buildPopoverContent({
                title: `${side} popover`,
                description: 'Position popovers near the control they support.',
            }));

            popover.append(trigger, contentHost);
            group.append(popover);
            row.append(group);
        }

        preview.append(row);
    },

    withArrow(preview) {
        const row = document.createElement('div');
        row.id = 'pg-popover-with-arrow';
        row.className = 'pg-card__inner--row';

        for (const side of withArrow.sides) {
            const group = document.createElement('div');
            mountPopoverDemo(group, `pg-popover-arrow-${side}`, {
                triggerLabel: side,
                triggerVariant: 'outline',
                placement: side,
                withArrow: true,
                content: buildPopoverContent({
                    title: withArrow.contentTitle,
                    description: withArrow.contentDescription,
                }),
            });
            row.append(group);
        }

        preview.append(row);
    },

    formContent(preview) {
        const body = document.createElement('div');
        body.style.display = 'flex';
        body.style.flexDirection = 'column';
        body.style.gap = '12px';

        body.append(createPkInput({ value: formContent.inputValue }));

        const actions = document.createElement('div');
        actions.style.display = 'flex';
        actions.style.justifyContent = 'flex-end';
        actions.style.gap = '8px';
        actions.append(
            createPkButton({ label: 'Cancel' }),
            createPkButton({ label: 'Save', variant: 'primary' }),
        );

        body.append(actions);

        mountPopoverDemo(preview, 'pg-popover-form', {
            triggerLabel: formContent.triggerLabel,
            content: buildPopoverContent({
                title: formContent.titleText,
                description: formContent.descriptionText,
                body,
            }),
        });
    },
};
