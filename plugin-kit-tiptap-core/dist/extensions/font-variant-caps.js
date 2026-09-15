import { Extension } from "@tiptap/core";
//#region src/extensions/font-variant-caps.ts
/** A deliberately narrow TextStyle attribute; arbitrary CSS values are never persisted. */
var FontVariantCaps = Extension.create({
	name: "fontVariantCaps",
	addGlobalAttributes() {
		return [{
			types: ["textStyle"],
			attributes: { fontVariantCaps: {
				default: null,
				parseHTML: (element) => element.style.fontVariantCaps === "small-caps" ? "small-caps" : null,
				renderHTML: (attributes) => attributes.fontVariantCaps === "small-caps" ? { style: "font-variant-caps: small-caps" } : {}
			} }
		}];
	},
	addCommands() {
		return {
			setSmallCaps: () => ({ chain }) => chain().setMark("textStyle", { fontVariantCaps: "small-caps" }).run(),
			unsetSmallCaps: () => ({ chain }) => chain().setMark("textStyle", { fontVariantCaps: null }).removeEmptyTextStyle().run(),
			toggleSmallCaps: () => ({ editor, commands }) => editor.isActive("textStyle", { fontVariantCaps: "small-caps" }) ? commands.unsetSmallCaps() : commands.setSmallCaps()
		};
	}
});
//#endregion
export { FontVariantCaps };

//# sourceMappingURL=font-variant-caps.js.map