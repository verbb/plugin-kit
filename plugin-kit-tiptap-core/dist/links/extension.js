import Link from "@tiptap/extension-link";
//#region src/links/extension.ts
/** Shared Tiptap link mark configuration for Plugin Kit editors. */
function createLinkExtension() {
	return Link.configure({
		openOnClick: false,
		enableClickSelection: false,
		HTMLAttributes: {
			target: null,
			rel: null
		}
	});
}
//#endregion
export { createLinkExtension };

//# sourceMappingURL=extension.js.map