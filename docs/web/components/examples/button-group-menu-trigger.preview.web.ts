import '@verbb/plugin-kit-web/components/button-group/pk-button-group.js';
import '@verbb/plugin-kit-web/components/button/pk-button.js';
import '@verbb/plugin-kit-web/components/icon/pk-icon.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

const caption = 'font-size:12px;color:#6b7280;margin:0 0 8px';
const stack = 'display:flex;flex-direction:column;gap:20px';

export default defineWebPreview({
    label: 'Menu Trigger',
    title: 'Menu trigger (`group-trigger`) example',
    layout: 'plain',
    html: `
<div style="${stack}">
  <div>
    <div style="${caption}">Use — disclosure end-cap with <code>group-trigger</code> (Craft <code>.menubtn</code>)</div>
    <pk-button-group>
      <pk-button variant="primary"><pk-icon slot="start" icon="pen-to-square"></pk-icon> Edit</pk-button>
      <pk-button variant="primary"><pk-icon slot="start" icon="eye"></pk-icon> Preview</pk-button>
      <pk-button variant="primary" group-trigger aria-label="More actions"></pk-button>
    </pk-button-group>
  </div>

  <div>
    <div style="${caption}">Avoid — chevron slotted as an icon keeps a full square hit target</div>
    <pk-button-group>
      <pk-button variant="primary"><pk-icon slot="start" icon="pen-to-square"></pk-icon> Edit</pk-button>
      <pk-button variant="primary"><pk-icon slot="start" icon="eye"></pk-icon> Preview</pk-button>
      <pk-button variant="primary" aria-label="More actions"><pk-icon slot="start" icon="chevron-down"></pk-icon></pk-button>
    </pk-button-group>
  </div>

  <div>
    <div style="${caption}">Different pattern — icon-only actions stay square (no <code>group-trigger</code>)</div>
    <pk-button-group>
      <pk-button variant="primary" aria-label="Edit"><pk-icon slot="start" icon="pen-to-square"></pk-icon></pk-button>
      <pk-button variant="primary" aria-label="Preview"><pk-icon slot="start" icon="eye"></pk-icon></pk-button>
      <pk-button variant="primary" aria-label="Export"><pk-icon slot="start" icon="download"></pk-icon></pk-button>
    </pk-button-group>
  </div>
</div>
`.trim(),
});
