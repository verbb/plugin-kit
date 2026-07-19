import '@verbb/plugin-kit-web/components/time-picker/pk-time-picker.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

export default defineWebPreview({
    label: 'Basic Usage',
    title: 'Basic usage example',
    layout: 'stack',
    html: `
<pk-time-picker value="09:00" placeholder="Select time"></pk-time-picker>
`.trim(),
});
