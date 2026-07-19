import { a as getScrollLockDepth, i as forceClearScrollLock, l as getDismissibleStackSnapshot } from "./chunks/pk-a11y-Cx5RZvhu.js";
//#region src/component-registry.ts
/**
* Canonical tag → loader module path mapping for the autoloader.
* Module paths are relative to the directory that contains plugin-kit.loader.js.
*/
var COMPONENT_MODULE_PATHS = {
	"pk-spinner": "components/spinner/spinner.js",
	"pk-icon": "components/icon/icon.js",
	"pk-button": "components/button/button.js",
	"pk-checkbox": "components/checkbox/checkbox.js",
	"pk-checkbox-select": "components/checkbox-select/checkbox-select.js",
	"pk-color-input": "components/color-input/color-input.js",
	"pk-code-editor": "components/code-editor/code-editor.js",
	"pk-input": "components/input/input.js",
	"pk-input-group": "components/input-group/input-group.js",
	"pk-input-group-addon": "components/input-group/input-group-addon.js",
	"pk-input-group-button": "components/input-group/input-group-button.js",
	"pk-input-group-input": "components/input-group/input-group-input.js",
	"pk-input-group-text": "components/input-group/input-group-text.js",
	"pk-input-group-textarea": "components/input-group/input-group-textarea.js",
	"pk-textarea": "components/textarea/textarea.js",
	"pk-tiptap-editor": "components/tiptap/tiptap-editor.js",
	"pk-tiptap-input": "components/tiptap/tiptap-input.js",
	"pk-tiptap-content": "components/tiptap/tiptap-content.js",
	"pk-field": "components/field/field.js",
	"pk-separator": "components/separator/separator.js",
	"pk-status": "components/status/status.js",
	"pk-toggle": "components/toggle/toggle.js",
	"pk-toggle-group": "components/toggle-group/toggle-group.js",
	"pk-lightswitch": "components/lightswitch/lightswitch.js",
	"pk-button-group": "components/button-group/button-group.js",
	"pk-button-group-separator": "components/button-group/button-group-separator.js",
	"pk-button-group-text": "components/button-group/button-group-text.js",
	"pk-dialog": "components/dialog/dialog.js",
	"pk-popup": "components/popup/popup.js",
	"pk-dropdown-label": "components/dropdown-menu/dropdown-label.js",
	"pk-dropdown-item": "components/dropdown-menu/dropdown-item.js",
	"pk-dropdown-separator": "components/dropdown-menu/dropdown-separator.js",
	"pk-dropdown-menu": "components/dropdown-menu/dropdown-menu.js",
	"pk-popover": "components/popover/popover.js",
	"pk-tooltip": "components/tooltip/tooltip.js",
	"pk-radio": "components/radio-group/radio.js",
	"pk-radio-group": "components/radio-group/radio-group.js",
	"pk-tab": "components/tabs/tab.js",
	"pk-tab-heading": "components/tabs/tab-heading.js",
	"pk-tab-panel": "components/tabs/tab-panel.js",
	"pk-tabs": "components/tabs/tabs.js",
	"pk-scroll-area": "components/scroll-area/scroll-area.js",
	"pk-option": "components/select/option.js",
	"pk-option-group": "components/select/option-group.js",
	"pk-select": "components/select/select.js",
	"pk-calendar": "components/calendar/calendar.js",
	"pk-date-picker": "components/date-picker/date-picker.js",
	"pk-combobox": "components/combobox/combobox.js",
	"pk-time-picker": "components/time-picker/time-picker.js",
	"pk-copy-button": "components/copy-button/copy-button.js",
	"pk-editable-table": "components/editable-table/editable-table.js"
};
/** Vite loader-build entries: output key → source module. */
var LOADER_COMPONENT_ENTRIES = {
	"components/spinner/spinner": "src/components/spinner/pk-spinner.ts",
	"components/icon/icon": "src/components/icon/pk-icon-loader.ts",
	"components/button/button": "src/components/button/pk-button.ts",
	"components/checkbox/checkbox": "src/components/checkbox/pk-checkbox.ts",
	"components/checkbox-select/checkbox-select": "src/components/checkbox-select/pk-checkbox-select.ts",
	"components/color-input/color-input": "src/components/color-input/pk-color-input.ts",
	"components/code-editor/code-editor": "src/components/code-editor/pk-code-editor.ts",
	"components/input/input": "src/components/input/pk-input.ts",
	"components/input-group/input-group": "src/components/input-group/pk-input-group.ts",
	"components/input-group/input-group-addon": "src/components/input-group/pk-input-group-addon.ts",
	"components/input-group/input-group-button": "src/components/input-group/pk-input-group-button.ts",
	"components/input-group/input-group-input": "src/components/input-group/pk-input-group-input.ts",
	"components/input-group/input-group-text": "src/components/input-group/pk-input-group-text.ts",
	"components/input-group/input-group-textarea": "src/components/input-group/pk-input-group-textarea.ts",
	"components/textarea/textarea": "src/components/textarea/pk-textarea.ts",
	"components/tiptap/tiptap-editor": "src/components/tiptap/pk-tiptap-editor.ts",
	"components/tiptap/tiptap-input": "src/components/tiptap/pk-tiptap-input.ts",
	"components/tiptap/tiptap-content": "src/components/tiptap/pk-tiptap-content.ts",
	"components/field/field": "src/components/field/pk-field.ts",
	"components/separator/separator": "src/components/separator/pk-separator.ts",
	"components/status/status": "src/components/status/pk-status.ts",
	"components/toggle/toggle": "src/components/toggle/pk-toggle.ts",
	"components/toggle-group/toggle-group": "src/components/toggle-group/pk-toggle-group.ts",
	"components/lightswitch/lightswitch": "src/components/lightswitch/pk-lightswitch.ts",
	"components/button-group/button-group": "src/components/button-group/pk-button-group.ts",
	"components/button-group/button-group-separator": "src/components/button-group/pk-button-group-separator.ts",
	"components/button-group/button-group-text": "src/components/button-group/pk-button-group-text.ts",
	"components/dialog/dialog": "src/components/dialog/pk-dialog.ts",
	"components/popup/popup": "src/components/popup/pk-popup.ts",
	"components/dropdown-menu/dropdown-label": "src/components/dropdown-menu/pk-dropdown-label.ts",
	"components/dropdown-menu/dropdown-item": "src/components/dropdown-menu/pk-dropdown-item.ts",
	"components/dropdown-menu/dropdown-separator": "src/components/dropdown-menu/pk-dropdown-separator.ts",
	"components/dropdown-menu/dropdown-menu": "src/components/dropdown-menu/pk-dropdown-menu.ts",
	"components/popover/popover": "src/components/popover/pk-popover.ts",
	"components/tooltip/tooltip": "src/components/tooltip/pk-tooltip.ts",
	"components/radio-group/radio": "src/components/radio-group/pk-radio.ts",
	"components/radio-group/radio-group": "src/components/radio-group/pk-radio-group.ts",
	"components/tabs/tab": "src/components/tabs/pk-tab.ts",
	"components/tabs/tab-heading": "src/components/tabs/pk-tab-heading.ts",
	"components/tabs/tab-panel": "src/components/tabs/pk-tab-panel.ts",
	"components/tabs/tabs": "src/components/tabs/pk-tabs.ts",
	"components/scroll-area/scroll-area": "src/components/scroll-area/pk-scroll-area.ts",
	"components/select/option": "src/components/select/pk-option.ts",
	"components/select/option-group": "src/components/select/pk-option-group.ts",
	"components/select/select": "src/components/select/pk-select.ts",
	"components/calendar/calendar": "src/components/calendar/pk-calendar.ts",
	"components/date-picker/date-picker": "src/components/date-picker/pk-date-picker.ts",
	"components/combobox/combobox": "src/components/combobox/pk-combobox.ts",
	"components/time-picker/time-picker": "src/components/time-picker/pk-time-picker.ts",
	"components/copy-button/copy-button": "src/components/copy-button/pk-copy-button.ts",
	"components/editable-table/editable-table": "src/components/editable-table/pk-editable-table.ts"
};
/** Loader-only shims → real element modules for the bundler dist graph. */
var BUNDLER_SRC_OVERRIDES = { "src/components/icon/pk-icon-loader.ts": "src/components/icon/pk-icon.ts" };
/**
* Vite `dist/` build entries for bundler cherry-picking.
* Output paths mirror source layout, e.g. `dist/components/button/pk-button.js`.
*/
var BUNDLER_COMPONENT_ENTRIES = Object.fromEntries(Object.values(LOADER_COMPONENT_ENTRIES).map((srcRel) => {
	const bundlerSrc = BUNDLER_SRC_OVERRIDES[srcRel] ?? srcRel;
	return [bundlerSrc.replace(/^src\//, "").replace(/\.ts$/, ""), bundlerSrc];
}));
/** Tag → bundler dist subpath (relative to package root, no `./` prefix). */
var BUNDLER_TAG_IMPORT_PATHS = Object.fromEntries(Object.keys(BUNDLER_COMPONENT_ENTRIES).map((key) => {
	return [key.split("/").pop(), `${key}.js`];
}));
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
var setPortalClassName = (className) => {
	className.trim();
};
var setPortalContainer = (container) => {};
var setShadowRootSelectors = (selectors) => {
	(selectors || []).map((selector) => selector.trim()).filter(Boolean).length;
};
//#endregion
//#region src/utils/config.ts
var configurePluginKitWeb = (config) => {
	if (config.portalContainer instanceof ShadowRoot) ensureDocumentScrollStability();
	if (config.shadowRootSelectors) setShadowRootSelectors(config.shadowRootSelectors);
};
//#endregion
//#region src/utils/overlay-recovery.ts
/**
* Production overlay recovery — detects and clears stuck pk-dialog / popup /
* scroll-lock states that leave the page scrollable but unclickable.
*
* Dev tooling with richer diagnostics lives in plugin-kit-playground `lit-debug.ts`.
*/
var deepAllElements = (roots) => {
	const out = [];
	const walk = (root) => {
		for (const el of root.querySelectorAll("*")) {
			out.push(el);
			if (el.shadowRoot) walk(el.shadowRoot);
		}
	};
	for (const root of roots) walk(root);
	return out;
};
var collectSearchRoots = () => {
	const roots = [document];
	for (const host of document.querySelectorAll("[data-navigation-shadow-root], [data-navigation-shadow-style]")) if (host.shadowRoot) roots.push(host.shadowRoot);
	for (const host of document.querySelectorAll("[data-pk-shadow-root]")) if (host.shadowRoot) roots.push(host.shadowRoot);
	return roots;
};
var describeElement = (el) => {
	const cs = getComputedStyle(el);
	const r = el.getBoundingClientRect();
	let label = el.nodeName.toLowerCase();
	if (el.id) label += `#${el.id}`;
	if (typeof el.className === "string" && el.className) label += `.${el.className.split(" ").slice(0, 2).join(".")}`;
	return `${label} [${Math.round(r.width)}×${Math.round(r.height)} @${Math.round(r.left)},${Math.round(r.top)} pe=${cs.pointerEvents} pos=${cs.position} z=${cs.zIndex}]`;
};
/** Inspect open overlays and pointer blockers across document + known shadow roots. */
var diagnoseOverlayBlockers = () => {
	const all = deepAllElements(collectSearchRoots());
	const lines = [];
	const openDialogs = all.filter((el) => el instanceof HTMLDialogElement && el.open);
	lines.push(`open <dialog>s: ${openDialogs.length}`);
	for (const dialog of openDialogs) {
		const host = dialog.getRootNode()?.host;
		lines.push(`  • ${describeElement(dialog)}${dialog.matches(":modal") ? " [MODAL]" : ""}${host ? ` in <${host.nodeName.toLowerCase()}>` : ""}`);
		if (dialog.parentElement?.classList.contains("closing") || dialog.classList.contains("closing")) lines.push("    ⚠ has .closing (opacity:0 but still modal → invisible blocker)");
	}
	const coverers = all.filter((el) => {
		const cs = getComputedStyle(el);
		const r = el.getBoundingClientRect();
		return (cs.position === "fixed" || cs.position === "absolute") && cs.pointerEvents !== "none" && r.width >= window.innerWidth * .9 && r.height >= window.innerHeight * .9;
	});
	lines.push(`full-viewport pointer-capturing overlays: ${coverers.length}`);
	for (const coverer of coverers.slice(0, 10)) lines.push(`  • ${describeElement(coverer)}`);
	const portals = all.filter((el) => typeof el.className === "string" && /portal/.test(el.className));
	lines.push(`portal elements: ${portals.length}`);
	for (const portal of portals.slice(0, 6)) lines.push(`  • ${describeElement(portal)}`);
	const scrollLocked = document.documentElement.classList.contains("pk-scroll-lock");
	const scrollLockDepth = getScrollLockDepth();
	lines.push(`html.pk-scroll-lock: ${scrollLocked} (ref-count: ${scrollLockDepth})`);
	if (scrollLocked && scrollLockDepth === 0) lines.push("  ⚠ stale scroll-lock class — no overlay holds the lock ref-count");
	const inertCount = all.filter((el) => el.hasAttribute("inert")).length;
	lines.push(`inert elements: ${inertCount}`);
	const dismissStack = getDismissibleStackSnapshot();
	lines.push(`dismissible stack (${dismissStack.length}): ${dismissStack.join(" → ") || "(empty)"}`);
	const openMenus = [...document.querySelectorAll("pk-dropdown-menu")].filter((el) => el.open);
	lines.push(`pk-dropdown-menu open: ${openMenus.length}`);
	for (const menu of openMenus.slice(0, 4)) {
		const host = menu;
		lines.push(`  • #${menu.id || "(no id)"} open=${host.open} closing=${Boolean(host.closing)}`);
	}
	const closingMenus = [...document.querySelectorAll("pk-dropdown-menu")].filter((el) => el.closing);
	if (closingMenus.length > 0) {
		lines.push(`pk-dropdown-menu closing: ${closingMenus.length}`);
		for (const menu of closingMenus.slice(0, 4)) {
			const host = menu;
			lines.push(`  • #${menu.id || "(no id)"} open=${Boolean(host.open)} closing=${Boolean(host.closing)}`);
		}
	}
	const pkDialogs = [...document.querySelectorAll("pk-dialog")];
	const openPkDialogs = pkDialogs.filter((el) => el.open);
	lines.push(`pk-dialog open: ${openPkDialogs.length}`);
	for (const dialogHost of pkDialogs.slice(0, 6)) {
		const host = dialogHost;
		const native = dialogHost.shadowRoot?.querySelector("dialog");
		const nativeOpen = Boolean(native?.open);
		const nativeModal = native instanceof HTMLDialogElement && native.matches(":modal");
		if (host.open || nativeOpen || nativeModal) lines.push(`  • #${dialogHost.id || "(no id)"} host.open=${Boolean(host.open)} native.open=${nativeOpen} :modal=${nativeModal} closing=${Boolean(host.closing)}`);
		if (native?.classList.contains("closing")) lines.push("    ⚠ native dialog has .closing (invisible modal blocker)");
	}
	const modalButNotReported = all.filter((el) => el instanceof HTMLDialogElement).filter((dialog) => dialog.open && dialog.matches(":modal"));
	if (modalButNotReported.length > openDialogs.length) {
		lines.push(`⚠ extra :modal dialogs in shadow roots: ${modalButNotReported.length}`);
		for (const dialog of modalButNotReported.slice(0, 4)) lines.push(`  • ${describeElement(dialog)}${dialog.classList.contains("closing") ? " [.closing]" : ""}`);
	}
	const popoverOpen = all.filter((el) => {
		try {
			return el.matches(":popover-open");
		} catch {
			return false;
		}
	});
	lines.push(`:popover-open elements: ${popoverOpen.length}`);
	for (const pop of popoverOpen.slice(0, 6)) lines.push(`  • ${describeElement(pop)}`);
	const popoverHosts = all.filter((el) => el.hasAttribute("popover"));
	lines.push(`[popover] elements (total): ${popoverHosts.length}`);
	for (const pop of popoverHosts.slice(0, 8)) {
		let openFlag = "?";
		try {
			openFlag = pop.matches(":popover-open") ? "open" : "closed";
		} catch {}
		lines.push(`  • ${describeElement(pop)} (${openFlag})`);
	}
	for (const dialog of openDialogs) {
		const host = dialog.getRootNode()?.host;
		const hostOpen = host && "open" in host ? host.open : void 0;
		if (host && hostOpen === false) lines.push(`  ⚠ native dialog.open but <${host.localName}> host.open=false (desync)`);
	}
	const centerStack = document.elementsFromPoint(window.innerWidth / 2, window.innerHeight / 2).slice(0, 8).map((node) => {
		if (node instanceof HTMLDialogElement) return `dialog${node.open ? "[open]" : ""}`;
		return node.nodeName.toLowerCase();
	});
	lines.push(`center element stack: ${centerStack.join(" > ")}`);
	const topHit = document.elementFromPoint(window.innerWidth / 2, window.innerHeight / 2);
	if (topHit instanceof HTMLDialogElement && topHit.open) lines.push("  ⚠ center click hits an open native <dialog> (modal blocker likely)");
	const sampleY = Math.round(window.innerHeight * .4);
	const sampleXs = [
		.2,
		.5,
		.8
	].map((f) => Math.round(window.innerWidth * f));
	lines.push("pointer hit samples (40% viewport height):");
	for (const x of sampleXs) {
		const hit = document.elementFromPoint(x, sampleY);
		const stack = document.elementsFromPoint(x, sampleY).slice(0, 4).map((node) => {
			if (node instanceof HTMLDialogElement) return `dialog${node.open ? "[open]" : ""}`;
			return node.nodeName.toLowerCase();
		});
		const pe = hit instanceof Element ? getComputedStyle(hit).pointerEvents : "n/a";
		lines.push(`  • @${x},${sampleY}: ${stack.join(" > ")} (pe=${pe})`);
	}
	const rootPe = getComputedStyle(document.documentElement).pointerEvents;
	const bodyPe = getComputedStyle(document.body).pointerEvents;
	lines.push(`html/body pointer-events: ${rootPe} / ${bodyPe}`);
	return {
		openDialogCount: openDialogs.length,
		popoverOpenCount: popoverOpen.length,
		covererCount: coverers.length,
		portalCount: portals.length,
		scrollLocked,
		scrollLockDepth,
		inertCount,
		centerStack,
		report: lines.join("\n")
	};
};
/** Force-close overlays and clear scroll lock. Returns actions taken for logging. */
var recoverOverlays = () => {
	const diagnostic = diagnoseOverlayBlockers();
	const actions = [];
	const all = deepAllElements(collectSearchRoots());
	for (const el of all) {
		if (el instanceof HTMLDialogElement && el.open) try {
			el.close();
			actions.push(`closed ${el.nodeName.toLowerCase()}`);
		} catch {}
		if (el instanceof HTMLElement && "hidePopover" in el && el.hasAttribute("popover")) try {
			el.hidePopover();
			actions.push(`hidePopover ${el.localName}`);
		} catch {}
		const tag = el.localName;
		if (tag === "pk-dropdown-menu") {
			const menu = el;
			if (typeof menu.forceDismissCleanup === "function") {
				menu.forceDismissCleanup();
				actions.push("forceDismissCleanup <pk-dropdown-menu>");
			} else if ("open" in menu && menu.open) {
				menu.open = false;
				actions.push("closed <pk-dropdown-menu>");
			}
		}
		if (tag === "pk-popover" || tag === "pk-tooltip") {
			if ("open" in el && el.open) {
				el.open = false;
				actions.push(`closed <${tag}>`);
			}
		}
		if (tag === "pk-popup" && "active" in el) {
			const popup = el;
			if (popup.active) {
				popup.active = false;
				actions.push("deactivated <pk-popup>");
			}
		}
		if (tag === "pk-dialog" && "open" in el) {
			const dialogHost = el;
			if (typeof dialogHost.forceOverlayReset === "function") {
				dialogHost.forceOverlayReset();
				actions.push("forceOverlayReset <pk-dialog>");
			} else if (dialogHost.open) {
				if (typeof dialogHost.hide === "function") dialogHost.hide();
				else dialogHost.open = false;
				actions.push("closed <pk-dialog>");
			}
		}
	}
	for (const el of all) {
		if (typeof el.className === "string" && /portal/.test(el.className) && el.children.length === 0) {
			el.remove();
			actions.push("removed empty portal");
		}
		el.removeAttribute("inert");
	}
	forceClearScrollLock();
	document.documentElement.style.overflow = "";
	document.body.style.overflow = "";
	if (actions.length === 0) actions.push("cleared scroll lock / inert (no open overlays found)");
	return {
		actions,
		diagnostic
	};
};
//#endregion
//#region src/utils/mount-shadow-app.ts
var resolveHost = (element) => {
	const resolved = typeof element === "string" ? document.querySelector(element) : element;
	if (!(resolved instanceof HTMLElement)) throw new Error(`mountShadowApp: could not resolve host element "${String(element)}".`);
	return resolved;
};
var injectStyles = (parent, styles, styleAttr) => {
	parent.querySelectorAll(`[${styleAttr}]`).forEach((node) => node.remove());
	styles.forEach((cssText, index) => {
		if (!cssText) return;
		const style = document.createElement("style");
		style.setAttribute(styleAttr, String(index));
		style.textContent = cssText;
		parent.append(style);
	});
};
/**
* Attach an open shadow root, inject CSS, and return a mount node for framework apps.
*
* Framework-agnostic — React/Vue adapters re-export this for Craft CP style isolation.
*/
var mountShadowApp = ({ element, styles = [], styleAttr = "data-pk-shadow-style", rootAttr = "data-pk-shadow-root", mountClassName = "w-full" }) => {
	const host = resolveHost(element);
	if (!host.attachShadow) throw new Error("mountShadowApp: host element does not support Shadow DOM.");
	const shadowRoot = host.shadowRoot ?? host.attachShadow({ mode: "open" });
	injectStyles(shadowRoot, styles, styleAttr);
	let mountNode = shadowRoot.querySelector(`[${rootAttr}]`);
	if (!mountNode) {
		mountNode = document.createElement("div");
		mountNode.setAttribute(rootAttr, "");
		if (mountClassName) mountNode.className = mountClassName;
		shadowRoot.append(mountNode);
	}
	return {
		host,
		shadowRoot,
		mountNode,
		portalContainer: shadowRoot
	};
};
//#endregion
//#region src/plugin-kit.loader.ts
startLoader();
Promise.race([new Promise((resolve) => document.addEventListener(DISCOVERY_COMPLETE_EVENT, () => resolve(), { once: true })), new Promise((resolve) => setTimeout(resolve, FOUCE_TIMEOUT_MS))]).then(() => {
	document.querySelectorAll(".pk-cloak").forEach((el) => el.classList.remove("pk-cloak"));
});
//#endregion
export { DISCOVERY_COMPLETE_EVENT, FOUCE_TIMEOUT_MS, allDefined, BUNDLER_TAG_IMPORT_PATHS as componentImportPaths, configurePluginKitWeb, diagnoseOverlayBlockers, discover, getBasePath, mountShadowApp, preventTurboFouce, recoverOverlays, setBasePath, setPortalClassName, setPortalContainer, startLoader, stopLoader };
