import { Checkbox } from "./Checkbox.js";
import "react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/components/CheckboxInput.tsx
/**
* Convenience facade pairing `<pk-checkbox>` with a label + optional description, mirroring the
* `plugin-kit-react` `CheckboxInput`. Layout uses a plain wrapping `<label>` (no Tailwind) — the
* checkbox itself is styled inside the web component's shadow root.
*/
function CheckboxInput({ label, description, className, disabled, ...props }) {
	return /* @__PURE__ */ jsxs("label", {
		"data-slot": "checkbox-input",
		className,
		style: {
			display: "flex",
			alignItems: "flex-start",
			gap: "0.5rem",
			cursor: disabled ? "not-allowed" : "pointer"
		},
		children: [/* @__PURE__ */ jsx(Checkbox, {
			disabled,
			...props
		}), /* @__PURE__ */ jsxs("span", {
			"data-slot": "checkbox-input-body",
			style: {
				minWidth: 0,
				opacity: disabled ? .5 : void 0
			},
			children: [/* @__PURE__ */ jsx("span", {
				"data-slot": "checkbox-input-label",
				style: {
					display: "block",
					lineHeight: 1.25
				},
				children: label
			}), description ? /* @__PURE__ */ jsx("span", {
				"data-slot": "checkbox-input-description",
				style: {
					display: "block",
					marginTop: "0.25rem",
					color: "var(--pk-color-text-muted, #64748b)"
				},
				children: description
			}) : null]
		})]
	});
}
//#endregion
export { CheckboxInput };

//# sourceMappingURL=CheckboxInput.js.map