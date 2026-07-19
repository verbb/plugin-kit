import { createPluginKitComponent } from "../utils/create-plugin-kit-component.js";
import React from "react";
import { PkCopyButton } from "@verbb/plugin-kit-web/components/copy-button/pk-copy-button.js";
//#region src/components/CopyButton.tsx
/** React facade over `<pk-copy-button>`. Behavior and styles live in the web component. */
var PkCopyButtonElement = createPluginKitComponent({
	tagName: "pk-copy-button",
	elementClass: PkCopyButton,
	react: React,
	events: {
		onPkCopy: "pk-copy",
		onPkCopyError: "pk-copy-error"
	}
});
var CopyButton = PkCopyButtonElement;
//#endregion
export { CopyButton, PkCopyButtonElement };

//# sourceMappingURL=CopyButton.js.map