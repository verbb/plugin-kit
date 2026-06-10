import { createSchemaPreviewDefinition } from '../../examples/schema-form-preview-harness';

const schema = [
    {
        '$field': 'codeEditor',
        'name': 'htmlContent',
        'label': 'HTML Content',
        'language': 'html',
        'rows': 10,
        'lineNumbers': true,
        'tabSize': 4,
        'placeholder': '<p>Enter HTML…</p>',
    },
] satisfies Record<string, unknown>[];

const preview = createSchemaPreviewDefinition({
    code: `{
  "$field": "codeEditor",
  "name": "htmlContent",
  "label": "HTML Content",
  "language": "html",
  "rows": 10
}`,
    schema,
    fieldEntries: [
        {
            path: 'htmlContent',
            field: {
                '$field': 'codeEditor',
                'name': 'htmlContent',
                'label': 'HTML Content',
                'language': 'html',
                'rows': 10,
                'lineNumbers': true,
                'tabSize': 4,
            },
        },
    ],
    defaultValues: {
        htmlContent: '<p><strong>Example</strong> HTML content.</p>',
    },
    showValues: true,
});

export default preview;
