import {
    dropdownMenuPlaygroundSections,
} from '../../../catalog/data/meta-dropdown-menu.js';
import {
    playgroundIconAsterisk,
    playgroundIconArrowDown,
    playgroundIconArrowLeft,
    playgroundIconArrowRight,
    playgroundIconArrowUp,
    playgroundIconCopy,
    playgroundIconEllipsis,
    playgroundIconPen,
    playgroundIconXmark,
} from '../../../catalog/data/icons.js';
import type { PlaygroundSectionRendererMap } from '../../../catalog/types.js';

import {
    createPkButton,
    createPkDropdownItem,
    createPkDropdownLabel,
    createPkDropdownMenu,
    createPkDropdownSeparator,
} from '../../dom.js';

function createChevronTrigger(label: string): HTMLElement {
    return createPkButton({
        label,
        withCaret: true,
        ariaLabel: label,
    });
}

function createAvatarTrigger(initials: string, id: string): HTMLElement {
    const button = document.createElement('button');
    button.type = 'button';
    button.id = id;
    button.className = 'pg-dropdown-avatar';
    button.setAttribute('aria-label', 'Open account menu');
    button.textContent = initials;
    return button;
}

function createIconTrigger(): HTMLElement {
    return createPkButton({
        ariaLabel: 'Open menu',
        startSlot: playgroundIconEllipsis,
    });
}

/** Web component previews — one function per section id from dropdownMenuPlaygroundSpec. */
export const dropdownMenuWebSectionRenderers: PlaygroundSectionRendererMap = {
    basicUsage(preview) {
        const { triggerLabel } = dropdownMenuPlaygroundSections.basicUsage;
        preview.append(createPkDropdownMenu(
            createChevronTrigger(triggerLabel),
            createPkDropdownItem({ label: 'Edit', value: 'edit' }),
            createPkDropdownItem({ label: 'Duplicate', value: 'duplicate' }),
            createPkDropdownSeparator(),
            createPkDropdownItem({ label: 'Delete', value: 'delete', destructive: true }),
        ));
    },

    grouped(preview) {
        const { triggerLabel } = dropdownMenuPlaygroundSections.grouped;
        preview.append(createPkDropdownMenu(
            createChevronTrigger(triggerLabel),
            createPkDropdownLabel('General'),
            createPkDropdownItem({ label: 'New File', value: 'new-file', shortcut: '⌘N' }),
            createPkDropdownItem({ label: 'Duplicate', value: 'duplicate', shortcut: '⌘D' }),
            createPkDropdownSeparator(),
            createPkDropdownLabel('Preferences'),
            createPkDropdownItem({
                label: 'Show line numbers',
                value: 'line-numbers',
                type: 'checkbox',
                checked: true,
            }),
            createPkDropdownItem({
                label: 'Word wrap',
                value: 'word-wrap',
                type: 'checkbox',
            }),
            createPkDropdownSeparator(),
            createPkDropdownLabel('Theme'),
            createPkDropdownItem({
                label: 'Light',
                value: 'theme-light',
                type: 'radio',
                radioGroup: 'theme',
                checked: true,
            }),
            createPkDropdownItem({
                label: 'Dark',
                value: 'theme-dark',
                type: 'radio',
                radioGroup: 'theme',
            }),
            createPkDropdownItem({
                label: 'System',
                value: 'theme-system',
                type: 'radio',
                radioGroup: 'theme',
            }),
        ));
    },

    triggers(preview) {
        preview.className = 'pg-card__inner pg-dropdown-triggers';

        preview.append(
            createPkDropdownMenu(
                createChevronTrigger('Open menu'),
                createPkDropdownItem({ label: 'Profile', value: 'profile' }),
                createPkDropdownItem({ label: 'Settings', value: 'settings' }),
                createPkDropdownSeparator(),
                createPkDropdownItem({ label: 'Sign out', value: 'sign-out' }),
            ),
            createPkDropdownMenu(
                createAvatarTrigger('JC', 'pg-dropdown-trigger-avatar'),
                createPkDropdownItem({ label: 'Profile', value: 'profile' }),
                createPkDropdownItem({ label: 'Billing', value: 'billing' }),
                createPkDropdownSeparator(),
                createPkDropdownItem({ label: 'Sign out', value: 'sign-out' }),
            ),
            createPkDropdownMenu(
                createIconTrigger(),
                createPkDropdownItem({ label: 'Edit', value: 'edit' }),
                createPkDropdownItem({ label: 'Duplicate', value: 'duplicate' }),
                createPkDropdownSeparator(),
                createPkDropdownItem({ label: 'Delete', value: 'delete', destructive: true }),
            ),
        );
    },

    submenus(preview) {
        const { triggerLabel } = dropdownMenuPlaygroundSections.submenus;
        preview.append(createPkDropdownMenu(
            createPkButton({ label: triggerLabel }),
            createPkDropdownLabel('My Account'),
            createPkDropdownItem({ label: 'Profile', value: 'profile' }),
            createPkDropdownItem({ label: 'Billing', value: 'billing' }),
            createPkDropdownSeparator(),
            createPkDropdownItem(
                { label: 'Invite users', value: 'invite-users' },
                createPkDropdownItem({ label: 'Email', value: 'invite-email' }),
                createPkDropdownItem({ label: 'Message', value: 'invite-message' }),
                createPkDropdownSeparator(),
                createPkDropdownItem({ label: 'More options', value: 'invite-more' }),
            ),
            createPkDropdownItem({ label: 'New Team', value: 'new-team' }),
        ));
    },

    selection(preview) {
        const { triggerLabel } = dropdownMenuPlaygroundSections.selection;
        preview.append(createPkDropdownMenu(
            createChevronTrigger(triggerLabel),
            createPkDropdownLabel('Display'),
            createPkDropdownItem({
                label: 'Show archived',
                value: 'show-archived',
                type: 'checkbox',
            }),
            createPkDropdownSeparator(),
            createPkDropdownLabel('Sort by'),
            createPkDropdownItem({
                label: 'Recently updated',
                value: 'sort-updated',
                type: 'radio',
                radioGroup: 'sort',
                checked: true,
            }),
            createPkDropdownItem({
                label: 'Name',
                value: 'sort-name',
                type: 'radio',
                radioGroup: 'sort',
            }),
            createPkDropdownItem({
                label: 'Status',
                value: 'sort-status',
                type: 'radio',
                radioGroup: 'sort',
            }),
            createPkDropdownSeparator(),
            createPkDropdownItem({
                label: 'Delete selected',
                value: 'delete-selected',
                destructive: true,
            }),
        ));
    },

    disabledItems(preview) {
        const { triggerLabel } = dropdownMenuPlaygroundSections.disabledItems;
        preview.append(createPkDropdownMenu(
            createChevronTrigger(triggerLabel),
            createPkDropdownItem({ label: 'Edit', value: 'edit' }),
            createPkDropdownItem({ label: 'Make required', value: 'make-required' }),
            createPkDropdownItem({ label: 'Duplicate', value: 'duplicate' }),
            createPkDropdownSeparator(),
            createPkDropdownItem({ label: 'Move up', value: 'move-up', disabled: true }),
            createPkDropdownItem({ label: 'Move down', value: 'move-down', disabled: true }),
            createPkDropdownItem({ label: 'Move left', value: 'move-left', disabled: true }),
            createPkDropdownItem({ label: 'Move right', value: 'move-right', disabled: true }),
            createPkDropdownSeparator(),
            createPkDropdownItem({ label: 'Delete', value: 'delete', destructive: true }),
        ));
    },

    icons(preview) {
        preview.append(createPkDropdownMenu(
            createIconTrigger(),
            createPkDropdownItem({ label: 'Edit', value: 'edit', prefixIcon: playgroundIconPen }),
            createPkDropdownItem({ label: 'Make required', value: 'make-required', prefixIcon: playgroundIconAsterisk }),
            createPkDropdownItem({ label: 'Duplicate', value: 'duplicate', prefixIcon: playgroundIconCopy }),
            createPkDropdownSeparator(),
            createPkDropdownItem({ label: 'Move up', value: 'move-up', prefixIcon: playgroundIconArrowUp }),
            createPkDropdownItem({ label: 'Move down', value: 'move-down', prefixIcon: playgroundIconArrowDown }),
            createPkDropdownItem({ label: 'Move left', value: 'move-left', prefixIcon: playgroundIconArrowLeft }),
            createPkDropdownItem({ label: 'Move right', value: 'move-right', prefixIcon: playgroundIconArrowRight }),
            createPkDropdownSeparator(),
            createPkDropdownItem({ label: 'Delete', value: 'delete', destructive: true, prefixIcon: playgroundIconXmark }),
        ));
    },

    sizes(preview) {
        preview.className = 'pg-card__inner pg-card__inner--row pg-dropdown-sizes';

        for (const size of ['xs', 'sm', 'default', 'lg', 'xl'] as const) {
            const item = document.createElement('div');
            item.className = 'pg-dropdown-size-item';

            const menu = createPkDropdownMenu(
                createChevronTrigger('Open'),
                createPkDropdownLabel('Actions'),
                createPkDropdownItem({ label: 'Edit', value: 'edit' }),
                createPkDropdownItem({ label: 'Duplicate', value: 'duplicate' }),
                createPkDropdownSeparator(),
                createPkDropdownItem({ label: 'Delete', value: 'delete', destructive: true }),
            );

            if (size !== 'default') {
                menu.setAttribute('size', size);
            }

            const label = document.createElement('span');
            label.className = 'pg-dropdown-size-label';
            label.textContent = size;

            item.append(menu, label);
            preview.append(item);
        }
    },
};
