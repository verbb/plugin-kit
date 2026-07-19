import { createSchemaPreviewDefinition } from '../../examples/schema-form-preview-harness';

const schema = [
    {
        '$cmp': 'ModalTabs',
        'children': [
            {
                '$cmp': 'ModalTabsList',
                'children': [
                    { '$cmp': 'ModalTabsTrigger', 'value': 'settings', 'children': 'Settings' },
                    { '$cmp': 'ModalTabsTrigger', 'value': 'notifications', 'children': 'Notifications' },
                ],
            },
            {
                '$cmp': 'ModalTabsContent',
                'value': 'settings',
                'children': [
                    { '$field': 'text', 'name': 'title', 'label': 'Title' },
                ],
            },
            {
                '$cmp': 'ModalTabsContent',
                'value': 'notifications',
                'children': [
                    { '$field': 'lightswitch', 'name': 'notifyTeam', 'label': 'Notify team' },
                ],
            },
        ],
    },
] satisfies Record<string, unknown>[];

const preview = createSchemaPreviewDefinition({
    code: `{
  "$cmp": "ModalTabs",
  "children": [
    {
      "$cmp": "ModalTabsList",
      "children": [
        { "$cmp": "ModalTabsTrigger", "value": "settings", "children": "Settings" },
        { "$cmp": "ModalTabsTrigger", "value": "notifications", "children": "Notifications" }
      ]
    },
    {
      "$cmp": "ModalTabsContent",
      "value": "settings",
      "children": [{ "$field": "text", "name": "title", "label": "Title" }]
    }
  ]
}`,
    schema,
    fieldEntries: [
    { path: 'title', field: { '$field': 'text', 'name': 'title', 'label': 'Title' } },
    { path: 'notifyTeam', field: { '$field': 'lightswitch', 'name': 'notifyTeam', 'label': 'Notify team' } },
],
    defaultValues: {
    title: 'Contact form',
    notifyTeam: true,
},
});

export default preview;
