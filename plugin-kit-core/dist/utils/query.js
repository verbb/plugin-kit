//#region src/utils/query.ts
var getQueryParam = (key) => {
	return new URLSearchParams(window.location.search).get(key);
};
var setQueryParam = (key, value) => {
	const url = new URL(window.location.href);
	url.searchParams.set(key, value);
	window.history.replaceState({}, "", url.toString());
};
//#endregion
export { getQueryParam, setQueryParam };

//# sourceMappingURL=query.js.map