import '@verbb/plugin-kit-web/components/button/pk-button.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

export default defineWebPreview({
    label: 'Variants',
    title: 'Variants example',
    layout: 'row',
    html: `
<pk-button variant="primary">Primary</pk-button>
<pk-button variant="secondary">Secondary</pk-button>
<pk-button>Default</pk-button>
<pk-button variant="outline">Outline</pk-button>
<pk-button variant="dashed">Dashed</pk-button>
<pk-button variant="transparent">Transparent</pk-button>
<pk-button variant="link">Link</pk-button>
<pk-button variant="none">None</pk-button>
`.trim(),
});
