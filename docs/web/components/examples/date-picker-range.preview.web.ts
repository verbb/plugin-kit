import '@verbb/plugin-kit-web/components/date-picker/pk-date-picker.js';
import '@verbb/plugin-kit-web/components/calendar/pk-calendar.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

export default defineWebPreview({
    label: "Range",
    title: "Range example",
    layout: "stack",
    html: `
<pk-date-picker mode="range" months="2" label="Booking" placeholder="Select a range"></pk-date-picker>
`.trim(),
});
