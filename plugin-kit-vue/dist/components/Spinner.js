import { defineComponent, h } from "vue";
import "@verbb/plugin-kit-web/components/spinner.js";
//#region src/components/Spinner.ts
/** Vue facade over `<pk-spinner>`. Behavior and styles live in the web component. */
var Spinner = defineComponent({
	name: "PkSpinner",
	inheritAttrs: false,
	props: {
		variant: {
			type: String,
			default: "default"
		},
		size: {
			type: String,
			default: "sm"
		},
		tone: {
			type: String,
			default: void 0
		},
		centered: {
			type: Boolean,
			default: false
		}
	},
	setup(props, { attrs }) {
		return () => h("pk-spinner", {
			...attrs,
			variant: props.variant,
			size: props.size,
			...props.tone ? { tone: props.tone } : {},
			...props.centered ? { centered: true } : {}
		});
	}
});
var PkSpinnerElement = Spinner;
//#endregion
export { PkSpinnerElement, Spinner };

//# sourceMappingURL=Spinner.js.map