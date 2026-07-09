//#region src/forms/engine/rules/requiredRules.ts
var REQUIRED_RULE_NAMES = new Set(["required", "requiredRichText"]);
var isRequiredRuleName = (ruleName) => {
	return REQUIRED_RULE_NAMES.has(ruleName);
};
//#endregion
export { REQUIRED_RULE_NAMES, isRequiredRuleName };

//# sourceMappingURL=requiredRules.js.map