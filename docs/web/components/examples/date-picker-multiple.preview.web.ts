import '@verbb/plugin-kit-web/components/date-picker/pk-date-picker.js';
import '@verbb/plugin-kit-web/components/calendar/pk-calendar.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

export default defineWebPreview({
    label: 'Multiple',
    title: 'Multiple example',
    layout: 'stack',
    html: `
<pk-date-picker mode="multiple" value="2026-05-04,2026-05-20" label="Availability" placeholder="Select dates"></pk-date-picker>
`.trim(),
});
