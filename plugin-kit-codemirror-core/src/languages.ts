import { css } from '@codemirror/lang-css';
import { html } from '@codemirror/lang-html';
import { javascript } from '@codemirror/lang-javascript';
import { json } from '@codemirror/lang-json';
import type { Extension } from '@codemirror/state';

import type { CodeEditorLanguage } from './constants.js';

export function languageUsesSyntaxHelpers(language: CodeEditorLanguage): boolean {
    return language !== 'text';
}

export function createLanguageExtension(language: CodeEditorLanguage): Extension | null {
    switch (language) {
        case 'html':
            return html();
        case 'javascript':
            return javascript();
        case 'css':
            return css();
        case 'json':
            return json();
        default:
            return null;
    }
}
