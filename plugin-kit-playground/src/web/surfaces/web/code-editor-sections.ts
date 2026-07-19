import {
    codeEditorPlaygroundSections,
    type CodeEditorPlaygroundLanguage,
} from '../../../catalog/data/meta-code-editor.js';
import type { PlaygroundSectionRendererMap } from '../../../catalog/types.js';
import type { PkCodeEditor } from '../../../../plugin-kit-web/src/components/code-editor/pk-code-editor.js';

function createPkCodeEditor(options: {
    value?: string;
    language?: CodeEditorPlaygroundLanguage;
    rows?: number;
    tabSize?: number;
    lineNumbers?: boolean;
    invalid?: boolean;
    readonly?: boolean;
    disabled?: boolean;
    style?: Partial<CSSStyleDeclaration>;
} = {}): PkCodeEditor {
    const editor = document.createElement('pk-code-editor') as PkCodeEditor;

    if (options.value !== undefined) {
        editor.setAttribute('value', options.value);
    }

    if (options.language) {
        editor.setAttribute('language', options.language);
    }

    if (options.rows !== undefined) {
        editor.setAttribute('rows', String(options.rows));
    }

    if (options.tabSize !== undefined) {
        editor.tabSize = options.tabSize;
    }

    if (options.lineNumbers !== undefined) {
        editor.lineNumbers = options.lineNumbers;
    }

    if (options.invalid) {
        editor.setAttribute('invalid', '');
    }

    if (options.readonly) {
        editor.setAttribute('readonly', '');
    }

    if (options.disabled) {
        editor.setAttribute('disabled', '');
    }

    if (options.style) {
        Object.assign(editor.style, options.style);
    }

    return editor;
}

function appendLayoutExample(
    stack: HTMLElement,
    label: string,
    options: Parameters<typeof createPkCodeEditor>[0],
): void {
    const heading = document.createElement('h4');
    heading.className = 'pg-subsection-title';
    heading.textContent = label;
    stack.append(heading);
    stack.append(createPkCodeEditor({
        style: { maxWidth: '48rem' },
        ...options,
    }));
}

function appendLanguageExample(
    stack: HTMLElement,
    label: string,
    language: CodeEditorPlaygroundLanguage,
    value: string,
    rows: number,
): void {
    const heading = document.createElement('h4');
    heading.className = 'pg-subsection-title';
    heading.textContent = label;
    stack.append(heading);

    stack.append(createPkCodeEditor({
        value,
        language,
        rows,
        style: { maxWidth: '48rem' },
    }));
}

/** Web component previews — one function per section id from codeEditorPlaygroundSpec. */
export const codeEditorWebSectionRenderers: PlaygroundSectionRendererMap = {
    basic(preview) {
        const stack = document.createElement('div');
        stack.className = 'pg-demo-stack';
        const { initialValue } = codeEditorPlaygroundSections.basic;

        const editor = createPkCodeEditor({
            value: initialValue,
            rows: 8,
            style: { maxWidth: '48rem' },
        });

        const output = document.createElement('pre');
        output.className = 'pg-code-block';
        output.textContent = initialValue;

        editor.addEventListener('pk-change', (event) => {
            output.textContent = (event as CustomEvent<{ value: string }>).detail.value;
        });

        stack.append(editor, output);
        preview.append(stack);
    },

    longerHtml(preview) {
        const { initialValue, rows } = codeEditorPlaygroundSections.longerHtml;
        preview.append(createPkCodeEditor({
            value: initialValue,
            rows,
            style: { maxWidth: '48rem' },
        }));
    },

    languages(preview) {
        const stack = document.createElement('div');
        stack.className = 'pg-demo-stack';
        const { javascript, css, json, text } = codeEditorPlaygroundSections.languages;

        appendLanguageExample(stack, 'JavaScript', 'javascript', javascript.value, javascript.rows);
        appendLanguageExample(stack, 'CSS', 'css', css.value, css.rows);
        appendLanguageExample(stack, 'JSON', 'json', json.value, json.rows);
        appendLanguageExample(stack, 'Plain text', 'text', text.value, text.rows);

        preview.append(stack);
    },

    layoutOptions(preview) {
        const stack = document.createElement('div');
        stack.className = 'pg-demo-stack';
        const { sampleValue, tabSampleValue, rows, tabSize } = codeEditorPlaygroundSections.layoutOptions;

        appendLayoutExample(stack, `rows=${rows.compact}`, {
            value: sampleValue,
            rows: rows.compact,
        });
        appendLayoutExample(stack, `rows=${rows.spacious}`, {
            value: sampleValue,
            rows: rows.spacious,
        });
        appendLayoutExample(stack, `tab-size=${tabSize.narrow}`, {
            value: tabSampleValue,
            rows: 8,
            tabSize: tabSize.narrow,
        });
        appendLayoutExample(stack, `tab-size=${tabSize.wide}`, {
            value: tabSampleValue,
            rows: 8,
            tabSize: tabSize.wide,
        });
        appendLayoutExample(stack, 'line-numbers (default)', {
            value: sampleValue,
            rows: 8,
            lineNumbers: true,
        });
        appendLayoutExample(stack, 'line-numbers="false"', {
            value: sampleValue,
            rows: 8,
            lineNumbers: false,
        });

        preview.append(stack);
    },

    validationAndReadOnly(preview) {
        const stack = document.createElement('div');
        stack.className = 'pg-demo-stack';
        const { invalidValue, readOnlyValue } = codeEditorPlaygroundSections.validationAndReadOnly;

        stack.append(
            createPkCodeEditor({
                value: invalidValue,
                invalid: true,
                rows: 4,
                style: { maxWidth: '48rem' },
            }),
            createPkCodeEditor({
                value: readOnlyValue,
                readonly: true,
                rows: 4,
                style: { maxWidth: '48rem' },
            }),
        );

        preview.append(stack);
    },
};
