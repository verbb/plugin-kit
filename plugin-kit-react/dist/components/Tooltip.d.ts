import { default as React } from 'react';
import { PkTooltip } from '@verbb/plugin-kit-web/components/tooltip/pk-tooltip.js';
/** React facade over `<pk-tooltip>`. Behavior and styles live in the web component. */
export declare const PkTooltipElement: import('@lit/react').ReactWebComponent<PkTooltip, {
    onPkShow: string;
    onPkAfterShow: string;
    onPkHide: string;
    onPkAfterHide: string;
    onPkOpenChange: string;
}>;
export declare const Tooltip: import('@lit/react').ReactWebComponent<PkTooltip, {
    onPkShow: string;
    onPkAfterShow: string;
    onPkHide: string;
    onPkAfterHide: string;
    onPkOpenChange: string;
}>;
export type TooltipProps = React.ComponentProps<typeof PkTooltipElement>;
//# sourceMappingURL=Tooltip.d.ts.map