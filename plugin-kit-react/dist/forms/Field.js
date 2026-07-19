import { Field } from "../components/Field.js";
import "react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/forms/Field.tsx
/**
* Schema-form field shell. Delegates label / instructions / errors / warning / tip /
* required / translatable rendering to the `<pk-field>` web component, so there is no
* Tailwind or per-framework styling in this facade — only tokens + shadow-DOM CSS.
*
* Do not force `width: auto` on unlabeled shells here — composite controls (conditions
* tables, etc.) need full width. FieldWrap clusters shrink nested hosts via
* `[data-pk-field-wrap-controls] pk-field` in `style.css`.
*/
var FieldLayout = ({ name, label, instructions, warning, tip, required, translatable, errors = [], headerEnd, className, style, children }) => {
	return /* @__PURE__ */ jsxs(Field, {
		className,
		label,
		instructions,
		warning,
		tip,
		required,
		translatable,
		errors,
		"data-name": name,
		style,
		children: [headerEnd ? /* @__PURE__ */ jsx("div", {
			slot: "header-end",
			children: headerEnd
		}) : null, children]
	});
};
//#endregion
export { FieldLayout };

//# sourceMappingURL=Field.js.map