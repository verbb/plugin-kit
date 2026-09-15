// @vitest-environment jsdom

import { Editor } from '@tiptap/core';
import { afterEach, describe, expect, it } from 'vitest';

import { isTiptapButtonActive, runTiptapButton } from '../toolbar/button-registry.js';
import { createTiptapExtensions } from './create-extensions.js';

const editors: Editor[] = [];

function createEditor(content: string): Editor {
    const editor = new Editor({
        extensions: createTiptapExtensions({ includeVariableTag: false }),
        content,
    });

    editors.push(editor);
    return editor;
}

afterEach(() => {
    editors.splice(0).forEach((editor) => editor.destroy());
});

describe('FontVariantCaps', () => {
    it('round-trips small caps through the expected TextStyle JSON and HTML', () => {
        const editor = createEditor(
            '<p><span style="font-variant-caps: small-caps">NASA</span></p>',
        );

        expect(editor.getJSON().content?.[0]?.content?.[0]).toEqual({
            type: 'text',
            marks: [{
                type: 'textStyle',
                attrs: {
                    backgroundColor: '',
                    color: '',
                    fontFamily: '',
                    fontSize: '',
                    fontVariantCaps: 'small-caps',
                    lineHeight: '',
                },
            }],
            text: 'NASA',
        });
        expect(editor.getHTML()).toBe(
            '<p style="text-align: start;"><span style="font-variant-caps: small-caps;">NASA</span></p>',
        );
    });

    it('removes only small caps while preserving another TextStyle attribute', () => {
        const editor = createEditor(
            '<p><span style="color: red; font-variant-caps: small-caps">NASA</span></p>',
        );

        editor.commands.setTextSelection({ from: 1, to: 5 });
        expect(isTiptapButtonActive(editor, 'small-caps')).toBe(true);
        expect(runTiptapButton(editor, 'small-caps')).toBe(true);

        expect(editor.getJSON().content?.[0]?.content?.[0]?.marks).toEqual([{
            type: 'textStyle',
            attrs: {
                backgroundColor: '',
                color: 'red',
                fontFamily: '',
                fontSize: '',
                fontVariantCaps: null,
                lineHeight: '',
            },
        }]);
        expect(editor.getHTML()).toBe(
            '<p style="text-align: start;"><span style="color: red;">NASA</span></p>',
        );
    });

    it('round-trips the official TextStyle extensions alongside small caps', () => {
        const editor = createEditor(
            '<p><span style="font-family: Georgia, serif; font-size: 18px; color: #2563eb; background-color: #dbeafe; line-height: 1.5; font-variant-caps: small-caps">Styled</span></p>',
        );

        expect(editor.getJSON().content?.[0]?.content?.[0]?.marks?.[0]?.attrs).toEqual({
            backgroundColor: '#dbeafe',
            color: '#2563eb',
            fontFamily: 'Georgia, serif',
            fontSize: '18px',
            fontVariantCaps: 'small-caps',
            lineHeight: '1.5',
        });
        expect(editor.getHTML()).toContain('font-family: Georgia, serif');
        expect(editor.getHTML()).toContain('font-variant-caps: small-caps');
    });
});
