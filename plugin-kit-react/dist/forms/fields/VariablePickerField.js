import { TiptapInput } from "../../components/TiptapInput.js";
import "../../components/index.js";
import { FieldLayout } from "../Field.js";
import { useEngineField } from "../useEngineField.js";
import { useVariableCategoriesContext } from "../contexts/VariableCategoriesContext.js";
import { useMemo } from "react";
import { jsx } from "react/jsx-runtime";
//#region src/forms/fields/VariablePickerField.tsx
var VariablePickerField = ({ form, field }) => {
	const { value, setValue, errors } = useEngineField(form, field.name);
	const { getVariableCategories, variableCategoryLabels, variableCategoryOrder, variableTransformerRegistry } = useVariableCategoriesContext();
	const { variableCategories, variableConfig } = field;
	const resolvedVariableCategories = useMemo(() => {
		if (variableCategories) return variableCategories;
		if (!variableConfig || !getVariableCategories) return;
		return getVariableCategories(variableConfig, { form });
	}, [
		variableCategories,
		variableConfig,
		form,
		getVariableCategories
	]);
	return /* @__PURE__ */ jsx(FieldLayout, {
		name: field.name,
		label: field.label,
		instructions: field.instructions,
		warning: field.warning,
		required: field.required,
		errors,
		withControl: false,
		children: /* @__PURE__ */ jsx(TiptapInput, {
			value: String(value ?? ""),
			onChange: setValue,
			placeholder: field.placeholder,
			className: "",
			disabled: field.disabled,
			isInvalid: errors.length > 0,
			variableCategories: resolvedVariableCategories,
			variableCategoryLabels,
			variableCategoryOrder,
			variableTransformerRegistry,
			variablePickerTriggerCharacters: field.variablePickerTriggerCharacters
		})
	});
};
//#endregion
export { VariablePickerField };

//# sourceMappingURL=VariablePickerField.js.map