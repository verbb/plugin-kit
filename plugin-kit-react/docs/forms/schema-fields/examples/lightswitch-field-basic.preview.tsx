import { createSchemaPreviewDefinition } from '../../examples/schema-form-preview-harness';

const schema = [{ '$field': 'lightswitch', 'name': 'enabled', 'label': 'Enabled' }] satisfies Record<string, unknown>[];

const preview = createSchemaPreviewDefinition({
    code: `{
  "$field": "lightswitch",
  "name": "enabled",
  "label": "Enabled"
}`,
    schema,
    fieldEntries: [{ path: 'enabled', field: { '$field': 'lightswitch', 'name': 'enabled', 'label': 'Enabled' } }],
    defaultValues: {
    enabled: true,
},
    showValues: true,
});

export default preview;
