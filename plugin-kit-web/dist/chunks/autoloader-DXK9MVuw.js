import { t as SUPPORTS_POPOVER } from "./supports-popover-CUBsbHpS.js";
import { n as COMPONENT_MODULE_PATHS } from "./component-registry-BOlxFlou.js";
//#region src/utils/documentScrollStability.ts
var DOCUMENT_SCROLL_STABILITY_STYLE_ID = "plugin-kit-document-scroll-stability";
/**
* Reserve scrollbar space on the document root so overlay scroll lock
* can use the stable gutter path instead of body width compensation.
* Safe to call multiple times; only injects once.
*
* tokens.css already sets `html { scrollbar-gutter: stable }` for kit surfaces
* that import tokens. This injector covers hosts that load components without
* tokens (e.g. craft CP early boot / ShadowRoot portal config).
*/
var ensureDocumentScrollStability = () => {
	if (typeof document === "undefined") return;
	if (document.querySelector(`style[data-plugin-kit-style-id="${DOCUMENT_SCROLL_STABILITY_STYLE_ID}"]`)) return;
	const style = document.createElement("style");
	style.setAttribute("data-plugin-kit-style-id", DOCUMENT_SCROLL_STABILITY_STYLE_ID);
	style.textContent = "html { scrollbar-gutter: stable; }";
	document.head.appendChild(style);
};
//#endregion
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
var setPortalContainer = (container) => {
	defaultPortalContainer = container;
};
var getPortalContainer = (container) => {
	return container ?? defaultPortalContainer;
};
var setShadowRootSelectors = (selectors) => {
	const normalizedSelectors = (selectors || []).map((selector) => selector.trim()).filter(Boolean);
	defaultShadowRootSelectors = normalizedSelectors.length > 0 ? normalizedSelectors : ["[data-plugin-kit-shadow-root]"];
};
var getShadowRootSelectors = () => {
	return defaultShadowRootSelectors;
};
/**
* Returns an HTMLElement suitable for appendChild — mirrors React `getPortalTargetForAppend`.
* When the portal container is a ShadowRoot, prefers a dedicated mount node inside it.
*/
function getPortalTargetForAppend(container) {
	const resolved = getPortalContainer(container);
	if (!resolved) return;
	if (resolved instanceof HTMLElement) return resolved;
	const shadowRoot = resolved;
	const target = getShadowRootSelectors().map((selector) => shadowRoot.querySelector(selector)).find((node) => Boolean(node));
	if (target) return target;
	return shadowRoot.host instanceof HTMLElement ? shadowRoot.host : void 0;
}
/** Resolves where floating popup layers should mount. Falls back to `document.body`. */
function getPortalMountElement(container) {
	return getPortalTargetForAppend(container) ?? document.body;
}
function resolvePositionMethod(positionMethod, container) {
	if (positionMethod) return positionMethod;
	if (SUPPORTS_POPOVER) return "absolute";
	if (getPortalContainer(container) instanceof ShadowRoot) return "fixed";
	return "absolute";
}
//#endregion
//#region src/utils/config.ts
var configurePluginKitWeb = (config) => {
	if (config.portalContainer instanceof ShadowRoot) ensureDocumentScrollStability();
	if (config.shadowRootSelectors) setShadowRootSelectors(config.shadowRootSelectors);
};
//#endregion
//#region src/utilities/defined.ts
/**
* Waits for custom elements on the page to be registered before resolving.
* By default, waits for all undefined `pk-*` elements.
*/
async function allDefined(options = {}) {
	const opts = {
		match: (tagName) => tagName.startsWith("pk-"),
		additionalElements: [],
		root: document,
		...options
	};
	const additionalElements = Array.isArray(opts.additionalElements) ? opts.additionalElements : [opts.additionalElements];
	const tagsToAwait = [...[...opts.root.querySelectorAll(":not(:defined)")].map((el) => el.localName).filter((tag, index, arr) => arr.indexOf(tag) === index).filter((tag) => opts.match(tag)), ...additionalElements];
	await Promise.all(tagsToAwait.map((tag) => customElements.whenDefined(tag)));
	await new Promise(requestAnimationFrame);
}
//#endregion
//#region src/utilities/base-path.ts
var basePath = "";
function setBasePath(path) {
	basePath = path;
}
function getBasePath(subpath = "") {
	if (!basePath) {
		const el = document.querySelector("[data-plugin-kit]");
		if (el?.hasAttribute("data-plugin-kit")) {
			const rootRelativeUrl = new URL(el.getAttribute("data-plugin-kit") ?? "", window.location.href).pathname;
			setBasePath(rootRelativeUrl);
		} else {
			const pkScript = [...document.getElementsByTagName("script")].find((script) => script.src.endsWith("plugin-kit.js") || script.src.endsWith("plugin-kit.loader.js"));
			if (pkScript) setBasePath(String(pkScript.getAttribute("src")).split("/").slice(0, -1).join("/"));
		}
	}
	return basePath.replace(/\/$/, "") + (subpath ? `/${subpath.replace(/^\//, "")}` : "");
}
//#endregion
//#region src/utilities/autoloader.ts
var PK_PREFIX = "pk-";
var DISCOVERY_EVENT = "pk-discovery-complete";
var observer = new MutationObserver((mutations) => {
	for (const { addedNodes } of mutations) for (const node of addedNodes) if (node.nodeType === Node.ELEMENT_NODE) discover(node);
});
function startLoader() {
	discover(document.documentElement);
	observer.observe(document.documentElement, {
		subtree: true,
		childList: true
	});
}
function stopLoader() {
	observer.disconnect();
}
async function discover(root = document) {
	const rootTagName = root instanceof Element ? root.tagName.toLowerCase() : "";
	const rootIsPluginKitComponent = rootTagName.startsWith(PK_PREFIX);
	const tags = [...root.querySelectorAll(":not(:defined)")].map((el) => el.tagName.toLowerCase()).filter((tag) => tag.startsWith(PK_PREFIX));
	if (rootIsPluginKitComponent && !customElements.get(rootTagName)) tags.push(rootTagName);
	const preloadSelectors = root.querySelectorAll("[data-pk-preload]");
	const preloadRoots = root instanceof Element && root.hasAttribute("data-pk-preload") ? [root, ...preloadSelectors] : preloadSelectors;
	for (const el of preloadRoots) tags.push(...el.getAttribute("data-pk-preload").split(/\s+/).filter((tag) => tag.startsWith(PK_PREFIX)));
	const tagsToRegister = [...new Set(tags)];
	const imports = await Promise.allSettled(tagsToRegister.map((tagName) => register(tagName)));
	for (const imp of imports) if (imp.status === "rejected") console.warn(imp.reason);
	await new Promise(requestAnimationFrame);
	root.dispatchEvent(new CustomEvent(DISCOVERY_EVENT, {
		bubbles: false,
		cancelable: false,
		composed: true
	}));
}
function register(tagName) {
	if (customElements.get(tagName)) return Promise.resolve();
	const modulePath = COMPONENT_MODULE_PATHS[tagName];
	if (!modulePath) return Promise.reject(/* @__PURE__ */ new Error(`Unable to autoload <${tagName}> — no module path registered`));
	return import(
		/* @vite-ignore */
		getBasePath(modulePath)
).then(() => void 0);
}
var turboTimeout = 2e3;
/** Prevent FOUCE when navigating with Turbo (Hotwire). */
function preventTurboFouce(timeout = 2e3) {
	turboTimeout = timeout;
	document.addEventListener("turbo:before-render", handleTurboRender);
}
async function handleTurboRender(event) {
	const turboEvent = event;
	const newBody = turboEvent.detail.newBody;
	turboEvent.preventDefault();
	try {
		await Promise.race([discover(newBody), new Promise((resolve) => setTimeout(resolve, turboTimeout))]);
	} finally {
		turboEvent.detail.resume();
	}
}
var FOUCE_TIMEOUT_MS = 2e3;
var DISCOVERY_COMPLETE_EVENT = DISCOVERY_EVENT;
//#endregion
export { setPortalClassName as _, startLoader as a, setBasePath as c, getPortalClassName as d, getPortalContainer as f, resolvePositionMethod as g, getShadowRootSelectors as h, preventTurboFouce as i, allDefined as l, getPortalTargetForAppend as m, FOUCE_TIMEOUT_MS as n, stopLoader as o, getPortalMountElement as p, discover as r, getBasePath as s, DISCOVERY_COMPLETE_EVENT as t, configurePluginKitWeb as u, setPortalContainer as v, setShadowRootSelectors as y };

//# sourceMappingURL=autoloader-DXK9MVuw.js.map