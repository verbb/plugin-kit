import { Input } from "../../components/Input.js";
import "../../components/index.js";
import { FieldLayout } from "../Field.js";
import { useEngineField } from "../useEngineField.js";
import { jsx } from "react/jsx-runtime";
//#region src/forms/fields/NumberField.tsx
var NumberField = ({ form, field }) => {
	const { value, setValue, setTouched, errors, isInvalid } = useEngineField(form, field.name);
	return /* @__PURE__ */ jsx(FieldLayout, {
		name: field.name,
		label: field.label,
		instructions: field.instructions,
		warning: field.warning,
		required: field.required,
		errors,
		children: /* @__PURE__ */ jsx(Input, {
			type: "number",
			value: String(value ?? ""),
			onChange: (event) => {
				return setValue(event.target.value);
			},
			onBlur: setTouched,
			placeholder: field.placeholder,
			disabled: field.disabled,
			style: field.size ? { width: `${field.size}rem` } : void 0,
			"aria-invalid": isInvalid
		})
	});
};
//#endregion
export { NumberField };

//# sourceMappingURL=NumberField.js.map