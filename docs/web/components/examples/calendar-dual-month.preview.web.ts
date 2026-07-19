import '@verbb/plugin-kit-web/components/calendar/pk-calendar.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';
import { calendarRange } from '../../../.vitepress/theme/components/calendarDemoDates';

const range = calendarRange(0, 14);
const markup = `<pk-calendar mode="range" months="2" value="${range}"></pk-calendar>`;

export default defineWebPreview({
    label: 'Two-Month Display',
    title: 'Two-month display example',
    layout: 'plain',
    code: markup,
    html: markup,
});
