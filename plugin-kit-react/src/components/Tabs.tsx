import React from 'react';
import { createPluginKitComponent } from '../utils/create-plugin-kit-component.js';
import { PkTab } from '@verbb/plugin-kit-web/components/tabs/pk-tab.js';
import { PkTabHeading } from '@verbb/plugin-kit-web/components/tabs/pk-tab-heading.js';
import { PkTabPanel } from '@verbb/plugin-kit-web/components/tabs/pk-tab-panel.js';
import {
    PkTabs,
    type PkTabsActivation,
    type PkTabsOrientation,
    type PkTabsPlacement,
    type PkTabsVariant,
} from '@verbb/plugin-kit-web/components/tabs/pk-tabs.js';

import { isHostEvent } from '../utils/isHostEvent.js';

/** React facades over the `<pk-tabs>` family. Behavior and styles live in the web components. */
const PkTabsElement = createPluginKitComponent({
    tagName: 'pk-tabs',
    elementClass: PkTabs,
    react: React,
    events: {
        onPkChange: 'pk-change',
        onPkTabShow: 'pk-tab-show',
        onPkTabHide: 'pk-tab-hide',
    },
});

export const PkTabElement = createPluginKitComponent({
    tagName: 'pk-tab',
    elementClass: PkTab,
    react: React,
    events: {
        onPkTabSelect: 'pk-tab-select',
        onPkTabKeydown: 'pk-tab-keydown',
    },
});

export const PkTabHeadingElement = createPluginKitComponent({
    tagName: 'pk-tab-heading',
    elementClass: PkTabHeading,
    react: React,
});

export const PkTabPanelElement = createPluginKitComponent({
    tagName: 'pk-tab-panel',
    elementClass: PkTabPanel,
    react: React,
});

export type TabsProps = React.ComponentProps<typeof PkTabsElement>;
export type TabProps = React.ComponentProps<typeof PkTabElement>;
export type TabHeadingProps = React.ComponentProps<typeof PkTabHeadingElement>;
export type TabPanelProps = React.ComponentProps<typeof PkTabPanelElement>;
export type { PkTabsActivation, PkTabsOrientation, PkTabsPlacement, PkTabsVariant };

/** React facade over `<pk-tabs>` — only forwards host-originated tab events. */
export function Tabs({
    onPkChange,
    onPkTabShow,
    onPkTabHide,
    ...props
}: TabsProps) {
    return (
        <PkTabsElement
            {...props}
            {...(onPkChange ? {
                onPkChange: (event: Event) => {
                    if (!isHostEvent(event)) {
                        return;
                    }
                    onPkChange(event as Parameters<NonNullable<TabsProps['onPkChange']>>[0]);
                },
            } : {})}
            {...(onPkTabShow ? {
                onPkTabShow: (event: Event) => {
                    if (!isHostEvent(event)) {
                        return;
                    }
                    onPkTabShow(event as Parameters<NonNullable<TabsProps['onPkTabShow']>>[0]);
                },
            } : {})}
            {...(onPkTabHide ? {
                onPkTabHide: (event: Event) => {
                    if (!isHostEvent(event)) {
                        return;
                    }
                    onPkTabHide(event as Parameters<NonNullable<TabsProps['onPkTabHide']>>[0]);
                },
            } : {})}
        />
    );
}

export const Tab = PkTabElement;
export const TabHeading = PkTabHeadingElement;
export const TabPanel = PkTabPanelElement;
export { PkTabsElement };
