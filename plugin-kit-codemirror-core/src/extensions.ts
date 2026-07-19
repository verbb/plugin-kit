import { closeBrackets, closeBracketsKeymap } from '@codemirror/autocomplete';
import { defaultKeymap, history, historyKeymap } from '@codemirror/commands';
import {
    bracketMatching,
    defaultHighlightStyle,
    indentOnInput,
    indentUnit,
    syntaxHighlighting,
} from '@codemirror/language';
import { Compartment, EditorState, type Extension } from '@codemirror/state';
import {
    drawSelection,
    highlightActiveLine,
    highlightActiveLineGutter,
    highlightSpecialChars,
    keymap,
    lineNumbers,
    EditorView,
} from '@codemirror/view';

import { type CodeEditorLanguage } from './constants.js';
import { createLanguageExtension, languageUsesSyntaxHelpers } from './languages.js';
import { codeEditorTheme } from './theme.js';

export type CreateCodeEditorExtensionsOptions = {
    language?: CodeEditorLanguage;
    tabSize?: number;
    lineNumbers?: boolean;
    editable?: boolean;
    editableCompartment?: Compartment;
    onUpdate?: (value: string) => void;
    onBlur?: () => void;
};

function createEditorSetupExtensions(language: CodeEditorLanguage, showLineNumbers: boolean): Extension[] {
    const usesSyntaxHelpers = languageUsesSyntaxHelpers(language);
    const extensions: Extension[] = [
        highlightSpecialChars(),
        history(),
        drawSelection(),
        EditorState.allowMultipleSelections.of(false),
        indentOnInput(),
        syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
        highlightActiveLine(),
        keymap.of([
            ...(usesSyntaxHelpers ? closeBracketsKeymap : []),
            ...defaultKeymap,
            ...historyKeymap,
        ]),
    ];

    if (showLineNumbers) {
        extensions.unshift(lineNumbers(), highlightActiveLineGutter());
    }

    if (usesSyntaxHelpers) {
        extensions.push(bracketMatching());

        if (language === 'html' || language === 'javascript' || language === 'json') {
            extensions.push(closeBrackets());
        }
    }

    return extensions;
}

export function createCodeEditorExtensions({
    language = 'html',
    tabSize = 4,
    lineNumbers: showLineNumbers = true,
    editable = true,
    editableCompartment,
    onUpdate,
    onBlur,
}: CreateCodeEditorExtensionsOptions): Extension[] {
    const normalizedTabSize = Math.max(1, tabSize);
    const extensions: Extension[] = [
        codeEditorTheme,
        EditorState.tabSize.of(normalizedTabSize),
        indentUnit.of(' '.repeat(normalizedTabSize)),
        EditorView.lineWrapping,
        ...createEditorSetupExtensions(language, showLineNumbers),
    ];

    const languageExtension = createLanguageExtension(language);

    if (languageExtension) {
        extensions.push(languageExtension);
    }

    if (editableCompartment) {
        extensions.push(editableCompartment.of(EditorView.editable.of(editable)));
    } else {
        extensions.push(EditorView.editable.of(editable));
    }

    if (onUpdate) {
        extensions.push(EditorView.updateListener.of((update) => {
            if (update.docChanged) {
                onUpdate(update.state.doc.toString());
            }
        }));
    }

    if (onBlur) {
        extensions.push(EditorView.domEventHandlers({
            blur: () => {
                onBlur();
                return false;
            },
        }));
    }

    return extensions;
}
