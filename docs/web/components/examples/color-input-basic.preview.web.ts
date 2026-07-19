import '@verbb/plugin-kit-web/components/color-input/pk-color-input.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

export default defineWebPreview({
    label: 'Basic Usage',
    title: 'Basic usage example',
    layout: 'stack',
    code: '<pk-color-input value="#35e533"></pk-color-input>',
    html: `
<div style="display:flex;flex-direction:column;gap:4px;max-width:20rem">
  <pk-color-input value="#35e533"></pk-color-input>
  <div style="font-size:11px;color:#4b5563">Value: <code>#35e533</code></div>
</div>
`.trim(),
});
