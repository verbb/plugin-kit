import { createPkComponentFamily } from "../createPkComponent.js";
import "@verbb/plugin-kit-web/components/input-group.js";
//#region src/components/InputGroup.ts
/** Vue facades over the `<pk-input-group>` family. Behavior and styles live in the web components. */
var family = createPkComponentFamily({
	InputGroup: "pk-input-group",
	InputGroupAddon: "pk-input-group-addon",
	InputGroupButton: "pk-input-group-button",
	InputGroupInput: "pk-input-group-input",
	InputGroupText: "pk-input-group-text",
	InputGroupTextarea: "pk-input-group-textarea"
});
var InputGroup = family.InputGroup;
var PkInputGroupElement = InputGroup;
var InputGroupAddon = family.InputGroupAddon;
var PkInputGroupAddonElement = InputGroupAddon;
var InputGroupButton = family.InputGroupButton;
var PkInputGroupButtonElement = InputGroupButton;
var InputGroupInput = family.InputGroupInput;
var PkInputGroupInputElement = InputGroupInput;
var InputGroupText = family.InputGroupText;
var PkInputGroupTextElement = InputGroupText;
var InputGroupTextarea = family.InputGroupTextarea;
var PkInputGroupTextareaElement = InputGroupTextarea;
//#endregion
export { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput, InputGroupText, InputGroupTextarea, PkInputGroupAddonElement, PkInputGroupButtonElement, PkInputGroupElement, PkInputGroupInputElement, PkInputGroupTextElement, PkInputGroupTextareaElement };

//# sourceMappingURL=InputGroup.js.map