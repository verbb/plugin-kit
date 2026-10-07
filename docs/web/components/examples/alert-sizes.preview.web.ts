import '@verbb/plugin-kit-web/components/alert.js';
import '@verbb/plugin-kit-web/components/button.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

export default defineWebPreview({
    label: 'Sizes',
    title: 'Alert sizes',
    html: `
<div style="display: grid; gap: 12px; width: 100%;">
  <pk-alert size="sm" heading="Small alert" details-open copyable dismissible>
    Review this configuration before saving.
    <pre slot="details">Environment: production</pre>
    <pk-button slot="actions" variant="secondary">Review</pk-button>
  </pk-alert>

  <pk-alert heading="Default alert" details-open copyable dismissible>
    Review this configuration before saving.
    <pre slot="details">Environment: production</pre>
    <pk-button slot="actions" variant="secondary">Review</pk-button>
  </pk-alert>

  <pk-alert size="lg" heading="Large alert" details-open copyable dismissible>
    Review this configuration before saving.
    <pre slot="details">Environment: production</pre>
    <pk-button slot="actions" variant="secondary">Review</pk-button>
  </pk-alert>
</div>
`.trim(),
});
