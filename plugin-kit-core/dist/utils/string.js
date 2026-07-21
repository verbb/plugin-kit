//#region src/utils/string.ts
/**
* Convert a string to a handle format
* @param {string} sourceValue - The source string to convert
* @param {string} handleCasing - The casing format ('camelCase', 'pascal', 'snake', 'kebab')
* @param {boolean} allowNonAlphaStart - Whether to allow non-alphabetic characters at the start
* @returns {string} The generated handle
*/
var generateHandle = function(sourceValue, handleCasing = "camelCase", allowNonAlphaStart = false) {
	let handle = sourceValue.replace("/<(.*?)>/g", "");
	handle = handle.replace(/['"'""\[\]\(\)\{\}:]/g, "");
	handle = handle.toLowerCase();
	handle = window.Craft.asciiString(handle);
	if (!allowNonAlphaStart) handle = handle.replace(/^[^a-z]+/, "");
	const words = window.Craft.filterArray(handle.split(/[^a-z0-9]+/));
	handle = "";
	if (handleCasing === "snake") return words.join("_");
	if (handleCasing === "kebab") return words.join("-");
	for (let i = 0; i < words.length; i++) if (handleCasing !== "pascal" && i === 0) handle += words[i];
	else handle += words[i].charAt(0).toUpperCase() + words[i].substr(1);
	return handle;
};
/**
* Find a unique handle by checking against reserved handles and adding suffixes
* @param {string} baseHandle - The base handle to check
* @param {Array} allReservedHandles - Array of all reserved handles to check against (static + dynamic)
* @returns {string} A unique handle
*/
var findUniqueHandle = (baseHandle, allReservedHandles = []) => {
	if (!baseHandle) return "";
	let handle = baseHandle;
	let counter = 1;
	while (allReservedHandles.includes(handle)) {
		handle = `${baseHandle}${counter}`;
		counter++;
	}
	return handle;
};
//#endregion
export { findUniqueHandle, generateHandle };

//# sourceMappingURL=string.js.map