import { assignSlotNodes } from "@lit-labs/vue-utils/wrapper-utils.js";
import { defineComponent, h } from "vue";
//#region src/createPkComponent.ts
/**
* Minimal Vue facade over a registered `<pk-*>` custom element.
* Props and listeners pass through; default slot children are distributed with slot attributes.
*/
function createPkComponent(options) {
	return defineComponent({
		name: options.name,
		inheritAttrs: false,
		setup(_props, { attrs, slots }) {
			return () => h(options.tagName, attrs, assignSlotNodes(slots));
		}
	});
}
/** Turn `pk-date-picker` → `PkDatePicker` for consistent facade names. */
function pkTagToComponentName(tagName) {
	return `Pk${(tagName.startsWith("pk-") ? tagName.slice(3) : tagName).split("-").map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join("")}`;
}
/** Batch-create pass-through facades for a tag → export name map. */
function createPkComponentFamily(family) {
	const components = {};
	for (const [exportName, tagName] of Object.entries(family)) components[exportName] = createPkComponent({
		name: pkTagToComponentName(tagName),
		tagName
	});
	return components;
}
//#endregion
export { createPkComponent, createPkComponentFamily };

//# sourceMappingURL=createPkComponent.js.map