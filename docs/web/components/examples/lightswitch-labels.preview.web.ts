import '@verbb/plugin-kit-web/components/lightswitch/pk-lightswitch.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

export default defineWebPreview({
    label: 'Labels',
    title: 'Lightswitch label examples',
    layout: 'stack',
    html: `
<pk-lightswitch checked>Enable notifications</pk-lightswitch>
<pk-lightswitch instructions="Save form changes while editing.">Auto-save drafts</pk-lightswitch>
`.trim(),
});
