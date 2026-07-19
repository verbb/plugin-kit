import '@verbb/plugin-kit-web/components/field/pk-field.js';
import '@verbb/plugin-kit-web/components/input/pk-input.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

export default defineWebPreview({
    label: "Tip",
    title: "Tip example",
    layout: "stack",
    html: `
<pk-field
  label="System Name"
  instructions="How you'll refer to this field in your templates."
  required
  tip="This can begin with an environment variable."
>
  <pk-input placeholder="my-handle" value="testing" mono></pk-input>
</pk-field>
`.trim(),
});
