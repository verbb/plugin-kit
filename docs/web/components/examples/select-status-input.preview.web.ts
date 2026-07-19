import '@verbb/plugin-kit-web/components/select/pk-select.js';
import '@verbb/plugin-kit-web/components/select/pk-option.js';
import '@verbb/plugin-kit-web/components/status/pk-status.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

export default defineWebPreview({
    label: 'Status Input',
    title: 'Status input example',
    layout: 'row',
    html: `
<pk-select placeholder="Select status" value="testing" style="min-width:12rem">
  <pk-option value="new"><pk-status slot="start" status="green" aria-label="New"></pk-status> New</pk-option>
  <pk-option value="testing"><pk-status slot="start" status="blue" aria-label="Testing"></pk-status> Testing</pk-option>
  <pk-option value="viewed"><pk-status slot="start" status="purple" aria-label="Viewed"></pk-status> Viewed</pk-option>
</pk-select>
`.trim(),
});
