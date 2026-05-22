//#region src/utils/portal.ts
var defaultPortalClassName;
var defaultPortalContainer;
var defaultShadowRootSelectors = ["[data-plugin-kit-shadow-root]"];
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
	const normalizedSelectors = (selectors || []).map((selector) => {
		return selector.trim();
	}).filter(Boolean);
	defaultShadowRootSelectors = normalizedSelectors.length > 0 ? normalizedSelectors : ["[data-plugin-kit-shadow-root]"];
};
var getShadowRootSelectors = () => {
	return defaultShadowRootSelectors;
};
/**
* Returns an HTMLElement suitable for appendChild (e.g. BubbleMenu appendTo).
* When the portal container is a ShadowRoot, returns a child element so callers
* that expect HTMLElement get a valid target. This fixes BubbleMenu in Shadow DOM
* contexts (e.g. form builder) where the bubble must render inside the shadow root.
*/
var getPortalTargetForAppend = () => {
	const container = getPortalContainer();
	if (!container) return;
	if (container instanceof HTMLElement) return container;
	const shadowRoot = container;
	return getShadowRootSelectors().map((selector) => {
		return shadowRoot.querySelector(selector);
	}).find((node) => {
		return !!node;
	}) ?? (shadowRoot.host instanceof HTMLElement ? shadowRoot.host : void 0) ?? void 0;
};
//#endregion
export { getPortalClassName, getPortalContainer, getPortalTargetForAppend, getShadowRootSelectors, setPortalClassName, setPortalContainer, setShadowRootSelectors };

//# sourceMappingURL=portal.js.map