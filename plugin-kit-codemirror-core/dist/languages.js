import { css } from "@codemirror/lang-css";
import { html } from "@codemirror/lang-html";
import { javascript } from "@codemirror/lang-javascript";
import { json } from "@codemirror/lang-json";
//#region src/languages.ts
function languageUsesSyntaxHelpers(language) {
	return language !== "text";
}
function createLanguageExtension(language) {
	switch (language) {
		case "html": return html();
		case "javascript": return javascript();
		case "css": return css();
		case "json": return json();
		default: return null;
	}
}
//#endregion
export { createLanguageExtension, languageUsesSyntaxHelpers };

//# sourceMappingURL=languages.js.map