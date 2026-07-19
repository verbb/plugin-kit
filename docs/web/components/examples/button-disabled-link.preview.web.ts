import '@verbb/plugin-kit-web/components/button/pk-button.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

export default defineWebPreview({
    label: 'Disabled and Links',
    title: 'Disabled and link button examples',
    layout: 'row',
    html: `
<pk-button disabled>Disabled</pk-button>
<pk-button variant="primary" disabled>Disabled primary</pk-button>
<pk-button variant="link" href="https://verbb.io">Link button</pk-button>
`.trim(),
});
