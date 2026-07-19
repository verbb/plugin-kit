//#region src/components/spinner/spinner-utils.ts
function getButtonSpinnerSize(buttonSize = "default") {
	if (buttonSize === "xxs" || buttonSize === "xs") return "xxs";
	if (buttonSize === "lg" || buttonSize === "xl") return "sm";
	return "xs";
}
function resolveSpinnerVariant(buttonVariant = "default", override) {
	if (override) return override;
	if (buttonVariant === "primary" || buttonVariant === "secondary" || buttonVariant === "dashed" || buttonVariant === "outline" || buttonVariant === "transparent") return buttonVariant;
	return "default";
}
//#endregion
export { resolveSpinnerVariant as n, getButtonSpinnerSize as t };

//# sourceMappingURL=spinner-utils-CDfHypTv.js.map