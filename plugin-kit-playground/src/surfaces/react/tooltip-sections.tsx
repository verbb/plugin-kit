import { tooltipPlaygroundSections } from '@verbb/plugin-kit-playground';

import { Button } from '@verbb/plugin-kit-react/components';
import { Tooltip } from '@verbb/plugin-kit-react/components';
import type { PlaygroundSectionReactRendererMap } from './shared/PlaygroundFromSpec.js';

function TooltipDemo({
    id,
    triggerLabel,
    content,
    triggerVariant = 'default',
    placement,
}: {
    id: string;
    triggerLabel: string;
    content: string;
    triggerVariant?: string;
    placement?: string;
}) {
    return (
        <Tooltip id={id} content={content} {...(placement ? { placement } : {})}>
            <Button slot="trigger" variant={triggerVariant as never}>
                {triggerLabel}
            </Button>
        </Tooltip>
    );
}

/** React previews — one function per section id from tooltipPlaygroundSpec. */
export const tooltipReactSectionRenderers: PlaygroundSectionReactRendererMap = {
    basicUsage: () => {
        const { triggerLabel, content } = tooltipPlaygroundSections.basicUsage;

        return (
            <TooltipDemo
                id="pg-tooltip-basic"
                triggerLabel={triggerLabel}
                content={content}
            />
        );
    },

    actionHints: () => {
        const { triggerLabel, content } = tooltipPlaygroundSections.actionHints;

        return (
            <TooltipDemo
                id="pg-tooltip-action"
                triggerLabel={triggerLabel}
                content={content}
                triggerVariant="outline"
            />
        );
    },

    placement: () => (
        <div id="pg-tooltip-placement" className="pg-card__inner--row">
            {tooltipPlaygroundSections.placement.sides.map((side) => (
                <TooltipDemo
                    key={side}
                    id={`pg-tooltip-${side}`}
                    triggerLabel={side}
                    content={`Tooltip on the ${side}`}
                    triggerVariant="outline"
                    placement={side}
                />
            ))}
        </div>
    ),

    keyboard: () => {
        const { triggerLabel, content } = tooltipPlaygroundSections.keyboard;

        return (
            <TooltipDemo
                id="pg-tooltip-keyboard"
                triggerLabel={triggerLabel}
                content={content}
                triggerVariant="transparent"
            />
        );
    },
};
