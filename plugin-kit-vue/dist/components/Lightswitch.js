import { readPkCheckedDetail } from "../utils/pk-change.js";
import { assignSlotNodes } from "@lit-labs/vue-utils/wrapper-utils.js";
import { defineComponent, h } from "vue";
import "@verbb/plugin-kit-web/components/lightswitch.js";
//#region src/components/Lightswitch.ts
/** Vue facade over `<pk-lightswitch>`. Behavior and styles live in the web component. */
var Lightswitch = defineComponent({
	name: "PkLightswitch",
	inheritAttrs: false,
	props: {
		checked: {
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
		label: {
			type: String,
			default: void 0
		},
		instructions: {
			type: String,
			default: void 0
		},
		size: {
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
		return () => h("pk-lightswitch", {
			...attrs,
			checked: props.checked,
			disabled: props.disabled || void 0,
			invalid: props.invalid || void 0,
			required: props.required || void 0,
			...props.name ? { name: props.name } : {},
			value: props.value,
			...props.label ? { label: props.label } : {},
			...props.instructions ? { instructions: props.instructions } : {},
			...props.size ? { size: props.size } : {},
			onPkChange: handlePkChange
		}, assignSlotNodes(slots));
	}
});
var PkLightswitchElement = Lightswitch;
//#endregion
export { Lightswitch, PkLightswitchElement };

//# sourceMappingURL=Lightswitch.js.map