import React, { useSyncExternalStore } from 'react';
import type { CSSProperties } from 'react';
import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';
import './configure-preview-environment';
import { SchemaFormEngine, useSchemaFormEngine } from '@verbb/plugin-kit-react/forms';
import type { FieldEntry, SchemaNode } from '@verbb/plugin-kit-react/forms/engine/SchemaIndex';

type SchemaNodeLike = SchemaNode;
type FieldEntryLike = FieldEntry;

const previewShellStyle: CSSProperties = {
    width: '100%',
};

const previewContentStyle: CSSProperties = {

};

const valuePanelStyle: CSSProperties = {
    marginTop: '16px',
    marginLeft: '-20px',
    marginRight: '-20px',
    marginBottom: '-16px',
    borderTop: '1px solid rgb(203 213 225)',
    background: 'rgb(248 250 252)',
};

const valuePanelHeaderStyle: CSSProperties = {
    padding: '8px 20px',
    fontSize: '11px',
    fontWeight: 600,
    color: 'rgb(51 65 85)',
    borderBottom: '1px solid rgb(203 213 225)',
    letterSpacing: '0.01em',
    textTransform: 'none',
};

const valuePanelCodeStyle: CSSProperties = {
    margin: 0,
    padding: '16px 20px 18px',
    overflowX: 'auto',
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, monospace',
    fontSize: '12px',
    lineHeight: 1.6,
    color: 'rgb(51 65 85)',
    whiteSpace: 'pre',
};

type SchemaFormPreviewHarnessProps = {
    schema: readonly SchemaNodeLike[];
    fieldEntries: readonly FieldEntryLike[];
    defaultValues?: Record<string, unknown>;
    errors?: Record<string, unknown>;
    className?: string;
    showValues?: boolean;
};

type SchemaPreviewDefinitionOptions = {
    code: string;
    schema: readonly SchemaNodeLike[];
    fieldEntries: readonly FieldEntryLike[];
    defaultValues?: Record<string, unknown>;
    errors?: Record<string, unknown>;
    className?: string;
    label?: string;
    title?: string;
    language?: string;
    note?: string;
    showValues?: boolean;
};

export function SchemaFormPreviewHarness({
    schema,
    fieldEntries,
    defaultValues = {},
    errors,
    className = 'grid grid-cols-1 gap-4',
    showValues = false,
}: SchemaFormPreviewHarnessProps) {
    const form = useSchemaFormEngine({
        schemaIndex: {
            schema: [...schema],
            fieldEntries: [...fieldEntries],
        },
        defaultValues,
        errors,
    });
    const currentValues = useSyncExternalStore(
        form.store.subscribe.bind(form.store),
        () => {
            return form.store.state.values || defaultValues;
        },
        () => {
            return defaultValues;
        },
    );

    return (
        <div style={previewShellStyle}>
            <div style={previewContentStyle}>
                <SchemaFormEngine form={form} withoutForm className={className} />
            </div>

            {showValues && (
                <div style={valuePanelStyle}>
                    <div style={valuePanelHeaderStyle}>Form Data</div>
                    <pre style={valuePanelCodeStyle}>{JSON.stringify(currentValues, null, 2)}</pre>
                </div>
            )}
        </div>
    );
}

export function createSchemaPreviewDefinition({
    code,
    schema,
    fieldEntries,
    defaultValues,
    errors,
    className,
    label = 'Basic Usage',
    title = 'Basic usage',
    language = 'json',
    note = 'Preview rendered inside a minimal SchemaFormEngine fixture.',
    showValues = false,
}: SchemaPreviewDefinitionOptions): PreviewSourceDefinition {
    return {
        label,
        title,
        language,
        note,
        code,
        render: () => (
            <SchemaFormPreviewHarness
                schema={schema}
                fieldEntries={fieldEntries}
                defaultValues={defaultValues}
                errors={errors}
                className={className}
                showValues={showValues}
            />
        ),
    };
}
