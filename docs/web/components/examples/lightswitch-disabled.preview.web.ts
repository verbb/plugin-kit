import '@verbb/plugin-kit-web/components/lightswitch/pk-lightswitch.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

export default defineWebPreview({
    label: 'Disabled',
    title: 'Disabled example',
    layout: 'row',
    html: `
<pk-lightswitch disabled>Sync in background</pk-lightswitch>
`.trim(),
});
