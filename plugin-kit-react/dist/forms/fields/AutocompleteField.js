import { AutocompleteInput } from "../../components/AutocompleteInput.js";
import { FieldLayout } from "../Field.js";
import { useEngineField } from "../useEngineField.js";
import { jsx } from "react/jsx-runtime";
//#region src/forms/fields/AutocompleteField.tsx
/**
* SchemaForm `$field: "autocomplete"` — freeform text with optional suggestions.
* Use for path/alias fields where the typed value is the answer; pair `warning`
* on the schema node for plugin-owned existence checks.
*/
var AutocompleteField = ({ form, field }) => {
	const { value, setValue, setTouched, errors } = useEngineField(form, field.name);
	return /* @__PURE__ */ jsx(FieldLayout, {
		name: field.name,
		label: field.label,
		instructions: field.instructions,
		warning: field.warning,
		required: field.required,
		errors,
		children: /* @__PURE__ */ jsx(AutocompleteInput, {
			options: field.options,
			fetchOptions: field.fetchOptions,
			value: value == null ? "" : String(value),
			onValueChange: (nextValue) => {
				setValue(nextValue);
				setTouched();
			},
			disabled: field.disabled,
			placeholder: field.placeholder,
			emptyMessage: field.emptyMessage,
			showClear: field.showClear,
			isInvalid: errors.length > 0,
			width: field.width
		})
	});
};
//#endregion
export { AutocompleteField };

//# sourceMappingURL=AutocompleteField.js.map