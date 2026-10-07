import '@verbb/plugin-kit-web/components/state-panel.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

export default defineWebPreview({
    label: 'Empty state',
    title: 'Empty state panel',
    html: `
<pk-state-panel
  heading="No usage found"
  style="--pk-state-panel-min-height: 20rem"
>
  This form is not currently being used by any entries, users, or other elements.
</pk-state-panel>
`.trim(),
});
