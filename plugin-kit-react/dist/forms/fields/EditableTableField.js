import { EditableTable } from "../../components/EditableTable.js";
import "../../components/index.js";
import { FieldLayout } from "../Field.js";
import { useEditableTableFieldBinding } from "../useEditableTableFieldBinding.js";
import { jsx } from "react/jsx-runtime";
//#region src/forms/fields/EditableTableField.tsx
var EditableTableField = ({ form, field }) => {
	const { rows, setRows, errors, cellErrors, handleCellChange } = useEditableTableFieldBinding(form, field.name);
	return /* @__PURE__ */ jsx(FieldLayout, {
		name: field.name,
		label: field.label,
		instructions: field.instructions,
		warning: field.warning,
		required: field.required,
		errors,
		withControl: false,
		children: /* @__PURE__ */ jsx(EditableTable, {
			columns: field.columns,
			rows,
			onChange: setRows,
			onCellChange: handleCellChange,
			addRowLabel: field.addRowLabel,
			allowReorder: field.allowReorder,
			allowAdd: field.allowAdd,
			allowDelete: field.allowDelete,
			newRowDefaults: field.newRowDefaults,
			className: "",
			fieldName: field.name,
			cellErrors,
			modifyColumn: void 0
		})
	});
};
//#endregion
export { EditableTableField };

//# sourceMappingURL=EditableTableField.js.map