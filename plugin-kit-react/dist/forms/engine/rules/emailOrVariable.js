import { translate } from "../../../utils/translation.js";
//#region src/forms/engine/rules/emailOrVariable.ts
var emailRegex = /(^$|^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$)/;
var variableRegex = /({.*?})/;
var emailOrVariableRule = (value, label) => {
	const text = String(value);
	if (!variableRegex.test(text) && !emailRegex.test(text)) return translate("{attribute} must be a valid email address or variable.", { attribute: label });
	return null;
};
//#endregion
export { emailOrVariableRule };

//# sourceMappingURL=emailOrVariable.js.map