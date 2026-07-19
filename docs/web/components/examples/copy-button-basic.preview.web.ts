import '@verbb/plugin-kit-web/components/copy-button/pk-copy-button.js';
import '@verbb/plugin-kit-web/components/icon/pk-icon.js';
import '@verbb/plugin-kit-web/components/input/pk-input.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

export default defineWebPreview({
    label: 'Basic Usage',
    title: 'Basic usage example',
    layout: 'row',
    html: `
<pk-input value="https://verbb.io" readonly style="width:16rem"></pk-input>
<pk-copy-button value="https://verbb.io">
  <pk-icon slot="icon" icon="clipboard" aria-hidden="true"></pk-icon>
</pk-copy-button>
`.trim(),
});
