import '@verbb/plugin-kit-web/components/checkbox/pk-checkbox.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

export default defineWebPreview({
    label: 'Grouped Options',
    title: 'Grouped options example',
    layout: 'stack',
    html: `
<fieldset style="border:0;margin:0;padding:0;display:flex;flex-direction:column;gap:8px">
  <legend style="font-size:14px;font-weight:500;margin-bottom:8px">Notification preferences</legend>
  <pk-checkbox checked>Email updates</pk-checkbox>
  <pk-checkbox>Push notifications</pk-checkbox>
  <pk-checkbox disabled>SMS alerts</pk-checkbox>
</fieldset>
`.trim(),
});
