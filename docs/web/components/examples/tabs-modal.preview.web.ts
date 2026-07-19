import '@verbb/plugin-kit-web/components/tabs/pk-tabs.js';
import '@verbb/plugin-kit-web/components/tabs/pk-tab.js';
import '@verbb/plugin-kit-web/components/tabs/pk-tab-panel.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

export default defineWebPreview({
    label: 'Modal Tabs',
    title: 'Modal tabs example',
    layout: 'plain',
    html: `
<div style="height:220px;border-radius:6px;border:1px solid #e2e8f0;overflow:hidden">
  <pk-tabs variant="modal" value="details">
    <pk-tab slot="nav" value="details">Details</pk-tab>
    <pk-tab slot="nav" value="layout">Layout</pk-tab>
    <pk-tab-panel value="details">Modal tab details content</pk-tab-panel>
    <pk-tab-panel value="layout">Modal tab layout content</pk-tab-panel>
  </pk-tabs>
</div>
`.trim(),
});
