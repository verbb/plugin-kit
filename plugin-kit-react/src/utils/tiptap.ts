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
