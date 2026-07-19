import { defineComponent, h, ref, type Component } from 'vue';
import {
    codeEditorPlaygroundSections,
    type CodeEditorPlaygroundLanguage,
} from '@verbb/plugin-kit-playground';

import { CodeEditor } from '@verbb/plugin-kit-vue/components';

function SubsectionTitle(title: string) {
    return h('h4', { class: 'pg-subsection-title' }, title);
}

function EditorExample(props: {
    value: string;
    language?: CodeEditorPlaygroundLanguage;
    rows?: number;
    tabSize?: number;
    lineNumbers?: boolean;
    invalid?: boolean;
    readOnly?: boolean;
    disabled?: boolean;
}) {
    return h(CodeEditor, {
        value: props.value,
        language: props.language,
        rows: props.rows,
        tabSize: props.tabSize,
        lineNumbers: props.lineNumbers,
        invalid: props.invalid || undefined,
        readOnly: props.readOnly || undefined,
        disabled: props.disabled || undefined,
        style: { maxWidth: '48rem' },
    });
}

/** Vue previews — one component per section id from codeEditorPlaygroundSpec. */
export const codeEditorVueSectionComponents: Record<string, Component> = {
    basic: defineComponent({
        name: 'CodeEditorBasicSection',
        setup() {
            const { initialValue } = codeEditorPlaygroundSections.basic;
            const value = ref(initialValue);

            return () => h('div', { class: 'pg-demo-stack' }, [
                h(CodeEditor, {
                    value: value.value,
                    rows: 8,
                    style: { maxWidth: '48rem' },
                    onPkChange: (event: CustomEvent<{ value: string }>) => {
                        value.value = event.detail.value;
                    },
                }),
                h('pre', { class: 'pg-code-block' }, value.value),
            ]);
        },
    }),

    longerHtml: defineComponent({
        name: 'CodeEditorLongerHtmlSection',
        setup: () => () => {
            const { initialValue, rows } = codeEditorPlaygroundSections.longerHtml;

            return EditorExample({ value: initialValue, rows });
        },
    }),

    languages: defineComponent({
        name: 'CodeEditorLanguagesSection',
        setup: () => () => {
            const { javascript, css, json, text } = codeEditorPlaygroundSections.languages;

            return h('div', { class: 'pg-demo-stack' }, [
                SubsectionTitle('JavaScript'),
                EditorExample({ value: javascript.value, language: 'javascript', rows: javascript.rows }),
                SubsectionTitle('CSS'),
                EditorExample({ value: css.value, language: 'css', rows: css.rows }),
                SubsectionTitle('JSON'),
                EditorExample({ value: json.value, language: 'json', rows: json.rows }),
                SubsectionTitle('Plain text'),
                EditorExample({ value: text.value, language: 'text', rows: text.rows }),
            ]);
        },
    }),

    layoutOptions: defineComponent({
        name: 'CodeEditorLayoutOptionsSection',
        setup: () => () => {
            const { sampleValue, tabSampleValue, rows, tabSize } = codeEditorPlaygroundSections.layoutOptions;

            return h('div', { class: 'pg-demo-stack' }, [
                SubsectionTitle(`rows=${rows.compact}`),
                EditorExample({ value: sampleValue, rows: rows.compact }),
                SubsectionTitle(`rows=${rows.spacious}`),
                EditorExample({ value: sampleValue, rows: rows.spacious }),
                SubsectionTitle(`tab-size=${tabSize.narrow}`),
                EditorExample({ value: tabSampleValue, rows: 8, tabSize: tabSize.narrow }),
                SubsectionTitle(`tab-size=${tabSize.wide}`),
                EditorExample({ value: tabSampleValue, rows: 8, tabSize: tabSize.wide }),
                SubsectionTitle('line-numbers (default)'),
                EditorExample({ value: sampleValue, rows: 8, lineNumbers: true }),
                SubsectionTitle('line-numbers="false"'),
                EditorExample({ value: sampleValue, rows: 8, lineNumbers: false }),
            ]);
        },
    }),

    validationAndReadOnly: defineComponent({
        name: 'CodeEditorValidationAndReadOnlySection',
        setup: () => () => {
            const { invalidValue, readOnlyValue } = codeEditorPlaygroundSections.validationAndReadOnly;

            return h('div', { class: 'pg-demo-stack' }, [
                EditorExample({ value: invalidValue, invalid: true, rows: 4 }),
                EditorExample({ value: readOnlyValue, readOnly: true, rows: 4 }),
            ]);
        },
    }),
};
