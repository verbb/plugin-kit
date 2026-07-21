//#region src/host/portal.ts
var defaultPortalClassName;
var defaultPortalContainer;
var defaultShadowRootSelectors = ["[data-pk-shadow-root]"];
var setPortalClassName = (className) => {
	defaultPortalClassName = className.trim() || void 0;
};
var getPortalClassName = (className) => {
	return (className ?? defaultPortalClassName)?.trim() || void 0;
};
var resolvePortalContainer = (container) => {
	if (!container) return;
	if (typeof container === "object" && "current" in container) return container.current ?? void 0;
	return container ?? void 0;
};
var setPortalContainer = (container) => {
	defaultPortalContainer = resolvePortalContainer(container);
};
var getPortalContainer = (container) => {
	return resolvePortalContainer(container) ?? defaultPortalContainer;
};
var setShadowRootSelectors = (selectors) => {
	const normalizedSelectors = (selectors || []).map((selector) => selector.trim()).filter(Boolean);
	defaultShadowRootSelectors = normalizedSelectors.length > 0 ? normalizedSelectors : ["[data-pk-shadow-root]"];
};
var getShadowRootSelectors = () => {
	return defaultShadowRootSelectors;
};
/**
* Resolve where floating content should be portaled.
* Falls back to document.body when no container is configured.
*/
var getPortalMountNode = (container) => {
	const resolved = getPortalContainer(container);
	if (resolved instanceof HTMLElement) return resolved;
	if (resolved instanceof ShadowRoot) {
		const target = getShadowRootSelectors().map((selector) => resolved.querySelector(selector)).find(Boolean) ?? (resolved.host instanceof HTMLElement ? resolved.host : void 0);
		if (target) return target;
	}
	return document.body;
};
var getPortalTargetForAppend = () => {
	const container = getPortalContainer();
	if (!container) return;
	if (container instanceof HTMLElement) return container;
	const shadowRoot = container;
	return getShadowRootSelectors().map((selector) => shadowRoot.querySelector(selector)).find(Boolean) ?? (shadowRoot.host instanceof HTMLElement ? shadowRoot.host : void 0);
};
//#endregion
export { getPortalClassName, getPortalContainer, getPortalMountNode, getPortalTargetForAppend, getShadowRootSelectors, setPortalClassName, setPortalContainer, setShadowRootSelectors };

//# sourceMappingURL=portal.js.map