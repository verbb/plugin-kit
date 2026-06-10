import { CodeEditor } from "../../components/CodeEditor.js";
import "../../components/index.js";
import { FieldLayout } from "../Field.js";
import { useEngineField } from "../useEngineField.js";
import { jsx } from "react/jsx-runtime";
//#region src/forms/fields/CodeEditorField.tsx
var CodeEditorField = ({ form, field }) => {
	const { value, setValue, setTouched, errors, isInvalid } = useEngineField(form, field.name);
	return /* @__PURE__ */ jsx(FieldLayout, {
		name: field.name,
		label: field.label,
		instructions: field.instructions,
		warning: field.warning,
		required: field.required,
		errors,
		children: /* @__PURE__ */ jsx(CodeEditor, {
			value: String(value ?? ""),
			onChange: setValue,
			onBlur: setTouched,
			placeholder: field.placeholder,
			disabled: field.disabled,
			rows: field.rows,
			tabSize: field.tabSize,
			lineNumbers: field.lineNumbers,
			language: field.language,
			isInvalid
		})
	});
};
//#endregion
export { CodeEditorField };

//# sourceMappingURL=CodeEditorField.js.map