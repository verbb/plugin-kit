import React from 'react';
import { popoverPlaygroundSections } from '@verbb/plugin-kit-playground';

import { Button } from '@verbb/plugin-kit-react/components';
import { Input } from '@verbb/plugin-kit-react/components';
import { Popover } from '@verbb/plugin-kit-react/components';
import type { PlaygroundSectionReactRendererMap } from './shared/PlaygroundFromSpec.js';

const { basicUsage, placement, formContent, withArrow } = popoverPlaygroundSections;

function PopoverContent({
    title,
    description,
    body,
}: {
    title: string;
    description: string;
    body?: React.ReactNode;
}) {
    return (
        <div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 12 }}>
                <strong style={{ fontSize: 14, color: '#0f172a' }}>{title}</strong>
                <p style={{ margin: 0, fontSize: 13, color: '#64748b', lineHeight: 1.5 }}>{description}</p>
            </div>
            {body}
        </div>
    );
}

function PopoverDemo({
    id,
    triggerLabel,
    triggerVariant = 'default',
    placement: side,
    withArrow: showArrow = false,
    content,
}: {
    id: string;
    triggerLabel: string;
    triggerVariant?: 'default' | 'outline' | 'primary';
    placement?: string;
    withArrow?: boolean;
    content: React.ReactNode;
}) {
    return (
        <Popover
            id={id}
            {...(side ? { placement: side } : {})}
            {...(showArrow ? { withArrow: true } : {})}
        >
            <Button slot="trigger" variant={triggerVariant}>{triggerLabel}</Button>
            {content}
        </Popover>
    );
}

/** React previews — one function per section id from popoverPlaygroundSpec. */
export const popoverReactSectionRenderers: PlaygroundSectionReactRendererMap = {
    basicUsage: () => (
        <PopoverDemo
            id="pg-popover-basic"
            triggerLabel={basicUsage.triggerLabel}
            content={(
                <PopoverContent
                    title={basicUsage.title}
                    description={basicUsage.descriptionText}
                />
            )}
        />
    ),

    placement: () => (
        <div id="pg-popover-placement" className="pg-card__inner--row">
            {placement.sides.map((side) => (
                <PopoverDemo
                    key={side}
                    id={`pg-popover-${side}`}
                    triggerLabel={side}
                    triggerVariant="outline"
                    placement={side}
                    content={(
                        <PopoverContent
                            title={`${side} popover`}
                            description="Position popovers near the control they support."
                        />
                    )}
                />
            ))}
        </div>
    ),

    withArrow: () => (
        <div id="pg-popover-with-arrow" className="pg-card__inner--row">
            {withArrow.sides.map((side) => (
                <PopoverDemo
                    key={side}
                    id={`pg-popover-arrow-${side}`}
                    triggerLabel={side}
                    triggerVariant="outline"
                    placement={side}
                    withArrow
                    content={(
                        <PopoverContent
                            title={withArrow.contentTitle}
                            description={withArrow.contentDescription}
                        />
                    )}
                />
            ))}
        </div>
    ),

    formContent: () => (
        <PopoverDemo
            id="pg-popover-form"
            triggerLabel={formContent.triggerLabel}
            content={(
                <PopoverContent
                    title={formContent.titleText}
                    description={formContent.descriptionText}
                    body={(
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                            <Input value={formContent.inputValue} />
                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
                                <Button>Cancel</Button>
                                <Button variant="primary">Save</Button>
                            </div>
                        </div>
                    )}
                />
            )}
        />
    ),
};
