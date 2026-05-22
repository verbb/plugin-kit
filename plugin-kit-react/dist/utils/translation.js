//#region src/utils/translation.ts
var translationCategory = "plugin-handle";
var translateFn;
var setTranslationCategory = (category) => {
	translationCategory = category.trim() || "plugin-handle";
};
var setTranslateFunction = (fn) => {
	translateFn = fn;
};
var translate = (message, params) => {
	if (translateFn) return translateFn(translationCategory, message, params);
	if (typeof window !== "undefined") {
		const craft = window.Craft;
		if (craft?.t) return craft.t(translationCategory, message, params);
	}
	return message;
};
//#endregion
export { setTranslateFunction, setTranslationCategory, translate };

//# sourceMappingURL=translation.js.map