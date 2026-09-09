import { createPluginKitComponent } from "../utils/create-plugin-kit-component.js";
import { trueBooleanProps } from "../utils/lit-react-booleans.js";
import React, { forwardRef, useCallback } from "react";
import { jsx } from "react/jsx-runtime";
import { PkAutocomplete } from "@verbb/plugin-kit-web/components/autocomplete/pk-autocomplete.js";
//#region src/components/Autocomplete.tsx
var PkAutocompleteElement = createPluginKitComponent({
	tagName: "pk-autocomplete",
	elementClass: PkAutocomplete,
	react: React,
	events: {
		onPkChange: "pk-change",
		onPkClear: "pk-clear",
		onInput: "input",
		onNativeChange: "change",
		onPkShow: "pk-show",
		onPkAfterShow: "pk-after-show",
		onPkHide: "pk-hide",
		onPkAfterHide: "pk-after-hide",
		onPkOpenChange: "pk-open-change"
	}
});
/** React facade over `<pk-autocomplete>`. Behavior and styles live in the web component. */
var Autocomplete = forwardRef(function Autocomplete({ disabled, invalid, isInvalid, clearable, open, async: asyncMode, autoHighlight, withClear, onChange, onPkChange, ...rest }, ref) {
	const resolvedInvalid = Boolean(invalid ?? isInvalid);
	const handlePkChange = useCallback((event) => {
		onPkChange?.(event);
		if (!onChange) return;
		const detail = event.detail;
		if (detail && "value" in detail) onChange(detail.value ?? "");
	}, [onPkChange, onChange]);
	return /* @__PURE__ */ jsx(PkAutocompleteElement, {
		ref,
		...rest,
		...trueBooleanProps([
			"disabled",
			"invalid",
			"clearable",
			"open",
			"async",
			"autoHighlight",
			"withClear"
		], {
			disabled,
			invalid: resolvedInvalid,
			clearable,
			open,
			async: asyncMode,
			autoHighlight,
			withClear
		}),
		...onChange || onPkChange ? { onPkChange: handlePkChange } : {}
	});
});
Autocomplete.displayName = "Autocomplete";
//#endregion
export { Autocomplete, PkAutocompleteElement };

//# sourceMappingURL=Autocomplete.js.map