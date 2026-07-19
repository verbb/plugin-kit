import { iconToSvg } from "@verbb/plugin-kit-icons";
//#region src/icons/render.ts
var renderIconHtml = (icon, options = {}) => {
	return iconToSvg(icon, { title: options.title });
};
var createIconElement = (icon, options = {}) => {
	const template = document.createElement("template");
	template.innerHTML = renderIconHtml(icon, options);
	const element = template.content.firstElementChild;
	if (!(element instanceof SVGSVGElement)) throw new Error("Icon render did not produce an SVG element.");
	return element;
};
//#endregion
export { renderIconHtml as n, createIconElement as t };

//# sourceMappingURL=render-Dvc3MHQR.js.map