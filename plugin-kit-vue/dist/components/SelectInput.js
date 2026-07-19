import { computed, defineComponent, h } from "vue";
import "@verbb/plugin-kit-web/components/status.js";
import "@verbb/plugin-kit-web/components/select.js";
//#region src/components/SelectInput.ts
var isGroup = (option) => {
	return typeof option === "object" && option !== null && "group" in option;
};
var toStringValue = (value) => {
	return value === void 0 || value === null ? "" : String(value);
};
/**
* Convenience facade over `<pk-select>` matching React `SelectInput` ergonomics:
* an `options[]` array plus `v-model`, instead of slotted `<pk-option>` children.
*
* `pk-select` is string-valued, so option values are stringified for the element and
* mapped back to their original value on `pk-change`.
*/
var SelectInput = defineComponent({
	name: "PkSelectInput",
	props: {
		options: {
			type: Array,
			required: true
		},
		modelValue: {
			type: null,
			default: void 0
		},
		placeholder: {
			type: String,
			default: void 0
		},
		disabled: {
			type: Boolean,
			default: false
		},
		invalid: {
			type: Boolean,
			default: false
		},
		clearable: {
			type: Boolean,
			default: false
		},
		size: {
			type: String,
			default: void 0
		},
		width: {
			type: String,
			default: void 0
		},
		name: {
			type: String,
			default: void 0
		},
		id: {
			type: String,
			default: void 0
		},
		ariaLabel: {
			type: String,
			default: void 0
		},
		ariaDescribedby: {
			type: String,
			default: void 0
		},
		ariaErrormessage: {
			type: String,
			default: void 0
		},
		ariaLabelledby: {
			type: String,
			default: void 0
		}
	},
	emits: {
		"update:modelValue": (value) => value !== void 0,
		blur: (event) => event instanceof Event
	},
	setup(props, { emit }) {
		const flatOptions = computed(() => props.options.flatMap((option) => isGroup(option) ? option.options : [option]));
		const handlePkChange = (event) => {
			const detail = event.detail;
			const raw = Array.isArray(detail?.value) ? detail?.value[0] : detail?.value;
			const match = flatOptions.value.find((option) => toStringValue(option.value) === toStringValue(raw));
			emit("update:modelValue", match ? match.value : raw ?? "");
		};
		const handleFocusOut = (event) => {
			emit("blur", event);
		};
		const renderOption = (option) => h("pk-option", {
			key: toStringValue(option.value),
			value: toStringValue(option.value),
			disabled: option.disabled || void 0
		}, { default: () => [option.status ? h("pk-status", {
			slot: "start",
			status: option.status
		}) : null, option.label] });
		return () => h("pk-select", {
			value: toStringValue(props.modelValue),
			...props.placeholder !== void 0 ? { placeholder: props.placeholder } : {},
			disabled: props.disabled || void 0,
			invalid: props.invalid || void 0,
			clearable: props.clearable || void 0,
			...props.size ? { size: props.size } : {},
			...props.width ? { width: props.width } : {},
			...props.name ? { name: props.name } : {},
			...props.id ? { id: props.id } : {},
			...props.ariaLabel ? { "aria-label": props.ariaLabel } : {},
			...props.ariaDescribedby ? { "aria-describedby": props.ariaDescribedby } : {},
			...props.ariaErrormessage ? { "aria-errormessage": props.ariaErrormessage } : {},
			...props.ariaLabelledby ? { "aria-labelledby": props.ariaLabelledby } : {},
			onPkChange: handlePkChange,
			onFocusout: handleFocusOut
		}, { default: () => props.options.map((option) => isGroup(option) ? h("pk-option-group", {
			key: option.group,
			label: option.group
		}, { default: () => option.options.map(renderOption) }) : renderOption(option)) });
	}
});
var PkSelectInputElement = SelectInput;
//#endregion
export { PkSelectInputElement, SelectInput };

//# sourceMappingURL=SelectInput.js.map