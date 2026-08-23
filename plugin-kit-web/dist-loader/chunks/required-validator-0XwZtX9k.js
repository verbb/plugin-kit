//#region src/validators/required-validator.ts
function RequiredValidator(options = {}) {
	let { validationElement, validationProperty } = options;
	if (!validationElement && typeof document !== "undefined") validationElement = Object.assign(document.createElement("input"), { required: true });
	if (!validationProperty) validationProperty = "value";
	const validator = {
		observedAttributes: ["required"],
		message: validationElement?.validationMessage ?? "Please fill out this field.",
		checkValidity(element) {
			const result = {
				message: "",
				isValid: true,
				invalidKeys: []
			};
			if (!element.required) return result;
			const value = element[validationProperty];
			if (!(value === null || value === void 0 || value === false || value === "")) return result;
			result.isValid = false;
			result.message = typeof validator.message === "function" ? validator.message(element) : validator.message ?? "";
			result.invalidKeys.push("valueMissing");
			return result;
		}
	};
	return validator;
}
//#endregion
export { RequiredValidator as t };
