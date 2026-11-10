import '@verbb/plugin-kit-web/components/chart/pk-sparkline.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

const markup = `
<pk-sparkline
  label="Contact Us submissions, last 14 days"
  values="88, 41, 37, 102, 96, 110, 94, 90, 44, 39, 118, 104, 121, 99"
></pk-sparkline>

<pk-sparkline
  label="Event RSVP submissions, last 14 days"
  color="3"
  values="12, 9, 8, 15, 18, 22, 27, 31, 26, 24, 38, 44, 52, 61"
></pk-sparkline>

<pk-sparkline
  label="Recovered revenue, last 14 days"
  color="2"
  format="money"
  currency="USD"
  values="[612.4, 388, 296.5, 845.2, 702.9, 918.3, 764, 655.7, 402.1, 351.8, 980.6, 872.4, 1104.9, 893.2]"
></pk-sparkline>

<pk-sparkline
  label="Job Application average time to complete, last 8 weeks"
  color="7"
  format="duration"
  bucket="week"
  values="312, 298, 305, 276, 262, 251, 244, 238"
  dates="2026-09-14, 2026-09-21, 2026-09-28, 2026-10-05, 2026-10-12, 2026-10-19, 2026-10-26, 2026-11-02"
></pk-sparkline>
`.trim();

export default defineWebPreview({
    label: 'Sparkline',
    title: 'Sparklines',
    layout: 'stack',
    code: `${markup}\n\n<script type="module">\n  import '@verbb/plugin-kit-web/components/chart/pk-sparkline.js';\n</script>`,
    html: markup,
});
