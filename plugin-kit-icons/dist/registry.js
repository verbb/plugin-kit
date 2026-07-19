//#region src/registry.ts
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
/** Empty until the consumer registers icons or imports `@verbb/plugin-kit-icons/all.js`. */
var registry = {};
/** All currently registered icon names (kebab-case). */
var getIconNames = () => {
	return Object.keys(registry).sort();
};
/** Resolve an icon by kebab-case or camelCase name. Returns `undefined` if unknown. */
var getIcon = (name) => {
	if (!name) return;
	return registry[normalizeIconName(name)] ?? registry[name];
};
/**
* Register (or overwrite) an icon for `<pk-icon icon="…">` / {@link getIcon}.
*
* Call once at app bootstrap for every name your Twig/HTML looks up. Prefer named
* icon imports so unused glyphs stay out of the bundle; use
* `@verbb/plugin-kit-icons/all.js` only when you need the full curated set.
*
* Object keys may be camelCase (`arrowUp`) or kebab-case (`arrow-up`) — both
* store under the kebab key that HTML uses.
*
* @example
* ```ts
* import { registerIcons, plus, gear, arrowUp } from '@verbb/plugin-kit-icons';
*
* registerIcons({ plus, gear, arrowUp });
* // <pk-icon icon="plus"></pk-icon>
* // <pk-icon icon="arrow-up"></pk-icon>
* ```
*/
var registerIcon = (name, icon) => {
	const key = normalizeIconName(name);
	if (!key) throw new Error("registerIcon: name must be a non-empty string");
	if (!icon?.path || !icon.width || !icon.height) throw new Error(`registerIcon: icon "${key}" must include width, height, and path`);
	registry[key] = icon;
};
/**
* Register several icons in one call. Equivalent to repeated {@link registerIcon}.
* Keys may be kebab-case or camelCase (normalized to kebab).
*/
var registerIcons = (entries) => {
	for (const [name, icon] of Object.entries(entries)) registerIcon(name, icon);
};
//#endregion
export { getIcon, getIconNames, normalizeIconName, registerIcon, registerIcons };

//# sourceMappingURL=registry.js.map