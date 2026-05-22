import { emailRule } from "./email.js";
import { emailOrVariableRule } from "./emailOrVariable.js";
import { handleRule } from "./handle.js";
import { maxRule } from "./max.js";
import { minRule } from "./min.js";
import { requiredRule } from "./required.js";
import { uniqueHandleRule } from "./uniqueHandle.js";
//#region src/forms/engine/rules/index.ts
var ruleHandlers = {
	required: (value, label) => {
		return requiredRule(value, label);
	},
	min: (value, label, args) => {
		return minRule(value, label, args);
	},
	max: (value, label, args) => {
		return maxRule(value, label, args);
	},
	email: (value, label) => {
		return emailRule(value, label);
	},
	emailOrVariable: (value, label) => {
		return emailOrVariableRule(value, label);
	},
	handle: (value) => {
		return handleRule(value);
	},
	uniqueHandle: (value, label, args, context) => {
		return uniqueHandleRule(value, label, args, context);
	}
};
//#endregion
export { ruleHandlers };

//# sourceMappingURL=index.js.map