import { Mark } from '@tiptap/core';
import { asterisk } from '@verbb/plugin-kit-icons';
import {
    registerTiptapExtension,
    registerTiptapToolbarControl,
} from '@verbb/plugin-kit-tiptap-core';
import '@verbb/plugin-kit-web/components/tiptap/pk-tiptap-editor.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

const editorMarkup = `
<pk-tiptap-editor
  buttons="bold,italic,abbreviation"
  value='[{"type":"paragraph","content":[{"type":"text","text":"Select some text, then toggle the custom control. "},{"type":"text","marks":[{"type":"abbreviation"}],"text":"NASA"},{"type":"text","text":" starts with the mark enabled."}]}]'
></pk-tiptap-editor>
`.trim();

const exampleSource = `
import { Mark } from '@tiptap/core';
import { asterisk } from '@verbb/plugin-kit-icons';
import {
  registerTiptapExtension,
  registerTiptapToolbarControl,
} from '@verbb/plugin-kit-tiptap-core';

registerTiptapExtension({
  id: 'acme/abbreviation',
  extension: () => Mark.create({
    name: 'abbreviation',
    parseHTML: () => [{ tag: 'abbr' }],
    renderHTML: ({ HTMLAttributes }) => [
      'abbr',
      {
        ...HTMLAttributes,
        style: 'text-decoration: underline dotted; text-underline-offset: 3px',
      },
      0,
    ],
  }),
});

registerTiptapToolbarControl({
  id: 'abbreviation',
  label: 'Abbreviation',
  icon: asterisk,
  run: (editor) => editor.chain().focus().toggleMark('abbreviation').run(),
  isActive: (editor) => editor.isActive('abbreviation'),
});

const editor = document.querySelector('pk-tiptap-editor');
editor?.setAttribute('buttons', 'bold,italic,abbreviation');
`.trim();

function enhanceCustomControl(root: HTMLElement): () => void {
    const disposeExtension = registerTiptapExtension({
        id: 'docs/abbreviation',
        extension: () => Mark.create({
            name: 'abbreviation',
            parseHTML: () => [{ tag: 'abbr' }],
            renderHTML: ({ HTMLAttributes }) => [
                'abbr',
                {
                    ...HTMLAttributes,
                    style: 'text-decoration: underline dotted; text-underline-offset: 3px',
                },
                0,
            ],
        }),
    });

    let disposeControl: (() => void) | undefined;

    try {
        disposeControl = registerTiptapToolbarControl({
            id: 'abbreviation',
            label: 'Abbreviation',
            icon: asterisk,
            run: (editor) => editor.chain().focus().toggleMark('abbreviation').run(),
            isActive: (editor) => editor.isActive('abbreviation'),
        });
    } catch (error) {
        disposeExtension();
        throw error;
    }

    // Register first, then connect the editor so it composes the custom schema.
    root.innerHTML = editorMarkup;

    return () => {
        root.replaceChildren();
        disposeControl?.();
        disposeExtension();
    };
}

export default defineWebPreview({
    label: 'Custom Control',
    title: 'Registered abbreviation mark and toolbar control',
    layout: 'plain',
    language: 'ts',
    code: exampleSource,
    html: '<div data-tiptap-extension-demo></div>',
    enhance: enhanceCustomControl,
});
