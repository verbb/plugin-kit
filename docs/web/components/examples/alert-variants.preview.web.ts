import '@verbb/plugin-kit-web/components/alert/pk-alert.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

export default defineWebPreview({
    label: 'Variants',
    title: 'Alert variants',
    layout: 'stack',
    html: `
<pk-alert variant="info" heading="New options are available.">
  Review the defaults before saving this screen.
</pk-alert>
<pk-alert variant="neutral" heading="This setting is managed externally.">
  Make changes in the connected service.
</pk-alert>
<pk-alert variant="success" heading="Settings saved.">
  Your changes are now active.
</pk-alert>
<pk-alert variant="warning" heading="Review this configuration.">
  One or more values may need attention.
</pk-alert>
<pk-alert variant="error" heading="The request could not be completed.">
  Check the values and try again.
</pk-alert>
`.trim(),
});
