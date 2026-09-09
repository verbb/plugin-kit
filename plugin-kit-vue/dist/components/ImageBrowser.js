import { createPkComponent } from "../createPkComponent.js";
import "@verbb/plugin-kit-web/components/image-browser.js";
//#region src/components/ImageBrowser.ts
/** Vue facade over `<pk-image-browser>`. Behavior and styles live in the web component. */
var ImageBrowser = createPkComponent({
	name: "PkImageBrowser",
	tagName: "pk-image-browser"
});
var PkImageBrowserElement = ImageBrowser;
//#endregion
export { ImageBrowser, PkImageBrowserElement };

//# sourceMappingURL=ImageBrowser.js.map