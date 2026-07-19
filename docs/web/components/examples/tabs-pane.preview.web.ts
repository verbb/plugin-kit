import '@verbb/plugin-kit-web/components/tabs/pk-tabs.js';
import '@verbb/plugin-kit-web/components/tabs/pk-tab.js';
import '@verbb/plugin-kit-web/components/tabs/pk-tab-panel.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

export default defineWebPreview({
    label: 'Pane Tabs',
    title: 'Pane tabs example',
    layout: 'plain',
    html: `
<div style="height:220px">
  <pk-tabs variant="pane" value="tab1">
    <pk-tab slot="nav" value="tab1">Tab One</pk-tab>
    <pk-tab slot="nav" value="tab2">Tab Two</pk-tab>
    <pk-tab-panel value="tab1"><div style="padding:1.5rem">Pane tab one content</div></pk-tab-panel>
    <pk-tab-panel value="tab2"><div style="padding:1.5rem">Pane tab two content</div></pk-tab-panel>
  </pk-tabs>
</div>
`.trim(),
});
