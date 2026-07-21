//#region src/utils/forms.ts
var nl2br = (str) => {
	return str.replace(/\n/g, "<br>");
};
var getErrorHeading = (error) => {
	if (error.response?.statusText) return error.response.statusText;
	if (error.message?.includes("Network Error")) return "Network Error";
	if (error.message?.includes("timeout")) return "Request Timeout";
	return "An error has occurred";
};
var getErrorText = (error) => {
	if (error.response?.data?.message) return error.response.data.message;
	if (error.response?.data?.error) return error.response.data.error;
	if (error.message) return error.message;
	return String(error);
};
var getErrorTrace = (error, maxTraceLines = 5) => {
	const traces = [];
	const file1 = error.response?.data?.file;
	const line1 = error.response?.data?.line;
	if (file1 && line1) traces.push(`${file1}:${line1}`);
	const traceArray = error.response?.data?.trace || [];
	for (let i = 0; i < Math.min(maxTraceLines, traceArray.length); i++) {
		const traceItem = traceArray[i];
		if (traceItem?.file && traceItem?.line) traces.push(`${traceItem.file}:${traceItem.line}`);
	}
	if (error.stack && traces.length === 0) traces.push(error.stack);
	return {
		traces,
		traceAsString: traces.map(nl2br).join("<br>")
	};
};
var getErrorMessage = function(error, maxTraceLines = 5) {
	const { traces, traceAsString } = getErrorTrace(error, maxTraceLines);
	return {
		heading: getErrorHeading(error),
		text: getErrorText(error),
		trace: traceAsString,
		traceAsString,
		traceAsArray: traces
	};
};
//#endregion
export { getErrorMessage };

//# sourceMappingURL=forms.js.map