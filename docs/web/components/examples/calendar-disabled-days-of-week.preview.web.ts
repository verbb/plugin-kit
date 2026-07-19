import '@verbb/plugin-kit-web/components/calendar/pk-calendar.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';
import { calendarDate } from '../../../.vitepress/theme/components/calendarDemoDates';

const today = calendarDate();
const markup = `<pk-calendar value="${today}" disabled-days-of-week="sat sun"></pk-calendar>`;

export default defineWebPreview({
    label: 'Days of Week',
    title: 'Disabled days of week example',
    layout: 'stack',
    code: markup,
    html: markup,
});
