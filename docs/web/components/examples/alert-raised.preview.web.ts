import '@verbb/plugin-kit-web/components/alert/pk-alert.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

export default defineWebPreview({
    label: 'Raised',
    title: 'Raised alerts on a tinted page background',
    layout: 'plain',
    html: `
<div style="display:grid;gap:12px;padding:20px;border-radius:8px;background:#e4edf6">
  <pk-alert appearance="raised" variant="info" heading="9 customers abandoned 3 or more carts">
    They’re sorted to the top of the list.
  </pk-alert>
  <pk-alert appearance="raised" variant="neutral" heading="This setting is managed externally.">
    Make changes in the connected service.
  </pk-alert>
  <pk-alert appearance="raised" variant="success" heading="Settings saved.">
    Your changes are now active.
  </pk-alert>
  <pk-alert appearance="raised" variant="warning" heading="Review this configuration.">
    One or more values may need attention.
  </pk-alert>
  <pk-alert appearance="raised" variant="error" heading="The request could not be completed.">
    Check the values and try again.
  </pk-alert>
</div>
`.trim(),
});
