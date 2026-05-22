import { createSchemaPreviewDefinition } from '../../examples/schema-form-preview-harness';

const schema = [
    {
        '$field': 'richText',
        'name': 'body',
        'label': 'Body',
        'buttons': ['bold', 'italic', 'bulletList'],
        'placeholder': 'Write the message...',
    },
] satisfies Record<string, unknown>[];

const preview = createSchemaPreviewDefinition({
    code: `{
  "$field": "richText",
  "name": "body",
  "label": "Body"
}`,
    schema,
    fieldEntries: [
    {
        path: 'body',
        field: {
            '$field': 'richText',
            'name': 'body',
            'label': 'Body',
            'buttons': ['bold', 'italic', 'bulletList'],
            'placeholder': 'Write the message...',
        },
    },
],
    defaultValues: {
    body: [
        {
            type: 'paragraph',
            attrs: {
                textAlign: 'start',
            },
            content: [
                {
                    type: 'text',
                    text: 'Welcome message',
                },
            ],
        },
    ],
},
    showValues: true,
});

export default preview;
