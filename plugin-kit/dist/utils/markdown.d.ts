/**
 * Initialize markdown-it instance with secure defaults and common options
 * - HTML is disabled for security
 * - Links are auto-detected
 * - Typography features like smart quotes are enabled
 * - Line breaks are converted to <br> tags
 */
declare const md: any;
/**
 * Renders markdown content as block-level HTML
 * Includes block elements like headers, paragraphs, lists etc.
 *
 * @param content - The markdown string to render
 * @returns Rendered HTML string, or empty string if no content provided
 */
export declare const renderMarkdown: (content: string) => string;
/**
 * Renders markdown content as inline HTML only
 * Excludes block-level elements, only processes inline markdown syntax
 *
 * @param content - The markdown string to render
 * @returns Rendered HTML string, or empty string if no content provided
 */
export declare const renderInlineMarkdown: (content: string) => string;
/**
 * Export the configured markdown-it instance for direct usage
 * Allows access to the full markdown-it API if needed
 */
export { md };
//# sourceMappingURL=markdown.d.ts.map