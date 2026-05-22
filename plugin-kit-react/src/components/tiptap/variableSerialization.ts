/**
 * Shared serialization and variable-tag helpers for Tiptap variable input.
 * Used by TiptapInput and InlineVariableSuggestion.
 */

import { TextSelection } from '@tiptap/pm/state';
import type { Editor, JSONContent } from '@tiptap/core';
import type { VariableOption } from './VariableDropdown';

export type VariableTagAttrs = {
    label: string;
    value: string;
    openOnInsert: boolean;
    /** Inline default when value is empty (e.g. {user:firstName|Guest}) */
    default?: string;
    /** Optional transform id (e.g. "round", "format"). */
    transformerId?: string;
    /** Optional transform params payload. */
    transformerParams?: Record<string, unknown>;
};

type ParsedTokenMetadata = {
    tokenWithoutDefault: string;
    defaultIfEmpty?: string;
    transformerId?: string;
    transformerParams?: Record<string, unknown>;
};

const TRANSFORMER_ID_PREFIX = 'transform=';

function parseTokenMetadata(tokenValue: string): ParsedTokenMetadata {
    const match = tokenValue.match(/^\{([^}]*)\}$/);
    if (!match) {
        return { tokenWithoutDefault: tokenValue };
    }

    let body = match[1] ?? '';
    let defaultIfEmpty: string | undefined;

    if (body.includes('|')) {
        const split = body.split('|');
        body = split.shift() ?? '';
        defaultIfEmpty = split.join('|').trim() || undefined;
    }

    const segments = body
        .split(';')
        .map(part => {
        return part.trim();
    })
        .filter(Boolean);

    const cleanSegments: string[] = [];
    let transformerId: string | undefined;
    let transformerParams: Record<string, unknown> | undefined;

    segments.forEach((segment) => {
        if (segment.startsWith(TRANSFORMER_ID_PREFIX)) {
            transformerId = decodeURIComponent(segment.slice(TRANSFORMER_ID_PREFIX.length)).trim() || undefined;
            return;
        }

        if (segment.includes('=')) {
            const [keyRaw, ...valueParts] = segment.split('=');
            const key = (keyRaw ?? '').trim();
            if (!key) {
                return;
            }

            const value = decodeURIComponent(valueParts.join('=').trim());
            if (!transformerParams) {
                transformerParams = {};
            }
            transformerParams[key] = value;
            return;
        }

        cleanSegments.push(segment);
    });

    const tokenWithoutDefault = `{${cleanSegments.join(';')}}`;

    return {
        tokenWithoutDefault,
        defaultIfEmpty,
        transformerId,
        transformerParams,
    };
}

function isVariableLikeToken(tokenValue: string): boolean {
    return /^\{[a-zA-Z][a-zA-Z0-9_]*(?::[^}]*)?\}$/.test(tokenValue);
}

function toTitleWords(value: string): string {
    return value
        .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
        .replace(/[_-]+/g, ' ')
        .trim()
        .replace(/\s+/g, ' ')
        .replace(/\b\w/g, char => {
        return char.toUpperCase();
    });
}

function buildFallbackLabelForUnknownToken(tokenWithoutDefault: string): string {
    const inner = tokenWithoutDefault.replace(/^\{|\}$/g, '');
    const [target = '', identifier = '', selector = ''] = inner.split(':');

    if (target === 'field') {
        return 'Field';
    }

    if (target) {
        const reference = selector || identifier || target;
        return toTitleWords(reference) || tokenWithoutDefault;
    }

    return tokenWithoutDefault;
}

function serializeTokenMetadata(
    baseToken: string,
    metadata: {
        defaultIfEmpty?: string;
        transformerId?: string;
        transformerParams?: Record<string, unknown>;
    },
): string {
    const baseMatch = baseToken.match(/^\{([^}]*)\}$/);
    if (!baseMatch) {
        return baseToken;
    }

    const parts = [baseMatch[1]];
    const transformerId = metadata.transformerId?.trim();

    if (transformerId) {
        parts.push(`${TRANSFORMER_ID_PREFIX}${encodeURIComponent(transformerId)}`);

        const params = metadata.transformerParams && typeof metadata.transformerParams === 'object'
            ? Object.entries(metadata.transformerParams)
            : [];
        params.forEach(([key, value]) => {
            const normalizedKey = String(key ?? '').trim();
            if (!normalizedKey || normalizedKey === 'transform') {
                return;
            }

            const normalizedValue = value == null ? '' : String(value);
            parts.push(`${normalizedKey}=${encodeURIComponent(normalizedValue)}`);
        });
    }

    const tokenBody = parts.filter(Boolean).join(';');
    const defaultIfEmpty = metadata.defaultIfEmpty?.trim();

    return defaultIfEmpty ? `{${tokenBody}|${defaultIfEmpty}}` : `{${tokenBody}}`;
}

export function dedupeVariableOptions(items: VariableOption[]): VariableOption[] {
    const deduped: VariableOption[] = [];
    const seen = new Set<string>();

    items.forEach((item) => {
        const key = String(item?.value ?? '') || `__label:${String(item?.label ?? '')}`;
        if (seen.has(key)) {
            return;
        }

        seen.add(key);
        deduped.push(item);
    });

    return deduped;
}

export function flattenVariableOptions(items: VariableOption[]): VariableOption[] {
    const flat: VariableOption[] = [];

    const visit = (nodes: VariableOption[]) => {
        nodes.forEach((node) => {
            flat.push(node);

            if (Array.isArray(node.children) && node.children.length > 0) {
                visit(node.children);
            }
        });
    };

    visit(items);
    return flat;
}

/**
 * Build VariableTag attributes from base and selected variable options.
 * Optional defaultIfEmpty is used when the resolved value is empty (e.g. "Guest" for {user:firstName|Guest}).
 */
export function buildVariableTagAttrs(
    baseVariable: VariableOption,
    selectedVariable: VariableOption = baseVariable,
    options: {
        openOnInsert?: boolean;
        defaultIfEmpty?: string;
        transformerId?: string;
        transformerParams?: Record<string, unknown>;
    } = {},
): VariableTagAttrs {
    const selectedLabel = selectedVariable?.label ?? baseVariable?.label ?? '';
    const value = selectedVariable?.value ?? baseVariable?.value ?? '';
    const defaultIfEmpty = options.defaultIfEmpty?.trim();

    const attrs: VariableTagAttrs = {
        label: selectedLabel,
        value,
        openOnInsert: options.openOnInsert ?? false,
    };
    if (defaultIfEmpty) {
        attrs.default = defaultIfEmpty;
    }
    if (options.transformerId?.trim()) {
        attrs.transformerId = options.transformerId.trim();
    }
    if (options.transformerParams && typeof options.transformerParams === 'object') {
        attrs.transformerParams = options.transformerParams;
    }
    return attrs;
}

/**
 * Strip optional inline default from token for lookup: {user:firstName|Guest} -> {user:firstName}.
 * Returns [tokenWithoutDefault, defaultText].
 */
export function parseTokenWithDefault(tokenValue: string): [string, string | undefined] {
    const parsed = parseTokenMetadata(tokenValue);
    return [parsed.tokenWithoutDefault, parsed.defaultIfEmpty];
}

/**
 * Resolve variable tag attrs from a token string (e.g. '{form:name}' or '{user:firstName|Guest}').
 */
export function resolveVariableTagByValue(
    tokenValue: string,
    topLevelVariables: VariableOption[],
    allVariables: VariableOption[],
): VariableTagAttrs | null {
    const {
        tokenWithoutDefault,
        defaultIfEmpty,
        transformerId,
        transformerParams,
    } = parseTokenMetadata(tokenValue);

    const exactTopLevel = topLevelVariables.find(v => {
        return v.value === tokenWithoutDefault;
    });
    if (exactTopLevel) {
        return buildVariableTagAttrs(exactTopLevel, exactTopLevel, {
            defaultIfEmpty,
            transformerId,
            transformerParams,
        });
    }

    for (const variable of topLevelVariables) {
        const children = Array.isArray(variable.children) ? variable.children : [];
        const matchedChild = children.find(c => {
            return c.value === tokenWithoutDefault;
        });
        if (matchedChild) {
            return buildVariableTagAttrs(variable, matchedChild, {
                defaultIfEmpty,
                transformerId,
                transformerParams,
            });
        }
    }

    const fallback = allVariables.find(v => {
        return v.value === tokenWithoutDefault;
    });
    if (fallback) {
        return buildVariableTagAttrs(fallback, fallback, {
            defaultIfEmpty,
            transformerId,
            transformerParams,
        });
    }

    // For dev/HMR, cross-form, and read-only contexts, unresolved variable tokens
    // should still render as variable tags instead of disappearing while categories load.
    if (isVariableLikeToken(tokenWithoutDefault)) {
        return {
            label: buildFallbackLabelForUnknownToken(tokenWithoutDefault),
            value: tokenWithoutDefault,
            openOnInsert: false,
            ...(defaultIfEmpty ? { default: defaultIfEmpty } : {}),
            ...(transformerId ? { transformerId } : {}),
            ...(transformerParams ? { transformerParams } : {}),
        };
    }

    return null;
}

/**
 * Convert string value with {token} placeholders to Tiptap doc content.
 */
export function valueToContent(
    value: string,
    topLevelVariables: VariableOption[],
    allVariables: VariableOption[],
    trailingCursorText = '\u200B',
): JSONContent | null {
    if (!value) {
        return null;
    }

    const parts = value.split(/({.*?})/);
    type ContentNode = NonNullable<JSONContent['content']>[number];
    const content: ContentNode[] = parts.flatMap((param): ContentNode[] => {
        if (param.includes('{')) {
            const variable = resolveVariableTagByValue(param, topLevelVariables, allVariables);
            if (variable) {
                return [{ type: 'variableTag', attrs: variable }];
            }

        }
        if (!param) {
            return [];
        }
        return [{ type: 'text', text: param }];
    });

    if (trailingCursorText && content.length && (content[content.length - 1] as { type?: string }).type === 'variableTag') {
        content.push({ type: 'text', text: trailingCursorText });
    }

    return { type: 'doc', content };
}

/**
 * Convert Tiptap content to string value.
 * Content is typically editor.getJSON().content (array of block/inline nodes).
 */
export function contentToValue(content: unknown): string {
    if (!content) {
        return '';
    }

    const items = Array.isArray(content) ? content : [];
    let result = '';

    const visit = (nodes: unknown[]) => {
        nodes.forEach((node) => {
            if (!node || typeof node !== 'object') {
                return;
            }
            const n = node as {
                type?: string;
                content?: unknown[];
                text?: string;
                attrs?: {
                    value?: string;
                    default?: string;
                    transformerId?: string;
                    transformerParams?: Record<string, unknown>;
                };
            };
            if (n.type === 'paragraph' && Array.isArray(n.content)) {
                visit(n.content);
            } else if (n.type === 'text') {
                result += (n.text ?? '').replace(/[\u200B\u2060]/g, '');
            } else if (n.type === 'variableTag') {
                const val = n.attrs?.value ?? '';
                const def = n.attrs?.default?.trim();
                const transformerId = n.attrs?.transformerId?.trim();
                const transformerParams = n.attrs?.transformerParams;
                result += serializeTokenMetadata(val, {
                    defaultIfEmpty: def,
                    transformerId,
                    transformerParams,
                });
            }
        });
    };

    visit(items);
    return result.replace(/[\r\n]+/g, ' ');
}

/**
 * Replace a range in the editor with a variable tag node.
 * @param editor - Tiptap editor instance
 */
export function replaceTokenWithVariable(
    editor: Editor,
    attrs: VariableTagAttrs,
    from: number,
    to: number,
): void {
    const { state } = editor;
    const { schema } = state;
    const variableNode = schema.nodes.variableTag?.create(attrs);
    if (!variableNode) {
        return;
    }

    const variableTagExtension = editor.extensionManager.extensions.find((extension) => {
        return extension.name === 'variableTag';
    });
    const trailingCursorText = String(variableTagExtension?.options?.trailingCursorText ?? '\u200B');
    const tr = state.tr.deleteRange(from, to);
    tr.insert(from, variableNode);
    if (trailingCursorText) {
        tr.insert(from + variableNode.nodeSize, schema.text(trailingCursorText));
        tr.setSelection(TextSelection.create(tr.doc, from + variableNode.nodeSize + trailingCursorText.length));
    } else {
        tr.setSelection(TextSelection.create(tr.doc, from + variableNode.nodeSize));
    }
    editor.view.dispatch(tr);
}
