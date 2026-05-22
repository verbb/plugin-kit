import { translate } from "../../../utils/translation.js";
//#region src/forms/engine/rules/handle.ts
var handleRegex = /^[a-zA-Z][a-zA-Z0-9_]*$/;
var handleRule = (value) => {
	const handle = String(value ?? "");
	if (!handleRegex.test(handle)) return translate("“{handle}” isn’t a valid handle.", { handle });
	return null;
};
//#endregion
export { handleRule };

//# sourceMappingURL=handle.js.map