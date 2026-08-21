//#region src/svg.ts
var escapeHtml = (value) => {
	return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
};
/**
* Build the render `viewBox` for an icon.
*
* Glyphs are stored edge-cropped (variable width × canvas height). `<pk-icon>`
* always paints into a square `1em` host, so we expand the viewBox to a centered
* square of `max(width, height)` without rewriting path data.
*/
var iconViewBox = (icon) => {
	const { width, height } = icon;
	if (width === height) return `0 0 ${width} ${height}`;
	const canvas = Math.max(width, height);
	return `${(width - canvas) / 2} ${(height - canvas) / 2} ${canvas} ${canvas}`;
};
/**
* Render a {@link PkIcon} to a standalone SVG markup string.
*
* Framework-agnostic: web components pass the result through Lit's `unsafeSVG`,
* or parse it into an element. React consumers should use their own component
* (the raw {@link PkIcon} data is exported for that purpose).
*
* Sets `overflow="visible"` so glyphs that intentionally extend past the icon
* canvas (for example slash variants) are not clipped when a parent uses
* `overflow: hidden`.
*/
var iconToSvg = (icon, options = {}) => {
	const { title, className, attributes = {} } = options;
	const attrs = {
		xmlns: "http://www.w3.org/2000/svg",
		viewBox: iconViewBox(icon),
		overflow: "visible",
		...attributes
	};
	if (className) attrs.class = className;
	if (title) attrs.role = "img";
	else {
		attrs["aria-hidden"] = "true";
		attrs.focusable = "false";
	}
	return `<svg ${Object.entries(attrs).map(([key, value]) => {
		return `${key}="${escapeHtml(value)}"`;
	}).join(" ")}>${title ? `<title>${escapeHtml(title)}</title>` : ""}<path fill="currentColor" d="${escapeHtml(icon.path)}"/></svg>`;
};
//#endregion
export { iconToSvg, iconViewBox };

//# sourceMappingURL=svg.js.map