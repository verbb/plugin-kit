import '@verbb/plugin-kit-web/components/state-panel.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

export default defineWebPreview({
    label: 'Variants',
    title: 'State panel variants',
    html: `
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 12px; width: 100%;">
  <pk-state-panel variant="empty" heading="No results found">
    Try changing the current filters.
  </pk-state-panel>

  <pk-state-panel variant="info" heading="Preview unavailable">
    Save this item before opening its preview.
  </pk-state-panel>

  <pk-state-panel variant="success" heading="Import complete">
    All records were imported successfully.
  </pk-state-panel>

  <pk-state-panel variant="warning" heading="Some items were skipped">
    Review the import summary before continuing.
  </pk-state-panel>

  <pk-state-panel variant="error" heading="Report unavailable">
    The report could not be loaded.
  </pk-state-panel>
</div>
`.trim(),
});
