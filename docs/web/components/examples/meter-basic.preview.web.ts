import '@verbb/plugin-kit-web/components/chart/pk-meter.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

const markup = `
<pk-meter label="Contact Us completion rate" value="0.82" format="percent" show-value></pk-meter>

<pk-meter label="Monthly email quota used" value="8420" max="10000" show-value></pk-meter>

<pk-meter label="Asset volume usage" value="0.37" format="percent"></pk-meter>
`.trim();

export default defineWebPreview({
    label: 'Meter',
    title: 'Meters',
    layout: 'stack',
    code: `${markup}\n\n<script type="module">\n  import '@verbb/plugin-kit-web/components/chart/pk-meter.js';\n</script>`,
    html: markup,
});
