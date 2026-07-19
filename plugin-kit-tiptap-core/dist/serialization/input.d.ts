import { Editor, JSONContent } from '@tiptap/core';
import { VariableOption } from '../types/variable-option.js';
export type VariableTagAttrs = {
    label: string;
    value: string;
    openOnInsert: boolean;
    /** True when the token did not match a known variable option (display-only). */
    unresolved?: boolean;
    /** Inline default when value is empty (e.g. {user:firstName|Guest}) */
    default?: string;
    /** Optional transform id (e.g. "round", "format"). */
    transformerId?: string;
    /** Optional transform params payload. */
    transformerParams?: Record<string, unknown>;
};
export declare function dedupeVariableOptions(items: VariableOption[]): VariableOption[];
export declare function flattenVariableOptions(items: VariableOption[]): VariableOption[];
/**
 * Build VariableTag attributes from base and selected variable options.
 * Optional defaultIfEmpty is used when the resolved value is empty (e.g. "Guest" for {user:firstName|Guest}).
 */
export declare function buildVariableTagAttrs(baseVariable: VariableOption, selectedVariable?: VariableOption, options?: {
    openOnInsert?: boolean;
    defaultIfEmpty?: string;
    transformerId?: string;
    transformerParams?: Record<string, unknown>;
    label?: string;
    value?: string;
}): VariableTagAttrs;
/**
 * Strip optional inline default from token for lookup: {user:firstName|Guest} -> {user:firstName}.
 * Returns [tokenWithoutDefault, defaultText].
 */
export declare function parseTokenWithDefault(tokenValue: string): [string, string | undefined];
export declare function getReferenceBaseToken(tokenValue: string): string;
export declare function resolveVariableTagLabel(tokenValue: string, option: VariableOption | null): string;
/**
 * Resolve variable tag attrs from a token string (e.g. '{form:name}' or '{user:firstName|Guest}').
 */
export declare function resolveVariableTagByValue(tokenValue: string, topLevelVariables: VariableOption[], allVariables: VariableOption[]): VariableTagAttrs | null;
/**
 * Convert string value with {token} placeholders to Tiptap doc content.
 */
export declare function valueToContent(value: string, topLevelVariables: VariableOption[], allVariables: VariableOption[], trailingCursorText?: string): JSONContent | null;
/**
 * Convert Tiptap content to string value.
 * Content is typically editor.getJSON().content (array of block/inline nodes).
 */
export declare function contentToValue(content: unknown): string;
/**
 * Replace a range in the editor with a variable tag node.
 * @param editor - Tiptap editor instance
 */
export declare function replaceTokenWithVariable(editor: Editor, attrs: VariableTagAttrs, from: number, to: number): void;
//# sourceMappingURL=input.d.ts.map