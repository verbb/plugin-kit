import '@verbb/plugin-kit-web/components/button/pk-button.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

export default defineWebPreview({
    label: 'Loading',
    title: 'Loading example',
    layout: 'row',
    html: `
<pk-button variant="primary" loading>Save</pk-button>
<pk-button variant="secondary" loading>Save changes and continue</pk-button>
<pk-button loading>Save</pk-button>
`.trim(),
});
