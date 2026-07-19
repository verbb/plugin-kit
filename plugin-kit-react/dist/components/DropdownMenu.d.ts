import { default as React } from 'react';
import { PkDropdownItem, PkDropdownItemType } from '@verbb/plugin-kit-web/components/dropdown-menu/pk-dropdown-item.js';
import { PkDropdownLabel } from '@verbb/plugin-kit-web/components/dropdown-menu/pk-dropdown-label.js';
import { PkDropdownMenu, PkMenuItem } from '@verbb/plugin-kit-web/components/dropdown-menu/pk-dropdown-menu.js';
import { PkDropdownSeparator } from '@verbb/plugin-kit-web/components/dropdown-menu/pk-dropdown-separator.js';
/** React facades over the `<pk-dropdown-menu>` family. Behavior and styles live in the web components. */
export declare const PkDropdownMenuElement: import('@lit/react').ReactWebComponent<PkDropdownMenu, {
    onPkSelect: string;
    onPkShow: string;
    onPkAfterShow: string;
    onPkHide: string;
    onPkAfterHide: string;
    onPkOpenChange: string;
}>;
export declare const PkDropdownItemElement: import('@lit/react').ReactWebComponent<PkDropdownItem, {
    onPkSelect: string;
    onPkSubmenuOpen: string;
}>;
export declare const PkDropdownLabelElement: import('@lit/react').ReactWebComponent<PkDropdownLabel, {}>;
export declare const PkDropdownSeparatorElement: import('@lit/react').ReactWebComponent<PkDropdownSeparator, {}>;
export declare const DropdownMenu: import('@lit/react').ReactWebComponent<PkDropdownMenu, {
    onPkSelect: string;
    onPkShow: string;
    onPkAfterShow: string;
    onPkHide: string;
    onPkAfterHide: string;
    onPkOpenChange: string;
}>;
export declare const DropdownItem: import('@lit/react').ReactWebComponent<PkDropdownItem, {
    onPkSelect: string;
    onPkSubmenuOpen: string;
}>;
export declare const DropdownLabel: import('@lit/react').ReactWebComponent<PkDropdownLabel, {}>;
export declare const DropdownSeparator: import('@lit/react').ReactWebComponent<PkDropdownSeparator, {}>;
export type DropdownMenuProps = React.ComponentProps<typeof PkDropdownMenuElement>;
export type DropdownItemProps = React.ComponentProps<typeof PkDropdownItemElement>;
export type DropdownLabelProps = React.ComponentProps<typeof PkDropdownLabelElement>;
export type DropdownSeparatorProps = React.ComponentProps<typeof PkDropdownSeparatorElement>;
export type { PkDropdownItemType, PkMenuItem };
//# sourceMappingURL=DropdownMenu.d.ts.map