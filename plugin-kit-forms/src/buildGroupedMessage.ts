const buildGroupLabel = (parentLabel?: string, childLabel?: string) => {
    if (parentLabel && childLabel) {
        return `${parentLabel}: ${childLabel}`;
    }

    return parentLabel || childLabel || '';
};

// Matches "{attribute} cannot be blank." and similar validation messages
const ATTRIBUTE_MESSAGE_PATTERN = /^(.+?) (cannot be blank\.|must be .+)$/;

export const buildGroupedMessage = (
    message: string,
    parentLabel?: string,
    childLabel?: string,
) => {
    const groupLabel = buildGroupLabel(parentLabel, childLabel);
    if (!groupLabel) {
        return message;
    }

    const match = String(message).match(ATTRIBUTE_MESSAGE_PATTERN);
    if (match) {
        const [, attribute, suffix] = match;
        // Use attribute in groupLabel (fixes "label" -> "Option Label") and only append suffix
        // to avoid "Options: Option Label Option Label cannot be blank."
        const displayLabel = (childLabel && attribute !== childLabel) ? attribute : childLabel;
        const finalGroupLabel = buildGroupLabel(parentLabel, displayLabel || attribute);
        return `${finalGroupLabel} ${suffix}`;
    }

    return `${groupLabel} ${message}`;
};
