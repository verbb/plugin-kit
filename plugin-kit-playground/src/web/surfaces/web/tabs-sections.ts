import { tabsPlaygroundSections } from '../../../catalog/data/meta-tabs.js';
import type { PlaygroundSectionRendererMap } from '../../../catalog/types.js';

type TabDefinition = {
    value: string;
    label: string;
    content: string;
    disabled?: boolean;
};

type TabsVariant = 'default' | 'pane' | 'modal' | 'sidebar';

function mountTabs(
    variant: TabsVariant,
    tabs: ReadonlyArray<TabDefinition>,
    defaultValue: string,
): HTMLElement {
    const root = document.createElement('pk-tabs');
    root.value = defaultValue;

    if (variant !== 'default') {
        root.setAttribute('variant', variant);
    }

    for (const { value, label, content, disabled } of tabs) {
        const tab = document.createElement('pk-tab');
        tab.value = value;
        tab.textContent = label;
        tab.slot = 'nav';

        if (disabled) {
            tab.setAttribute('disabled', '');
        }

        const panel = document.createElement('pk-tab-panel');
        panel.value = value;
        panel.textContent = content;

        root.append(tab, panel);
    }

    return root;
}

function mountSidebarTabs(
    groups: typeof tabsPlaygroundSections.sidebar.groups,
    defaultValue: string,
): HTMLElement {
    const root = document.createElement('pk-tabs');
    root.value = defaultValue;
    root.setAttribute('variant', 'sidebar');
    root.setAttribute('aria-label', 'Sidebar');

    for (const group of groups) {
        const heading = document.createElement('pk-tab-heading');
        heading.slot = 'nav';
        heading.textContent = group.heading;
        root.append(heading);

        for (const { value, label, icon, content } of group.tabs) {
            const tab = document.createElement('pk-tab');
            tab.value = value;
            tab.slot = 'nav';

            const iconEl = document.createElement('pk-icon');
            iconEl.setAttribute('icon', icon);
            iconEl.setAttribute('slot', 'icon');
            iconEl.setAttribute('aria-hidden', 'true');

            const status = document.createElement('pk-status');
            status.setAttribute('status', 'inactive');
            status.setAttribute('slot', 'status');
            status.setAttribute('aria-hidden', 'true');

            tab.append(iconEl, document.createTextNode(label), status);

            const panel = document.createElement('pk-tab-panel');
            panel.value = value;
            panel.textContent = content;

            root.append(tab, panel);
        }
    }

    return root;
}

function createVariantRow(label: string, control: HTMLElement): HTMLElement {
    const row = document.createElement('div');
    row.className = 'pg-tabs-variant-row';
    const text = document.createElement('div');
    text.className = 'pg-tabs-variant-row__label';
    text.textContent = label;
    row.append(text, control);
    return row;
}

const { basic, pane, modal, sidebar, overflow } = tabsPlaygroundSections;

/** Web component previews — one function per section id from tabsPlaygroundSpec. */
export const tabsWebSectionRenderers: PlaygroundSectionRendererMap = {
    basic(preview) {
        preview.append(mountTabs('default', basic.tabs, basic.defaultValue));
    },

    pane(preview) {
        const wrap = document.createElement('div');
        wrap.className = 'pg-tabs-pane-demo';
        wrap.append(mountTabs('pane', pane.tabs, pane.defaultValue));
        preview.append(wrap);
    },

    modal(preview) {
        const wrap = document.createElement('div');
        wrap.className = 'pg-tabs-modal-demo';
        wrap.append(mountTabs('modal', modal.tabs, modal.defaultValue));
        preview.append(wrap);
    },

    sidebar(preview) {
        const wrap = document.createElement('div');
        wrap.className = 'pg-tabs-sidebar-demo';
        wrap.append(mountSidebarTabs(sidebar.groups, sidebar.defaultValue));
        preview.append(wrap);
    },

    overflow(preview) {
        const stack = document.createElement('div');
        stack.className = 'pg-demo-stack pg-demo-narrow';

        for (const { label, variant, wrapperClass } of overflow.variants) {
            const wrap = document.createElement('div');
            wrap.className = wrapperClass;
            wrap.append(mountTabs(variant, overflow.tabs, overflow.defaultValue));
            stack.append(createVariantRow(label, wrap));
        }

        preview.append(stack);
    },
};
