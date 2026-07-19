import { createPluginKitComponent } from "../utils/create-plugin-kit-component.js";
import React from "react";
import { PkDropdownItem } from "@verbb/plugin-kit-web/components/dropdown-menu/pk-dropdown-item.js";
import { PkDropdownLabel } from "@verbb/plugin-kit-web/components/dropdown-menu/pk-dropdown-label.js";
import { PkDropdownMenu } from "@verbb/plugin-kit-web/components/dropdown-menu/pk-dropdown-menu.js";
import { PkDropdownSeparator } from "@verbb/plugin-kit-web/components/dropdown-menu/pk-dropdown-separator.js";
//#region src/components/DropdownMenu.tsx
/** React facades over the `<pk-dropdown-menu>` family. Behavior and styles live in the web components. */
var PkDropdownMenuElement = createPluginKitComponent({
	tagName: "pk-dropdown-menu",
	elementClass: PkDropdownMenu,
	react: React,
	events: {
		onPkSelect: "pk-select",
		onPkShow: "pk-show",
		onPkAfterShow: "pk-after-show",
		onPkHide: "pk-hide",
		onPkAfterHide: "pk-after-hide",
		onPkOpenChange: "pk-open-change"
	}
});
var PkDropdownItemElement = createPluginKitComponent({
	tagName: "pk-dropdown-item",
	elementClass: PkDropdownItem,
	react: React,
	events: {
		onPkSelect: "pk-select",
		onPkSubmenuOpen: "pk-submenu-open"
	}
});
var PkDropdownLabelElement = createPluginKitComponent({
	tagName: "pk-dropdown-label",
	elementClass: PkDropdownLabel,
	react: React
});
var PkDropdownSeparatorElement = createPluginKitComponent({
	tagName: "pk-dropdown-separator",
	elementClass: PkDropdownSeparator,
	react: React
});
var DropdownMenu = PkDropdownMenuElement;
var DropdownItem = PkDropdownItemElement;
var DropdownLabel = PkDropdownLabelElement;
var DropdownSeparator = PkDropdownSeparatorElement;
//#endregion
export { DropdownItem, DropdownLabel, DropdownMenu, DropdownSeparator, PkDropdownItemElement, PkDropdownLabelElement, PkDropdownMenuElement, PkDropdownSeparatorElement };

//# sourceMappingURL=DropdownMenu.js.map