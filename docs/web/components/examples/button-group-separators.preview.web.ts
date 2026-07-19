import '@verbb/plugin-kit-web/components/button-group/pk-button-group.js';
import '@verbb/plugin-kit-web/components/button/pk-button.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

const caption = 'font-size:12px;color:#6b7280;margin:0 0 8px';
const stack = 'display:flex;flex-direction:column;gap:20px';

export default defineWebPreview({
    label: 'Separators',
    title: 'Separators example',
    layout: 'plain',
    html: `
<div style="${stack}">
  <div>
    <div style="${caption}">On (default) — 1px divider between controls</div>
    <pk-button-group>
      <pk-button variant="primary">Save</pk-button>
      <pk-button variant="primary">Save and continue</pk-button>
    </pk-button-group>
  </div>
  <div>
    <div style="${caption}">Off (<code>separators="false"</code>) — flush join</div>
    <pk-button-group separators="false">
      <pk-button variant="primary">Save</pk-button>
      <pk-button variant="primary">Save and continue</pk-button>
    </pk-button-group>
  </div>
</div>
`.trim(),
});