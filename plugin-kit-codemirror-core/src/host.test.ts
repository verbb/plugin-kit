// @vitest-environment jsdom

import { describe, expect, it } from 'vitest';

import { CodeMirrorHost, computeCodeEditorMinHeight } from './index.js';

describe('computeCodeEditorMinHeight', () => {
    it('derives a stable min height from row count', () => {
        expect(computeCodeEditorMinHeight(12)).toBe('228px');
        expect(computeCodeEditorMinHeight(4)).toBe('84px');
    });
});

describe('CodeMirrorHost', () => {
    it('mounts, updates, and destroys cleanly', () => {
        const parent = document.createElement('div');
        const host = new CodeMirrorHost();
        const updates: string[] = [];

        host.mount({
            parent,
            value: '<p>Hello</p>',
            onUpdate: (value) => updates.push(value),
        });

        expect(host.getValue()).toBe('<p>Hello</p>');
        expect(parent.querySelector('.cm-editor')).not.toBeNull();

        host.setValue('<p>Updated</p>', { respectFocus: false });
        expect(host.getValue()).toBe('<p>Updated</p>');

        host.setEditable(false);
        host.destroy();
        expect(parent.querySelector('.cm-editor')).toBeNull();
    });
});
