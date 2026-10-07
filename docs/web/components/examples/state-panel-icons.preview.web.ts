import '@verbb/plugin-kit-web/components/state-panel.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

export default defineWebPreview({
    label: 'Icons',
    title: 'State panel icon options',
    html: `
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 12px; width: 100%;">
  <pk-state-panel variant="info" icon="gear" heading="Named icon">
    Use any icon registered with Plugin Kit.
  </pk-state-panel>

  <pk-state-panel variant="success" heading="Custom icon content">
    <svg slot="icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2l2.1 6.9L21 11l-6.9 2.1L12 20l-2.1-6.9L3 11l6.9-2.1L12 2Z"></path>
    </svg>
    Place an SVG or another rendered icon in the icon slot.
  </pk-state-panel>

  <pk-state-panel variant="warning" heading="No icon" hide-icon>
    Hide the icon when the message is clear without it.
  </pk-state-panel>
</div>
`.trim(),
});
