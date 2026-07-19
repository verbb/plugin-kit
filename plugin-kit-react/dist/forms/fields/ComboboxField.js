import { ComboboxInput } from "../../components/ComboboxInput.js";
import { FieldLayout } from "../Field.js";
import { useEngineField } from "../useEngineField.js";
import { jsx } from "react/jsx-runtime";
//#region src/forms/fields/ComboboxField.tsx
var ComboboxField = ({ form, field }) => {
	const { value, setValue, setTouched, errors } = useEngineField(form, field.name);
	return /* @__PURE__ */ jsx(FieldLayout, {
		name: field.name,
		label: field.label,
		instructions: field.instructions,
		warning: field.warning,
		required: field.required,
		errors,
		children: /* @__PURE__ */ jsx(ComboboxInput, {
			options: field.options,
			fetchOptions: field.fetchOptions,
			multiple: field.multiple,
			value,
			onValueChange: (nextValue) => {
				setValue(nextValue);
				setTouched();
			},
			disabled: field.disabled,
			placeholder: field.placeholder,
			emptyMessage: field.emptyMessage,
			isInvalid: errors.length > 0,
			width: field.width
		})
	});
};
//#endregion
export { ComboboxField };

//# sourceMappingURL=ComboboxField.js.map