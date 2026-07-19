import { readPkValueDetail } from "../utils/pk-change.js";
import { defineComponent, h } from "vue";
import "@verbb/plugin-kit-web/components/radio-group.js";
//#region src/components/RadioGroupInput.ts
var toStringValue = (value) => {
	return value === void 0 || value === null ? "" : String(value);
};
/**
* Convenience facade over `<pk-radio-group>` with an `options[]` array plus `v-model`,
* instead of slotted `<pk-radio>` children the raw `RadioGroup` exposes.
*/
var RadioGroupInput = defineComponent({
	name: "PkRadioGroupInput",
	props: {
		modelValue: {
			type: [
				String,
				Number,
				Boolean
			],
			default: ""
		},
		options: {
			type: Array,
			required: true
		},
		disabled: {
			type: Boolean,
			default: false
		},
		invalid: {
			type: Boolean,
			default: false
		},
		name: {
			type: String,
			default: void 0
		},
		orientation: {
			type: String,
			default: void 0
		},
		label: {
			type: String,
			default: void 0
		},
		instructions: {
			type: String,
			default: void 0
		},
		ariaLabel: {
			type: String,
			default: void 0
		}
	},
	emits: { "update:modelValue": (value) => value !== void 0 },
	setup(props, { emit }) {
		const handlePkChange = (event) => {
			const nextValue = readPkValueDetail(event);
			const match = props.options.find((option) => toStringValue(option.value) === nextValue);
			emit("update:modelValue", match ? match.value : nextValue);
		};
		return () => h("pk-radio-group", {
			value: toStringValue(props.modelValue),
			disabled: props.disabled || void 0,
			invalid: props.invalid || void 0,
			...props.name ? { name: props.name } : {},
			...props.orientation ? { orientation: props.orientation } : {},
			...props.label ? { label: props.label } : {},
			...props.instructions ? { instructions: props.instructions } : {},
			...props.ariaLabel ? { "aria-label": props.ariaLabel } : {},
			onPkChange: handlePkChange
		}, { default: () => props.options.map((option) => h("pk-radio", {
			key: toStringValue(option.value),
			value: toStringValue(option.value),
			disabled: option.disabled || void 0
		}, { default: () => option.label })) });
	}
});
var PkRadioGroupInputElement = RadioGroupInput;
//#endregion
export { PkRadioGroupInputElement, RadioGroupInput };

//# sourceMappingURL=RadioGroupInput.js.map