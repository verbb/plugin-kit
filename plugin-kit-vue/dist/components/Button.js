import { assignSlotNodes } from "@lit-labs/vue-utils/wrapper-utils.js";
import { defineComponent, h } from "vue";
import "@verbb/plugin-kit-web/components/button.js";
//#region src/components/Button.ts
/** Vue facade over `<pk-button>`. Behavior and styles live in the web component. */
var Button = defineComponent({
	name: "PkButton",
	inheritAttrs: false,
	props: {
		variant: {
			type: String,
			default: "default"
		},
		size: {
			type: String,
			default: "default"
		},
		loading: {
			type: Boolean,
			default: false
		},
		disabled: {
			type: Boolean,
			default: false
		},
		type: {
			type: String,
			default: "button"
		},
		spinnerVariant: {
			type: String,
			default: void 0
		},
		spinnerTone: {
			type: String,
			default: void 0
		},
		dataState: {
			type: String,
			default: void 0
		},
		withCaret: {
			type: Boolean,
			default: false
		},
		groupTrigger: {
			type: Boolean,
			default: false
		}
	},
	setup(props, { attrs, slots }) {
		return () => h("pk-button", {
			...attrs,
			variant: props.variant,
			size: props.size,
			loading: props.loading || void 0,
			disabled: props.disabled || void 0,
			type: props.type,
			...props.spinnerVariant ? { "spinner-variant": props.spinnerVariant } : {},
			...props.spinnerTone ? { "spinner-tone": props.spinnerTone } : {},
			...props.dataState ? { "data-state": props.dataState } : {},
			...props.withCaret ? { "with-caret": "" } : {},
			...props.groupTrigger ? { "group-trigger": "" } : {}
		}, assignSlotNodes(slots));
	}
});
var PkButtonElement = Button;
//#endregion
export { Button, PkButtonElement };

//# sourceMappingURL=Button.js.map