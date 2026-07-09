import { translate } from "../../../utils/translation.js";
import { isRichTextEmpty } from "../../../utils/tiptap.js";
//#region src/forms/engine/rules/requiredRichText.ts
var requiredRichTextRule = (value, label) => {
	if (isRichTextEmpty(value)) return translate("{attribute} cannot be blank.", { attribute: label });
	return null;
};
//#endregion
export { requiredRichTextRule };

//# sourceMappingURL=requiredRichText.js.map