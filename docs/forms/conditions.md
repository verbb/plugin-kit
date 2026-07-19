# Conditions
Any schema node can define an `if` expression.

So a condition can control a single input, a whole section wrapper, or even plain HTML content like a heading or helper message.

## Basic field condition

This is the most common pattern: one field controls whether another field appears.

```json
[
  {
    "$field": "lightswitch",
    "name": "showHelpText",
    "label": "Show help text"
  },
  {
    "$field": "text",
    "name": "helpText",
    "label": "Help text",
    "if": "showHelpText == true"
  }
]
```

When the lightswitch is off, the text field is not rendered. When it turns on, the field appears immediately.

## Conditional section

Conditions become more useful when they control a whole section instead of a single field.

```json
[
  {
    "$field": "lightswitch",
    "name": "enableApi",
    "label": "Enable API access"
  },
  {
    "$cmp": "FieldWrap",
    "label": "API settings",
    "if": "enableApi == true",
    "children": [
      {
        "$field": "text",
        "name": "apiKey",
        "label": "API key"
      },
      {
        "$field": "text",
        "name": "apiSecret",
        "label": "API secret"
      }
    ]
  }
]
```

This keeps the schema cleaner than repeating the same `if` on every child field.

## Conditional HTML content

Because `$el` nodes can also use conditions, you can show headings, messages, or simple layout content only when needed.

```json
[
  {
    "$field": "select",
    "name": "deliveryMethod",
    "label": "Delivery method",
    "options": [
      { "label": "Email", "value": "email" },
      { "label": "Webhook", "value": "webhook" }
    ]
  },
  {
    "$el": "p",
    "attrs": {
      "class": "text-sm text-slate-500"
    },
    "if": "deliveryMethod == 'webhook'",
    "children": "Webhooks should only be used if your endpoint is publicly reachable."
  }
]
```

That is helpful for lightweight guidance that should only appear in the right context.

## `hideOnIf`

By default, when an `if` condition fails, SchemaForm removes that node from the rendered output.

If you want the node to stay mounted and simply become hidden, use `hideOnIf`.

```json
[
  {
    "$field": "lightswitch",
    "name": "showPreview",
    "label": "Show preview"
  },
  {
    "$el": "div",
    "if": "showPreview == true",
    "hideOnIf": true,
    "attrs": {
      "class": "rounded border p-3"
    },
    "children": "Preview content"
  }
]
```

Use this when you want to preserve mounted UI state or layout structure instead of fully unmounting the node.

## Conditions in PHP

Many consumers define their schema in PHP, so the same idea often looks like this:

```php
$schema[] = [
    '$field' => 'lightswitch',
    'name' => 'sendNotifications',
    'label' => Craft::t('my-plugin', 'Send notifications'),
];

$schema[] = [
    '$field' => 'text',
    'name' => 'notificationEmail',
    'label' => Craft::t('my-plugin', 'Notification email'),
    'if' => 'sendNotifications == true',
];
```

That is usually the most natural place to define the rule, because the schema already lives close to the backend configuration.

## Conditions on options

Some field types also support conditions inside their own configuration. For example, select options can be shown or hidden with an option-level `if`.

```json
{
  "$field": "select",
  "name": "target",
  "label": "Target",
  "options": [
    { "label": "Entries", "value": "entries" },
    { "label": "Users", "value": "users" },
    { "label": "Commerce Orders", "value": "orders", "if": "commerceEnabled == true" }
  ]
}
```

That is useful when the field itself should stay visible, but some choices should only exist in the right context.

## Extra condition context

Sometimes visibility depends on something outside the form values, such as host app state or feature flags.

In that case, you can pass `getConditionContext()` to `useSchemaFormEngine()`.

```tsx
const form = useSchemaFormEngine({
  schemaIndex,
  defaultValues,
  getConditionContext: () => ({
    isProEdition: window.myPluginConfig.isProEdition,
  }),
});
```

Your schema can then reference that extra context in an expression:

```json
{
  "$field": "text",
  "name": "licenseKey",
  "label": "License key",
  "if": "isProEdition == true"
}
```

## Validation rules in schema

Conditions are one kind of behavior you can define in schema. Validation is another.

Many schema fields can declare validation rules directly on the node:

```json
{
  "$field": "text",
  "name": "title",
  "label": "Title",
  "required": true,
  "validation": "required|min:3|max:255"
}
```

That keeps the rule close to the field definition instead of scattering it elsewhere in your app.

## Validation with conditional fields

It is common to pair conditions and validation together.

```json
[
  {
    "$field": "lightswitch",
    "name": "requireApproval",
    "label": "Require approval"
  },
  {
    "$field": "text",
    "name": "approvalEmail",
    "label": "Approval email",
    "if": "requireApproval == true",
    "validation": "required|email"
  }
]
```

This is a good example of why conditions belong in the schema. The field's visibility rule and validation rule live together in one place.

## Server-side errors

Client-side schema rules are only part of the story. You can also feed server validation errors back into the form engine.

```tsx
const form = useSchemaFormEngine({
  schemaIndex,
  defaultValues,
  errors: {
    title: ['A title is required.'],
  },
});
```

That lets your React UI surface server feedback through the same field-level error system the built-in schema fields already use.

## Grouped errors for nested fields

Some field types contain nested values, such as tables, groups, or lists.

In those cases, SchemaForm can surface errors at the parent level as grouped errors instead of forcing the user to hunt through deeply nested paths.

That is especially useful when a higher-level field should show that something inside it is invalid, even if the exact child input is not always visible yet.

## When to use schema conditions vs custom React logic

Schema conditions are the right fit when:

- visibility depends on current form values
- the rule belongs in the schema definition
- PHP should remain in control of the screen structure
- the same field definition should carry its own visibility and validation behavior

Custom React logic is usually a better fit when:

- the behavior is highly interactive and not just about visibility
- the UI depends on data that should not live in schema
- the component needs richer client-side behavior than an `if` expression can describe

## Related

- Read [SchemaForm Overview](./overview.md) for the normal PHP-to-React integration flow.
- Read [Schema Structure](./schema-structure.md) for the full set of common schema keys.
- Read [Custom Schema Components](./custom-schema-components.md) if you want conditional wrappers or panels.
- Read [Schema Fields](./schema-fields.md) if you want to understand how schema field types handle values and errors.
- Read [SchemaForm API](./api/schema-form-api.md) for the full hook options.
