import { generateHTML } from '@tiptap/core';
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';

/**
 * Convert ProseMirror JSON content to HTML
 * @param {Array} json - ProseMirror JSON content array
 * @returns {string} - Generated HTML string
 */
export const getRichTextHtml = (json) => {
    if (!json) {
        return '';
    }

    if (typeof json === 'string') {
        // If this is json-encoded, try to parse it
        try {
            json = JSON.parse(json);
        } catch {
            // If it's not valid JSON, return the original string
            return json;
        }
    }

    return generateHTML({
        type: 'doc',
        content: json,
    }, [
        Document,
        Paragraph,
        Text,
    ]);
};

/**
 * Extract plain text from ProseMirror JSON content
 * @param {Array} json - ProseMirror JSON content array
 * @returns {string} - Plain text string
 */
export const getRichTextText = (json) => {
    if (!json) {
        return '';
    }

    // Generate HTML first
    const html = getRichTextHtml(json);

    // Strip HTML tags and decode entities
    return html
        .replace(/<[^>]*>/g, ' ') // Replace HTML tags with spaces
        .replace(/&nbsp;/g, ' ') // Replace non-breaking spaces
        .replace(/&amp;/g, '&') // Decode common HTML entities
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/\s+/g, ' ') // Replace multiple spaces with single space
        .trim();
};

const INVISIBLE_CHAR_PATTERN = /[\u200B\u200C\u200D\u2060\uFEFF]/g;

const normalizeRichTextNodes = (value: unknown): unknown[] => {
    if (value == null || value === '') {
        return [];
    }

    if (Array.isArray(value)) {
        return value;
    }

    if (typeof value === 'object') {
        const node = value as Record<string, unknown>;

        if (node.type === 'doc' && Array.isArray(node.content)) {
            return node.content;
        }

        if (node.type) {
            return [node];
        }
    }

    if (typeof value === 'string') {
        try {
            return normalizeRichTextNodes(JSON.parse(value));
        } catch {
            const text = value.replace(INVISIBLE_CHAR_PATTERN, '').trim();

            return text
                ? [{ type: 'paragraph', content: [{ type: 'text', text: value }] }]
                : [];
        }
    }

    return [];
};

const collectRichTextPlainText = (nodes: unknown[]): string => {
    let text = '';

    const visit = (node: unknown) => {
        if (!node || typeof node !== 'object') {
            return;
        }

        const jsonNode = node as Record<string, unknown>;

        if (jsonNode.type === 'text' && typeof jsonNode.text === 'string') {
            text += jsonNode.text.replace(INVISIBLE_CHAR_PATTERN, '');
            return;
        }

        if (jsonNode.type === 'variableTag') {
            const attrs = jsonNode.attrs as Record<string, unknown> | undefined;
            const label = typeof attrs?.label === 'string' ? attrs.label : '';
            const variableValue = typeof attrs?.value === 'string' ? attrs.value : '';
            text += (label || variableValue).replace(INVISIBLE_CHAR_PATTERN, '');
            return;
        }

        if (Array.isArray(jsonNode.content)) {
            jsonNode.content.forEach(visit);
        }
    };

    nodes.forEach(visit);

    return text.trim();
};

/**
 * Whether stored TipTap/ProseMirror content has no user-visible text.
 * Empty editors often serialize to `[]` or `[{ type: 'paragraph' }]`, which are
 * not blank for generic `isEmptyValue` checks.
 */
export const isRichTextEmpty = (value: unknown) => {
    const nodes = normalizeRichTextNodes(value);

    if (!nodes.length) {
        return true;
    }

    return collectRichTextPlainText(nodes).length === 0;
};
