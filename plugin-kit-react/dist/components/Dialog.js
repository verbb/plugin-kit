import { createPluginKitComponent } from "../utils/create-plugin-kit-component.js";
import { trueBooleanProps } from "../utils/lit-react-booleans.js";
import { isHostEvent } from "../utils/isHostEvent.js";
import React from "react";
import { jsx } from "react/jsx-runtime";
import { PkDialog } from "@verbb/plugin-kit-web/components/dialog/pk-dialog.js";
//#region src/components/Dialog.tsx
var PkDialogElement = createPluginKitComponent({
	tagName: "pk-dialog",
	elementClass: PkDialog,
	react: React,
	events: {
		onPkShow: "pk-show",
		onPkAfterShow: "pk-after-show",
		onPkHide: "pk-hide",
		onPkAfterHide: "pk-after-hide",
		onPkOpenChange: "pk-open-change"
	}
});
var bindHostEvent = (handler) => {
	if (!handler) return;
	return (event) => {
		if (!isHostEvent(event)) return;
		handler(event);
	};
};
/** React facade over `<pk-dialog>`. Behavior and styles live in the web component. */
var Dialog = React.forwardRef(function Dialog(props, ref) {
	const { open, disablePointerDismissal, withoutHeader, withoutBodyPadding, onPkShow, onPkAfterShow, onPkHide, onPkAfterHide, onPkOpenChange, ...rest } = props;
	return /* @__PURE__ */ jsx(PkDialogElement, {
		ref,
		...rest,
		open,
		...trueBooleanProps([
			"disablePointerDismissal",
			"withoutHeader",
			"withoutBodyPadding"
		], {
			disablePointerDismissal,
			withoutHeader,
			withoutBodyPadding
		}),
		...onPkShow ? { onPkShow: bindHostEvent(onPkShow) } : {},
		...onPkAfterShow ? { onPkAfterShow: bindHostEvent(onPkAfterShow) } : {},
		...onPkHide ? { onPkHide: bindHostEvent(onPkHide) } : {},
		...onPkAfterHide ? { onPkAfterHide: bindHostEvent(onPkAfterHide) } : {},
		...onPkOpenChange ? { onPkOpenChange: bindHostEvent(onPkOpenChange) } : {}
	});
});
Dialog.displayName = "Dialog";
//#endregion
export { Dialog, PkDialogElement };

//# sourceMappingURL=Dialog.js.map