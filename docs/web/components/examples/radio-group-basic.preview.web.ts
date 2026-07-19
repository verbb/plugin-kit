import '@verbb/plugin-kit-web/components/radio-group/pk-radio-group.js';
import '@verbb/plugin-kit-web/components/radio-group/pk-radio.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

export default defineWebPreview({
    label: 'Basic Usage',
    title: 'Basic usage example',
    layout: 'stack',
    html: `
<pk-radio-group name="frequency" value="daily">
  <pk-radio value="daily">Daily</pk-radio>
  <pk-radio value="weekly">Weekly</pk-radio>
  <pk-radio value="monthly">Monthly</pk-radio>
</pk-radio-group>
`.trim(),
});
