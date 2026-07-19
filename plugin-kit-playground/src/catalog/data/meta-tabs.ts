export const tabsPlaygroundMeta = {
    eyebrow: 'Components',
    title: 'Tabs',
    description: 'Tabbed panel switching.',
} as const;

export const tabsOverflowItems = [
    { value: 'general', label: 'General', content: 'General content' },
    { value: 'content', label: 'Content', content: 'Content settings' },
    { value: 'notifications', label: 'Notifications', content: 'Notification settings' },
    { value: 'integrations', label: 'Integrations', content: 'Integration settings' },
    { value: 'advanced', label: 'Advanced', content: 'Advanced settings', disabled: true },
] as const;

export const tabsSidebarGroups = [
    {
        heading: 'CRM',
        tabs: [
            { value: 'hubspot', label: 'HubSpot', icon: 'gear', content: 'HubSpot integration settings' },
        ],
    },
    {
        heading: 'Email marketing',
        tabs: [
            { value: 'mailchimp', label: 'Mailchimp', icon: 'share', content: 'Mailchimp integration settings' },
        ],
    },
    {
        heading: 'Elements',
        tabs: [
            { value: 'entries', label: 'Entries', icon: 'list', content: 'Entries settings' },
            { value: 'users', label: 'Users', icon: 'house', content: 'Users settings' },
        ],
    },
] as const;

export const tabsPlaygroundSections = {
    basic: {
        title: 'Basic usage',
        description: 'Default variant.',
        tabs: [
            { value: 'general', label: 'General', content: 'General content' },
            { value: 'settings', label: 'Settings', content: 'Settings content' },
            { value: 'advanced', label: 'Advanced', content: 'Advanced content' },
        ],
        defaultValue: 'general',
    },
    pane: {
        title: 'Pane tabs',
        description: 'Pane variant — tab list and content in one panel.',
        tabs: [
            { value: 'tab1', label: 'Tab One', content: 'Pane tab one content' },
            { value: 'tab2', label: 'Tab Two', content: 'Pane tab two content' },
        ],
        defaultValue: 'tab1',
    },
    modal: {
        title: 'Modal tabs',
        description: 'Modal variant inside dialog layouts.',
        tabs: [
            { value: 'details', label: 'Details', content: 'Modal tab details content' },
            { value: 'layout', label: 'Layout', content: 'Modal tab layout content' },
        ],
        defaultValue: 'details',
    },
    sidebar: {
        title: 'Sidebar tabs',
        description: 'Vertical sidebar nav with headings, icons, and status slots.',
        groups: tabsSidebarGroups,
        defaultValue: 'hubspot',
    },
    overflow: {
        title: 'Disabled and overflow',
        description: 'Disabled tabs and scrollable tab lists — default, pane, and modal variants.',
        tabs: tabsOverflowItems,
        defaultValue: 'general',
        variants: [
            { label: 'Default', variant: 'default' as const, wrapperClass: 'pg-tabs-overflow-demo' },
            { label: 'Pane', variant: 'pane' as const, wrapperClass: 'pg-tabs-pane-demo pg-tabs-overflow-demo' },
            { label: 'Modal', variant: 'modal' as const, wrapperClass: 'pg-tabs-modal-demo pg-tabs-overflow-demo' },
        ],
    },
} as const;
