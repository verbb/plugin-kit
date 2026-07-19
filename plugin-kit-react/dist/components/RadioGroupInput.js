import { readPkValueDetail } from "../utils/pk-change.js";
import { Radio, RadioGroup } from "./RadioGroup.js";
import "react";
import { jsx } from "react/jsx-runtime";
//#region src/components/RadioGroupInput.tsx
var toStringValue = (value) => {
	return value === void 0 || value === null ? "" : String(value);
};
/**
* Convenience facade over `<pk-radio-group>` with an `options[]` array plus controlled
* `value`/`onChange`, instead of slotted `<pk-radio>` children the raw `RadioGroup` exposes.
*/
function RadioGroupInput({ options, value, onChange, onPkChange, ...props }) {
	const handlePkChange = (event) => {
		onPkChange?.(event);
		if (!onChange) return;
		const nextValue = readPkValueDetail(event);
		const match = options.find((option) => toStringValue(option.value) === nextValue);
		onChange(match ? match.value : nextValue);
	};
	return /* @__PURE__ */ jsx(RadioGroup, {
		...props,
		value: toStringValue(value),
		onPkChange: handlePkChange,
		children: options.map((option) => /* @__PURE__ */ jsx(Radio, {
			value: toStringValue(option.value),
			disabled: option.disabled,
			children: option.label
		}, toStringValue(option.value)))
	});
}
//#endregion
export { RadioGroupInput };

//# sourceMappingURL=RadioGroupInput.js.map