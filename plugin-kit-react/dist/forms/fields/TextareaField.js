import { Textarea } from "../../components/Textarea.js";
import "../../components/index.js";
import { FieldLayout } from "../Field.js";
import { useEngineField } from "../useEngineField.js";
import { jsx } from "react/jsx-runtime";
//#region src/forms/fields/TextareaField.tsx
var TextareaField = ({ form, field }) => {
	const { value, setValue, setTouched, errors, isInvalid } = useEngineField(form, field.name);
	return /* @__PURE__ */ jsx(FieldLayout, {
		name: field.name,
		label: field.label,
		instructions: field.instructions,
		warning: field.warning,
		required: field.required,
		translatable: field.translatable,
		errors,
		children: /* @__PURE__ */ jsx(Textarea, {
			value: String(value ?? ""),
			onChange: (event) => {
				return setValue(event.target.value);
			},
			onBlur: setTouched,
			placeholder: field.placeholder,
			disabled: field.disabled,
			rows: field.rows,
			"aria-invalid": isInvalid
		})
	});
};
//#endregion
export { TextareaField };

//# sourceMappingURL=TextareaField.js.map