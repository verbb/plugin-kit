import Bold from '@tiptap/extension-bold';
import Code from '@tiptap/extension-code';
import Highlight from '@tiptap/extension-highlight';
import Italic from '@tiptap/extension-italic';
import Strike from '@tiptap/extension-strike';
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import Underline from '@tiptap/extension-underline';

import Blockquote from '@tiptap/extension-blockquote';
import BulletList from '@tiptap/extension-bullet-list';
import CodeBlock from '@tiptap/extension-code-block';
import Document from '@tiptap/extension-document';
import HardBreak from '@tiptap/extension-hard-break';
import Heading from '@tiptap/extension-heading';
import HorizontalRule from '@tiptap/extension-horizontal-rule';
import ListItem from '@tiptap/extension-list-item';
import OrderedList from '@tiptap/extension-ordered-list';
import Paragraph from '@tiptap/extension-paragraph';
import { Table } from '@tiptap/extension-table';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';
import Text from '@tiptap/extension-text';

import Dropcursor from '@tiptap/extension-dropcursor';
import Gapcursor from '@tiptap/extension-gapcursor';
import History from '@tiptap/extension-history';
import TextAlign from '@tiptap/extension-text-align';
import type { NodeViewRenderer } from '@tiptap/core';

import { createLinkExtension } from '../links/extension.js';
import { createVariableTagExtension } from './variable-tag.js';
import { OneLinerDocument } from './one-liner-document.js';

export type CreateTiptapExtensionsOptions = {
    trailingCursorText?: string;
    variableTagNodeView?: NodeViewRenderer;
    includeVariableTag?: boolean;
};

export const createTiptapExtensions = ({
    trailingCursorText = '\u200B',
    variableTagNodeView,
    includeVariableTag = true,
}: CreateTiptapExtensionsOptions = {}) => {
    const extensions = [
        Document,
        Dropcursor,
        Gapcursor,
        Paragraph,
        Text,
        HardBreak,

        Bold,
        Code,
        Highlight,
        Italic,
        Strike,
        Subscript,
        Superscript,
        Underline,

        Blockquote,
        BulletList,
        CodeBlock,
        Heading.configure({ levels: [1, 2, 3, 4, 5, 6] }),
        HorizontalRule,
        ListItem,
        OrderedList,
        Table.configure({ resizable: true }),
        TableRow,
        TableHeader,
        TableCell,

        History,
        createLinkExtension(),
        TextAlign.configure({ types: ['heading', 'paragraph'], defaultAlignment: 'start' }),
    ];

    if (includeVariableTag) {
        extensions.push(createVariableTagExtension({
            trailingCursorText,
            addNodeView: variableTagNodeView,
        }));
    }

    return extensions;
};

export type CreateTiptapInputExtensionsOptions = {
    trailingCursorText?: string;
    variableTagNodeView?: NodeViewRenderer;
};

export const createTiptapInputExtensions = ({
    trailingCursorText = '\u200B',
    variableTagNodeView,
}: CreateTiptapInputExtensionsOptions = {}) => {
    return [
        OneLinerDocument,
        Text,
        createVariableTagExtension({
            trailingCursorText,
            addNodeView: variableTagNodeView,
        }),
    ];
};
