import '@verbb/plugin-kit-web/components/lightswitch/pk-lightswitch.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

export default defineWebPreview({
    label: 'Sizes',
    title: 'Sizes example',
    layout: 'stack',
    html: `
<div style="display:flex;align-items:center;gap:8px;font-size:14px">
  <pk-lightswitch size="xxs"></pk-lightswitch>
  <span>Extra extra small</span>
</div>
<div style="display:flex;align-items:center;gap:8px;font-size:14px">
  <pk-lightswitch size="xs"></pk-lightswitch>
  <span>Extra small</span>
</div>
<div style="display:flex;align-items:center;gap:8px;font-size:14px">
  <pk-lightswitch size="sm"></pk-lightswitch>
  <span>Small</span>
</div>
<div style="display:flex;align-items:center;gap:8px;font-size:14px">
  <pk-lightswitch></pk-lightswitch>
  <span>Default</span>
</div>
`.trim(),
});
