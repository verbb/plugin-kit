/** Writes text to the clipboard — requires a secure context in most browsers. */
export async function copyToClipboard(value: string): Promise<void> {
    await navigator.clipboard.writeText(value);
}

/** Resolves the string to copy from a `from` selector (from selector). */
export function resolveCopyValue(
    root: Document | ShadowRoot,
    from: string,
    fallbackValue: string,
): string | null {
    if (!from) {
        return fallbackValue || null;
    }

    const isProperty = from.includes('.');
    const isAttribute = from.includes('[') && from.includes(']');
    let id = from;
    let field = '';

    if (isProperty) {
        [id, field] = from.trim().split('.');
    } else if (isAttribute) {
        [id, field] = from.trim().replace(/\]$/, '').split('[');
    }

    const target = 'getElementById' in root ? root.getElementById(id) : null;

    if (!target) {
        return null;
    }

    if (isAttribute) {
        return target.getAttribute(field) ?? '';
    }

    if (isProperty) {
        const record = target as unknown as Record<string, unknown>;
        const propertyValue = record[field];
        return propertyValue == null ? '' : String(propertyValue);
    }

    return target.textContent ?? '';
}
