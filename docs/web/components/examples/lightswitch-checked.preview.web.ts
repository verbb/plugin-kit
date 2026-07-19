import '@verbb/plugin-kit-web/components/lightswitch/pk-lightswitch.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

export default defineWebPreview({
    label: 'Checked',
    title: 'Checked example',
    layout: 'row',
    html: `
<pk-lightswitch checked>Enable notifications</pk-lightswitch>
`.trim(),
});
