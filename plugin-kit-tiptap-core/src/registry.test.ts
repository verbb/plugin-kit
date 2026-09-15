import { Extension, Mark, type Editor } from '@tiptap/core';
import { describe, expect, it, vi } from 'vitest';

import {
    getRegisteredTiptapExtensions,
    getRegisteredTiptapToolbarControl,
    registerTiptapExtension,
    registerTiptapToolbarControl,
} from './registry.js';
import {
    isTiptapButtonActive,
    isTiptapButtonName,
    runTiptapButton,
} from './toolbar/button-registry.js';
import { parseToolbarConfig } from './toolbar/toolbar-schema.js';

describe('TipTap extension registry', () => {
    it('creates fresh extensions for the selected document surfaces', () => {
        let sequence = 0;
        const dispose = registerTiptapExtension({
            id: 'tests/annotation',
            extension: () => Extension.create({
                name: 'testAnnotation',
                addStorage: () => ({ sequence: ++sequence }),
            }),
            surfaces: ['editor'],
        });

        try {
            const first = getRegisteredTiptapExtensions('editor');
            const second = getRegisteredTiptapExtensions('editor');

            expect(first.map((extension) => extension.name)).toContain('testAnnotation');
            expect(second.map((extension) => extension.name)).toContain('testAnnotation');
            expect(first.find((extension) => extension.name === 'testAnnotation'))
                .not.toBe(second.find((extension) => extension.name === 'testAnnotation'));
            expect(getRegisteredTiptapExtensions('content').map((extension) => extension.name))
                .not.toContain('testAnnotation');
        } finally {
            dispose();
        }
    });

    it('rejects duplicate ids, schema names, and core schema replacements', () => {
        const dispose = registerTiptapExtension({
            id: 'tests/abbr',
            extension: Mark.create({ name: 'testAbbr' }),
        });

        try {
            expect(() => registerTiptapExtension({
                id: 'tests/abbr',
                extension: Mark.create({ name: 'otherAbbr' }),
            })).toThrow('already registered');
            expect(() => registerTiptapExtension({
                id: 'tests/other-abbr',
                extension: Mark.create({ name: 'testAbbr' }),
            })).toThrow('already registered');
            expect(() => registerTiptapExtension({
                id: 'tests/paragraph',
                extension: Extension.create({ name: 'paragraph' }),
            })).toThrow('cannot be replaced');
            expect(() => registerTiptapExtension({
                id: 'tests/history',
                extension: Extension.create({ name: 'undoRedo' }),
            })).toThrow('cannot be replaced');
            expect(() => registerTiptapExtension({
                id: 'tests/color',
                extension: Extension.create({ name: 'color' }),
            })).toThrow('cannot be replaced');
        } finally {
            dispose();
        }
    });

    it('validates extension factory results on registration and use', () => {
        expect(() => registerTiptapExtension({
            id: 'tests/invalid',
            extension: (() => null) as never,
        })).toThrow('factory must return an extension');

        let valid = true;
        const dispose = registerTiptapExtension({
            id: 'tests/changing',
            extension: () => valid
                ? Extension.create({ name: 'testChanging' })
                : null as never,
        });

        try {
            valid = false;
            expect(() => getRegisteredTiptapExtensions('editor'))
                .toThrow('factory must return an extension');
        } finally {
            dispose();
        }
    });
});

describe('TipTap toolbar control registry', () => {
    it('makes registered controls available to toolbar parsing and dispatch', () => {
        const run = vi.fn(() => true);
        const isActive = vi.fn(() => true);
        const isVisible = vi.fn(() => true);
        const editor = {} as Editor;
        const dispose = registerTiptapToolbarControl({
            id: 'test-abbr',
            label: 'Abbreviation',
            run,
            isActive,
            isVisible,
        });

        try {
            expect(getRegisteredTiptapToolbarControl('test-abbr')?.label).toBe('Abbreviation');
            expect(isTiptapButtonName('test-abbr')).toBe(true);
            expect(parseToolbarConfig('bold,test-abbr')).toEqual([
                { type: 'button', name: 'bold' },
                { type: 'button', name: 'test-abbr' },
            ]);
            expect(runTiptapButton(editor, 'test-abbr')).toBe(true);
            expect(isTiptapButtonActive(editor, 'test-abbr')).toBe(true);
            expect(getRegisteredTiptapToolbarControl('test-abbr')?.isVisible?.(editor)).toBe(true);
            expect(run).toHaveBeenCalledWith(editor);
            expect(isActive).toHaveBeenCalledWith(editor);
            expect(isVisible).toHaveBeenCalledWith(editor);
        } finally {
            dispose();
        }

        expect(isTiptapButtonName('test-abbr')).toBe(false);
    });

    it('does not allow TextStyle menu controls to be replaced', () => {
        expect(() => registerTiptapToolbarControl({
            id: 'font-family',
            label: 'Replacement font menu',
            run: () => true,
        })).toThrow('cannot be replaced');
    });
});
