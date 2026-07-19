import '@verbb/plugin-kit-web/components/date-picker/pk-date-picker.js';
import '@verbb/plugin-kit-web/components/calendar/pk-calendar.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

export default defineWebPreview({
    label: 'Basic Usage',
    title: 'Basic usage example',
    layout: 'stack',
    html: `
<pk-date-picker placeholder="Pick a date" value="2026-05-20"></pk-date-picker>
`.trim(),
});
