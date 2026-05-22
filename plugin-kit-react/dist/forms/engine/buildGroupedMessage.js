//#region src/forms/engine/buildGroupedMessage.ts
var buildGroupLabel = (parentLabel, childLabel) => {
	if (parentLabel && childLabel) return `${parentLabel}: ${childLabel}`;
	return parentLabel || childLabel || "";
};
var ATTRIBUTE_MESSAGE_PATTERN = /^(.+?) (cannot be blank\.|must be .+)$/;
var buildGroupedMessage = (message, parentLabel, childLabel) => {
	const groupLabel = buildGroupLabel(parentLabel, childLabel);
	if (!groupLabel) return message;
	const match = String(message).match(ATTRIBUTE_MESSAGE_PATTERN);
	if (match) {
		const [, attribute, suffix] = match;
		return `${buildGroupLabel(parentLabel, (childLabel && attribute !== childLabel ? attribute : childLabel) || attribute)} ${suffix}`;
	}
	return `${groupLabel} ${message}`;
};
//#endregion
export { buildGroupedMessage };

//# sourceMappingURL=buildGroupedMessage.js.map