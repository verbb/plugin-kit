import { translate } from "../../../utils/translation.js";
import { getValueSize } from "./utils.js";
//#region src/forms/engine/rules/max.ts
var maxRule = (value, label, args) => {
	const max = Number(args[0]);
	const size = getValueSize(value);
	if (!Number.isFinite(size) || size > max) return translate("{attribute} must be at most {max}.", {
		attribute: label,
		max: String(args[0])
	});
	return null;
};
//#endregion
export { maxRule };

//# sourceMappingURL=max.js.map