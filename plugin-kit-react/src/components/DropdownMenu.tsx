import React from 'react';
import { createPluginKitComponent } from '../utils/create-plugin-kit-component.js';
import { PkDropdownItem, type PkDropdownItemType } from '@verbb/plugin-kit-web/components/dropdown-menu/pk-dropdown-item.js';
import { PkDropdownLabel } from '@verbb/plugin-kit-web/components/dropdown-menu/pk-dropdown-label.js';
import { PkDropdownMenu } from '@verbb/plugin-kit-web/components/dropdown-menu/pk-dropdown-menu.js';
import { PkDropdownSeparator } from '@verbb/plugin-kit-web/components/dropdown-menu/pk-dropdown-separator.js';
import type { PkMenuItem } from '@verbb/plugin-kit-web/components/dropdown-menu/pk-dropdown-menu.js';

/** React facades over the `<pk-dropdown-menu>` family. Behavior and styles live in the web components. */
export const PkDropdownMenuElement = createPluginKitComponent({
    tagName: 'pk-dropdown-menu',
    elementClass: PkDropdownMenu,
    react: React,
    events: {
        onPkSelect: 'pk-select',
        onPkShow: 'pk-show',
        onPkAfterShow: 'pk-after-show',
        onPkHide: 'pk-hide',
        onPkAfterHide: 'pk-after-hide',
        onPkOpenChange: 'pk-open-change',
    },
});

export const PkDropdownItemElement = createPluginKitComponent({
    tagName: 'pk-dropdown-item',
    elementClass: PkDropdownItem,
    react: React,
    events: {
        onPkSelect: 'pk-select',
        onPkSubmenuOpen: 'pk-submenu-open',
    },
});

export const PkDropdownLabelElement = createPluginKitComponent({
    tagName: 'pk-dropdown-label',
    elementClass: PkDropdownLabel,
    react: React,
});

export const PkDropdownSeparatorElement = createPluginKitComponent({
    tagName: 'pk-dropdown-separator',
    elementClass: PkDropdownSeparator,
    react: React,
});

export const DropdownMenu = PkDropdownMenuElement;
export const DropdownItem = PkDropdownItemElement;
export const DropdownLabel = PkDropdownLabelElement;
export const DropdownSeparator = PkDropdownSeparatorElement;

export type DropdownMenuProps = React.ComponentProps<typeof PkDropdownMenuElement>;
export type DropdownItemProps = React.ComponentProps<typeof PkDropdownItemElement>;
export type DropdownLabelProps = React.ComponentProps<typeof PkDropdownLabelElement>;
export type DropdownSeparatorProps = React.ComponentProps<typeof PkDropdownSeparatorElement>;
export type { PkDropdownItemType, PkMenuItem };
