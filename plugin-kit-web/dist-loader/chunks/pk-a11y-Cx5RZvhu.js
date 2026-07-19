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
* Avoids the classic “fixed chrome jumps” bug from `padding-right` compensation:
* Craft CP / playground fixed sidebars & tip bars do not inherit body padding, so
* `body { padding-right: scrollbar }` shifts them when the scrollbar goes
* away. v1 (Base UI) did not jump — follow that model instead:
*
* 1. Prefer a real `scrollbar-gutter: stable` lock (width unchanged under overflow:hidden).
* 2. Otherwise keep `overflow-y: scroll` on `<html>` so the gutter stays painted, and
*    constrain `<body>` so the page cannot scroll.
*/
var locks = /* @__PURE__ */ new Set();
/** Undo for the currently applied lock (only while locks.size > 0). */
var restoreLock = null;
function isOverflowScrollContainer(element) {
	const overflowY = getComputedStyle(element).overflowY;
	return overflowY === "auto" || overflowY === "scroll" || overflowY === "overlay";
}
/** True when setting gutter + toggling overflow does not change layout width. */
function supportsStableScrollbarGutterLock() {
	if (typeof CSS === "undefined" || !CSS.supports?.("scrollbar-gutter", "stable")) return false;
	const html = document.documentElement;
	const body = document.body;
	const scrollContainer = isOverflowScrollContainer(html) ? html : body;
	const prevOverflowY = scrollContainer.style.overflowY;
	const prevGutter = html.style.scrollbarGutter;
	html.style.scrollbarGutter = "stable";
	scrollContainer.style.overflowY = "scroll";
	const before = scrollContainer.offsetWidth;
	scrollContainer.style.overflowY = "hidden";
	const after = scrollContainer.offsetWidth;
	scrollContainer.style.overflowY = prevOverflowY;
	html.style.scrollbarGutter = prevGutter;
	return before === after;
}
function getInsetScrollbarWidth() {
	return Math.max(0, window.innerWidth - document.documentElement.clientWidth);
}
/**
* Apply a lock that does not use body padding-right (fixed elements stay put).
* Returns a restore function.
*/
function applyScrollLock() {
	const html = document.documentElement;
	const body = document.body;
	const htmlStyles = getComputedStyle(html);
	const bodyStyles = getComputedStyle(body);
	if (getInsetScrollbarWidth() < 2) {
		const prevHtmlOverflow = html.style.overflow;
		const prevBodyOverflow = body.style.overflow;
		html.style.overflow = "hidden";
		body.style.overflow = "hidden";
		return () => {
			html.style.overflow = prevHtmlOverflow;
			body.style.overflow = prevBodyOverflow;
		};
	}
	const elementToLock = isOverflowScrollContainer(html) ? html : body;
	if (supportsStableScrollbarGutterLock()) {
		const prevGutter = html.style.scrollbarGutter;
		const prevOverflowY = elementToLock.style.overflowY;
		const prevOverflowX = elementToLock.style.overflowX;
		html.style.scrollbarGutter = htmlStyles.scrollbarGutter?.includes("both-edges") ? "stable both-edges" : "stable";
		elementToLock.style.overflowY = "hidden";
		elementToLock.style.overflowX = "hidden";
		return () => {
			html.style.scrollbarGutter = prevGutter;
			elementToLock.style.overflowY = prevOverflowY;
			elementToLock.style.overflowX = prevOverflowX;
		};
	}
	const scrollTop = html.scrollTop;
	const scrollLeft = html.scrollLeft;
	const scrollbarWidth = Math.max(0, window.innerWidth - body.clientWidth);
	const scrollbarHeight = Math.max(0, window.innerHeight - body.clientHeight);
	const marginY = parseFloat(bodyStyles.marginTop) + parseFloat(bodyStyles.marginBottom);
	const marginX = parseFloat(bodyStyles.marginLeft) + parseFloat(bodyStyles.marginRight);
	const prevHtml = {
		scrollbarGutter: html.style.scrollbarGutter,
		overflowY: html.style.overflowY,
		overflowX: html.style.overflowX,
		scrollBehavior: html.style.scrollBehavior
	};
	const prevBody = {
		position: body.style.position,
		height: body.style.height,
		width: body.style.width,
		boxSizing: body.style.boxSizing,
		overflow: body.style.overflow,
		overflowY: body.style.overflowY,
		overflowX: body.style.overflowX,
		scrollBehavior: body.style.scrollBehavior
	};
	html.style.scrollbarGutter = "stable";
	html.style.overflowY = "scroll";
	html.style.overflowX = "hidden";
	html.style.scrollBehavior = "unset";
	body.style.position = "relative";
	body.style.boxSizing = "border-box";
	body.style.overflow = "hidden";
	body.style.scrollBehavior = "unset";
	body.style.width = marginX || scrollbarWidth ? `calc(100vw - ${marginX + scrollbarWidth}px)` : "100vw";
	body.style.height = marginY || scrollbarHeight ? `calc(100dvh - ${marginY + scrollbarHeight}px)` : "100dvh";
	body.scrollTop = scrollTop;
	body.scrollLeft = scrollLeft;
	return () => {
		Object.assign(html.style, prevHtml);
		Object.assign(body.style, prevBody);
		html.scrollTop = scrollTop;
		html.scrollLeft = scrollLeft;
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
