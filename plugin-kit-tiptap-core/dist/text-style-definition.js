import { registerTiptapExtension, registerTiptapToolbarControl } from "./registry.js";
import { Extension } from "@tiptap/core";
//#region src/text-style-definition.ts
var SAFE_TEXT_STYLE_VALUES = {
	"font-variant-caps": new Set([
		"small-caps",
		"all-small-caps",
		"petite-caps",
		"all-petite-caps",
		"unicase",
		"titling-caps"
	]),
	"text-transform": new Set([
		"uppercase",
		"lowercase",
		"capitalize"
	])
};
var CORE_TEXT_STYLE_ATTRIBUTES = new Set([
	"backgroundColor",
	"color",
	"fontFamily",
	"fontSize",
	"fontVariantCaps",
	"lineHeight"
]);
var registeredAttributes = /* @__PURE__ */ new Map();
function validateDefinition(definition) {
	const { id, label, attribute, cssProperty, allowedValues, toolbarValue } = definition;
	if (!id || id !== id.trim()) throw new Error("Tiptap TextStyle definition id must be a non-empty, trimmed identifier.");
	if (!label?.trim()) throw new Error(`Tiptap TextStyle definition "${id}" must have a label.`);
	if (!/^[a-z][A-Za-z0-9]*$/.test(attribute)) throw new Error(`Tiptap TextStyle definition "${id}" must use a camel-cased attribute name.`);
	if (CORE_TEXT_STYLE_ATTRIBUTES.has(attribute)) throw new Error(`Tiptap core TextStyle attribute "${attribute}" cannot be replaced.`);
	const safeValues = SAFE_TEXT_STYLE_VALUES[cssProperty];
	if (!safeValues) throw new Error(`Tiptap TextStyle definition "${id}" uses unsupported CSS property "${cssProperty}".`);
	const uniqueValues = new Set(allowedValues);
	if (uniqueValues.size === 0 || uniqueValues.size !== allowedValues.length) throw new Error(`Tiptap TextStyle definition "${id}" must provide unique allowed values.`);
	if ([...uniqueValues].some((value) => !safeValues.has(value))) throw new Error(`Tiptap TextStyle definition "${id}" contains an unsafe CSS value.`);
	if (!uniqueValues.has(toolbarValue)) throw new Error(`Tiptap TextStyle definition "${id}" toolbar value must be allowed.`);
	const owner = registeredAttributes.get(attribute);
	if (owner) throw new Error(`Tiptap TextStyle attribute "${attribute}" is already registered by "${owner}".`);
}
function createTextStyleExtension(definition) {
	const allowedValues = new Set(definition.allowedValues);
	return Extension.create({
		name: `pkTextStyle${definition.attribute[0].toUpperCase()}${definition.attribute.slice(1)}`,
		addGlobalAttributes() {
			return [{
				types: ["textStyle"],
				attributes: { [definition.attribute]: {
					default: null,
					parseHTML: (element) => {
						const value = element.style.getPropertyValue(definition.cssProperty).trim();
						return allowedValues.has(value) ? value : null;
					},
					renderHTML: (attributes) => {
						const value = attributes[definition.attribute];
						return typeof value === "string" && allowedValues.has(value) ? { style: `${definition.cssProperty}: ${value}` } : {};
					}
				} }
			}];
		}
	});
}
/**
* Register a serializable, allowlisted TextStyle attribute and its toolbar toggle.
* Register before mounting an editor or renderer; the returned disposer removes both entries.
*/
function registerTiptapTextStyleDefinition(definition) {
	validateDefinition(definition);
	const disposeExtension = registerTiptapExtension({
		id: `text-style/${definition.id}`,
		extension: () => createTextStyleExtension(definition)
	});
	let disposeControl;
	try {
		disposeControl = registerTiptapToolbarControl({
			id: definition.id,
			label: definition.label,
			icon: definition.icon,
			run: (editor) => {
				const attributes = { [definition.attribute]: definition.toolbarValue };
				if (editor.isActive("textStyle", attributes)) return editor.chain().focus().setMark("textStyle", { [definition.attribute]: null }).removeEmptyTextStyle().run();
				return editor.chain().focus().setMark("textStyle", attributes).run();
			},
			isActive: (editor) => editor.isActive("textStyle", { [definition.attribute]: definition.toolbarValue })
		});
	} catch (error) {
		disposeExtension();
		throw error;
	}
	registeredAttributes.set(definition.attribute, definition.id);
	return () => {
		disposeControl?.();
		disposeExtension();
		if (registeredAttributes.get(definition.attribute) === definition.id) registeredAttributes.delete(definition.attribute);
	};
}
//#endregion
export { registerTiptapTextStyleDefinition };

//# sourceMappingURL=text-style-definition.js.map