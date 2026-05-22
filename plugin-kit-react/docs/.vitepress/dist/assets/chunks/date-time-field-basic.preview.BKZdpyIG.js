const e=`import { createSchemaPreviewDefinition } from '../../examples/schema-form-preview-harness';

const schema = [{ '$field': 'date', 'name': 'startDate', 'label': 'Start date' }] satisfies Record<string, unknown>[];

const preview = createSchemaPreviewDefinition({
    code: \`{
  "$field": "date",
  "name": "startDate",
  "label": "Start date"
}\`,
    schema,
    fieldEntries: [{ path: 'startDate', field: { '$field': 'date', 'name': 'startDate', 'label': 'Start date' } }],
    defaultValues: {
    startDate: '2026-04-03T09:30:00',
},
    showValues: true,
});

export default preview;
`;export{e as default};
