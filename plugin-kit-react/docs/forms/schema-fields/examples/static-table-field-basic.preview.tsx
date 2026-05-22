import { createSchemaPreviewDefinition } from '../../examples/schema-form-preview-harness';

const schema = [
    {
        '$field': 'staticTable',
        'name': 'pricing',
        'label': 'Pricing',
        'rows': [
            { 'key': 'standard', 'label': 'Standard' },
            { 'key': 'premium', 'label': 'Premium' },
        ],
        'columns': [
            { 'name': 'amount', 'type': 'text', 'heading': 'Amount' },
        ],
    },
] satisfies Record<string, unknown>[];

const preview = createSchemaPreviewDefinition({
    code: `{
  "$field": "staticTable",
  "name": "pricing",
  "label": "Pricing",
  "rows": [
    { "key": "standard", "label": "Standard" }
  ],
  "columns": [
    { "name": "amount", "type": "text", "heading": "Amount" }
  ]
}`,
    schema,
    fieldEntries: [
    {
        path: 'pricing',
        field: {
            '$field': 'staticTable',
            'name': 'pricing',
            'label': 'Pricing',
            'rows': [
                { 'key': 'standard', 'label': 'Standard' },
                { 'key': 'premium', 'label': 'Premium' },
            ],
            'columns': [
                { 'name': 'amount', 'type': 'text', 'heading': 'Amount' },
            ],
        },
    },
],
    defaultValues: {
    pricing: {
        standard: '9',
        premium: '19',
    },
},
    className: 'grid grid-cols-1 gap-4 max-w-[32rem]',
    showValues: true,
});

export default preview;
