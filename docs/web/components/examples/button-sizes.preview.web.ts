import '@verbb/plugin-kit-web/components/button/pk-button.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

export default defineWebPreview({
    label: 'Sizes',
    title: 'Sizes example',
    layout: 'row',
    html: `
<pk-button size="xxs">Extra extra small</pk-button>
<pk-button size="xs">Extra small</pk-button>
<pk-button size="sm">Small</pk-button>
<pk-button>Default</pk-button>
<pk-button size="lg">Large</pk-button>
<pk-button size="xl">Extra large</pk-button>
`.trim(),
});
