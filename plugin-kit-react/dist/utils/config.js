import { setPortalClassName, setPortalContainer, setShadowRootSelectors } from "./portal.js";
import { setTranslateFunction, setTranslationCategory } from "./translation.js";
import { setHostBridge } from "./hostBridge.js";
import { ensureDocumentScrollStability } from "./documentScrollStability.js";
//#region src/utils/config.ts
var configurePluginKitReact = (config) => {
	if (config.portalClassName) setPortalClassName(config.portalClassName);
	if (config.portalContainer) {
		setPortalContainer(config.portalContainer);
		if (config.portalContainer instanceof ShadowRoot) ensureDocumentScrollStability();
	}
	if (config.shadowRootSelectors) setShadowRootSelectors(config.shadowRootSelectors);
	if (config.translationCategory) setTranslationCategory(config.translationCategory);
	if (config.translate) setTranslateFunction(config.translate);
	if (config.hostBridge) setHostBridge(config.hostBridge);
};
//#endregion
export { configurePluginKitReact };

//# sourceMappingURL=config.js.map