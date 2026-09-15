// @vitest-environment jsdom

import { Editor } from '@tiptap/core';
import { afterEach, describe, expect, it } from 'vitest';

import { createTiptapExtensions } from './extensions/create-extensions.js';
import { getRegisteredTiptapExtensions } from './registry.js';
import { registerTiptapTextStyleDefinition } from './text-style-definition.js';
import { isTiptapButtonActive, runTiptapButton } from './toolbar/button-registry.js';

const disposers: Array<() => void> = [];
const editors: Editor[] = [];

afterEach(() => {
    editors.splice(0).forEach((editor) => editor.destroy());
    disposers.splice(0).reverse().forEach((dispose) => dispose());
});

describe('registerTiptapTextStyleDefinition', () => {
    it('registers matching editor, renderer, and toolbar behavior', () => {
        disposers.push(registerTiptapTextStyleDefinition({
            id: 'test-uppercase',
            label: 'Uppercase',
            attribute: 'textTransform',
            cssProperty: 'text-transform',
            allowedValues: ['uppercase'],
            toolbarValue: 'uppercase',
        }));

        const editor = new Editor({
            extensions: createTiptapExtensions({ includeVariableTag: false }),
            content: '<p><span style="text-transform: uppercase">NASA</span></p>',
        });
        editors.push(editor);

        editor.commands.setTextSelection({ from: 1, to: 5 });
        expect(editor.getJSON().content?.[0]?.content?.[0]?.marks).toEqual([{
            type: 'textStyle',
            attrs: {
                backgroundColor: '',
                color: '',
                fontFamily: '',
                fontSize: '',
                fontVariantCaps: null,
                lineHeight: '',
                textTransform: 'uppercase',
            },
        }]);
        expect(isTiptapButtonActive(editor, 'test-uppercase')).toBe(true);
        expect(runTiptapButton(editor, 'test-uppercase')).toBe(true);
        expect(editor.getHTML()).not.toContain('text-transform');
        expect(getRegisteredTiptapExtensions('content')).toHaveLength(1);
    });

    it('rejects unsafe definitions and duplicate attributes', () => {
        expect(() => registerTiptapTextStyleDefinition({
            id: 'unsafe-color',
            label: 'Unsafe color',
            attribute: 'unsafeColor',
            cssProperty: 'color' as never,
            allowedValues: ['expression(alert(1))'],
            toolbarValue: 'expression(alert(1))',
        })).toThrow('unsupported CSS property');

        expect(() => registerTiptapTextStyleDefinition({
            id: 'other-small-caps',
            label: 'Other small caps',
            attribute: 'fontVariantCaps',
            cssProperty: 'font-variant-caps',
            allowedValues: ['small-caps'],
            toolbarValue: 'small-caps',
        })).toThrow('cannot be replaced');

        expect(() => registerTiptapTextStyleDefinition({
            id: 'replacement-font-family',
            label: 'Replacement font family',
            attribute: 'fontFamily',
            cssProperty: 'text-transform',
            allowedValues: ['uppercase'],
            toolbarValue: 'uppercase',
        })).toThrow('cannot be replaced');

        disposers.push(registerTiptapTextStyleDefinition({
            id: 'test-uppercase',
            label: 'Uppercase',
            attribute: 'textTransform',
            cssProperty: 'text-transform',
            allowedValues: ['uppercase'],
            toolbarValue: 'uppercase',
        }));

        expect(() => registerTiptapTextStyleDefinition({
            id: 'other-uppercase',
            label: 'Other uppercase',
            attribute: 'textTransform',
            cssProperty: 'text-transform',
            allowedValues: ['uppercase'],
            toolbarValue: 'uppercase',
        })).toThrow('already registered');
    });
});
