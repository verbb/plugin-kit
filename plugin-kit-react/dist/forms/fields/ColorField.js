import { ColorInput } from "../../components/ColorInput.js";
import { FieldLayout } from "../Field.js";
import { useEngineField } from "../useEngineField.js";
import { jsx } from "react/jsx-runtime";
//#region src/forms/fields/ColorField.tsx
var ColorField = ({ form, field }) => {
	const { value, setValue, setTouched, errors, isInvalid } = useEngineField(form, field.name);
	return /* @__PURE__ */ jsx(FieldLayout, {
		name: field.name,
		label: field.label,
		instructions: field.instructions,
		warning: field.warning,
		required: field.required,
		errors,
		children: /* @__PURE__ */ jsx(ColorInput, {
			value: String(value || ""),
			onPkChange: (event) => {
				setValue(event.detail?.value ?? "");
				setTouched();
			},
			disabled: field.disabled,
			invalid: isInvalid
		})
	});
};
//#endregion
export { ColorField };

//# sourceMappingURL=ColorField.js.map