//#region src/a11y/offset.ts
/**
* Element offset relative to a parent — adapted from  internal/offset.ts.
* Works around shadow-DOM offsetParent quirks in Chromium.
*/
function getOffset(element, parent) {
	return {
		top: Math.round(element.getBoundingClientRect().top - parent.getBoundingClientRect().top),
		left: Math.round(element.getBoundingClientRect().left - parent.getBoundingClientRect().left)
	};
}
//#endregion
//#region src/a11y/scroll-lock.ts
/**
* Document scroll lock for overlays (dialog, etc.).
*
* Ref-counted so nested overlays unlock only when all close.
*
* Aligns with Craft / Garnish.Modal where it matters:
* - Modal + shade are `position: fixed` (hosts, not the document).
* - Document lock is `body { overflow: hidden }` (Craft’s `.no-scroll`) — **not**
*   `body { position: fixed }`, and **not** `overflow: hidden` on `html`.
*   Body-only overflow keeps Craft’s sticky `#global-sidebar` stuck at the current
*   scrollY; html overflow / body fixed both make sticky “let go” and the nav jumps.
*
* Craft’s class alone still lets the page scroll under the shade (wheel / scrollBy).
* We add wheel / touch / page-key `preventDefault` outside locking overlay hosts so
* user scrolling actually stops — without a `scroll` listener that rubber-bands the
* position back (that felt gross).
*
* Also avoid: permanent/lock-time `scrollbar-gutter`, and `padding-right` compensation
* (Craft fixed tip bars ignore body padding and jump).
*/
var locks = /* @__PURE__ */ new Set();
/** Undo for the currently applied lock (only while locks.size > 0). */
var restoreLock = null;
var SCROLL_KEYS = new Set([
	" ",
	"ArrowUp",
	"ArrowDown",
	"ArrowLeft",
	"ArrowRight",
	"PageUp",
	"PageDown",
	"Home",
	"End"
]);
function eventPathContainsLock(event) {
	for (const node of event.composedPath()) if (node instanceof HTMLElement && locks.has(node)) return true;
	return false;
}
function isEditableTarget(target) {
	if (!(target instanceof HTMLElement)) return false;
	if (target.isContentEditable) return true;
	const tag = target.tagName;
	return tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT";
}
/**
* Craft-like body overflow + gesture block (no scroll-position pin).
* Returns a restore function.
*/
function applyScrollLock() {
	const body = document.body;
	const prevOverflow = body.style.overflow;
	body.style.setProperty("overflow", "hidden", "important");
	const onWheel = (event) => {
		if (eventPathContainsLock(event)) return;
		event.preventDefault();
	};
	const onTouchMove = (event) => {
		if (eventPathContainsLock(event)) return;
		event.preventDefault();
	};
	const onKeyDown = (event) => {
		if (!SCROLL_KEYS.has(event.key)) return;
		if (eventPathContainsLock(event) || isEditableTarget(event.target)) return;
		event.preventDefault();
	};
	window.addEventListener("wheel", onWheel, {
		passive: false,
		capture: true
	});
	window.addEventListener("touchmove", onTouchMove, {
		passive: false,
		capture: true
	});
	window.addEventListener("keydown", onKeyDown, { capture: true });
	return () => {
		window.removeEventListener("wheel", onWheel, { capture: true });
		window.removeEventListener("touchmove", onTouchMove, { capture: true });
		window.removeEventListener("keydown", onKeyDown, { capture: true });
		body.style.removeProperty("overflow");
		if (prevOverflow) body.style.overflow = prevOverflow;
	};
}
function lockBodyScrolling(lockingEl) {
	locks.add(lockingEl);
	if (locks.size === 1) {
		document.documentElement.classList.add("pk-scroll-lock");
		document.documentElement.style.setProperty("--pk-scroll-lock-size", "0px");
		restoreLock = applyScrollLock();
	}
}
function unlockBodyScrolling(lockingEl) {
	locks.delete(lockingEl);
	if (locks.size === 0) {
		restoreLock?.();
		restoreLock = null;
		document.documentElement.classList.remove("pk-scroll-lock");
		document.documentElement.style.removeProperty("--pk-scroll-lock-size");
		document.documentElement.style.removeProperty("--pk-scroll-lock-gutter");
	}
}
/** Dev/diagnostic — how many overlay hosts currently hold the scroll lock. */
function getScrollLockDepth() {
	return locks.size;
}
/** Emergency clear when lock ref-count and html class drift out of sync. */
function forceClearScrollLock() {
	locks.clear();
	restoreLock?.();
	restoreLock = null;
	document.documentElement.classList.remove("pk-scroll-lock");
	document.documentElement.style.removeProperty("--pk-scroll-lock-size");
	document.documentElement.style.removeProperty("--pk-scroll-lock-gutter");
}
/** Scroll an element into view of its scroll container if needed. */
function scrollIntoView(element, container, direction = "vertical", behavior = "smooth") {
	const offset = getOffset(element, container);
	const offsetTop = offset.top + container.scrollTop;
	const offsetLeft = offset.left + container.scrollLeft;
	const minX = container.scrollLeft;
	const maxX = container.scrollLeft + container.offsetWidth;
	const minY = container.scrollTop;
	const maxY = container.scrollTop + container.offsetHeight;
	if (direction === "horizontal" || direction === "both") {
		if (offsetLeft < minX) container.scrollTo({
			left: offsetLeft,
			behavior
		});
		else if (offsetLeft + element.clientWidth > maxX) container.scrollTo({
			left: offsetLeft - container.offsetWidth + element.clientWidth,
			behavior
		});
	}
	if (direction === "vertical" || direction === "both") {
		if (offsetTop < minY) container.scrollTo({
			top: offsetTop,
			behavior
		});
		else if (offsetTop + element.clientHeight > maxY) container.scrollTo({
			top: offsetTop - container.offsetHeight + element.clientHeight,
			behavior
		});
	}
}
//#endregion
export { unlockBodyScrolling as a, scrollIntoView as i, getScrollLockDepth as n, getOffset as o, lockBodyScrolling as r, forceClearScrollLock as t };

//# sourceMappingURL=scroll-lock-Bbh3Sc5g.js.map