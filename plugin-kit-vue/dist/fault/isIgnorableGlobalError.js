//#region src/fault/isIgnorableGlobalError.ts
/** Errors that should not escalate to the app fault UI. */
var isIgnorableGlobalError = (message, error) => {
	const text = `${message}\n${error?.message ?? ""}`.toLowerCase();
	if (text.includes("resizeobserver loop")) return true;
	if (text.includes("aborted") && text.includes("fetch")) return true;
	if (text.includes("networkerror") && text.includes("fetch")) return true;
	if (text.includes("loading chunk") && text.includes("failed")) return false;
	return false;
};
//#endregion
export { isIgnorableGlobalError };

//# sourceMappingURL=isIgnorableGlobalError.js.map