import { default as React } from 'react';
import { PkTab } from '@verbb/plugin-kit-web/components/tabs/pk-tab.js';
import { PkTabHeading } from '@verbb/plugin-kit-web/components/tabs/pk-tab-heading.js';
import { PkTabPanel } from '@verbb/plugin-kit-web/components/tabs/pk-tab-panel.js';
import { PkTabs, PkTabsActivation, PkTabsOrientation, PkTabsPlacement, PkTabsVariant } from '@verbb/plugin-kit-web/components/tabs/pk-tabs.js';
/** React facades over the `<pk-tabs>` family. Behavior and styles live in the web components. */
declare const PkTabsElement: import('@lit/react').ReactWebComponent<PkTabs, {
    onPkChange: string;
    onPkTabShow: string;
    onPkTabHide: string;
}>;
export declare const PkTabElement: import('@lit/react').ReactWebComponent<PkTab, {
    onPkTabSelect: string;
    onPkTabKeydown: string;
}>;
export declare const PkTabHeadingElement: import('@lit/react').ReactWebComponent<PkTabHeading, {}>;
export declare const PkTabPanelElement: import('@lit/react').ReactWebComponent<PkTabPanel, {}>;
export type TabsProps = React.ComponentProps<typeof PkTabsElement>;
export type TabProps = React.ComponentProps<typeof PkTabElement>;
export type TabHeadingProps = React.ComponentProps<typeof PkTabHeadingElement>;
export type TabPanelProps = React.ComponentProps<typeof PkTabPanelElement>;
export type { PkTabsActivation, PkTabsOrientation, PkTabsPlacement, PkTabsVariant };
/** React facade over `<pk-tabs>` — only forwards host-originated tab events. */
export declare function Tabs({ onPkChange, onPkTabShow, onPkTabHide, ...props }: TabsProps): import("react/jsx-runtime").JSX.Element;
export declare const Tab: import('@lit/react').ReactWebComponent<PkTab, {
    onPkTabSelect: string;
    onPkTabKeydown: string;
}>;
export declare const TabHeading: import('@lit/react').ReactWebComponent<PkTabHeading, {}>;
export declare const TabPanel: import('@lit/react').ReactWebComponent<PkTabPanel, {}>;
export { PkTabsElement };
//# sourceMappingURL=Tabs.d.ts.map