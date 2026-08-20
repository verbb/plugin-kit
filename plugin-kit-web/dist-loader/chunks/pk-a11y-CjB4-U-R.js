//#region src/a11y/dismissible-stack.ts
/**
* Dismissible stack — adapted from  internal/dismissible-stack.ts.
* Ensures only the topmost overlay handles Escape.
*/
var dismissibleStack = [];
function registerDismissible(key) {
	dismissibleStack.push(key);
}
function unregisterDismissible(key) {
	for (let index = dismissibleStack.length - 1; index >= 0; index -= 1) if (dismissibleStack[index] === key) {
		dismissibleStack.splice(index, 1);
		break;
	}
}
function isTopDismissible(key) {
	return dismissibleStack.length > 0 && dismissibleStack[dismissibleStack.length - 1] === key;
}
/** Dev/diagnostic — ordered stack of dismissible overlay hosts (bottom → top). */
function getDismissibleStackSnapshot() {
	return dismissibleStack.map((key) => {
		if (key instanceof HTMLElement) {
			const id = key.id ? `#${key.id}` : "";
			return `<${key.localName}${id}>`;
		}
		return key.constructor?.name ?? "object";
	});
}
//#endregion
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
//#region src/a11y/active-elements.ts
/**
* Shadow-DOM-aware active element chain — adapted from  internal/active-elements.ts.
*/
function* activeElements(activeElement = document.activeElement) {
	if (activeElement === null || activeElement === void 0) return;
	yield activeElement;
	if ("shadowRoot" in activeElement && activeElement.shadowRoot && activeElement.shadowRoot.mode !== "closed") yield* activeElements(activeElement.shadowRoot.activeElement);
}
//#endregion
//#region src/a11y/focus.ts
var idCounter = 0;
/** Stable unique id for aria-labelledby / aria-controls wiring inside components. */
function uniqueId(prefix = "pk") {
	idCounter += 1;
	return `${prefix}-${idCounter}`;
}
[
	"a[href]",
	"button:not([disabled])",
	"input:not([disabled])",
	"select:not([disabled])",
	"textarea:not([disabled])",
	"[tabindex]:not([tabindex=\"-1\"])"
].join(",");
[
	"a[href]",
	"button",
	"input",
	"select",
	"textarea",
	"[tabindex]:not([tabindex=\"-1\"])"
].join(",");
/** Screen reader announcements for async overlay state changes. */
var LiveRegion = class {
	constructor(politeness = "polite") {
		this.element = document.createElement("div");
		this.element.setAttribute("aria-live", politeness);
		this.element.setAttribute("aria-atomic", "true");
		this.element.className = "pk-visually-hidden";
		this.element.style.cssText = "position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0;";
		document.body.append(this.element);
	}
	announce(message) {
		this.element.textContent = "";
		requestAnimationFrame(() => {
			this.element.textContent = message;
		});
	}
	destroy() {
		this.element.remove();
	}
};
//#endregion
export { getScrollLockDepth as a, unlockBodyScrolling as c, registerDismissible as d, unregisterDismissible as f, forceClearScrollLock as i, getDismissibleStackSnapshot as l, uniqueId as n, lockBodyScrolling as o, activeElements as r, scrollIntoView as s, LiveRegion as t, isTopDismissible as u };
