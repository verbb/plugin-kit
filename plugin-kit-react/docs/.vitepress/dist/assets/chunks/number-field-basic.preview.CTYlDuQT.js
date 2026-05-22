const e=`import { createSchemaPreviewDefinition } from '../../examples/schema-form-preview-harness';

const schema = [{ '$field': 'number', 'name': 'capacity', 'label': 'Capacity', 'validation': 'min:1|max:100' }] satisfies Record<string, unknown>[];

const preview = createSchemaPreviewDefinition({
    code: \`{
  "$field": "number",
  "name": "capacity",
  "label": "Capacity",
  "validation": "min:1|max:100"
}\`,
    schema,
    fieldEntries: [{ path: 'capacity', field: { '$field': 'number', 'name': 'capacity', 'label': 'Capacity', 'validation': 'min:1|max:100' } }],
    defaultValues: {
    capacity: 12,
},
    showValues: true,
});

export default preview;
`;export{e as default};
