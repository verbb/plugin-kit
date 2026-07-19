import '@verbb/plugin-kit-web/components/field/pk-field.js';
import '@verbb/plugin-kit-web/components/input/pk-input.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

export default defineWebPreview({
    label: "Errors and Warnings",
    title: "Errors and warnings example",
    layout: "stack",
    html: `
<pk-field
  label="Entry title"
  instructions="Shown on the public entry page."
  required
  warning="This title is similar to an existing entry."
>
  <li slot="errors">Title is required.</li>
  <pk-input placeholder="My entry" invalid></pk-input>
</pk-field>
`.trim(),
});
