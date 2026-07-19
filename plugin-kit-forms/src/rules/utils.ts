const INVISIBLE_CHAR_PATTERN = /[\u200B\u200C\u200D\u2060\uFEFF]/g;

const isRecord = (value: unknown): value is Record<string, unknown> => {
    return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
};

/** TipTap JSON nodes always carry a string `type` (paragraph, text, variableTag, …). */
const isTipTapNode = (value: unknown): value is Record<string, unknown> => {
    return isRecord(value) && typeof value.type === 'string';
};

/**
 * True for TipTap document payloads: content arrays, `{ type: 'doc' }`, or JSON
 * strings of those. Avoids treating arbitrary object arrays (e.g. option rows) as docs.
 */
const isTipTapContent = (value: unknown): boolean => {
    if (Array.isArray(value)) {
        return value.length === 0 || value.every(isTipTapNode);
    }

    if (isTipTapNode(value) && value.type === 'doc') {
        return true;
    }

    return false;
};

const collectTipTapPlainText = (nodes: unknown[]): string => {
    let text = '';

    const visit = (node: unknown) => {
        if (!isRecord(node)) {
            return;
        }

        if (node.type === 'text' && typeof node.text === 'string') {
            text += node.text.replace(INVISIBLE_CHAR_PATTERN, '');
            return;
        }

        // Variable chips are meaningful content even without surrounding text.
        if (node.type === 'variableTag') {
            const attrs = isRecord(node.attrs) ? node.attrs : {};
            const label = typeof attrs.label === 'string' ? attrs.label : '';
            const variableValue = typeof attrs.value === 'string' ? attrs.value : '';
            text += (label || variableValue).replace(INVISIBLE_CHAR_PATTERN, '');
            return;
        }

        if (Array.isArray(node.content)) {
            node.content.forEach(visit);
        }
    };

    nodes.forEach(visit);

    return text.trim();
};

/**
 * TipTap editors persist empty docs as JSON (`[]`, `[{type:'paragraph'}]`, …),
 * which must count as blank for `required` — not as a filled string/object.
 */
const isEmptyTipTapValue = (value: unknown): boolean => {
    let parsed: unknown = value;

    if (typeof value === 'string') {
        const trimmed = value.trim();
        if (!trimmed) {
            return true;
        }

        // Only attempt TipTap empty detection on JSON-looking strings.
        if (trimmed[0] !== '[' && trimmed[0] !== '{') {
            return false;
        }

        try {
            parsed = JSON.parse(trimmed);
        } catch {
            return false;
        }
    }

    if (!isTipTapContent(parsed)) {
        return false;
    }

    let nodes: unknown[];
    if (Array.isArray(parsed)) {
        nodes = parsed;
    } else if (isRecord(parsed) && Array.isArray(parsed.content)) {
        nodes = parsed.content;
    } else {
        nodes = [parsed];
    }

    if (!nodes.length) {
        return true;
    }

    return collectTipTapPlainText(nodes).length === 0;
};

export const isEmptyValue = (value: unknown) => {
    if (value === undefined || value === null) {
        return true;
    }

    if (typeof value === 'string') {
        if (value === '') {
            return true;
        }

        // Empty TipTap JSON strings (e.g. "[]", "[{type:\"paragraph\"}]").
        return isEmptyTipTapValue(value);
    }

    if (Array.isArray(value)) {
        if (value.length === 0) {
            return true;
        }

        // Empty TipTap content arrays still have length (default empty paragraph).
        return isEmptyTipTapValue(value);
    }

    // TipTap `{ type: 'doc', content: [...] }` objects.
    if (isTipTapContent(value)) {
        return isEmptyTipTapValue(value);
    }

    return false;
};

export const getValueSize = (value: unknown) => {
    if (typeof value === 'number') {
        return value;
    }

    if (typeof value === 'string') {
        const trimmed = value.trim();
        if (trimmed !== '' && Number.isFinite(Number(trimmed))) {
            return Number(trimmed);
        }

        return value.length;
    }

    if (Array.isArray(value)) {
        return value.length;
    }

    return NaN;
};
