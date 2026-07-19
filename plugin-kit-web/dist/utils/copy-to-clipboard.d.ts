/** Writes text to the clipboard — requires a secure context in most browsers. */
export declare function copyToClipboard(value: string): Promise<void>;
/** Resolves the string to copy from a `from` selector (from selector). */
export declare function resolveCopyValue(root: Document | ShadowRoot, from: string, fallbackValue: string): string | null;
//# sourceMappingURL=copy-to-clipboard.d.ts.map