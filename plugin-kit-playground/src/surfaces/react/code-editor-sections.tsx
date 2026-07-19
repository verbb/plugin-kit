import { useState } from 'react';
import {
    codeEditorPlaygroundSections,
    type CodeEditorPlaygroundLanguage,
} from '@verbb/plugin-kit-playground';

import { CodeEditor } from '@verbb/plugin-kit-react/components';
import type { PlaygroundSectionReactRendererMap } from './shared/PlaygroundFromSpec.js';

function SubsectionTitle({ children }: { children: string }) {
    return <h4 className="pg-subsection-title">{children}</h4>;
}

function EditorExample({
    value,
    language,
    rows,
    tabSize,
    lineNumbers,
    invalid,
    readOnly,
    disabled,
}: {
    value: string;
    language?: CodeEditorPlaygroundLanguage;
    rows?: number;
    tabSize?: number;
    lineNumbers?: boolean;
    invalid?: boolean;
    readOnly?: boolean;
    disabled?: boolean;
}) {
    return (
        <CodeEditor
            value={value}
            language={language}
            rows={rows}
            tabSize={tabSize}
            lineNumbers={lineNumbers}
            invalid={invalid}
            readOnly={readOnly}
            disabled={disabled}
            style={{ maxWidth: '48rem' }}
        />
    );
}

/** React previews — one function per section id from codeEditorPlaygroundSpec. */
export const codeEditorReactSectionRenderers: PlaygroundSectionReactRendererMap = {
    basic: function BasicSection() {
        const { initialValue } = codeEditorPlaygroundSections.basic;
        const [value, setValue] = useState(initialValue);

        return (
            <div className="pg-demo-stack">
                <CodeEditor
                    value={value}
                    rows={8}
                    style={{ maxWidth: '48rem' }}
                    onPkChange={(event) => { setValue(event.detail.value); }}
                />
                <pre className="pg-code-block">{value}</pre>
            </div>
        );
    },

    longerHtml: () => {
        const { initialValue, rows } = codeEditorPlaygroundSections.longerHtml;

        return <EditorExample value={initialValue} rows={rows} />;
    },

    languages: () => {
        const { javascript, css, json, text } = codeEditorPlaygroundSections.languages;

        return (
            <div className="pg-demo-stack">
                <SubsectionTitle>JavaScript</SubsectionTitle>
                <EditorExample value={javascript.value} language="javascript" rows={javascript.rows} />
                <SubsectionTitle>CSS</SubsectionTitle>
                <EditorExample value={css.value} language="css" rows={css.rows} />
                <SubsectionTitle>JSON</SubsectionTitle>
                <EditorExample value={json.value} language="json" rows={json.rows} />
                <SubsectionTitle>Plain text</SubsectionTitle>
                <EditorExample value={text.value} language="text" rows={text.rows} />
            </div>
        );
    },

    layoutOptions: () => {
        const { sampleValue, tabSampleValue, rows, tabSize } = codeEditorPlaygroundSections.layoutOptions;

        return (
            <div className="pg-demo-stack">
                <SubsectionTitle>{`rows=${rows.compact}`}</SubsectionTitle>
                <EditorExample value={sampleValue} rows={rows.compact} />
                <SubsectionTitle>{`rows=${rows.spacious}`}</SubsectionTitle>
                <EditorExample value={sampleValue} rows={rows.spacious} />
                <SubsectionTitle>{`tab-size=${tabSize.narrow}`}</SubsectionTitle>
                <EditorExample value={tabSampleValue} rows={8} tabSize={tabSize.narrow} />
                <SubsectionTitle>{`tab-size=${tabSize.wide}`}</SubsectionTitle>
                <EditorExample value={tabSampleValue} rows={8} tabSize={tabSize.wide} />
                <SubsectionTitle>line-numbers (default)</SubsectionTitle>
                <EditorExample value={sampleValue} rows={8} lineNumbers />
                <SubsectionTitle>line-numbers="false"</SubsectionTitle>
                <EditorExample value={sampleValue} rows={8} lineNumbers={false} />
            </div>
        );
    },

    validationAndReadOnly: () => {
        const { invalidValue, readOnlyValue } = codeEditorPlaygroundSections.validationAndReadOnly;

        return (
            <div className="pg-demo-stack">
                <EditorExample value={invalidValue} invalid rows={4} />
                <EditorExample value={readOnlyValue} readOnly rows={4} />
            </div>
        );
    },
};
