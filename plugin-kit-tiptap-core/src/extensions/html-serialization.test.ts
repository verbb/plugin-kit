// @vitest-environment jsdom

import { Editor } from '@tiptap/core';
import { afterEach, describe, expect, it } from 'vitest';

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

describe('HTML serialization', () => {
    it('omits default table spans and preserves non-default spans', () => {
        const editor = createEditor(`
            <table>
                <tbody>
                    <tr>
                        <th><p>Header</p></th>
                        <th colspan="2"><p>Wide</p></th>
                    </tr>
                    <tr>
                        <td><p>First</p></td>
                        <td rowspan="2"><p>Tall</p></td>
                        <td><p>Last</p></td>
                    </tr>
                    <tr>
                        <td><p>Lower</p></td>
                        <td><p>End</p></td>
                    </tr>
                </tbody>
            </table>
        `);

        const html = editor.getHTML();

        expect(html).not.toContain('colspan="1"');
        expect(html).not.toContain('rowspan="1"');
        expect(html).toContain('colspan="2"');
        expect(html).toContain('rowspan="2"');
    });
});
