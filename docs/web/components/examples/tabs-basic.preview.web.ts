import '@verbb/plugin-kit-web/components/tabs/pk-tabs.js';
import '@verbb/plugin-kit-web/components/tabs/pk-tab.js';
import '@verbb/plugin-kit-web/components/tabs/pk-tab-panel.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

export default defineWebPreview({
    label: 'Basic Tabs',
    title: 'Basic tabs example',
    layout: 'stack',
    html: `
<pk-tabs value="general">
  <pk-tab slot="nav" value="general">General</pk-tab>
  <pk-tab slot="nav" value="settings">Settings</pk-tab>
  <pk-tab slot="nav" value="advanced">Advanced</pk-tab>
  <pk-tab-panel value="general">General content</pk-tab-panel>
  <pk-tab-panel value="settings">Settings content</pk-tab-panel>
  <pk-tab-panel value="advanced">Advanced content</pk-tab-panel>
</pk-tabs>
`.trim(),
});
