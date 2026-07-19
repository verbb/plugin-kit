import '@verbb/plugin-kit-web/components/date-picker/pk-date-picker.js';
import '@verbb/plugin-kit-web/components/calendar/pk-calendar.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

export default defineWebPreview({
    label: 'States',
    title: 'Date picker state examples',
    layout: 'stack',
    html: `
<div style="display:flex;flex-direction:column;gap:1rem">
  <pk-date-picker label="Required" required with-clear placeholder="Required date"></pk-date-picker>
  <pk-date-picker label="Invalid" value="2026-01-15" invalid></pk-date-picker>
  <pk-date-picker label="Disabled" value="2026-05-20" disabled></pk-date-picker>
</div>
`.trim(),
});
