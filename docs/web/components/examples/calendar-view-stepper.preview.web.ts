import '@verbb/plugin-kit-web/components/calendar/pk-calendar.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';
import { calendarDate } from '../../../.vitepress/theme/components/calendarDemoDates';

const today = calendarDate();
const markup = `
<div style="font-size:12px;color:#6b7280;margin:0 0 8px">Click the month/year title to step into month and year views.</div>
<pk-calendar value="${today}"></pk-calendar>
`.trim();
const source = `<pk-calendar value="${today}"></pk-calendar>`;

export default defineWebPreview({
    label: 'View Stepper',
    title: 'View stepper example',
    layout: 'stack',
    code: source,
    html: markup,
});
