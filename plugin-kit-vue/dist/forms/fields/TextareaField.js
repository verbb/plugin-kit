import { Textarea } from "../../components/Textarea.js";
import { FieldLayout } from "../Field.js";
import { useEngineField } from "../useEngineField.js";
import { defineComponent, h } from "vue";
//#region src/forms/fields/TextareaField.ts
var TextareaField = defineComponent({
	name: "SchemaTextareaField",
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
			translatable: props.field.translatable,
			errors: binding.errors.value
		}, { default: () => h(Textarea, {
			value: String(binding.value.value ?? ""),
			placeholder: props.field.placeholder,
			disabled: props.field.disabled || void 0,
			invalid: binding.isInvalid.value || void 0,
			rows: props.field.rows,
			onInput: (event) => {
				binding.setValue(event.target.value ?? "");
			},
			onBlur: binding.setTouched
		}) });
	}
});
//#endregion
export { TextareaField };

//# sourceMappingURL=TextareaField.js.map