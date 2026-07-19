import { CheckboxSelect } from "../../components/CheckboxSelect.js";
import { FieldLayout } from "../Field.js";
import { useEngineField } from "../useEngineField.js";
import { jsx } from "react/jsx-runtime";
//#region src/forms/fields/CheckboxSelectField.tsx
var CheckboxSelectField = ({ form, field }) => {
	const { value, setValue, errors } = useEngineField(form, field.name);
	return /* @__PURE__ */ jsx(FieldLayout, {
		name: field.name,
		label: field.label,
		instructions: field.instructions,
		warning: field.warning,
		required: field.required,
		errors,
		children: /* @__PURE__ */ jsx(CheckboxSelect, {
			options: field.options || [],
			value: value === void 0 || value === null ? [] : value,
			onChange: setValue,
			showAllOption: field.showAllOption ?? false,
			allLabel: field.allLabel,
			disabled: field.disabled
		})
	});
};
//#endregion
export { CheckboxSelectField };

//# sourceMappingURL=CheckboxSelectField.js.map