import { n as getDeepestActiveElement } from "./active-elements-BwpXu8Lb.js";
//#region src/a11y/focus.ts
var idCounter = 0;
/** Stable unique id for aria-labelledby / aria-controls wiring inside components. */
function uniqueId(prefix = "pk") {
	idCounter += 1;
	return `${prefix}-${idCounter}`;
}
var FOCUSABLE_SELECTOR = [
	"a[href]",
	"button:not([disabled])",
	"input:not([disabled])",
	"select:not([disabled])",
	"textarea:not([disabled])",
	"[tabindex]:not([tabindex=\"-1\"])"
].join(",");
var FOCUSABLE_SELECTOR_WITH_DISABLED = [
	"a[href]",
	"button",
	"input",
	"select",
	"textarea",
	"[tabindex]:not([tabindex=\"-1\"])"
].join(",");
function isDisplayed(element) {
	return element.offsetParent !== null || element.getClientRects().length > 0;
}
function matchesFocusable(element, includeDisabled) {
	return element.matches(includeDisabled ? FOCUSABLE_SELECTOR_WITH_DISABLED : FOCUSABLE_SELECTOR);
}
/** Walks shadow roots and assigned slot content — required for slotted dialog actions. */
function gatherFocusableElements(node, includeDisabled, results, seen) {
	if (node instanceof HTMLSlotElement) {
		for (const assigned of node.assignedElements({ flatten: true })) gatherFocusableElements(assigned, includeDisabled, results, seen);
		return;
	}
	if (!(node instanceof HTMLElement)) return;
	if (matchesFocusable(node, includeDisabled) && isDisplayed(node) && !seen.has(node)) {
		seen.add(node);
		results.push(node);
	}
	const subtree = node.shadowRoot ?? node;
	for (const child of subtree.childNodes) gatherFocusableElements(child, includeDisabled, results, seen);
}
function getFocusableElements(root, includeDisabled = false) {
	const results = [];
	const seen = /* @__PURE__ */ new Set();
	if (root instanceof DocumentFragment) {
		for (const child of root.childNodes) gatherFocusableElements(child, includeDisabled, results, seen);
		return results;
	}
	gatherFocusableElements(root, includeDisabled, results, seen);
	return results;
}
function containsActiveElement(element, active) {
	if (!active) return false;
	return element === active || element.contains(active);
}
function getActiveFocusIndex(focusable, active) {
	if (!active) return -1;
	return focusable.findIndex((element) => containsActiveElement(element, active));
}
/**
* Focus trap for overlays — adapted from  dialog patterns.
* Uses deepest active element so shadow-DOM controls participate correctly.
*/
function createFocusTrap({ root, onEscape }) {
	const handleKeyDown = (event) => {
		if (event.key === "Escape") {
			onEscape?.();
			return;
		}
		if (event.key !== "Tab") return;
		const focusable = getFocusableElements(root);
		if (focusable.length === 0) {
			event.preventDefault();
			return;
		}
		const first = focusable[0];
		const last = focusable[focusable.length - 1];
		const activeIndex = getActiveFocusIndex(focusable, getDeepestActiveElement() ?? document.activeElement);
		if (event.shiftKey) {
			if (activeIndex <= 0) {
				event.preventDefault();
				last.focus();
			}
			return;
		}
		if (activeIndex === -1 || activeIndex >= focusable.length - 1) {
			event.preventDefault();
			first.focus();
		}
	};
	document.addEventListener("keydown", handleKeyDown, true);
	return () => {
		document.removeEventListener("keydown", handleKeyDown, true);
	};
}
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
export { uniqueId as i, createFocusTrap as n, getFocusableElements as r, LiveRegion as t };

//# sourceMappingURL=focus-aa5dlv8k.js.map