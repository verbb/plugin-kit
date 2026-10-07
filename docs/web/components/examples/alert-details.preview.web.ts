import '@verbb/plugin-kit-web/components/alert/pk-alert.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

export default defineWebPreview({
    label: 'Details and Copying',
    title: 'Copyable alert details',
    html: `
<pk-alert
  variant="error"
  heading="A required feature could not start."
  announce="assertive"
  copyable
>
  Reload the page. If the problem continues, copy the technical details below.
  <pre slot="details">Module: example:picker
Code: MODULE_UNAVAILABLE
Error: Provider failed to initialise.</pre>
</pk-alert>
`.trim(),
});
