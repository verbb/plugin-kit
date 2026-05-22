const e=`import { createSchemaPreviewDefinition } from '../../examples/schema-form-preview-harness';

const schema = [
    {
        '$field': 'elementSelect',
        'name': 'relatedEntry',
        'label': 'Related entry',
        'elementType': 'craft\\elements\\Entry',
        'elementSelectStorageKeyPrefix': 'plugin-kit-react.docs',
        'limit': 1,
    },
] satisfies Record<string, unknown>[];

const preview = createSchemaPreviewDefinition({
    code: \`{
  "$field": "elementSelect",
  "name": "relatedEntry",
  "label": "Related entry"
}\`,
    schema,
    fieldEntries: [
    {
        path: 'relatedEntry',
        field: {
            '$field': 'elementSelect',
            'name': 'relatedEntry',
            'label': 'Related entry',
            'elementType': 'craft\\elements\\Entry',
            'elementSelectStorageKeyPrefix': 'plugin-kit-react.docs',
            'limit': 1,
        },
    },
],
    defaultValues: {
    relatedEntry: [],
},
    showValues: true,
});

export default preview;
`;export{e as default};
