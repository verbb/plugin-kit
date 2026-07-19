import { createPkComponentFamily } from "../createPkComponent.js";
import "@verbb/plugin-kit-web/components/dropdown-menu.js";
//#region src/components/DropdownMenu.ts
/** Vue facades over the `<pk-dropdown-menu>` family. Behavior and styles live in the web components. */
var family = createPkComponentFamily({
	DropdownMenu: "pk-dropdown-menu",
	DropdownItem: "pk-dropdown-item",
	DropdownLabel: "pk-dropdown-label",
	DropdownSeparator: "pk-dropdown-separator"
});
var DropdownMenu = family.DropdownMenu;
var PkDropdownMenuElement = DropdownMenu;
var DropdownItem = family.DropdownItem;
var PkDropdownItemElement = DropdownItem;
var DropdownLabel = family.DropdownLabel;
var PkDropdownLabelElement = DropdownLabel;
var DropdownSeparator = family.DropdownSeparator;
var PkDropdownSeparatorElement = DropdownSeparator;
//#endregion
export { DropdownItem, DropdownLabel, DropdownMenu, DropdownSeparator, PkDropdownItemElement, PkDropdownLabelElement, PkDropdownMenuElement, PkDropdownSeparatorElement };

//# sourceMappingURL=DropdownMenu.js.map