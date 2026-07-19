import { Lightswitch } from "../../components/Lightswitch.js";
import { FieldLayout } from "../Field.js";
import { useEngineField } from "../useEngineField.js";
import { defineComponent, h } from "vue";
//#region src/forms/fields/LightswitchField.ts
var LightswitchField = defineComponent({
	name: "SchemaLightswitchField",
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
		}, { default: () => h(Lightswitch, {
			checked: Boolean(binding.value.value),
			"aria-label": props.field.label,
			"onUpdate:checked": (checked) => {
				binding.setValue(checked);
			}
		}) });
	}
});
//#endregion
export { LightswitchField };

//# sourceMappingURL=LightswitchField.js.map