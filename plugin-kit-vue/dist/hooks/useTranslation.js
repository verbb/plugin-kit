import { translate } from "@verbb/plugin-kit-forms";
//#region src/hooks/useTranslation.ts
/** Returns a translator bound to the category from {@link PluginKitProvider} / `configure()`. */
var useTranslation = () => {
	return (message, params) => translate(message, params);
};
//#endregion
export { useTranslation };

//# sourceMappingURL=useTranslation.js.map