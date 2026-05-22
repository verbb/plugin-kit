import { createSchemaPreviewDefinition } from '../../examples/schema-form-preview-harness';

const schema = [
    {
        '$field': 'variablePicker',
        'name': 'subject',
        'label': 'Subject',
        'placeholder': 'Type a subject...',
        'variableCategories': {
            'fields': [
                { 'label': 'Email', 'value': '{email}' },
                { 'label': 'Full Name', 'value': '{fullName}' },
            ],
        },
    },
] satisfies Record<string, unknown>[];

const preview = createSchemaPreviewDefinition({
    code: `{
  "$field": "variablePicker",
  "name": "subject",
  "label": "Subject"
}`,
    schema,
    fieldEntries: [
    {
        path: 'subject',
        field: {
            '$field': 'variablePicker',
            'name': 'subject',
            'label': 'Subject',
            'placeholder': 'Type a subject...',
            'variableCategories': {
                'fields': [
                    { 'label': 'Email', 'value': '{email}' },
                    { 'label': 'Full Name', 'value': '{fullName}' },
                ],
            },
        },
    },
],
    defaultValues: {
    subject: 'Hello {email}',
},
    showValues: true,
});

export default preview;
