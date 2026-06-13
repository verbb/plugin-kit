//#region src/utils/documentScrollStability.ts
var DOCUMENT_SCROLL_STABILITY_STYLE_ID = "plugin-kit-document-scroll-stability";
/**
* Reserve scrollbar space on the document root so Base UI modal scroll lock
* can use the stable gutter path instead of padding/body width compensation.
* Safe to call multiple times; only injects once.
*/
var ensureDocumentScrollStability = () => {
	if (typeof document === "undefined") return;
	if (document.querySelector(`style[data-plugin-kit-style-id="${DOCUMENT_SCROLL_STABILITY_STYLE_ID}"]`)) return;
	const style = document.createElement("style");
	style.setAttribute("data-plugin-kit-style-id", DOCUMENT_SCROLL_STABILITY_STYLE_ID);
	style.textContent = "html { scrollbar-gutter: stable; }";
	document.head.appendChild(style);
};
//#endregion
export { ensureDocumentScrollStability };

//# sourceMappingURL=documentScrollStability.js.map