import { CodeEditor } from "../../components/CodeEditor.js";
import { FieldLayout } from "../Field.js";
import { readPkValue } from "../utils.js";
import { useEngineField } from "../useEngineField.js";
import { defineComponent, h } from "vue";
//#region src/forms/fields/CodeEditorField.ts
var CodeEditorField = defineComponent({
	name: "SchemaCodeEditorField",
	props: {
		form: {
			type: Object,
			required: true
		},
		field: {
			type: Object,
			required: true
		}
	},
	setup(props) {
		const binding = useEngineField(props.form, props.field.name);
		return () => h(FieldLayout, {
			name: props.field.name,
			label: props.field.label,
			instructions: props.field.instructions,
			warning: props.field.warning,
			required: props.field.required,
			errors: binding.errors.value
		}, { default: () => h(CodeEditor, {
			value: String(binding.value.value ?? ""),
			language: props.field.language,
			tabSize: props.field.tabSize,
			lineNumbers: props.field.lineNumbers,
			rows: props.field.rows,
			disabled: props.field.disabled || void 0,
			invalid: binding.isInvalid.value || void 0,
			onPkChange: (event) => {
				binding.setValue(readPkValue(event));
			},
			onBlur: binding.setTouched
		}) });
	}
});
//#endregion
export { CodeEditorField };

//# sourceMappingURL=CodeEditorField.js.map