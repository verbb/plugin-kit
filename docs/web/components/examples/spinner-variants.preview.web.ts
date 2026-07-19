import '@verbb/plugin-kit-web/components/spinner/pk-spinner.js';
import '@verbb/plugin-kit-web/components/button/pk-button.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

export default defineWebPreview({
    label: 'Button Variants',
    title: 'Button variant examples',
    layout: 'plain',
    html: `
<pk-button loading>default</pk-button>
<pk-button variant="primary" loading>primary</pk-button>
<pk-button variant="secondary" loading>secondary</pk-button>
<pk-button variant="dashed" loading>dashed</pk-button>
<pk-button variant="outline" loading>outline</pk-button>
<pk-button variant="transparent" loading>transparent</pk-button>
`.trim(),
});
