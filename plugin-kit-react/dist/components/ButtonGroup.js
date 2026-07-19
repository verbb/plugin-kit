import { createPluginKitComponent } from "../utils/create-plugin-kit-component.js";
import React from "react";
import { PkButtonGroup } from "@verbb/plugin-kit-web/components/button-group/pk-button-group.js";
import { PkButtonGroupSeparator } from "@verbb/plugin-kit-web/components/button-group/pk-button-group-separator.js";
import { PkButtonGroupText } from "@verbb/plugin-kit-web/components/button-group/pk-button-group-text.js";
//#region src/components/ButtonGroup.tsx
/** React facade over `<pk-button-group>`. Behavior and styles live in the web component. */
var PkButtonGroupElement = createPluginKitComponent({
	tagName: "pk-button-group",
	elementClass: PkButtonGroup,
	react: React
});
var PkButtonGroupSeparatorElement = createPluginKitComponent({
	tagName: "pk-button-group-separator",
	elementClass: PkButtonGroupSeparator,
	react: React
});
var PkButtonGroupTextElement = createPluginKitComponent({
	tagName: "pk-button-group-text",
	elementClass: PkButtonGroupText,
	react: React
});
var ButtonGroup = PkButtonGroupElement;
var ButtonGroupSeparator = PkButtonGroupSeparatorElement;
var ButtonGroupText = PkButtonGroupTextElement;
//#endregion
export { ButtonGroup, ButtonGroupSeparator, ButtonGroupText, PkButtonGroupElement, PkButtonGroupSeparatorElement, PkButtonGroupTextElement };

//# sourceMappingURL=ButtonGroup.js.map