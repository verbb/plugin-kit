import { CodeEditor } from "../../components/CodeEditor.js";
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
			onPkChange: (event) => {
				return setValue(event.detail?.value ?? "");
			},
			onBlur: setTouched,
			language: field.language,
			tabSize: field.tabSize,
			lineNumbers: field.lineNumbers,
			rows: field.rows,
			disabled: field.disabled,
			invalid: isInvalid
		})
	});
};
//#endregion
export { CodeEditorField };

//# sourceMappingURL=CodeEditorField.js.map