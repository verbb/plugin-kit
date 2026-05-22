const e=`import { createSchemaPreviewDefinition } from '../../examples/schema-form-preview-harness';

const schema = [
    {
        '$field': 'radioGroup',
        'name': 'audience',
        'label': 'Audience',
        'options': [
            { 'value': 'team', 'label': 'Team' },
            { 'value': 'private', 'label': 'Private' },
        ],
    },
] satisfies Record<string, unknown>[];

const preview = createSchemaPreviewDefinition({
    code: \`{
  "$field": "radioGroup",
  "name": "audience",
  "label": "Audience",
  "options": [
    { "value": "team", "label": "Team" },
    { "value": "private", "label": "Private" }
  ]
}\`,
    schema,
    fieldEntries: [
        {
            path: 'audience',
            field: {
                '$field': 'radioGroup',
                'name': 'audience',
                'label': 'Audience',
                'options': [
                    { 'value': 'team', 'label': 'Team' },
                    { 'value': 'private', 'label': 'Private' },
                ],
            },
        },
    ],
    defaultValues: {
        audience: 'team',
    },
    showValues: true,
});

export default preview;
`;export{e as default};
