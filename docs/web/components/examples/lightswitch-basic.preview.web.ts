import '@verbb/plugin-kit-web/components/lightswitch/pk-lightswitch.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

export default defineWebPreview({
    label: 'Basic Usage',
    title: 'Basic usage example',
    layout: 'row',
    html: `
<pk-lightswitch></pk-lightswitch>
`.trim(),
});
