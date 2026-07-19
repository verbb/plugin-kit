import { describe, expect, it } from 'vitest';

import {
    expandPresetItems,
    flattenToolbarButtonNames,
    getToolbarGroupMenuItems,
    getToolbarGroupDefaultIcon,
    normalizeToolbarNodes,
    parseToolbarConfig,
    toolbarIncludesButton,
} from './toolbar-schema.js';

describe('toolbar-schema', () => {
    it('parses comma-separated flat buttons', () => {
        expect(parseToolbarConfig('bold,italic,h2')).toEqual([
            { type: 'button', name: 'bold' },
            { type: 'button', name: 'italic' },
            { type: 'button', name: 'h2' },
        ]);
    });

    it('parses separators', () => {
        expect(parseToolbarConfig(['bold', '|', 'italic'])).toEqual([
            { type: 'button', name: 'bold' },
            { type: 'separator' },
            { type: 'button', name: 'italic' },
        ]);
    });

    it('parses preset groups from JSON', () => {
        const nodes = parseToolbarConfig(JSON.stringify([
            { preset: 'formatting', headingLevels: [1, 2, 3] },
            'bold',
            { preset: 'lists' },
        ]));

        expect(nodes).toEqual([
            {
                type: 'group',
                group: {
                    preset: 'formatting',
                    headingLevels: [1, 2, 3],
                },
            },
            { type: 'button', name: 'bold' },
            {
                type: 'group',
                group: { preset: 'lists' },
            },
        ]);
    });

    it('rejects legacy text and heading presets', () => {
        expect(normalizeToolbarNodes([
            { preset: 'text' },
            { preset: 'heading' },
        ])).toEqual([]);
    });

    it('parses custom groups with explicit items and separators', () => {
        expect(normalizeToolbarNodes([
            { label: 'More', icon: 'code', items: ['strikethrough', '|', 'code'] },
        ])).toEqual([
            {
                type: 'group',
                group: {
                    label: 'More',
                    icon: 'code',
                    items: ['strikethrough', '|', 'code'],
                },
            },
        ]);

        expect(getToolbarGroupMenuItems({
            label: 'More',
            icon: 'code',
            items: ['strikethrough', '|', 'code', { type: 'separator' }, 'highlight'],
        })).toEqual([
            { type: 'item', name: 'strikethrough' },
            { type: 'separator' },
            { type: 'item', name: 'code' },
            { type: 'separator' },
            { type: 'item', name: 'highlight' },
        ]);
    });

    it('expands preset items', () => {
        expect(expandPresetItems({ preset: 'align' })).toEqual([
            'align-left',
            'align-center',
            'align-right',
            'align-justify',
        ]);
        expect(expandPresetItems({ preset: 'headings', headingLevels: [1, 2] })).toEqual(['h1', 'h2']);
        expect(expandPresetItems({ preset: 'formatting', headingLevels: [1, 2] })).toEqual([
            'h1',
            'h2',
            'blockquote',
            'code-block',
        ]);
    });

    it('builds formatting menu entries with separators', () => {
        expect(getToolbarGroupMenuItems({ preset: 'formatting', headingLevels: [1, 2] })).toEqual([
            { type: 'item', name: 'paragraph' },
            { type: 'separator' },
            { type: 'item', name: 'h1' },
            { type: 'item', name: 'h2' },
            { type: 'separator' },
            { type: 'item', name: 'blockquote' },
            { type: 'item', name: 'code-block' },
        ]);
        expect(getToolbarGroupMenuItems({ preset: 'headings', headingLevels: [1, 2] })).toEqual([
            { type: 'item', name: 'h1' },
            { type: 'item', name: 'h2' },
        ]);
    });

    it('resolves preset trigger icons', () => {
        expect(getToolbarGroupDefaultIcon({ preset: 'headings' })).toBe('heading');
        expect(getToolbarGroupDefaultIcon({ preset: 'formatting' })).toBe('paragraph');
    });

    it('flattens toolbar button names including grouped items', () => {
        const nodes = parseToolbarConfig([
            { preset: 'lists' },
            'h2',
            'bold',
        ]);

        expect(flattenToolbarButtonNames(nodes)).toEqual([
            'unordered-list',
            'ordered-list',
            'h2',
            'bold',
        ]);
    });

    it('detects whether link is enabled in the toolbar', () => {
        const nodes = parseToolbarConfig(['bold', { preset: 'formatting' }, 'link']);
        expect(toolbarIncludesButton(nodes, 'link')).toBe(true);
        expect(toolbarIncludesButton(nodes, 'table')).toBe(false);
    });
});
