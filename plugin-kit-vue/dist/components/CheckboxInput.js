import { Checkbox } from "./Checkbox.js";
import { defineComponent, h } from "vue";
//#region src/components/CheckboxInput.ts
/**
* Convenience facade pairing `<pk-checkbox>` with a label + optional description,
* mirroring `plugin-kit-react` `CheckboxInput`. Layout uses a plain wrapping `<label>`
* (no utility CSS) — the checkbox itself is styled inside the web component shadow root.
*/
var CheckboxInput = defineComponent({
	name: "PkCheckboxInput",
	inheritAttrs: false,
	props: {
		label: {
			type: [
				String,
				Number,
				Object
			],
			required: true
		},
		description: {
			type: [
				String,
				Number,
				Object
			],
			default: void 0
		},
		checked: {
			type: Boolean,
			default: false
		},
		indeterminate: {
			type: Boolean,
			default: false
		},
		disabled: {
			type: Boolean,
			default: false
		},
		invalid: {
			type: Boolean,
			default: false
		},
		required: {
			type: Boolean,
			default: false
		},
		name: {
			type: String,
			default: void 0
		},
		value: {
			type: String,
			default: "on"
		},
		dataState: {
			type: String,
			default: void 0
		}
	},
	emits: { "update:checked": (value) => typeof value === "boolean" },
	setup(props, { attrs, emit }) {
		return () => h("label", {
			"data-slot": "checkbox-input",
			class: attrs.class,
			style: {
				display: "flex",
				alignItems: "flex-start",
				gap: "0.5rem",
				cursor: props.disabled ? "not-allowed" : "pointer"
			}
		}, [h(Checkbox, {
			checked: props.checked,
			indeterminate: props.indeterminate,
			disabled: props.disabled,
			invalid: props.invalid,
			required: props.required,
			name: props.name,
			value: props.value,
			dataState: props.dataState,
			"onUpdate:checked": (value) => emit("update:checked", value)
		}), h("span", {
			"data-slot": "checkbox-input-body",
			style: {
				minWidth: 0,
				opacity: props.disabled ? .5 : void 0
			}
		}, [h("span", {
			"data-slot": "checkbox-input-label",
			style: {
				display: "block",
				lineHeight: 1.25
			}
		}, { default: () => props.label }), props.description ? h("span", {
			"data-slot": "checkbox-input-description",
			style: {
				display: "block",
				marginTop: "0.25rem",
				color: "var(--pk-color-text-muted, #64748b)"
			}
		}, { default: () => props.description }) : null])]);
	}
});
var PkCheckboxInputElement = CheckboxInput;
//#endregion
export { CheckboxInput, PkCheckboxInputElement };

//# sourceMappingURL=CheckboxInput.js.map