import '@verbb/plugin-kit-web/components/radio-group/pk-radio-group.js';
import '@verbb/plugin-kit-web/components/radio-group/pk-radio.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

export default defineWebPreview({
    label: 'Disabled Options',
    title: 'Disabled options example',
    layout: 'stack',
    html: `
<pk-radio-group name="plan" value="starter">
  <pk-radio value="starter">Starter</pk-radio>
  <pk-radio value="pro">Pro</pk-radio>
  <pk-radio value="enterprise" disabled>Enterprise</pk-radio>
</pk-radio-group>
`.trim(),
});
