import '@verbb/plugin-kit-web/components/field/pk-field.js';
import '@verbb/plugin-kit-web/components/input/pk-input.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

export default defineWebPreview({
    label: "Translatable",
    title: "Translatable example",
    layout: "stack",
    html: `
<pk-field
  label="Label"
  instructions="The label that describes this field."
  required
  translatable
>
  <pk-input placeholder="Test"></pk-input>
</pk-field>
`.trim(),
});
