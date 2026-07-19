import '@verbb/plugin-kit-web/components/calendar/pk-calendar.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';
import { calendarDate } from '../../../.vitepress/theme/components/calendarDemoDates';

const today = calendarDate();

export default defineWebPreview({
    label: 'Single Date',
    title: 'Single date example',
    layout: 'stack',
    code: `<pk-calendar value="${today}"></pk-calendar>`,
    html: `<pk-calendar value="${today}"></pk-calendar>`,
});
