import '@verbb/plugin-kit-web/components/state-panel.js';
import '@verbb/plugin-kit-web/components/button.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

export default defineWebPreview({
    label: 'Error state',
    title: 'Error state with details and an action',
    html: `
<pk-state-panel
  variant="error"
  heading="An error has occurred"
  details-label="Show error details"
  copy-label="Copy error details"
  copied-label="Error details copied."
  copyable
  style="--pk-state-panel-min-height: 22rem"
>
  The requested form could not be found.

  <pre slot="details">FormNotFound: Unable to load form 42.</pre>

  <pk-button slot="actions" variant="primary">Try Again</pk-button>
</pk-state-panel>
`.trim(),
});
