//#region src/utils/craftHostBridge.ts
var getCraft = () => {
	if (!window.Craft) throw new Error("Craft host bridge is unavailable because window.Craft is not defined.");
	return window.Craft;
};
var createCraftHostBridge = () => {
	return {
		request: (method, action, requestConfig = {}) => {
			return getCraft().sendActionRequest(method, action, requestConfig);
		},
		openElementSelector: (elementType, options) => {
			return getCraft().createElementSelectorModal(elementType, options);
		},
		formatDate: (date) => {
			return getCraft().formatDate(date);
		},
		getTimepickerOptions: () => {
			return getCraft().timepickerOptions || {};
		},
		getLocale: () => {
			return getCraft().locale || "en-US";
		}
	};
};
//#endregion
export { createCraftHostBridge };

//# sourceMappingURL=craftHostBridge.js.map