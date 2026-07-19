import React from 'react';
import { createPluginKitComponent } from '../utils/create-plugin-kit-component.js';
import { PkTooltip } from '@verbb/plugin-kit-web/components/tooltip/pk-tooltip.js';

/** React facade over `<pk-tooltip>`. Behavior and styles live in the web component. */
export const PkTooltipElement = createPluginKitComponent({
    tagName: 'pk-tooltip',
    elementClass: PkTooltip,
    react: React,
    events: {
        onPkShow: 'pk-show',
        onPkAfterShow: 'pk-after-show',
        onPkHide: 'pk-hide',
        onPkAfterHide: 'pk-after-hide',
        onPkOpenChange: 'pk-open-change',
    },
});

export const Tooltip = PkTooltipElement;
export type TooltipProps = React.ComponentProps<typeof PkTooltipElement>;
