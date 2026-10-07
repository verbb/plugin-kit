import '@verbb/plugin-kit-web/components/alert/pk-alert.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

export default defineWebPreview({
    label: 'Dismissible',
    title: 'Dismissible alert',
    html: `
<pk-alert
  variant="info"
  heading="New options are available."
  dismissible
>
  Review them when convenient, or dismiss this message.
</pk-alert>
`.trim(),
});
