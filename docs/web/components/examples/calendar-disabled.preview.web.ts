import '@verbb/plugin-kit-web/components/calendar/pk-calendar.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';
import { calendarDate, calendarDisabledDates } from '../../../.vitepress/theme/components/calendarDemoDates';

const today = calendarDate();
const disabled = calendarDisabledDates([3, 4, 5]);
const markup = `<pk-calendar value="${today}" disabled-dates="${disabled}"></pk-calendar>`;

export default defineWebPreview({
    label: 'Disabled Days',
    title: 'Disabled days example',
    layout: 'stack',
    code: markup,
    html: markup,
});
