import { readPkCheckedDetail } from "../utils/pk-change.js";
import { assignSlotNodes } from "@lit-labs/vue-utils/wrapper-utils.js";
import { defineComponent, h } from "vue";
import "@verbb/plugin-kit-web/components/checkbox.js";
//#region src/components/Checkbox.ts
/** Vue facade over `<pk-checkbox>`. Behavior and styles live in the web component. */
var Checkbox = defineComponent({
	name: "PkCheckbox",
	inheritAttrs: false,
	props: {
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
	setup(props, { attrs, slots, emit }) {
		const handlePkChange = (event) => {
			const userHandler = attrs.onPkChange;
			userHandler?.(event);
			emit("update:checked", readPkCheckedDetail(event));
		};
		return () => h("pk-checkbox", {
			...attrs,
			checked: props.checked,
			indeterminate: props.indeterminate || void 0,
			disabled: props.disabled || void 0,
			invalid: props.invalid || void 0,
			required: props.required || void 0,
			...props.name ? { name: props.name } : {},
			checkboxValue: props.value,
			...props.dataState ? { "data-state": props.dataState } : {},
			onPkChange: handlePkChange
		}, assignSlotNodes(slots));
	}
});
var PkCheckboxElement = Checkbox;
//#endregion
export { Checkbox, PkCheckboxElement };

//# sourceMappingURL=Checkbox.js.map