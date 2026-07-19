import '@verbb/plugin-kit-web/components/button/pk-button.js';
import '@verbb/plugin-kit-web/components/icon/pk-icon.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

export default defineWebPreview({
    label: 'Icons',
    title: 'Icons example',
    layout: 'row',
    html: `
<pk-button>
  <pk-icon slot="start" icon="eye"></pk-icon>
  Prepend
</pk-button>
<pk-button>
  Append
  <pk-icon slot="end" icon="eye"></pk-icon>
</pk-button>
<pk-button>
  <pk-icon slot="start" icon="plus"></pk-icon>
  Both
  <pk-icon slot="end" icon="eye"></pk-icon>
</pk-button>
<pk-button aria-label="View">
  <pk-icon slot="start" icon="eye"></pk-icon>
</pk-button>
`.trim(),
});
