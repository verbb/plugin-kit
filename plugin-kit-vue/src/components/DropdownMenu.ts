import { createPkComponentFamily } from '../createPkComponent.js';
import '@verbb/plugin-kit-web/components/dropdown-menu.js';

/** Vue facades over the `<pk-dropdown-menu>` family. Behavior and styles live in the web components. */
const family = createPkComponentFamily({
    DropdownMenu: 'pk-dropdown-menu',
    DropdownItem: 'pk-dropdown-item',
    DropdownLabel: 'pk-dropdown-label',
    DropdownSeparator: 'pk-dropdown-separator',
});

export const DropdownMenu = family.DropdownMenu;
export const PkDropdownMenuElement = DropdownMenu;
export const DropdownItem = family.DropdownItem;
export const PkDropdownItemElement = DropdownItem;
export const DropdownLabel = family.DropdownLabel;
export const PkDropdownLabelElement = DropdownLabel;
export const DropdownSeparator = family.DropdownSeparator;
export const PkDropdownSeparatorElement = DropdownSeparator;

export type DropdownMenuProps = Record<string, unknown>;
export type DropdownItemProps = Record<string, unknown>;
export type DropdownLabelProps = Record<string, unknown>;
export type DropdownSeparatorProps = Record<string, unknown>;
