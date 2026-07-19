import { setHostBridge } from "@verbb/plugin-kit-core";
import { configurePluginKitWeb, setPortalClassName, setPortalContainer } from "@verbb/plugin-kit-web/plugin-kit";
import { setTranslateFunction, setTranslationCategory } from "@verbb/plugin-kit-forms";
//#region src/app/configure.ts
var resolveCraftTranslate = () => {
	const craft = globalThis.Craft;
	if (typeof craft?.t === "function") return (category, message, params) => craft.t(category, message, params);
};
/**
* Configure the Vue facade stack. Translation is forwarded to the form engine;
* portal/shadow settings are forwarded to the web-component layer.
*
* Prefer {@link PluginKitProvider} for app trees — call this directly only for
* secondary mounts that need a different portal target.
*/
var configure = (config) => {
	const { translationCategory, translate, hostBridge, portalClassName, portalContainer, shadowRootSelectors } = config;
	if (translationCategory) setTranslationCategory(translationCategory);
	const resolvedTranslate = translate ?? resolveCraftTranslate();
	if (resolvedTranslate) setTranslateFunction(resolvedTranslate);
	if (hostBridge) setHostBridge(hostBridge);
	if (portalClassName) setPortalClassName(portalClassName);
	if (portalContainer !== void 0) setPortalContainer(portalContainer);
	const webConfig = {
		...portalContainer !== void 0 ? { portalContainer } : {},
		...shadowRootSelectors !== void 0 ? { shadowRootSelectors } : {}
	};
	if (webConfig.portalContainer !== void 0 || webConfig.shadowRootSelectors !== void 0) configurePluginKitWeb(webConfig);
};
/** Alias for `configure()`. */
var configurePluginKitVue = configure;
//#endregion
export { configure, configurePluginKitVue };

//# sourceMappingURL=configure.js.map