//#region src/utils/popup-pointer.ts
/** Shared hit/focus-path testing for pk-popup consumers (pointer or keyboard events). */
function isEventInsideOverlay(event, options = {}) {
	const path = event.composedPath();
	if (options.host && path.includes(options.host)) return true;
	if (options.anchor && path.includes(options.anchor)) return true;
	if (options.panel && path.includes(options.panel)) return true;
	return path.some((node) => {
		if (!(node instanceof HTMLElement)) return false;
		if (node.classList.contains("popup") || node.localName === "pk-popup") return true;
		return options.extraMatches?.(node) ?? false;
	});
}
/** Shared light-dismiss hit testing for pk-popup consumers. */
function isPointerInsideOverlay(event, options = {}) {
	return isEventInsideOverlay(event, options);
}
//#endregion
export { isPointerInsideOverlay as n, isEventInsideOverlay as t };

//# sourceMappingURL=popup-pointer-C8lypj8V.js.map