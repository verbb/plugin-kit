export const REQUIRED_RULE_NAMES = new Set(['required', 'requiredRichText']);

export const isRequiredRuleName = (ruleName: string) => {
    return REQUIRED_RULE_NAMES.has(ruleName);
};
