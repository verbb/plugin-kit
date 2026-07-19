import { createPkComponent } from "../createPkComponent.js";
import "@verbb/plugin-kit-web/components/field.js";
//#region src/components/Field.ts
/** Vue facade over `<pk-field>`. Behavior and styles live in the web component. */
var Field = createPkComponent({
	name: "PkField",
	tagName: "pk-field"
});
var PkFieldElement = Field;
//#endregion
export { Field, PkFieldElement };

//# sourceMappingURL=Field.js.map