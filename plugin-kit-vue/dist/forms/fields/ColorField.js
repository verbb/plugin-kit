import { ColorInput } from "../../components/ColorInput.js";
import { FieldLayout } from "../Field.js";
import { readPkValue } from "../utils.js";
import { useEngineField } from "../useEngineField.js";
import { defineComponent, h } from "vue";
//#region src/forms/fields/ColorField.ts
var ColorField = defineComponent({
	name: "SchemaColorField",
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
		}, { default: () => h(ColorInput, {
			value: String(binding.value.value || ""),
			disabled: props.field.disabled || void 0,
			invalid: binding.isInvalid.value || void 0,
			onPkChange: (event) => {
				binding.setValue(readPkValue(event));
				binding.setTouched();
			}
		}) });
	}
});
//#endregion
export { ColorField };

//# sourceMappingURL=ColorField.js.map