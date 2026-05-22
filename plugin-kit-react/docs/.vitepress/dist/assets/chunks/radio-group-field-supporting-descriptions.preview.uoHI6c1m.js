const e=`import { createSchemaPreviewDefinition } from '../../examples/schema-form-preview-harness';

const schema = [
    {
        '$field': 'radioGroup',
        'name': 'audience',
        'label': 'Audience',
        'options': [
            {
                'value': 'team',
                'label': 'Team',
                'description': 'Visible to the whole team.',
            },
            {
                'value': 'private',
                'label': 'Private',
                'description': 'Only visible to you.',
            },
        ],
    },
] satisfies Record<string, unknown>[];

const preview = createSchemaPreviewDefinition({
    code: \`{
  "$field": "radioGroup",
  "name": "audience",
  "label": "Audience",
  "options": [
    {
      "value": "team",
      "label": "Team",
      "description": "Visible to the whole team."
    },
    {
      "value": "private",
      "label": "Private",
      "description": "Only visible to you."
    }
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
                    {
                        'value': 'team',
                        'label': 'Team',
                        'description': 'Visible to the whole team.',
                    },
                    {
                        'value': 'private',
                        'label': 'Private',
                        'description': 'Only visible to you.',
                    },
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
