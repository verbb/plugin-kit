import { default as React } from 'react';
import { PkScrollArea, PkScrollAreaOrientation, PkScrollAreaSize } from '@verbb/plugin-kit-web/components/scroll-area/pk-scroll-area.js';
/** React facade over `<pk-scroll-area>`. Behavior and styles live in the web component. */
export declare const PkScrollAreaElement: import('@lit/react').ReactWebComponent<PkScrollArea, {
    onPkScroll: string;
}>;
export declare const ScrollArea: import('@lit/react').ReactWebComponent<PkScrollArea, {
    onPkScroll: string;
}>;
export type ScrollAreaProps = React.ComponentProps<typeof PkScrollAreaElement>;
export type { PkScrollAreaOrientation, PkScrollAreaSize };
//# sourceMappingURL=ScrollArea.d.ts.map