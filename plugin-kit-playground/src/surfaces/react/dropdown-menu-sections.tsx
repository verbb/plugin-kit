import { dropdownMenuPlaygroundSections } from '@verbb/plugin-kit-playground';

import { Button } from '@verbb/plugin-kit-react/components';
import {
    DropdownItem,
    DropdownLabel,
    DropdownMenu,
    DropdownSeparator,
} from '@verbb/plugin-kit-react/components';
import { Icon } from '@verbb/plugin-kit-react/components';
import type { PlaygroundSectionReactRendererMap } from './shared/PlaygroundFromSpec.js';

function ChevronTrigger({ label }: { label: string }) {
    return (
        <Button slot="trigger" withCaret aria-label={label}>
            {label}
        </Button>
    );
}

function AvatarTrigger({ initials, id }: { initials: string; id: string }) {
    return (
        <button
            type="button"
            slot="trigger"
            id={id}
            className="pg-dropdown-avatar"
            aria-label="Open account menu"
        >
            {initials}
        </button>
    );
}

function IconTrigger() {
    return (
        <Button slot="trigger" aria-label="Open menu">
            <Icon slot="start" icon="ellipsis" />
        </Button>
    );
}

function ActionsMenu({ triggerLabel = 'Open menu', size }: { triggerLabel?: string; size?: string }) {
    return (
        <DropdownMenu {...(size && size !== 'default' ? { size } : {})}>
            <ChevronTrigger label={triggerLabel} />
            <DropdownLabel>Actions</DropdownLabel>
            <DropdownItem value="edit">Edit</DropdownItem>
            <DropdownItem value="duplicate">Duplicate</DropdownItem>
            <DropdownSeparator />
            <DropdownItem value="delete" destructive>Delete</DropdownItem>
        </DropdownMenu>
    );
}

/** React previews — one function per section id from dropdownMenuPlaygroundSpec. */
export const dropdownMenuReactSectionRenderers: PlaygroundSectionReactRendererMap = {
    basicUsage: () => {
        const { triggerLabel } = dropdownMenuPlaygroundSections.basicUsage;

        return (
            <DropdownMenu>
                <ChevronTrigger label={triggerLabel} />
                <DropdownItem value="edit">Edit</DropdownItem>
                <DropdownItem value="duplicate">Duplicate</DropdownItem>
                <DropdownSeparator />
                <DropdownItem value="delete" destructive>Delete</DropdownItem>
            </DropdownMenu>
        );
    },

    grouped: () => {
        const { triggerLabel } = dropdownMenuPlaygroundSections.grouped;

        return (
            <DropdownMenu>
                <ChevronTrigger label={triggerLabel} />
                <DropdownLabel>General</DropdownLabel>
                <DropdownItem value="new-file" shortcut="⌘N">New File</DropdownItem>
                <DropdownItem value="duplicate" shortcut="⌘D">Duplicate</DropdownItem>
                <DropdownSeparator />
                <DropdownLabel>Preferences</DropdownLabel>
                <DropdownItem value="line-numbers" type="checkbox" checked>Show line numbers</DropdownItem>
                <DropdownItem value="word-wrap" type="checkbox">Word wrap</DropdownItem>
                <DropdownSeparator />
                <DropdownLabel>Theme</DropdownLabel>
                <DropdownItem value="theme-light" type="radio" radioGroup="theme" checked>Light</DropdownItem>
                <DropdownItem value="theme-dark" type="radio" radioGroup="theme">Dark</DropdownItem>
                <DropdownItem value="theme-system" type="radio" radioGroup="theme">System</DropdownItem>
            </DropdownMenu>
        );
    },

    triggers: () => (
        <div className="pg-card__inner pg-dropdown-triggers">
            <DropdownMenu>
                <ChevronTrigger label="Open menu" />
                <DropdownItem value="profile">Profile</DropdownItem>
                <DropdownItem value="settings">Settings</DropdownItem>
                <DropdownSeparator />
                <DropdownItem value="sign-out">Sign out</DropdownItem>
            </DropdownMenu>
            <DropdownMenu>
                <AvatarTrigger initials="JC" id="pg-dropdown-trigger-avatar" />
                <DropdownItem value="profile">Profile</DropdownItem>
                <DropdownItem value="billing">Billing</DropdownItem>
                <DropdownSeparator />
                <DropdownItem value="sign-out">Sign out</DropdownItem>
            </DropdownMenu>
            <DropdownMenu>
                <IconTrigger />
                <DropdownItem value="edit">Edit</DropdownItem>
                <DropdownItem value="duplicate">Duplicate</DropdownItem>
                <DropdownSeparator />
                <DropdownItem value="delete" destructive>Delete</DropdownItem>
            </DropdownMenu>
        </div>
    ),

    submenus: () => {
        const { triggerLabel } = dropdownMenuPlaygroundSections.submenus;

        return (
            <DropdownMenu>
                <Button slot="trigger">{triggerLabel}</Button>
                <DropdownLabel>My Account</DropdownLabel>
                <DropdownItem value="profile">Profile</DropdownItem>
                <DropdownItem value="billing">Billing</DropdownItem>
                <DropdownSeparator />
                <DropdownItem value="invite-users">
                    Invite users
                    <DropdownItem slot="submenu" value="invite-email">Email</DropdownItem>
                    <DropdownItem slot="submenu" value="invite-message">Message</DropdownItem>
                    <DropdownSeparator slot="submenu" />
                    <DropdownItem slot="submenu" value="invite-more">More options</DropdownItem>
                </DropdownItem>
                <DropdownItem value="new-team">New Team</DropdownItem>
            </DropdownMenu>
        );
    },

    selection: () => {
        const { triggerLabel } = dropdownMenuPlaygroundSections.selection;

        return (
            <DropdownMenu>
                <ChevronTrigger label={triggerLabel} />
                <DropdownLabel>Display</DropdownLabel>
                <DropdownItem value="show-archived" type="checkbox">Show archived</DropdownItem>
                <DropdownSeparator />
                <DropdownLabel>Sort by</DropdownLabel>
                <DropdownItem value="sort-updated" type="radio" radioGroup="sort" checked>Recently updated</DropdownItem>
                <DropdownItem value="sort-name" type="radio" radioGroup="sort">Name</DropdownItem>
                <DropdownItem value="sort-status" type="radio" radioGroup="sort">Status</DropdownItem>
                <DropdownSeparator />
                <DropdownItem value="delete-selected" destructive>Delete selected</DropdownItem>
            </DropdownMenu>
        );
    },

    disabledItems: () => {
        const { triggerLabel } = dropdownMenuPlaygroundSections.disabledItems;

        return (
            <DropdownMenu>
                <ChevronTrigger label={triggerLabel} />
                <DropdownItem value="edit">Edit</DropdownItem>
                <DropdownItem value="make-required">Make required</DropdownItem>
                <DropdownItem value="duplicate">Duplicate</DropdownItem>
                <DropdownSeparator />
                <DropdownItem value="move-up" disabled>Move up</DropdownItem>
                <DropdownItem value="move-down" disabled>Move down</DropdownItem>
                <DropdownItem value="move-left" disabled>Move left</DropdownItem>
                <DropdownItem value="move-right" disabled>Move right</DropdownItem>
                <DropdownSeparator />
                <DropdownItem value="delete" destructive>Delete</DropdownItem>
            </DropdownMenu>
        );
    },

    icons: () => (
        <DropdownMenu>
            <IconTrigger />
            <DropdownItem value="edit">
                <Icon slot="prefix" icon="pen" />
                Edit
            </DropdownItem>
            <DropdownItem value="make-required">
                <Icon slot="prefix" icon="asterisk" />
                Make required
            </DropdownItem>
            <DropdownItem value="duplicate">
                <Icon slot="prefix" icon="copy" />
                Duplicate
            </DropdownItem>
            <DropdownSeparator />
            <DropdownItem value="move-up">
                <Icon slot="prefix" icon="arrow-up" />
                Move up
            </DropdownItem>
            <DropdownItem value="move-down">
                <Icon slot="prefix" icon="arrow-down" />
                Move down
            </DropdownItem>
            <DropdownItem value="move-left">
                <Icon slot="prefix" icon="arrow-left" />
                Move left
            </DropdownItem>
            <DropdownItem value="move-right">
                <Icon slot="prefix" icon="arrow-right" />
                Move right
            </DropdownItem>
            <DropdownSeparator />
            <DropdownItem value="delete" destructive>
                <Icon slot="prefix" icon="xmark" />
                Delete
            </DropdownItem>
        </DropdownMenu>
    ),

    sizes: () => (
        <div className="pg-card__inner pg-card__inner--row pg-dropdown-sizes">
            {(['xs', 'sm', 'default', 'lg', 'xl'] as const).map((size) => (
                <div className="pg-dropdown-size-item" key={size}>
                    <ActionsMenu triggerLabel="Open" size={size} />
                    <span className="pg-dropdown-size-label">{size}</span>
                </div>
            ))}
        </div>
    ),
};
