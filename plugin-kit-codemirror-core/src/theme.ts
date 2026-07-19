import { EditorView } from '@codemirror/view';

import { CODE_EDITOR_LINE_HEIGHT_PX } from './constants.js';

/** Editor content surface — matches @uiw/react-codemirror default light theme. */
export const CODE_EDITOR_SURFACE_BG = '#ffffff';

/** Gutter strip beside line numbers. */
export const CODE_EDITOR_GUTTER_BG = 'rgb(245, 247, 250)';

export const CODE_EDITOR_TEXT_COLOR = 'rgb(31, 41, 51)';
export const CODE_EDITOR_GUTTER_TEXT_COLOR = '#7c8793';
export const CODE_EDITOR_GUTTER_BORDER = '1px solid rgba(96, 125, 159, 0.2)';
export const CODE_EDITOR_ACTIVE_LINE_BG = 'rgba(96, 125, 159, 0.06)';
export const CODE_EDITOR_SELECTION_BG = 'rgba(59, 130, 246, 0.35)';

/** Outer chrome behind the editor — Craft input shell tone. */
export const CODE_EDITOR_CHROME_BG = 'rgb(251, 252, 254)';

/**
 * Matches the legacy React CodeEditor theme. The interior surface is white
 * (via @uiw/react-codemirror's default light theme); only the gutter uses
 * the cooler gray strip.
 */
export const codeEditorTheme = EditorView.theme({
    '&': {
        backgroundColor: CODE_EDITOR_SURFACE_BG,
        color: CODE_EDITOR_TEXT_COLOR,
        // Match kit mono optical size (text-[0.9em] / --pk-font-size-mono).
        fontSize: '0.9em',
    },
    '&.cm-focused': {
        outline: 'none',
    },
    '.cm-scroller': {
        fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
        lineHeight: `${CODE_EDITOR_LINE_HEIGHT_PX}px`,
    },
    '.cm-content': {
        padding: '6px 8px',
        caretColor: CODE_EDITOR_TEXT_COLOR,
    },
    '.cm-gutters': {
        backgroundColor: CODE_EDITOR_GUTTER_BG,
        borderRight: CODE_EDITOR_GUTTER_BORDER,
        color: CODE_EDITOR_GUTTER_TEXT_COLOR,
    },
    '.cm-gutter.cm-lineNumbers .cm-gutterElement': {
        padding: '0 8px',
        minWidth: '3rem',
    },
    '.cm-activeLine': {
        backgroundColor: CODE_EDITOR_ACTIVE_LINE_BG,
    },
    '&.cm-light .cm-activeLine': {
        backgroundColor: CODE_EDITOR_ACTIVE_LINE_BG,
    },
    '&.cm-light .cm-activeLineGutter': {
        backgroundColor: CODE_EDITOR_GUTTER_BG,
    },
    '&.cm-light .cm-gutters': {
        backgroundColor: CODE_EDITOR_GUTTER_BG,
        color: CODE_EDITOR_GUTTER_TEXT_COLOR,
        border: '0 solid transparent',
        borderRight: CODE_EDITOR_GUTTER_BORDER,
    },
    '.cm-selectionBackground, &.cm-focused .cm-selectionBackground, ::selection': {
        backgroundColor: `${CODE_EDITOR_SELECTION_BG} !important`,
    },
});
