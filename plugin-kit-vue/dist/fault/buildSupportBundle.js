//#region src/fault/buildSupportBundle.ts
var buildSupportBundle = (faults, meta) => {
	const payload = {
		timestamp: (/* @__PURE__ */ new Date()).toISOString(),
		userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "",
		url: typeof location !== "undefined" ? location.href : "",
		meta: meta ?? {},
		faults: faults.map((fault) => ({
			kind: fault.kind,
			message: fault.message,
			stack: fault.stack,
			tagName: fault.tagName,
			timestamp: new Date(fault.timestamp).toISOString(),
			count: fault.count
		}))
	};
	return JSON.stringify(payload, null, 2);
};
//#endregion
export { buildSupportBundle };

//# sourceMappingURL=buildSupportBundle.js.map