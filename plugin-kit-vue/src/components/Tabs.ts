import { createPkComponentFamily } from '../createPkComponent.js';
import '@verbb/plugin-kit-web/components/tabs.js';

/** Vue facades over the `<pk-tabs>` family. Behavior and styles live in the web components. */
const family = createPkComponentFamily({
    Tabs: 'pk-tabs',
    Tab: 'pk-tab',
    TabHeading: 'pk-tab-heading',
    TabPanel: 'pk-tab-panel',
});

export const Tabs = family.Tabs;
export const PkTabsElement = Tabs;
export const Tab = family.Tab;
export const PkTabElement = Tab;
export const TabHeading = family.TabHeading;
export const PkTabHeadingElement = TabHeading;
export const TabPanel = family.TabPanel;
export const PkTabPanelElement = TabPanel;

export type TabsProps = Record<string, unknown>;
export type TabProps = Record<string, unknown>;
export type TabHeadingProps = Record<string, unknown>;
export type TabPanelProps = Record<string, unknown>;
