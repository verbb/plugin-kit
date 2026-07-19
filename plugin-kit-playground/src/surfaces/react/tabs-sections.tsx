import React from 'react';
import { tabsPlaygroundSections } from '@verbb/plugin-kit-playground';

import { Icon } from '@verbb/plugin-kit-react/components';
import { Status } from '@verbb/plugin-kit-react/components';
import { Tab } from '@verbb/plugin-kit-react/components';
import { TabPanel } from '@verbb/plugin-kit-react/components';
import { Tabs } from '@verbb/plugin-kit-react/components';
import type { PlaygroundSectionReactRendererMap } from './shared/PlaygroundFromSpec.js';

type TabDefinition = {
    value: string;
    label: string;
    content: string;
    disabled?: boolean;
};

type TabsVariant = 'default' | 'pane' | 'modal' | 'sidebar';

function TabsDemo({
    variant = 'default',
    tabs,
    defaultValue,
    wrapperClass,
}: {
    variant?: TabsVariant;
    tabs: ReadonlyArray<TabDefinition>;
    defaultValue: string;
    wrapperClass?: string;
}) {
    const content = (
        <Tabs value={defaultValue} {...(variant !== 'default' ? { variant } : {})}>
            {tabs.map(({ value, label, content: panelContent, disabled }) => (
                <React.Fragment key={value}>
                    <Tab value={value} slot="nav" disabled={disabled}>{label}</Tab>
                    <TabPanel value={value}>{panelContent}</TabPanel>
                </React.Fragment>
            ))}
        </Tabs>
    );

    if (!wrapperClass) {
        return content;
    }

    return <div className={wrapperClass}>{content}</div>;
}

function VariantRow({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <div className="pg-tabs-variant-row">
            <div className="pg-tabs-variant-row__label">{label}</div>
            {children}
        </div>
    );
}

function SidebarTabsDemo({
    groups,
    defaultValue,
}: {
    groups: typeof tabsPlaygroundSections.sidebar.groups;
    defaultValue: string;
}) {
    return (
        <div className="pg-tabs-sidebar-demo">
            <Tabs value={defaultValue} variant="sidebar" aria-label="Sidebar">
                {groups.map((group) => (
                    <React.Fragment key={group.heading}>
                        {/* Native heading — thin React facade can follow when asked. */}
                        {React.createElement('pk-tab-heading', { slot: 'nav' }, group.heading)}
                        {group.tabs.map(({ value, label, icon, content }) => (
                            <React.Fragment key={value}>
                                <Tab value={value} slot="nav">
                                    <Icon slot="icon" icon={icon} aria-hidden />
                                    {label}
                                    <Status slot="status" status="inactive" aria-hidden />
                                </Tab>
                                <TabPanel value={value}>{content}</TabPanel>
                            </React.Fragment>
                        ))}
                    </React.Fragment>
                ))}
            </Tabs>
        </div>
    );
}

const { basic, pane, modal, sidebar, overflow } = tabsPlaygroundSections;

/** React previews — one function per section id from tabsPlaygroundSpec. */
export const tabsReactSectionRenderers: PlaygroundSectionReactRendererMap = {
    basic: () => (
        <TabsDemo variant="default" tabs={basic.tabs} defaultValue={basic.defaultValue} />
    ),

    pane: () => (
        <TabsDemo
            variant="pane"
            tabs={pane.tabs}
            defaultValue={pane.defaultValue}
            wrapperClass="pg-tabs-pane-demo"
        />
    ),

    modal: () => (
        <TabsDemo
            variant="modal"
            tabs={modal.tabs}
            defaultValue={modal.defaultValue}
            wrapperClass="pg-tabs-modal-demo"
        />
    ),

    sidebar: () => (
        <SidebarTabsDemo groups={sidebar.groups} defaultValue={sidebar.defaultValue} />
    ),

    overflow: () => (
        <div className="pg-demo-stack pg-demo-narrow">
            {overflow.variants.map(({ label, variant, wrapperClass }) => (
                <VariantRow key={variant} label={label}>
                    <TabsDemo
                        variant={variant}
                        tabs={overflow.tabs}
                        defaultValue={overflow.defaultValue}
                        wrapperClass={wrapperClass}
                    />
                </VariantRow>
            ))}
        </div>
    ),
};
