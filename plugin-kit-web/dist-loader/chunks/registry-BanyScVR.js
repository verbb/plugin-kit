//#region ../plugin-kit-icons/dist/registry.js
var camelToKebab = (value) => {
	return value.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
};
/**
* Normalize a consumer-facing name to the registry key.
* Accepts kebab-case (`chevron-down`) or camelCase (`chevronDown`) — same glyph, not synonyms.
*/
var normalizeIconName = (name) => {
	const trimmed = name.trim();
	if (!trimmed) return trimmed;
	if (!/[A-Z]/.test(trimmed)) return trimmed.toLowerCase();
	return camelToKebab(trimmed);
};
/**
* Cross-bundle singleton keys. Craft CP pages load several Plugin Kit consumers,
* each with its own Vite copy of this module — a module-scoped `registry` object
* would not be shared, so Plugin B’s `registerIcons({ gear })` never reaches
* Plugin A’s winning `<pk-icon>`. `globalThis` is the same map for every copy.
*/
var REGISTRY_KEY = "__PK_ICON_REGISTRY__";
var LISTENERS_KEY = "__PK_ICON_REGISTRY_LISTENERS__";
var getRegistry = () => {
	const root = globalThis;
	if (!root[REGISTRY_KEY]) root[REGISTRY_KEY] = {};
	return root[REGISTRY_KEY];
};
var getListeners = () => {
	const root = globalThis;
	if (!root[LISTENERS_KEY]) root[LISTENERS_KEY] = /* @__PURE__ */ new Set();
	return root[LISTENERS_KEY];
};
var notifyRegistryChanged = () => {
	for (const listener of getListeners()) try {
		listener();
	} catch {}
};
/**
* Subscribe to additive `registerIcon(s)` updates (e.g. `<pk-icon>` re-resolves
* after a later plugin merges glyphs into the shared map). Returns unsubscribe.
*/
var subscribeIconRegistry = (listener) => {
	const listeners = getListeners();
	listeners.add(listener);
	return () => {
		listeners.delete(listener);
	};
};
/** Resolve an icon by kebab-case or camelCase name. Returns `undefined` if unknown. */
var getIcon = (name) => {
	if (!name) return;
	const registry = getRegistry();
	return registry[normalizeIconName(name)] ?? registry[name];
};
/**
* Register several icons in one call. Equivalent to repeated {@link registerIcon},
* with a single change notification at the end.
* Keys may be kebab-case or camelCase (normalized to kebab).
*/
var registerIcons = (entries) => {
	let changed = false;
	for (const [name, icon] of Object.entries(entries)) {
		const key = normalizeIconName(name);
		if (!key) throw new Error("registerIcon: name must be a non-empty string");
		if (!icon?.path || !icon.width || !icon.height) throw new Error(`registerIcon: icon "${key}" must include width, height, and path`);
		getRegistry()[key] = icon;
		changed = true;
	}
	if (changed) notifyRegistryChanged();
};
//#endregion
export { subscribeIconRegistry as i, normalizeIconName as n, registerIcons as r, getIcon as t };
