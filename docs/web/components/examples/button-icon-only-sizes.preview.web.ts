import '@verbb/plugin-kit-web/components/button/pk-button.js';
import '@verbb/plugin-kit-web/components/icon/pk-icon.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

export default defineWebPreview({
    label: 'Icon-Only Sizes',
    title: 'Icon-only button size examples',
    layout: 'stack',
    html: `
<div style="display:flex;flex-wrap:wrap;gap:12px;align-items:center">
  <pk-button size="xxs" aria-label="View">
    <pk-icon slot="start" icon="eye"></pk-icon>
  </pk-button>
  <pk-button size="xs" aria-label="View">
    <pk-icon slot="start" icon="eye"></pk-icon>
  </pk-button>
  <pk-button size="sm" aria-label="View">
    <pk-icon slot="start" icon="eye"></pk-icon>
  </pk-button>
  <pk-button aria-label="View">
    <pk-icon slot="start" icon="eye"></pk-icon>
  </pk-button>
  <pk-button size="lg" aria-label="View">
    <pk-icon slot="start" icon="eye"></pk-icon>
  </pk-button>
  <pk-button size="xl" aria-label="View">
    <pk-icon slot="start" icon="eye"></pk-icon>
  </pk-button>
</div>
<div style="display:flex;flex-wrap:wrap;gap:12px;align-items:center">
  <pk-button variant="none" size="sm" icon aria-label="Remove">
    <pk-icon slot="start" icon="xmark"></pk-icon>
  </pk-button>
  <pk-button variant="none" icon aria-label="More">
    <pk-icon slot="start" icon="ellipsis"></pk-icon>
  </pk-button>
</div>
`.trim(),
});
