import { describe, expect, it } from 'vitest';
import {
    parseTokenWithDefault,
    resolveVariableTagByValue,
    resolveVariableTagLabel,
    contentToValue,
    getReferenceBaseToken,
    valueToContent,
} from './variableSerialization';
import type { VariableOption } from './VariableDropdown';

const TOP_LEVEL: VariableOption[] = [
    { label: 'Total', value: '{field:total}' },
    {
        label: 'Submission',
        value: '{submission:title}',
        children: [{ label: 'Submission Date', value: '{submission:date}' }],
    },
];

const ALL_VARIABLES: VariableOption[] = [
    { label: 'Total', value: '{field:total}' },
    { label: 'Submission Date', value: '{submission:date}' },
];

describe('variableSerialization', () => {
    it('parses token defaults without transforms', () => {
        const [token, fallback] = parseTokenWithDefault('{field:total|0}');
        expect(token).toBe('{field:total}');
        expect(fallback).toBe('0');
    });

    it('parses scoped tokens while preserving metadata in lookup token', () => {
        const [token] = parseTokenWithDefault('{entry:collection:title;status=published}');
        expect(token).toBe('{entry:collection:title;status=published}');
    });

    it('parses token defaults with transform metadata', () => {
        const token = '{field:total;transform=round;decimals=2|0}';
        const [withoutDefault, fallback] = parseTokenWithDefault(token);

        expect(withoutDefault).toBe('{field:total}');
        expect(fallback).toBe('0');
    });

    it('resolves tag attrs including transform metadata', () => {
        const token = '{field:total;transform=round;decimals=2|0}';
        const attrs = resolveVariableTagByValue(token, TOP_LEVEL, ALL_VARIABLES);

        expect(attrs).not.toBeNull();
        expect(attrs?.value).toBe('{field:total}');
        expect(attrs?.default).toBe('0');
        expect(attrs?.transformerId).toBe('round');
        expect(attrs?.transformerParams).toEqual({ decimals: '2' });
    });

    it('uses matched option labels for normal field reference tokens', () => {
        const token = '{field:35e487f9-f0fc-4d95-97a5-812a149b46ab}';
        const option: VariableOption = {
            label: 'Text',
            value: token,
        };

        expect(resolveVariableTagLabel(token, option)).toBe('Text');
    });

    it('serializes variableTag content back to transformed token', () => {
        const value = contentToValue([
            {
                type: 'paragraph',
                content: [
                    {
                        type: 'variableTag',
                        attrs: {
                            value: '{field:total}',
                            default: '0',
                            transformerId: 'round',
                            transformerParams: { decimals: 2 },
                        },
                    },
                ],
            },
        ]);

        expect(value).toBe('{field:total;transform=round;decimals=2|0}');
    });

    it('round-trips transformed token into variableTag attrs', () => {
        const token = '{field:total;transform=round;decimals=2|0}';
        const content = valueToContent(token, TOP_LEVEL, ALL_VARIABLES);
        const docContent = Array.isArray(content?.content) ? content?.content : [];
        const tagNode = docContent.find(node => {
            return (node as { type?: string }).type === 'variableTag';
        }) as {
            attrs?: Record<string, unknown>;
        } | undefined;

        expect(tagNode?.attrs?.value).toBe('{field:total}');
        expect(tagNode?.attrs?.default).toBe('0');
        expect(tagNode?.attrs?.transformerId).toBe('round');
        expect(tagNode?.attrs?.transformerParams).toEqual({ decimals: '2' });
    });

    it('adds a cursor placeholder after trailing variable tags for editable text positions', () => {
        const content = valueToContent('{field:total}', TOP_LEVEL, ALL_VARIABLES);

        expect(content?.content).toEqual([
            {
                type: 'variableTag',
                attrs: {
                    label: 'Total',
                    value: '{field:total}',
                    openOnInsert: false,
                },
            },
            { type: 'text', text: '\u200B' },
        ]);
    });

    it('resolves scoped reference tokens with exact option labels', () => {
        const scopedTopLevel: VariableOption[] = [
            ...TOP_LEVEL,
            {
                label: 'Collection',
                value: '{entry:collection}',
                children: [{
                    label: 'Collection: Title (Published)',
                    value: '{entry:collection:title;status=published}',
                }],
            },
        ];
        const scopedAll: VariableOption[] = [
            ...ALL_VARIABLES,
            { label: 'Collection: Title (Published)', value: '{entry:collection:title;status=published}' },
        ];
        const token = '{entry:collection:title;status=published}';
        const attrs = resolveVariableTagByValue(token, scopedTopLevel, scopedAll);

        expect(attrs).not.toBeNull();
        expect(attrs?.label).toBe('Collection: Title (Published)');
        expect(attrs?.value).toBe('{entry:collection:title;status=published}');
    });

    it('falls back to base reference options for scoped variants', () => {
        const scopedTopLevel: VariableOption[] = [
            {
                label: 'Collection',
                value: '{entry:collection}',
                children: [{
                    label: 'Collection: Title',
                    value: '{entry:collection:title}',
                }],
            },
        ];
        const token = '{entry:collection:title;status=draft}';
        const attrs = resolveVariableTagByValue(token, scopedTopLevel, []);

        expect(attrs).not.toBeNull();
        expect(attrs?.label).toBe('Collection: Title');
        expect(attrs?.value).toBe('{entry:collection:title;status=draft}');
        expect(resolveVariableTagLabel(token, attrs as VariableOption)).toBe('Collection: Title');
    });

    it('round-trips scoped reference tokens in single-line variable input', () => {
        const scopedTopLevel: VariableOption[] = [
            {
                label: 'Collection',
                value: '{entry:collection}',
                children: [{
                    label: 'Collection: Title (Published)',
                    value: '{entry:collection:title;status=published}',
                }],
            },
        ];
        const scopedAll: VariableOption[] = [
            { label: 'Collection: Title (Published)', value: '{entry:collection:title;status=published}' },
        ];
        const token = 'Test - {entry:collection:title;status=published}';
        const content = valueToContent(token, scopedTopLevel, scopedAll);
        const tagNode = content?.content?.find((node) => {
            return (node as { type?: string }).type === 'variableTag';
        }) as { attrs?: Record<string, unknown> } | undefined;

        expect(tagNode?.attrs?.label).toBe('Collection: Title (Published)');
        expect(tagNode?.attrs?.value).toBe('{entry:collection:title;status=published}');
    });

    it('can use a non-breaking cursor placeholder for wrapping editors', () => {
        const content = valueToContent('{field:total}', TOP_LEVEL, ALL_VARIABLES, '\u2060');

        expect(content?.content?.at(-1)).toEqual({ type: 'text', text: '\u2060' });
    });

    it('uses generic fallback labels for unresolved scoped tokens', () => {
        const token = '{entry:collection:title;status=archived}';

        expect(resolveVariableTagLabel(token, null)).toBe('Title');
    });

    it('normalizes scoped reference tokens to their base reference', () => {
        expect(getReferenceBaseToken('{entry:collection:title;status=published}')).toBe('{entry:collection:title}');
    });
});
