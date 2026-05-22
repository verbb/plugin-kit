//#region src/utils/hostBridge.ts
var hostBridge = {};
var setHostBridge = (bridge = {}) => {
	hostBridge = {
		...hostBridge,
		...bridge
	};
};
var getHostBridge = () => {
	return hostBridge;
};
var requireHostBridgeMethod = (methodName) => {
	const method = hostBridge[methodName];
	if (!method) throw new Error(`Plugin Kit React host bridge method "${String(methodName)}" is required but was not configured.`);
	return method;
};
var hostRequest = async (method, action, config) => {
	return requireHostBridgeMethod("request")(method, action, config);
};
var hostOpenElementSelector = (elementType, options) => {
	requireHostBridgeMethod("openElementSelector")(elementType, options);
};
var hostFormatDate = (date) => {
	return requireHostBridgeMethod("formatDate")(date);
};
var hostGetTimepickerOptions = () => {
	return requireHostBridgeMethod("getTimepickerOptions")();
};
var hostGetLocale = () => {
	return requireHostBridgeMethod("getLocale")();
};
//#endregion
export { getHostBridge, hostFormatDate, hostGetLocale, hostGetTimepickerOptions, hostOpenElementSelector, hostRequest, setHostBridge };

//# sourceMappingURL=hostBridge.js.map