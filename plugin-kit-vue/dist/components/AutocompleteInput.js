import { computed, defineComponent, h } from "vue";
import "@verbb/plugin-kit-web/components/autocomplete.js";
import "@verbb/plugin-kit-web/components/select.js";
//#region src/components/AutocompleteInput.ts
var toStringValue = (value) => {
	return value === void 0 || value === null ? "" : String(value);
};
/**
* Convenience facade over `<pk-autocomplete>` mirroring React `AutocompleteInput`:
* `options[]` (or `fetchOptions` for async search) and freeform `v-model` text.
*/
var AutocompleteInput = defineComponent({
	name: "PkAutocompleteInput",
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
			type: [String, null],
			default: ""
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
		"update:modelValue": (value) => typeof value === "string",
		openChange: (open) => typeof open === "boolean"
	},
	setup(props, { emit }) {
		const usesAsync = computed(() => Boolean(props.fetchOptions) && !props.options?.length);
		const flatOptions = computed(() => props.options ?? []);
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
			const detail = event.detail;
			emit("update:modelValue", detail?.value ?? "");
		};
		const handlePkOpenChange = (event) => {
			emit("openChange", Boolean(event.detail?.open));
		};
		return () => h("pk-autocomplete", {
			disabled: props.disabled || void 0,
			placeholder: props.placeholder,
			emptyMessage: props.emptyMessage,
			loadingMessage: props.loadingMessage,
			startTypingMessage: props.startTypingMessage,
			clearable: props.showClear || void 0,
			invalid: props.invalid || void 0,
			...props.size ? { size: props.size } : {},
			...props.width ? { width: props.width } : {},
			async: usesAsync.value || void 0,
			fetchOptions: adaptedFetch.value,
			...props.name ? { name: props.name } : {},
			...props.id ? { id: props.id } : {},
			...props.ariaLabel ? { "aria-label": props.ariaLabel } : {},
			...props.ariaDescribedby ? { "aria-describedby": props.ariaDescribedby } : {},
			...props.ariaErrormessage ? { "aria-errormessage": props.ariaErrormessage } : {},
			...props.ariaLabelledby ? { "aria-labelledby": props.ariaLabelledby } : {},
			value: toStringValue(props.modelValue),
			onPkChange: handlePkChange,
			onPkOpenChange: handlePkOpenChange
		}, { default: () => usesAsync.value ? [] : flatOptions.value.map((option) => h("pk-option", {
			key: toStringValue(option.value),
			value: toStringValue(option.value),
			disabled: option.disabled || void 0
		}, { default: () => option.label })) });
	}
});
var PkAutocompleteInputElement = AutocompleteInput;
//#endregion
export { AutocompleteInput, PkAutocompleteInputElement };

//# sourceMappingURL=AutocompleteInput.js.map