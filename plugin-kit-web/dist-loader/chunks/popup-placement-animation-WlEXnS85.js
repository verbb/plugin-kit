//#region src/utils/popup-placement-animation.ts
/** Maps Floating UI placement to a physical side for motion CSS. */
function getPopupSide(placement) {
	const side = placement.split("-")[0];
	if (side === "inline-start") return "left";
	if (side === "inline-end") return "right";
	if (side === "top" || side === "bottom" || side === "left" || side === "right") return side;
	return "bottom";
}
/**
* Transform origin at the anchor center on the connecting edge — matches Base UI
* (`@base-ui/react` useAnchorPositioning transformOrigin middleware), which
* plugin-kit-react relies on via `--transform-origin`.
*/
function computePopupTransformOrigin(placement, referenceRect, floatingRect, sideOffset, shift) {
	const side = getPopupSide(placement);
	const transformX = referenceRect.x + referenceRect.width / 2 - floatingRect.x;
	const transformY = referenceRect.y + referenceRect.height / 2 - floatingRect.y;
	if (Math.abs(shift?.y ?? 0) > sideOffset && (side === "top" || side === "bottom")) return `${transformX}px ${referenceRect.y + referenceRect.height / 2 - floatingRect.y}px`;
	return {
		top: `${transformX}px calc(100% + ${sideOffset}px)`,
		bottom: `${transformX}px ${-sideOffset}px`,
		left: `calc(100% + ${sideOffset}px) ${transformY}px`,
		right: `${-sideOffset}px ${transformY}px`
	}[side];
}
/** Applies `data-side` for placement-aware slide/zoom CSS. */
function syncPopupPlacementAnimation(element, placement) {
	if (!placement) {
		element.removeAttribute("data-side");
		return;
	}
	element.setAttribute("data-side", getPopupSide(placement));
}
/** Waits for the first `pk-reposition` on a popup. */
function waitForPopupReposition(popup, fallbackPlacement, timeoutMs = 100, options) {
	const readPlacement = () => {
		return popup.getAttribute("data-current-placement") ?? fallbackPlacement;
	};
	if (!options?.requireEvent && popup.hasAttribute("data-current-placement")) return Promise.resolve(readPlacement());
	return new Promise((resolve) => {
		let settled = false;
		const finish = () => {
			if (settled) return;
			settled = true;
			resolve(readPlacement());
		};
		popup.addEventListener("pk-reposition", finish, { once: true });
		if (!options?.requireEvent) requestAnimationFrame(() => {
			requestAnimationFrame(() => {
				if (popup.hasAttribute("data-current-placement")) finish();
			});
		});
		window.setTimeout(finish, timeoutMs);
	});
}
//#endregion
export { waitForPopupReposition as i, getPopupSide as n, syncPopupPlacementAnimation as r, computePopupTransformOrigin as t };
