import { createPluginKitComponent } from "../utils/create-plugin-kit-component.js";
import { trueBooleanProps } from "../utils/lit-react-booleans.js";
import React, { forwardRef, useCallback } from "react";
import { jsx } from "react/jsx-runtime";
import { PkImageBrowser } from "@verbb/plugin-kit-web/components/image-browser/pk-image-browser.js";
//#region src/components/ImageBrowser.tsx
var PkImageBrowserElement = createPluginKitComponent({
	tagName: "pk-image-browser",
	elementClass: PkImageBrowser,
	react: React,
	events: {
		onPkChange: "pk-change",
		onPkClear: "pk-clear",
		onInput: "input",
		onNativeChange: "change",
		onPkShow: "pk-show",
		onPkAfterShow: "pk-after-show",
		onPkHide: "pk-hide",
		onPkAfterHide: "pk-after-hide"
	}
});
/** React facade over `<pk-image-browser>`. Behavior and styles live in the web component. */
var ImageBrowser = forwardRef(function ImageBrowser({ disabled, invalid, isInvalid, readonly, readOnly, withClear, open, onChange, onPkChange, ...rest }, ref) {
	const resolvedInvalid = Boolean(invalid ?? isInvalid);
	const resolvedReadonly = Boolean(readonly ?? readOnly);
	const handlePkChange = useCallback((event) => {
		onPkChange?.(event);
		if (!onChange) return;
		const detail = event.detail;
		if (detail && "value" in detail) onChange(detail.value ?? "");
	}, [onPkChange, onChange]);
	return /* @__PURE__ */ jsx(PkImageBrowserElement, {
		ref,
		...rest,
		...trueBooleanProps([
			"disabled",
			"invalid",
			"readonly",
			"open"
		], {
			disabled,
			invalid: resolvedInvalid,
			readonly: resolvedReadonly,
			open
		}),
		...typeof withClear === "boolean" ? { withClear } : {},
		...onChange || onPkChange ? { onPkChange: handlePkChange } : {}
	});
});
ImageBrowser.displayName = "ImageBrowser";
//#endregion
export { ImageBrowser, PkImageBrowserElement };

//# sourceMappingURL=ImageBrowser.js.map