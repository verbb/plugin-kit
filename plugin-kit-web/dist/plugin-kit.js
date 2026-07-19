import { t as getDismissibleStackSnapshot } from "./chunks/dismissible-stack-XQUMfKO3.js";
import { n as getScrollLockDepth, t as forceClearScrollLock } from "./chunks/scroll-lock-B4o9vdzJ.js";
import { _ as setPortalClassName, a as startLoader, c as setBasePath, i as preventTurboFouce, l as allDefined, n as FOUCE_TIMEOUT_MS, o as stopLoader, r as discover, s as getBasePath, t as DISCOVERY_COMPLETE_EVENT, u as configurePluginKitWeb, v as setPortalContainer } from "./chunks/autoloader-DzOTQqe6.js";
import { t as BUNDLER_TAG_IMPORT_PATHS } from "./chunks/component-registry-CpZiIDh4.js";
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
export { DISCOVERY_COMPLETE_EVENT, FOUCE_TIMEOUT_MS, allDefined, BUNDLER_TAG_IMPORT_PATHS as componentImportPaths, configurePluginKitWeb, diagnoseOverlayBlockers, discover, getBasePath, mountShadowApp, preventTurboFouce, recoverOverlays, setBasePath, setPortalClassName, setPortalContainer, startLoader, stopLoader };

//# sourceMappingURL=plugin-kit.js.map