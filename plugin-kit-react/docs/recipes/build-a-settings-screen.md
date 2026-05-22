# Build a Settings Screen

This guide is the canonical path for a real Craft plugin screen that saves settings through a React UI.

Use this approach when:

- the screen belongs to a Craft plugin
- the page already starts from PHP and Twig
- you want the fields to be defined as SchemaForm schema
- you want client-side validation, server-side validation, and a normal save action

For a settings-style screen, use SchemaForm. It keeps the field definition close to your PHP plugin code and gives the React side one clear job: render the schema, manage state, and post the values back to Craft.

## What you are building

At the end of this guide, the flow looks like this:

1. PHP renders a Twig template for the settings page.
2. Twig outputs a mount element plus JSON payload.
3. A CP asset bundle loads your compiled React entry.
4. React boots with `configurePluginKitReact()` and `createCraftHostBridge()`.
5. `useSchemaFormEngine()` renders the settings form from a `schemaIndex`.
6. The submit handler posts values back to a Craft action.
7. If the action returns validation errors, SchemaForm shows them on the correct fields.

## Recommended file shape

```text
my-plugin/
  src/
    controllers/
      SettingsController.php
    models/
      SettingsModel.php
    templates/
      settings/index.twig
    web/
      assets/
        cp/
          MyPluginCpAsset.php
          dist/
          src/
            cp.tsx
            settings/
              SettingsApp.tsx
```

This keeps the PHP page, Twig template, asset bundle, and React entry easy to follow.

## 1. Render the settings page from PHP

Create a controller action that renders the Twig template and passes the React payload into it.

```php
<?php
namespace mynamespace\myplugin\controllers;

use Craft;
use craft\web\Controller;
use mynamespace\myplugin\Plugin;
use yii\web\Response;

class SettingsController extends Controller
{
    protected array|int|bool $allowAnonymous = false;

    public function actionIndex(): Response
    {
        $settings = Plugin::getInstance()->getSettings();

        $schemaIndex = [
            'schema' => [
                [
                    '$field' => 'text',
                    'name' => 'apiKey',
                    'label' => Craft::t('my-plugin', 'API key'),
                    'instructions' => Craft::t('my-plugin', 'Paste the API key from your external service.'),
                    'required' => true,
                ],
                [
                    '$field' => 'lightswitch',
                    'name' => 'syncEnabled',
                    'label' => Craft::t('my-plugin', 'Enable sync'),
                ],
                [
                    '$field' => 'text',
                    'name' => 'syncEndpoint',
                    'label' => Craft::t('my-plugin', 'Sync endpoint'),
                    'if' => 'syncEnabled == true',
                    'validation' => 'required',
                ],
            ],
            'fieldEntries' => [
                [
                    'path' => 'apiKey',
                    'field' => [
                        '$field' => 'text',
                        'name' => 'apiKey',
                        'label' => Craft::t('my-plugin', 'API key'),
                        'instructions' => Craft::t('my-plugin', 'Paste the API key from your external service.'),
                        'required' => true,
                    ],
                ],
                [
                    'path' => 'syncEnabled',
                    'field' => [
                        '$field' => 'lightswitch',
                        'name' => 'syncEnabled',
                        'label' => Craft::t('my-plugin', 'Enable sync'),
                    ],
                ],
                [
                    'path' => 'syncEndpoint',
                    'field' => [
                        '$field' => 'text',
                        'name' => 'syncEndpoint',
                        'label' => Craft::t('my-plugin', 'Sync endpoint'),
                        'if' => 'syncEnabled == true',
                        'validation' => 'required',
                    ],
                ],
            ],
        ];

        return $this->renderTemplate('my-plugin/settings/index.twig', [
            'reactPayload' => [
                'schemaIndex' => $schemaIndex,
                'values' => [
                    'apiKey' => $settings->apiKey,
                    'syncEnabled' => (bool)$settings->syncEnabled,
                    'syncEndpoint' => $settings->syncEndpoint,
                ],
            ],
        ]);
    }
}
```

This example keeps the schema in PHP so the settings page is still owned by the plugin backend.

## 2. Register a CP asset bundle

Create an asset bundle that points at your built frontend files.

```php
<?php
namespace mynamespace\myplugin\web\assets\cp;

use craft\web\AssetBundle;
use craft\web\assets\cp\CpAsset;

class MyPluginCpAsset extends AssetBundle
{
    public function init(): void
    {
        $this->sourcePath = '@mynamespace/myplugin/web/assets/cp/dist';
        $this->depends = [
            CpAsset::class,
        ];
        $this->js = ['cp.js'];
        $this->css = ['cp.css'];

        parent::init();
    }
}
```

For this guide, keep the Vite output filenames stable so the asset bundle can reference them directly.

## 3. Render the mount element in Twig

Register the asset bundle and output one container with the serialized React payload.

```twig
{% do view.registerAssetBundle('mynamespace\\myplugin\\web\\assets\\cp\\MyPluginCpAsset') %}

<div
  id="my-plugin-settings-root"
  data-settings="{{ reactPayload | json_encode | e('html_attr') }}"
></div>
```

That container is the contract between Twig and the React app.

## 4. Bootstrap the React entry

Create your CP entry file and configure the package for the Craft control panel.

```tsx
import { createRoot } from 'react-dom/client';
import '@verbb/plugin-kit-react/style.css';

import { configurePluginKitReact, createCraftHostBridge } from '@verbb/plugin-kit-react/utils';
import { SettingsApp } from './settings/SettingsApp';

configurePluginKitReact({
  hostBridge: createCraftHostBridge(),
  translationCategory: 'my-plugin',
});

const container = document.getElementById('my-plugin-settings-root');

if (container) {
  const payload = JSON.parse(container.dataset.settings ?? '{}');

  createRoot(container).render(
    <SettingsApp
      schemaIndex={payload.schemaIndex}
      initialValues={payload.values ?? {}}
    />,
  );
}
```

This is the standard CP bootstrap:

1. load package CSS
2. connect package helpers to Craft
3. read the server payload from the mount element
4. render the React screen

## 5. Build the settings screen with SchemaForm

Create the React screen that owns the SchemaForm instance and save flow.

```tsx
import { useEffect, useState } from 'react';
import { Button } from '@verbb/plugin-kit-react/components';
import { SchemaFormEngine, useSchemaFormEngine } from '@verbb/plugin-kit-react/forms';
import { hostRequest } from '@verbb/plugin-kit-react/utils';

type SettingsAppProps = {
  schemaIndex: {
    schema: Record<string, unknown>[];
    fieldEntries: Array<{ path: string; field: Record<string, unknown> }>;
  };
  initialValues: Record<string, unknown>;
};

export function SettingsApp({ schemaIndex, initialValues }: SettingsAppProps) {
  const [serverErrors, setServerErrors] = useState<Record<string, string[]>>({});

  const form = useSchemaFormEngine({
    schemaIndex,
    defaultValues: initialValues,
    errors: serverErrors,
  });

  useEffect(() => {
    form.onSubmit(async (values) => {
      setServerErrors({});

      try {
        await hostRequest('POST', 'my-plugin/settings/save', {
          data: values,
        });
      } catch (error) {
        const responseErrors = (error as {
          response?: { data?: { errors?: Record<string, string[]> } };
        }).response?.data?.errors ?? {};

        setServerErrors(responseErrors);
      }
    });

    return () => {
      form.onSubmit(null);
    };
  }, [form]);

  return (
    <div className="space-y-4">
      <SchemaFormEngine form={form} className="grid grid-cols-1 gap-4" />

      <div>
        <Button type="button" variant="primary" onClick={() => { form.handleSubmit(); }}>
          Save settings
        </Button>
      </div>
    </div>
  );
}
```

This is the recommended shape for a plugin settings screen:

- `useSchemaFormEngine()` owns the form state
- `SchemaFormEngine` renders the fields
- `hostRequest()` posts to a Craft action
- `errors` hydrates server validation back into the UI

## 6. Return validation errors from the Craft action

Create an action that validates and saves the settings model.

```php
public function actionSave(): Response
{
    $this->requirePostRequest();

    $plugin = Plugin::getInstance();
    $settings = $plugin->getSettings();

    $settings->apiKey = Craft::$app->getRequest()->getBodyParam('apiKey');
    $settings->syncEnabled = (bool)Craft::$app->getRequest()->getBodyParam('syncEnabled');
    $settings->syncEndpoint = Craft::$app->getRequest()->getBodyParam('syncEndpoint');

    if (!$settings->validate()) {
        return $this->asJson([
            'success' => false,
            'errors' => $settings->getErrors(),
        ]);
    }

    Craft::$app->getPlugins()->savePluginSettings($plugin, $settings->toArray());

    return $this->asJson([
        'success' => true,
    ]);
}
```

The important part is the `errors` shape. SchemaForm expects a path-to-messages map, so returning `$settings->getErrors()` gives the React side something it can pass straight back into `useSchemaFormEngine({ errors })`.

## 7. What to do next

Once this screen works, keep building the settings page in the same direction:

- add more built-in SchemaForm fields under the same `schemaIndex`
- use conditional fields when part of the settings page depends on another value
- move repeated UI wrappers into custom schema components if the page grows

If the screen is still just a handful of bespoke React controls and does not benefit from PHP-defined schema, stop using this recipe and follow [Compose a Form with Field Primitives](./compose-a-form-with-field-primitives.md) instead.
