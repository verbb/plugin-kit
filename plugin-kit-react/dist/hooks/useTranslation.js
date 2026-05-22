import { translate } from "../utils/translation.js";
import { useCallback } from "react";
//#region src/hooks/useTranslation.ts
var useTranslation = () => {
	return useCallback((message, params) => {
		return translate(message, params);
	}, []);
};
//#endregion
export { useTranslation };

//# sourceMappingURL=useTranslation.js.map