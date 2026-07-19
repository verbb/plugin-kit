import '@verbb/plugin-kit-web/components/radio-group/pk-radio-group.js';
import '@verbb/plugin-kit-web/components/radio-group/pk-radio.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

export default defineWebPreview({
    label: 'Layout and Error',
    title: 'Radio group layout and error examples',
    layout: 'stack',
    html: `
<div style="display:flex;flex-direction:column;gap:1rem">
  <pk-radio-group name="layout" value="daily" orientation="horizontal">
    <pk-radio value="daily">Daily</pk-radio>
    <pk-radio value="weekly">Weekly</pk-radio>
    <pk-radio value="monthly">Monthly</pk-radio>
  </pk-radio-group>
  <div style="display:flex;flex-direction:column;gap:0.5rem">
    <pk-radio-group name="channel" value="email" invalid>
      <pk-radio value="email">Email</pk-radio>
      <pk-radio value="sms">SMS</pk-radio>
    </pk-radio-group>
    <p style="margin:0;font-size:0.875rem;color:#e11d48">Choose an available notification channel.</p>
  </div>
</div>
`.trim(),
});
