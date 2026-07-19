import '@verbb/plugin-kit-web/components/date-picker/pk-date-picker.js';
import '@verbb/plugin-kit-web/components/calendar/pk-calendar.js';
import '@verbb/plugin-kit-web/components/time-picker/pk-time-picker.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

export default defineWebPreview({
    label: "Date and Time",
    title: "Date and time example",
    layout: "row",
    html: `
<pk-date-picker value="2026-05-20" placeholder="Pick a date"></pk-date-picker>
<pk-time-picker value="09:00" placeholder="Select time"></pk-time-picker>
`.trim(),
});
