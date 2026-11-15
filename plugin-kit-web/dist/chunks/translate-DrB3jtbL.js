//#region src/utils/translate.ts
/**
* Craft translation category for Plugin Kit's own interface strings. Every plugin on a page shares it, so a site
* translates a built-in string such as “Clear search” once rather than once per plugin.
*/
var pluginKitTranslationCategory = "plugin-kit";
/**
* Translate one of Plugin Kit's built-in strings through Craft's `plugin-kit` category.
*
* Returns the English source outside Craft and whenever no translation is registered, because `Craft.t()` falls
* back to the message it was given. Placeholders such as `{label}` are returned untouched for the caller to fill,
* since components interpolate after translating. Resolve at render time rather than module load, so translations
* registered after Plugin Kit loads still apply.
*/
function translatePluginKit(message) {
	const craft = globalThis.Craft;
	if (typeof craft?.t !== "function") return message;
	const translated = craft.t(pluginKitTranslationCategory, message);
	return typeof translated === "string" && translated !== "" ? translated : message;
}
//#endregion
export { translatePluginKit as n, pluginKitTranslationCategory as t };

//# sourceMappingURL=translate-DrB3jtbL.js.map