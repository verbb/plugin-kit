import '@verbb/plugin-kit-web/components/calendar/pk-calendar.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';
import { calendarDate } from '../../../.vitepress/theme/components/calendarDemoDates';

const today = calendarDate();
const markup = `<pk-calendar value="${today}" with-week-numbers></pk-calendar>`;

export default defineWebPreview({
    label: 'Week Numbers',
    title: 'Week numbers example',
    layout: 'stack',
    code: markup,
    html: markup,
});
