import '@verbb/plugin-kit-web/components/spinner/pk-spinner.js';
import '@verbb/plugin-kit-web/components/button/pk-button.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

export default defineWebPreview({
    label: 'Colors',
    title: 'Spinner color examples',
    layout: 'row',
    html: `
<pk-spinner tone="sky"></pk-spinner>
<pk-spinner tone="emerald"></pk-spinner>
<pk-spinner tone="violet"></pk-spinner>
<pk-spinner tone="amber"></pk-spinner>
`.trim(),
});
