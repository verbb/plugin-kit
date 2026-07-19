import { createPkComponent } from '../createPkComponent.js';
import '@verbb/plugin-kit-web/components/tooltip.js';

/** Vue facade over `<pk-tooltip>`. Behavior and styles live in the web component. */
export const Tooltip = createPkComponent({
    name: 'PkTooltip',
    tagName: 'pk-tooltip',
});

export const PkTooltipElement = Tooltip;

export type TooltipProps = Record<string, unknown>;
