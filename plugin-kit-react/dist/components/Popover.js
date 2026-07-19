import { createPluginKitComponent } from "../utils/create-plugin-kit-component.js";
import { trueBooleanProps } from "../utils/lit-react-booleans.js";
import { isHostEvent } from "../utils/isHostEvent.js";
import React from "react";
import { jsx } from "react/jsx-runtime";
import { PkPopover } from "@verbb/plugin-kit-web/components/popover/pk-popover.js";
//#region src/components/Popover.tsx
var PkPopoverElement = createPluginKitComponent({
	tagName: "pk-popover",
	elementClass: PkPopover,
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
/**
* React facade over `<pk-popover>`. Behavior and styles live in the web component.
* Nested select/tooltip/popover `pk-open-change` is ignored — same as `Dialog`.
*/
var Popover = React.forwardRef(function Popover(props, ref) {
	const { open, flush, withArrow, onPkShow, onPkAfterShow, onPkHide, onPkAfterHide, onPkOpenChange, ...rest } = props;
	return /* @__PURE__ */ jsx(PkPopoverElement, {
		ref,
		...rest,
		...open !== void 0 ? { open } : {},
		...trueBooleanProps(["flush", "withArrow"], {
			flush,
			withArrow
		}),
		...onPkShow ? { onPkShow: bindHostEvent(onPkShow) } : {},
		...onPkAfterShow ? { onPkAfterShow: bindHostEvent(onPkAfterShow) } : {},
		...onPkHide ? { onPkHide: bindHostEvent(onPkHide) } : {},
		...onPkAfterHide ? { onPkAfterHide: bindHostEvent(onPkAfterHide) } : {},
		...onPkOpenChange ? { onPkOpenChange: bindHostEvent(onPkOpenChange) } : {}
	});
});
Popover.displayName = "Popover";
//#endregion
export { PkPopoverElement, Popover };

//# sourceMappingURL=Popover.js.map