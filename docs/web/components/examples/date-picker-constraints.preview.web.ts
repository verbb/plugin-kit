import '@verbb/plugin-kit-web/components/date-picker/pk-date-picker.js';
import '@verbb/plugin-kit-web/components/calendar/pk-calendar.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

export default defineWebPreview({
    label: "Constraints",
    title: "Constraints example",
    layout: "stack",
    html: `
<pk-date-picker disable-past placeholder="Future dates only"></pk-date-picker>
<pk-date-picker disable-future placeholder="Past dates only"></pk-date-picker>
<pk-date-picker disabled-days-of-week="sat sun" placeholder="Weekdays only"></pk-date-picker>
<pk-date-picker min="2026-01-01" max="2026-12-31" placeholder="Within 2026"></pk-date-picker>
`.trim(),
});
