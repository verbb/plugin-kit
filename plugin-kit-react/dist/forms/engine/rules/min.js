import { translate } from "../../../utils/translation.js";
import { getValueSize } from "./utils.js";
//#region src/forms/engine/rules/min.ts
var minRule = (value, label, args) => {
	const min = Number(args[0]);
	const size = getValueSize(value);
	if (!Number.isFinite(size) || size < min) return translate("{attribute} must be at least {min}.", {
		attribute: label,
		min: String(args[0])
	});
	return null;
};
//#endregion
export { minRule };

//# sourceMappingURL=min.js.map