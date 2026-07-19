import '@verbb/plugin-kit-web/components/combobox/pk-combobox.js';
import '@verbb/plugin-kit-web/components/select/pk-option.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

export default defineWebPreview({
    label: "Allow Create",
    title: "Allow create example",
    layout: "stack",
    html: `
<pk-combobox allow-create placeholder="Search or create tags…" style="min-width:16rem">
  <pk-option value="design">Design</pk-option>
  <pk-option value="engineering">Engineering</pk-option>
  <pk-option value="marketing">Marketing</pk-option>
</pk-combobox>
`.trim(),
});
