//#region src/utils/popup-pointer.ts
/** Resolve the pk-popup that owns this overlay's panel (or the host's popup). */
function resolveOwnPopup(options) {
	if (options.panel instanceof Element) {
		const closest = options.panel.closest("pk-popup");
		if (closest) return closest;
		const root = options.panel.getRootNode();
		if (root instanceof ShadowRoot && root.host.localName === "pk-popup") return root.host;
	}
	if (options.host instanceof HTMLElement) return options.host.shadowRoot?.querySelector("pk-popup") ?? options.host.querySelector(":scope > pk-popup") ?? options.host.querySelector("pk-popup");
	return null;
}
/** Shared hit/focus-path testing for pk-popup consumers (pointer or keyboard events). */
function isEventInsideOverlay(event, options = {}) {
	const path = event.composedPath();
	if (options.host && path.includes(options.host)) return true;
	if (options.anchor && path.includes(options.anchor)) return true;
	if (options.panel && path.includes(options.panel)) return true;
	const ownPopup = resolveOwnPopup(options);
	if (ownPopup && path.includes(ownPopup)) return true;
	return path.some((node) => {
		if (!(node instanceof HTMLElement)) return false;
		if (ownPopup && node.classList.contains("popup") && (node === ownPopup || ownPopup.contains(node))) return true;
		return options.extraMatches?.(node) ?? false;
	});
}
/** Shared light-dismiss hit testing for pk-popup consumers. */
function isPointerInsideOverlay(event, options = {}) {
	return isEventInsideOverlay(event, options);
}
//#endregion
export { isPointerInsideOverlay as n, isEventInsideOverlay as t };
