//#region src/forms/utils.ts
/** Normalize HTML attributes for React consumption (e.g. `class` -> `className`). */
var normalizeAttrs = (attrs = {}) => {
	const normalized = { ...attrs };
	if (typeof normalized.class === "string") {
		normalized.className = normalized.class;
		delete normalized.class;
	}
	return normalized;
};
//#endregion
export { normalizeAttrs };

//# sourceMappingURL=utils.js.map