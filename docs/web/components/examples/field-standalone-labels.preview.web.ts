import '@verbb/plugin-kit-web/components/input/pk-input.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

export default defineWebPreview({
    label: "Standalone Labels",
    title: "Standalone labels example",
    layout: "stack",
    html: `
<pk-input
  label="Title"
  instructions="Standalone controls can still expose their own label and instructions."
  placeholder="My entry"
></pk-input>
`.trim(),
});
