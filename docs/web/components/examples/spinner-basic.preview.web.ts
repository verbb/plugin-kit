import '@verbb/plugin-kit-web/components/spinner/pk-spinner.js';
import '@verbb/plugin-kit-web/components/button/pk-button.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

export default defineWebPreview({
    label: 'Basic Usage',
    title: 'Basic spinner example',
    layout: 'row',
    html: `
<pk-spinner></pk-spinner>
`.trim(),
});
