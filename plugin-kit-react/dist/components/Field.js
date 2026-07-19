import { createPluginKitComponent } from "../utils/create-plugin-kit-component.js";
import { trueBooleanProps } from "../utils/lit-react-booleans.js";
import React, { forwardRef } from "react";
import { PkField } from "@verbb/plugin-kit-web/components/field/pk-field.js";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/components/Field.tsx
var PkFieldElement = createPluginKitComponent({
	tagName: "pk-field",
	elementClass: PkField,
	react: React
});
/** React facade over `<pk-field>`. Behavior and styles live in the web component. */
var Field = forwardRef(function Field(props, ref) {
	const { required, translatable, headerEnd, children, ...rest } = props;
	return /* @__PURE__ */ jsxs(PkFieldElement, {
		ref,
		...rest,
		...trueBooleanProps(["required", "translatable"], {
			required,
			translatable
		}),
		children: [headerEnd ? /* @__PURE__ */ jsx("div", {
			slot: "header-end",
			children: headerEnd
		}) : null, children]
	});
});
Field.displayName = "Field";
//#endregion
export { Field, PkFieldElement };

//# sourceMappingURL=Field.js.map