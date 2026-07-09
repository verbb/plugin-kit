/**
 * Convert ProseMirror JSON content to HTML
 * @param {Array} json - ProseMirror JSON content array
 * @returns {string} - Generated HTML string
 */
export declare const getRichTextHtml: (json: any) => any;
/**
 * Extract plain text from ProseMirror JSON content
 * @param {Array} json - ProseMirror JSON content array
 * @returns {string} - Plain text string
 */
export declare const getRichTextText: (json: any) => any;
/**
 * Whether stored TipTap/ProseMirror content has no user-visible text.
 * Empty editors often serialize to `[]` or `[{ type: 'paragraph' }]`, which are
 * not blank for generic `isEmptyValue` checks.
 */
export declare const isRichTextEmpty: (value: unknown) => boolean;
//# sourceMappingURL=tiptap.d.ts.map