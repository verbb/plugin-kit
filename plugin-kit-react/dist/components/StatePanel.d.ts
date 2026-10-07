import { default as React } from 'react';
import { PkStatePanel } from '@verbb/plugin-kit-web/components/state-panel/pk-state-panel.js';
/** React facade over `<pk-state-panel>`. Behaviour and styles live in the web component. */
export declare const PkStatePanelElement: import('@lit/react').ReactWebComponent<PkStatePanel, {
    onPkCopy: string;
    onPkCopyError: string;
}>;
export declare const StatePanel: import('@lit/react').ReactWebComponent<PkStatePanel, {
    onPkCopy: string;
    onPkCopyError: string;
}>;
export type StatePanelProps = React.ComponentProps<typeof PkStatePanelElement>;
//# sourceMappingURL=StatePanel.d.ts.map