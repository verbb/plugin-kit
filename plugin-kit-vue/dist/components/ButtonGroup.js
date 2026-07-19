import { createPkComponentFamily } from "../createPkComponent.js";
import "@verbb/plugin-kit-web/components/button-group.js";
//#region src/components/ButtonGroup.ts
/** Vue facades over the `<pk-button-group>` family. Behavior and styles live in the web components. */
var family = createPkComponentFamily({
	ButtonGroup: "pk-button-group",
	ButtonGroupSeparator: "pk-button-group-separator",
	ButtonGroupText: "pk-button-group-text"
});
var ButtonGroup = family.ButtonGroup;
var ButtonGroupSeparator = family.ButtonGroupSeparator;
var ButtonGroupText = family.ButtonGroupText;
var PkButtonGroupElement = ButtonGroup;
var PkButtonGroupSeparatorElement = ButtonGroupSeparator;
var PkButtonGroupTextElement = ButtonGroupText;
//#endregion
export { ButtonGroup, ButtonGroupSeparator, ButtonGroupText, PkButtonGroupElement, PkButtonGroupSeparatorElement, PkButtonGroupTextElement };

//# sourceMappingURL=ButtonGroup.js.map