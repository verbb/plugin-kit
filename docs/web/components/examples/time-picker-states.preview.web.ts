import '@verbb/plugin-kit-web/components/time-picker/pk-time-picker.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

export default defineWebPreview({
    label: 'States',
    title: 'Time picker state examples',
    layout: 'row',
    html: `
<pk-time-picker value="09:30"></pk-time-picker>
<pk-time-picker disabled value="09:30"></pk-time-picker>
<pk-time-picker invalid value="99:99"></pk-time-picker>
`.trim(),
});
