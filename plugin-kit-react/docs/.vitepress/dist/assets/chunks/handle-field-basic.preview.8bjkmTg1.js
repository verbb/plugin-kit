const e=`import { createSchemaPreviewDefinition } from '../../examples/schema-form-preview-harness';

const schema = [{ '$field': 'handle', 'name': 'handle', 'label': 'Handle', 'required': true }] satisfies Record<string, unknown>[];

const preview = createSchemaPreviewDefinition({
    code: \`{
  "$field": "handle",
  "name": "handle",
  "label": "Handle",
  "required": true
}\`,
    schema,
    fieldEntries: [{ path: 'handle', field: { '$field': 'handle', 'name': 'handle', 'label': 'Handle', 'required': true } }],
    defaultValues: {
    handle: 'myWidget',
},
    showValues: true,
});

export default preview;
`;export{e as default};
