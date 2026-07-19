import '@verbb/plugin-kit-web/components/calendar/pk-calendar.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';
import { calendarRange } from '../../../.vitepress/theme/components/calendarDemoDates';

const range = calendarRange(0, 7);
const markup = `<pk-calendar mode="range" value="${range}"></pk-calendar>`;

export default defineWebPreview({
    label: 'Date Ranges',
    title: 'Date ranges example',
    layout: 'stack',
    code: markup,
    html: markup,
});
