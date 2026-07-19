/**
 * Reserve scrollbar space on the document root so overlay scroll lock
 * can use the stable gutter path instead of body width compensation.
 * Safe to call multiple times; only injects once.
 *
 * tokens.css already sets `html { scrollbar-gutter: stable }` for kit surfaces
 * that import tokens. This injector covers hosts that load components without
 * tokens (e.g. craft CP early boot / ShadowRoot portal config).
 */
export declare const ensureDocumentScrollStability: () => void;
//# sourceMappingURL=documentScrollStability.d.ts.map