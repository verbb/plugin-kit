import '@verbb/plugin-kit-web/components/state-panel.js';
import '@verbb/plugin-kit-web/components/button.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

export default defineWebPreview({
    label: 'Sizes',
    title: 'State panel sizes',
    html: `
<div style="display: grid; gap: 12px; width: 100%;">
  <pk-state-panel size="sm" variant="error" heading="Small error state" details-open copyable>
    The requested item could not be loaded.
    <pre slot="details">Request failed.</pre>
    <pk-button slot="actions" variant="primary">Try Again</pk-button>
  </pk-state-panel>

  <pk-state-panel variant="error" heading="Default error state" details-open copyable>
    The requested item could not be loaded.
    <pre slot="details">Request failed.</pre>
    <pk-button slot="actions" variant="primary">Try Again</pk-button>
  </pk-state-panel>

  <pk-state-panel size="lg" variant="error" heading="Large error state" details-open copyable>
    The requested item could not be loaded.
    <pre slot="details">Request failed.</pre>
    <pk-button slot="actions" variant="primary">Try Again</pk-button>
  </pk-state-panel>
</div>
`.trim(),
});
