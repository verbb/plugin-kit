import { createSchemaPreviewDefinition } from '../../examples/schema-form-preview-harness';

const schema = [
    {
        '$field': 'calculations',
        'name': 'formula',
        'label': 'Calculation',
        'instructions': 'Use field variables to build the result.',
        'validationAction': 'plugin-kit-react/docs/validate-calculation',
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
  "$field": "calculations",
  "name": "formula",
  "label": "Calculation",
  "instructions": "Use field variables to build the result.",
  "validationAction": "plugin-kit-react/docs/validate-calculation"
}`,
    schema,
    fieldEntries: [
    {
        path: 'formula',
        field: {
            '$field': 'calculations',
            'name': 'formula',
            'label': 'Calculation',
            'instructions': 'Use field variables to build the result.',
            'validationAction': 'plugin-kit-react/docs/validate-calculation',
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
    formula: '{email}',
},
    showValues: true,
});

export default preview;
