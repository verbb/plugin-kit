import { translate } from "../../../utils/translation.js";
//#region src/forms/engine/rules/email.ts
var emailRegex = /(^$|^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$)/;
var emailRule = (value, label) => {
	if (!emailRegex.test(String(value))) return translate("{attribute} must be a valid email address.", { attribute: label });
	return null;
};
//#endregion
export { emailRule };

//# sourceMappingURL=email.js.map