import { createSchemaPreviewDefinition } from '../../examples/schema-form-preview-harness';

const schema = [{ '$field': 'color', 'name': 'brandColor', 'label': 'Brand color' }] satisfies Record<string, unknown>[];

const preview = createSchemaPreviewDefinition({
    code: `{
  "$field": "color",
  "name": "brandColor",
  "label": "Brand color"
}`,
    schema,
    fieldEntries: [{ path: 'brandColor', field: { '$field': 'color', 'name': 'brandColor', 'label': 'Brand color' } }],
    defaultValues: {
    brandColor: '#e64d4c',
},
    showValues: true,
});

export default preview;
