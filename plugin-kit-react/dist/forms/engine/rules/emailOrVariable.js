import { translate } from "../../../utils/translation.js";
//#region src/forms/engine/rules/emailOrVariable.ts
var emailRegex = /(^$|^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$)/;
var variableRegex = /({.*?})/;
var envRegex = /^\$(\w+)$|^\$\{(\w+)\}$/;
var isValidEmailOrVariableToken = (token) => {
	return emailRegex.test(token) || variableRegex.test(token) || envRegex.test(token);
};
var emailOrVariableRule = (value, label) => {
	const text = String(value).trim();
	if (text === "") return null;
	if (!text.split(/[\s,;]+/).filter(Boolean).every(isValidEmailOrVariableToken)) return translate("{attribute} must be a valid email address, environment variable, or variable.", { attribute: label });
	return null;
};
//#endregion
export { emailOrVariableRule };

//# sourceMappingURL=emailOrVariable.js.map