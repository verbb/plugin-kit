//#region src/a11y/active-elements.ts
/**
* Shadow-DOM-aware active element chain — adapted from  internal/active-elements.ts.
*/
function* activeElements(activeElement = document.activeElement) {
	if (activeElement === null || activeElement === void 0) return;
	yield activeElement;
	if ("shadowRoot" in activeElement && activeElement.shadowRoot && activeElement.shadowRoot.mode !== "closed") yield* activeElements(activeElement.shadowRoot.activeElement);
}
function getDeepestActiveElement() {
	return [...activeElements()].pop();
}
//#endregion
export { getDeepestActiveElement as n, activeElements as t };

//# sourceMappingURL=active-elements-BwpXu8Lb.js.map