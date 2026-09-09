import { createSchemaPreviewDefinition } from '../../examples/schema-form-preview-harness';

const schema = [
    {
        '$field': 'autocomplete',
        'name': 'iconsPath',
        'label': 'Icons Path',
        'instructions': 'Folder of SVG files for custom nav icons. Supports Craft aliases.',
        'warning': 'This path does not exist yet — save the setting, then create the folder.',
        'placeholder': 'Type a path or pick an alias…',
        'showClear': true,
        'width': 'full',
        'options': [
            { 'value': '@webroot/', 'label': '@webroot/' },
            { 'value': '@webroot/cpnav-icons/', 'label': '@webroot/cpnav-icons/' },
            { 'value': '@webroot/cpnav-icons-new/', 'label': '@webroot/cpnav-icons-new/' },
            { 'value': '@storage/icons/', 'label': '@storage/icons/' },
        ],
    },
] satisfies Record<string, unknown>[];

const preview = createSchemaPreviewDefinition({
    code: `{
  "$field": "autocomplete",
  "name": "iconsPath",
  "label": "Icons Path",
  "warning": "This path does not exist yet.",
  "options": [{ "value": "@webroot/", "label": "@webroot/" }]
}`,
    schema,
    fieldEntries: [
        {
            path: 'iconsPath',
            field: schema[0],
        },
    ],
    defaultValues: {
        iconsPath: '@webroot/cpnav-icons-new/',
    },
    showValues: true,
    label: 'Basic',
    title: 'Freeform path with Field warning',
});

export default preview;
