import '@verbb/plugin-kit-web/components/calendar/pk-calendar.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';
import { calendarDate, calendarRange } from '../../../.vitepress/theme/components/calendarDemoDates';

const today = calendarDate();
const range = calendarRange(0, 7);
const markup = `
<pk-calendar value="${today}"></pk-calendar>
<pk-calendar mode="range" value="${range}"></pk-calendar>
`.trim();

export default defineWebPreview({
    label: 'Dropdown Captions',
    title: 'Dropdown captions example',
    layout: 'plain',
    code: markup,
    html: markup,
});
