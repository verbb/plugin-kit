import { translate } from "../../../utils/translation.js";
import { isEmptyValue } from "./utils.js";
//#region src/forms/engine/rules/required.ts
var requiredRule = (value, label) => {
	if (isEmptyValue(value)) return translate("{attribute} cannot be blank.", { attribute: label });
	return null;
};
//#endregion
export { requiredRule };

//# sourceMappingURL=required.js.map