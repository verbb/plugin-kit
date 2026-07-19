import '@verbb/plugin-kit-web/components/checkbox/pk-checkbox.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

export default defineWebPreview({
    label: 'Disabled',
    title: 'Disabled example',
    layout: 'row',
    html: `
<pk-checkbox disabled aria-label="Enable notifications"></pk-checkbox>
`.trim(),
});
