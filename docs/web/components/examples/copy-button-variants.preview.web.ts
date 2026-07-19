import '@verbb/plugin-kit-web/components/copy-button/pk-copy-button.js';
import '@verbb/plugin-kit-web/components/icon/pk-icon.js';
import '@verbb/plugin-kit-web/components/input/pk-input.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

export default defineWebPreview({
    label: 'Variants',
    title: 'Copy button variant examples',
    layout: 'stack',
    html: `
<div style="display:flex;align-items:center;gap:0.5rem;flex-wrap:wrap">
  <pk-input value="FORMIE_LICENSE_KEY" readonly style="width:16rem"></pk-input>
  <pk-copy-button value="FORMIE_LICENSE_KEY">
    <pk-icon slot="icon" icon="clipboard" aria-hidden="true"></pk-icon>
  </pk-copy-button>
</div>
<div style="display:flex;align-items:center;gap:0.5rem;flex-wrap:wrap">
  <pk-copy-button value="FORMIE_LICENSE_KEY" variant="default">
    <pk-icon slot="icon" icon="clipboard" aria-hidden="true"></pk-icon>
  </pk-copy-button>
  <pk-copy-button value="FORMIE_LICENSE_KEY" variant="outline">
    <pk-icon slot="icon" icon="clipboard" aria-hidden="true"></pk-icon>
  </pk-copy-button>
  <pk-copy-button value="FORMIE_LICENSE_KEY" variant="transparent">
    <pk-icon slot="icon" icon="clipboard" aria-hidden="true"></pk-icon>
  </pk-copy-button>
  <pk-copy-button value="FORMIE_LICENSE_KEY" variant="none">
    <pk-icon slot="icon" icon="clipboard" aria-hidden="true"></pk-icon>
  </pk-copy-button>
</div>
`.trim(),
});
