//#region src/utils/host-date.ts
function getCraft() {
	return globalThis.Craft;
}
/** Locale chain aligned with React `hostGetLocale` / Craft CP. */
function resolveHostLocale() {
	return getCraft()?.locale || document.documentElement.lang || "en-US";
}
/**
* Display date in the host locale — mirrors React `hostFormatDate` → `Craft.formatDate`.
* Falls back to numeric `Intl` when Craft is unavailable (e.g. playground).
*/
function formatHostDate(date, locale) {
	const craftFormat = getCraft()?.formatDate;
	if (typeof craftFormat === "function") try {
		return craftFormat(date);
	} catch {}
	const resolved = locale || resolveHostLocale();
	return new Intl.DateTimeFormat(resolved, {
		year: "numeric",
		month: "numeric",
		day: "numeric"
	}).format(date);
}
//#endregion
export { resolveHostLocale as n, formatHostDate as t };
