import { defineComponent, h, type Component, type VNodeChild } from 'vue';
import { tabsPlaygroundSections } from '@verbb/plugin-kit-playground';

import { Icon, Status, Tab, TabPanel, Tabs } from '@verbb/plugin-kit-vue/components';

type TabDefinition = {
    value: string;
    label: string;
    content: string;
    disabled?: boolean;
};

type TabsVariant = 'default' | 'pane' | 'modal' | 'sidebar';

function TabsDemo(props: {
    variant?: TabsVariant;
    tabs: ReadonlyArray<TabDefinition>;
    defaultValue: string;
    wrapperClass?: string;
}) {
    const content = h(
        Tabs,
        {
            value: props.defaultValue,
            ...(props.variant !== 'default' ? { variant: props.variant } : {}),
        },
        () => props.tabs.flatMap(({ value, label, content: panelContent, disabled }) => [
            h(Tab, { key: `${value}-nav`, value, disabled, slot: 'nav' }, () => label),
            h(TabPanel, { key: `${value}-panel`, value }, () => panelContent),
        ]),
    );

    if (!props.wrapperClass) {
        return content;
    }

    return h('div', { class: props.wrapperClass }, [content]);
}

function VariantRow(props: { label: string; children: VNodeChild }) {
    return h('div', { class: 'pg-tabs-variant-row' }, [
        h('div', { class: 'pg-tabs-variant-row__label' }, props.label),
        props.children,
    ]);
}

function SidebarTabsDemo(props: {
    groups: typeof tabsPlaygroundSections.sidebar.groups;
    defaultValue: string;
}) {
    return h('div', { class: 'pg-tabs-sidebar-demo' }, [
        h(Tabs, { value: props.defaultValue, variant: 'sidebar', 'aria-label': 'Sidebar' }, () =>
            props.groups.flatMap((group) => [
                h('pk-tab-heading', { key: `${group.heading}-heading`, slot: 'nav' }, () => group.heading),
                ...group.tabs.flatMap(({ value, label, icon, content }) => [
                    h(Tab, { key: `${value}-nav`, value, slot: 'nav' }, () => [
                        h(Icon, { slot: 'icon', icon, 'aria-hidden': true }),
                        label,
                        h(Status, { slot: 'status', status: 'inactive', 'aria-hidden': true }),
                    ]),
                    h(TabPanel, { key: `${value}-panel`, value }, () => content),
                ]),
            ]),
        ),
    ]);
}

const { basic, pane, modal, sidebar, overflow } = tabsPlaygroundSections;

/** Vue previews — one component per section id from tabsPlaygroundSpec. */
export const tabsVueSectionComponents: Record<string, Component> = {
    basic: defineComponent({
        name: 'TabsBasicSection',
        setup: () => () => TabsDemo({ variant: 'default', tabs: basic.tabs, defaultValue: basic.defaultValue }),
    }),

    pane: defineComponent({
        name: 'TabsPaneSection',
        setup: () => () => TabsDemo({
            variant: 'pane',
            tabs: pane.tabs,
            defaultValue: pane.defaultValue,
            wrapperClass: 'pg-tabs-pane-demo',
        }),
    }),

    modal: defineComponent({
        name: 'TabsModalSection',
        setup: () => () => TabsDemo({
            variant: 'modal',
            tabs: modal.tabs,
            defaultValue: modal.defaultValue,
            wrapperClass: 'pg-tabs-modal-demo',
        }),
    }),

    sidebar: defineComponent({
        name: 'TabsSidebarSection',
        setup: () => () => SidebarTabsDemo({
            groups: sidebar.groups,
            defaultValue: sidebar.defaultValue,
        }),
    }),

    overflow: defineComponent({
        name: 'TabsOverflowSection',
        setup: () => () => h('div', { class: 'pg-demo-stack pg-demo-narrow' },
            overflow.variants.map(({ label, variant, wrapperClass }) => VariantRow({
                label,
                children: TabsDemo({
                    variant,
                    tabs: overflow.tabs,
                    defaultValue: overflow.defaultValue,
                    wrapperClass,
                }),
            })),
        ),
    }),
};
