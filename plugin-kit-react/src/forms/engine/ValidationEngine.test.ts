import { describe, expect, it } from 'vitest';

import { createValidationEngine } from './ValidationEngine';
import { isRichTextEmpty } from '../../utils/tiptap';

describe('isRichTextEmpty', () => {
    it('treats empty rich-text document shapes as blank', () => {
        expect(isRichTextEmpty(null)).toBe(true);
        expect(isRichTextEmpty('')).toBe(true);
        expect(isRichTextEmpty([])).toBe(true);
        expect(isRichTextEmpty([{ type: 'paragraph' }])).toBe(true);
        expect(isRichTextEmpty([{ type: 'paragraph', content: [] }])).toBe(true);
    });

    it('treats stored text content as non-blank', () => {
        expect(isRichTextEmpty([
            {
                type: 'paragraph',
                content: [{ type: 'text', text: 'I agree to the terms.' }],
            },
        ])).toBe(false);
    });
});

describe('requiredRichText validation', () => {
    it('rejects empty agree descriptions', () => {
        const schema = [
            {
                name: 'description',
                label: 'Description',
                validation: 'requiredRichText',
                required: true,
                $field: 'richText',
            },
        ];

        const engine = createValidationEngine({
            schema,
            fieldEntries: [
                {
                    path: 'description',
                    field: schema[0],
                },
            ],
        });

        const emptyResult = engine.validate({ description: [] });
        expect(emptyResult?.fields?.description?.[0]).toContain('cannot be blank.');

        const emptyParagraphResult = engine.validate({ description: [{ type: 'paragraph' }] });
        expect(emptyParagraphResult?.fields?.description?.[0]).toContain('cannot be blank.');

        expect(engine.validate({
            description: [{
                type: 'paragraph',
                content: [{ type: 'text', text: 'I agree.' }],
            }],
        })).toBeUndefined();
    });
});
