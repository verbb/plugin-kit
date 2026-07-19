import { defineComponent, h, type Component } from 'vue';
import { dropdownMenuPlaygroundSections } from '@verbb/plugin-kit-playground';

import {
    Button,
    DropdownItem,
    DropdownLabel,
    DropdownMenu,
    DropdownSeparator,
    Icon,
} from '@verbb/plugin-kit-vue/components';

function ChevronTrigger(label: string) {
    return h(Button, { withCaret: true, 'aria-label': label }, () => label);
}

function AvatarTrigger(initials: string, id: string) {
    return h(
        'button',
        {
            type: 'button',
            slot: 'trigger',
            id,
            class: 'pg-dropdown-avatar',
            'aria-label': 'Open account menu',
        },
        initials,
    );
}

function IconTrigger() {
    return h(Button, { 'aria-label': 'Open menu' }, {
        start: () => h(Icon, { icon: 'ellipsis' }),
    });
}

function ActionsMenu(props: { triggerLabel?: string; size?: string }) {
    return h(
        DropdownMenu,
        { ...(props.size && props.size !== 'default' ? { size: props.size } : {}) },
        {
            trigger: () => ChevronTrigger(props.triggerLabel ?? 'Open menu'),
            default: () => [
                h(DropdownLabel, {}, () => 'Actions'),
                h(DropdownItem, { value: 'edit' }, () => 'Edit'),
                h(DropdownItem, { value: 'duplicate' }, () => 'Duplicate'),
                h(DropdownSeparator),
                h(DropdownItem, { value: 'delete', destructive: true }, () => 'Delete'),
            ],
        },
    );
}

/** Vue previews — one component per section id from dropdownMenuPlaygroundSpec. */
export const dropdownMenuVueSectionComponents: Record<string, Component> = {
    basicUsage: defineComponent({
        name: 'DropdownMenuBasicUsageSection',
        setup: () => () => {
            const { triggerLabel } = dropdownMenuPlaygroundSections.basicUsage;

            return h(DropdownMenu, {}, {
                trigger: () => ChevronTrigger(triggerLabel),
                default: () => [
                    h(DropdownItem, { value: 'edit' }, () => 'Edit'),
                    h(DropdownItem, { value: 'duplicate' }, () => 'Duplicate'),
                    h(DropdownSeparator),
                    h(DropdownItem, { value: 'delete', destructive: true }, () => 'Delete'),
                ],
            });
        },
    }),

    grouped: defineComponent({
        name: 'DropdownMenuGroupedSection',
        setup: () => () => {
            const { triggerLabel } = dropdownMenuPlaygroundSections.grouped;

            return h(DropdownMenu, {}, {
                trigger: () => ChevronTrigger(triggerLabel),
                default: () => [
                    h(DropdownLabel, {}, () => 'General'),
                    h(DropdownItem, { value: 'new-file', shortcut: '⌘N' }, () => 'New File'),
                    h(DropdownItem, { value: 'duplicate', shortcut: '⌘D' }, () => 'Duplicate'),
                    h(DropdownSeparator),
                    h(DropdownLabel, {}, () => 'Preferences'),
                    h(DropdownItem, { value: 'line-numbers', type: 'checkbox', checked: true }, () => 'Show line numbers'),
                    h(DropdownItem, { value: 'word-wrap', type: 'checkbox' }, () => 'Word wrap'),
                    h(DropdownSeparator),
                    h(DropdownLabel, {}, () => 'Theme'),
                    h(DropdownItem, { value: 'theme-light', type: 'radio', radioGroup: 'theme', checked: true }, () => 'Light'),
                    h(DropdownItem, { value: 'theme-dark', type: 'radio', radioGroup: 'theme' }, () => 'Dark'),
                    h(DropdownItem, { value: 'theme-system', type: 'radio', radioGroup: 'theme' }, () => 'System'),
                ],
            });
        },
    }),

    triggers: defineComponent({
        name: 'DropdownMenuTriggersSection',
        setup: () => () => h('div', { class: 'pg-card__inner pg-dropdown-triggers' }, [
            h(DropdownMenu, {}, {
                trigger: () => ChevronTrigger('Open menu'),
                default: () => [
                    h(DropdownItem, { value: 'profile' }, () => 'Profile'),
                    h(DropdownItem, { value: 'settings' }, () => 'Settings'),
                    h(DropdownSeparator),
                    h(DropdownItem, { value: 'sign-out' }, () => 'Sign out'),
                ],
            }),
            h(DropdownMenu, {}, {
                trigger: () => AvatarTrigger('JC', 'pg-dropdown-trigger-avatar'),
                default: () => [
                    h(DropdownItem, { value: 'profile' }, () => 'Profile'),
                    h(DropdownItem, { value: 'billing' }, () => 'Billing'),
                    h(DropdownSeparator),
                    h(DropdownItem, { value: 'sign-out' }, () => 'Sign out'),
                ],
            }),
            h(DropdownMenu, {}, {
                trigger: () => IconTrigger(),
                default: () => [
                    h(DropdownItem, { value: 'edit' }, () => 'Edit'),
                    h(DropdownItem, { value: 'duplicate' }, () => 'Duplicate'),
                    h(DropdownSeparator),
                    h(DropdownItem, { value: 'delete', destructive: true }, () => 'Delete'),
                ],
            }),
        ]),
    }),

    submenus: defineComponent({
        name: 'DropdownMenuSubmenusSection',
        setup: () => () => {
            const { triggerLabel } = dropdownMenuPlaygroundSections.submenus;

            return h(DropdownMenu, {}, {
                trigger: () => h(Button, {}, () => triggerLabel),
                default: () => [
                    h(DropdownLabel, {}, () => 'My Account'),
                    h(DropdownItem, { value: 'profile' }, () => 'Profile'),
                    h(DropdownItem, { value: 'billing' }, () => 'Billing'),
                    h(DropdownSeparator),
                    h(DropdownItem, { value: 'invite-users' }, {
                        default: () => 'Invite users',
                        submenu: () => [
                            h(DropdownItem, { value: 'invite-email' }, () => 'Email'),
                            h(DropdownItem, { value: 'invite-message' }, () => 'Message'),
                            h(DropdownSeparator),
                            h(DropdownItem, { value: 'invite-more' }, () => 'More options'),
                        ],
                    }),
                    h(DropdownItem, { value: 'new-team' }, () => 'New Team'),
                ],
            });
        },
    }),

    selection: defineComponent({
        name: 'DropdownMenuSelectionSection',
        setup: () => () => {
            const { triggerLabel } = dropdownMenuPlaygroundSections.selection;

            return h(DropdownMenu, {}, {
                trigger: () => ChevronTrigger(triggerLabel),
                default: () => [
                    h(DropdownLabel, {}, () => 'Display'),
                    h(DropdownItem, { value: 'show-archived', type: 'checkbox' }, () => 'Show archived'),
                    h(DropdownSeparator),
                    h(DropdownLabel, {}, () => 'Sort by'),
                    h(DropdownItem, { value: 'sort-updated', type: 'radio', radioGroup: 'sort', checked: true }, () => 'Recently updated'),
                    h(DropdownItem, { value: 'sort-name', type: 'radio', radioGroup: 'sort' }, () => 'Name'),
                    h(DropdownItem, { value: 'sort-status', type: 'radio', radioGroup: 'sort' }, () => 'Status'),
                    h(DropdownSeparator),
                    h(DropdownItem, { value: 'delete-selected', destructive: true }, () => 'Delete selected'),
                ],
            });
        },
    }),

    disabledItems: defineComponent({
        name: 'DropdownMenuDisabledItemsSection',
        setup: () => () => {
            const { triggerLabel } = dropdownMenuPlaygroundSections.disabledItems;

            return h(DropdownMenu, {}, {
                trigger: () => ChevronTrigger(triggerLabel),
                default: () => [
                    h(DropdownItem, { value: 'edit' }, () => 'Edit'),
                    h(DropdownItem, { value: 'make-required' }, () => 'Make required'),
                    h(DropdownItem, { value: 'duplicate' }, () => 'Duplicate'),
                    h(DropdownSeparator),
                    h(DropdownItem, { value: 'move-up', disabled: true }, () => 'Move up'),
                    h(DropdownItem, { value: 'move-down', disabled: true }, () => 'Move down'),
                    h(DropdownItem, { value: 'move-left', disabled: true }, () => 'Move left'),
                    h(DropdownItem, { value: 'move-right', disabled: true }, () => 'Move right'),
                    h(DropdownSeparator),
                    h(DropdownItem, { value: 'delete', destructive: true }, () => 'Delete'),
                ],
            });
        },
    }),

    icons: defineComponent({
        name: 'DropdownMenuIconsSection',
        setup: () => () => h(DropdownMenu, {}, {
            trigger: () => IconTrigger(),
            default: () => [
                h(DropdownItem, { value: 'edit' }, {
                    prefix: () => h(Icon, { icon: 'pen' }),
                    default: () => 'Edit',
                }),
                h(DropdownItem, { value: 'make-required' }, {
                    prefix: () => h(Icon, { icon: 'asterisk' }),
                    default: () => 'Make required',
                }),
                h(DropdownItem, { value: 'duplicate' }, {
                    prefix: () => h(Icon, { icon: 'copy' }),
                    default: () => 'Duplicate',
                }),
                h(DropdownSeparator),
                h(DropdownItem, { value: 'move-up' }, {
                    prefix: () => h(Icon, { icon: 'arrow-up' }),
                    default: () => 'Move up',
                }),
                h(DropdownItem, { value: 'move-down' }, {
                    prefix: () => h(Icon, { icon: 'arrow-down' }),
                    default: () => 'Move down',
                }),
                h(DropdownItem, { value: 'move-left' }, {
                    prefix: () => h(Icon, { icon: 'arrow-left' }),
                    default: () => 'Move left',
                }),
                h(DropdownItem, { value: 'move-right' }, {
                    prefix: () => h(Icon, { icon: 'arrow-right' }),
                    default: () => 'Move right',
                }),
                h(DropdownSeparator),
                h(DropdownItem, { value: 'delete', destructive: true }, {
                    prefix: () => h(Icon, { icon: 'xmark' }),
                    default: () => 'Delete',
                }),
            ],
        }),
    }),

    sizes: defineComponent({
        name: 'DropdownMenuSizesSection',
        setup: () => () => h('div', { class: 'pg-card__inner pg-card__inner--row pg-dropdown-sizes' },
            (['xs', 'sm', 'default', 'lg', 'xl'] as const).map((size) => h('div', { class: 'pg-dropdown-size-item', key: size }, [
                ActionsMenu({ triggerLabel: 'Open', size }),
                h('span', { class: 'pg-dropdown-size-label' }, size),
            ])),
        ),
    }),
};
