import { computed, defineComponent, h } from "vue";
import "@verbb/plugin-kit-web/components/combobox.js";
import "@verbb/plugin-kit-web/components/select.js";
//#region src/components/ComboboxInput.ts
var toStringValue = (value) => {
	return value === void 0 || value === null ? "" : String(value);
};
/**
* Convenience facade over `<pk-combobox>` mirroring React `ComboboxInput`:
* `options[]` (or `fetchOptions` for async search), `v-model`, and `multiple`.
*
* `pk-combobox` is string-valued, so values are stringified for the element and mapped
* back to their original option value on `pk-change`.
*/
var ComboboxInput = defineComponent({
	name: "PkComboboxInput",
	props: {
		options: {
			type: Array,
			default: void 0
		},
		fetchOptions: {
			type: Function,
			default: void 0
		},
		modelValue: {
			type: [
				String,
				Number,
				Array,
				null
			],
			default: null
		},
		multiple: {
			type: Boolean,
			default: false
		},
		disabled: {
			type: Boolean,
			default: false
		},
		placeholder: {
			type: String,
			default: ""
		},
		emptyMessage: {
			type: String,
			default: "No options found."
		},
		loadingMessage: {
			type: String,
			default: "Searching…"
		},
		startTypingMessage: {
			type: String,
			default: "Start typing to search…"
		},
		showClear: {
			type: Boolean,
			default: false
		},
		invalid: {
			type: Boolean,
			default: false
		},
		size: {
			type: String,
			default: void 0
		},
		allowCreate: {
			type: Boolean,
			default: false
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
		create: (query) => typeof query === "string",
		openChange: (open) => typeof open === "boolean"
	},
	setup(props, { emit }) {
		const usesAsync = computed(() => Boolean(props.fetchOptions) && !props.options?.length);
		const flatOptions = computed(() => props.options ?? []);
		const mapBack = (raw) => {
			const match = flatOptions.value.find((option) => toStringValue(option.value) === toStringValue(raw));
			return match ? match.value : raw;
		};
		const adaptedFetch = computed(() => {
			if (!props.fetchOptions) return null;
			const fetchOptions = props.fetchOptions;
			return async (query, signal) => {
				return (await fetchOptions(query, signal)).map((option) => ({
					value: toStringValue(option.value),
					label: option.label
				}));
			};
		});
		const handlePkChange = (event) => {
			const raw = event.detail?.value;
			if (props.multiple) {
				emit("update:modelValue", (Array.isArray(raw) ? raw : raw ? [raw] : []).map((entry) => mapBack(entry)));
				return;
			}
			const single = Array.isArray(raw) ? raw[0] : raw;
			emit("update:modelValue", single ? mapBack(single) : null);
		};
		const handlePkCreate = (event) => {
			emit("create", event.inputValue ?? "");
		};
		const handlePkOpenChange = (event) => {
			emit("openChange", Boolean(event.detail?.open));
		};
		return () => {
			const valueProps = props.multiple ? { values: (Array.isArray(props.modelValue) ? props.modelValue : []).map((entry) => toStringValue(entry)) } : { value: toStringValue(props.modelValue) };
			return h("pk-combobox", {
				multiple: props.multiple || void 0,
				disabled: props.disabled || void 0,
				placeholder: props.placeholder,
				emptyMessage: props.emptyMessage,
				loadingMessage: props.loadingMessage,
				startTypingMessage: props.startTypingMessage,
				clearable: props.showClear || void 0,
				invalid: props.invalid || void 0,
				...props.size ? { size: props.size } : {},
				allowCreate: props.allowCreate || void 0,
				async: usesAsync.value || void 0,
				fetchOptions: adaptedFetch.value,
				...props.name ? { name: props.name } : {},
				...props.id ? { id: props.id } : {},
				...props.ariaLabel ? { "aria-label": props.ariaLabel } : {},
				...props.ariaDescribedby ? { "aria-describedby": props.ariaDescribedby } : {},
				...props.ariaErrormessage ? { "aria-errormessage": props.ariaErrormessage } : {},
				...props.ariaLabelledby ? { "aria-labelledby": props.ariaLabelledby } : {},
				...valueProps,
				onPkChange: handlePkChange,
				onPkCreate: handlePkCreate,
				onPkOpenChange: handlePkOpenChange
			}, { default: () => usesAsync.value ? [] : flatOptions.value.map((option) => h("pk-option", {
				key: toStringValue(option.value),
				value: toStringValue(option.value),
				disabled: option.disabled || void 0
			}, { default: () => option.label })) });
		};
	}
});
var PkComboboxInputElement = ComboboxInput;
//#endregion
export { ComboboxInput, PkComboboxInputElement };

//# sourceMappingURL=ComboboxInput.js.map