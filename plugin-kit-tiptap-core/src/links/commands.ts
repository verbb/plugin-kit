import { getMarkRange, type Editor } from '@tiptap/core';

import type {
    InsertLinkParams,
    LinkEditState,
    LinkMarkAttributes,
} from './types.js';

export function buildLinkMarkAttributes(url: string, openInNewTab: boolean): LinkMarkAttributes {
    const linkAttrs: LinkMarkAttributes = { href: url };

    if (openInNewTab) {
        linkAttrs.target = '_blank';
    }

    return linkAttrs;
}

export function getSelectedText(editor: Editor): string {
    const { from, to } = editor.state.selection;
    return editor.state.doc.textBetween(from, to, ' ');
}

export function getLinkOpenInNewTab(editor: Editor): boolean {
    return editor.isActive('link') && editor.getAttributes('link').target === '_blank';
}

export function getLinkEditState(editor: Editor): LinkEditState {
    const { href } = editor.getAttributes('link');
    const { state } = editor;
    const linkType = state.schema.marks.link;
    const range = getMarkRange(state.selection.$from, linkType);
    const from = range?.from ?? state.selection.from;
    const to = range?.to ?? state.selection.to;
    const text = editor.state.doc.textBetween(from, to, ' ');

    return {
        from,
        to,
        href: href ?? '',
        text,
        openInNewTab: getLinkOpenInNewTab(editor),
    };
}

export function applyLinkToEditor(editor: Editor, params: InsertLinkParams): void {
    const {
        url,
        text,
        openInNewTab,
        from: fromParam,
        to: toParam,
    } = params;

    const chain = editor.chain().focus();
    const linkAttrs = buildLinkMarkAttributes(url, openInNewTab);
    const content = {
        type: 'text',
        text: text.trim() || url,
        marks: [{ type: 'link', attrs: linkAttrs }],
    };

    if (typeof fromParam === 'number' && typeof toParam === 'number' && fromParam !== toParam) {
        chain.insertContentAt({ from: fromParam, to: toParam }, [content]).run();
        return;
    }

    const { from, to } = editor.state.selection;
    const selectedText = editor.state.doc.textBetween(from, to, ' ');

    if (selectedText) {
        chain.extendMarkRange('link').setLink(linkAttrs).run();
        return;
    }

    chain.insertContent([content]).run();
}

export function unsetLinkFromEditor(editor: Editor): void {
    editor.chain().focus().extendMarkRange('link').unsetLink().run();
}
