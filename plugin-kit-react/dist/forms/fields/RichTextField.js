import { TiptapEditor } from "../../components/TiptapEditor.js";
import "../../components/index.js";
import { FieldLayout } from "../Field.js";
import { useEngineField } from "../useEngineField.js";
import { useVariableCategoriesContext } from "../contexts/VariableCategoriesContext.js";
import { useMemo } from "react";
import { jsx } from "react/jsx-runtime";
//#region src/forms/fields/RichTextField.tsx
var RichTextField = ({ form, field }) => {
	const { value, setValue, errors } = useEngineField(form, field.name);
	const buttons = field.buttons ?? ["bold", "italic"];
	const { getVariableCategories, variableCategoryLabels, variableCategoryOrder, variableTransformerRegistry, renderVariableConfigureSection, resolveVariableTagLabel } = useVariableCategoriesContext();
	const { variableConfig } = field;
	const variableCategories = useMemo(() => {
		if (!variableConfig || !getVariableCategories) return;
		return getVariableCategories(variableConfig, { form });
	}, [
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
		children: /* @__PURE__ */ jsx(TiptapEditor, {
			value: value ?? "",
			onChange: setValue,
			placeholder: field.placeholder,
			rows: field.rows,
			buttons,
			...variableCategories && { variableCategories },
			...variableCategoryLabels && { variableCategoryLabels },
			...variableCategoryOrder && { variableCategoryOrder },
			...variableTransformerRegistry && { variableTransformerRegistry },
			...renderVariableConfigureSection && { renderVariableConfigureSection },
			...resolveVariableTagLabel && { resolveVariableTagLabel },
			...field.linkOptions && { linkOptions: field.linkOptions },
			...field.linkSelectorStorageKeyPrefix && { linkSelectorStorageKeyPrefix: field.linkSelectorStorageKeyPrefix },
			disabled: field.disabled,
			isInvalid: errors.length > 0
		})
	});
};
//#endregion
export { RichTextField };

//# sourceMappingURL=RichTextField.js.map