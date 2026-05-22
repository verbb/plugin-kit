const e=`import { createSchemaPreviewDefinition } from '../../examples/schema-form-preview-harness';

const schema = [{ '$field': 'textarea', 'name': 'description', 'label': 'Description', 'validation': 'max:2000' }] satisfies Record<string, unknown>[];

const preview = createSchemaPreviewDefinition({
    code: \`{
  "$field": "textarea",
  "name": "description",
  "label": "Description",
  "validation": "max:2000"
}\`,
    schema,
    fieldEntries: [{ path: 'description', field: { '$field': 'textarea', 'name': 'description', 'label': 'Description', 'validation': 'max:2000' } }],
    defaultValues: {
    description: 'Describe the widget.',
},
    showValues: true,
});

export default preview;
`;export{e as default};
