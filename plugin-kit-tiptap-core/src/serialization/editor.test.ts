import { describe, expect, it } from 'vitest';
import { normalizeContentArray, valueToContent } from './editor.js';

describe('editorConfig', () => {
    it('adds the configured cursor placeholder to rich text paragraphs ending in variable tags', () => {
        const content = valueToContent([
            {
                type: 'paragraph',
                content: [
                    {
                        type: 'variableTag',
                        attrs: {
                            label: 'Total',
                            value: '{field:total}',
                        },
                    },
                ],
            },
        ], { trailingCursorText: '\u2060' });

        expect(content?.content?.[0]).toEqual({
            type: 'paragraph',
            content: [
                {
                    type: 'variableTag',
                    attrs: {
                        label: 'Total',
                        value: '{field:total}',
                    },
                },
                { type: 'text', text: '\u2060' },
            ],
        });
    });

    it('strips cursor placeholders when normalizing content for storage', () => {
        const content = normalizeContentArray([
            {
                type: 'paragraph',
                content: [
                    {
                        type: 'variableTag',
                        attrs: {
                            label: 'Total',
                            value: '{field:total}',
                        },
                    },
                    { type: 'text', text: '\u2060' },
                ],
            },
        ]);

        expect(content).toEqual([
            {
                type: 'paragraph',
                content: [
                    {
                        type: 'variableTag',
                        attrs: {
                            label: 'Total',
                            value: '{field:total}',
                        },
                    },
                ],
            },
        ]);
    });
});
