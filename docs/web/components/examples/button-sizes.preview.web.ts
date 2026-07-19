import '@verbb/plugin-kit-web/components/button/pk-button.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

export default defineWebPreview({
    label: 'Sizes',
    title: 'Sizes example',
    layout: 'row',
    html: `
<pk-button size="xs">Small</pk-button>
<pk-button size="sm">Default</pk-button>
<pk-button>Base</pk-button>
<pk-button size="lg">Large</pk-button>
`.trim(),
});
