import '@verbb/plugin-kit-web/components/time-picker/pk-time-picker.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

export default defineWebPreview({
    label: 'Empty State',
    title: 'Empty state example',
    layout: 'stack',
    html: `
<pk-time-picker placeholder="Select time"></pk-time-picker>
`.trim(),
});
