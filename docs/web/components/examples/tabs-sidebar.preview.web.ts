import '@verbb/plugin-kit-web/components/tabs/pk-tabs.js';
import '@verbb/plugin-kit-web/components/tabs/pk-tab.js';
import '@verbb/plugin-kit-web/components/tabs/pk-tab-heading.js';
import '@verbb/plugin-kit-web/components/tabs/pk-tab-panel.js';
import '@verbb/plugin-kit-web/components/icon/pk-icon.js';
import '@verbb/plugin-kit-web/components/status/pk-status.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

export default defineWebPreview({
    label: "Sidebar",
    title: "Sidebar tabs example",
    layout: "plain",
    html: `
<pk-tabs variant="sidebar" value="hubspot" aria-label="Sidebar" style="min-height:16rem">
  <pk-tab-heading slot="nav">CRM</pk-tab-heading>
  <pk-tab slot="nav" value="hubspot">
    <pk-icon slot="icon" icon="gear" aria-hidden="true"></pk-icon>
    HubSpot
    <pk-status slot="status" status="inactive" aria-hidden="true"></pk-status>
  </pk-tab>
  <pk-tab-heading slot="nav">Email marketing</pk-tab-heading>
  <pk-tab slot="nav" value="mailchimp">
    <pk-icon slot="icon" icon="share" aria-hidden="true"></pk-icon>
    Mailchimp
    <pk-status slot="status" status="inactive" aria-hidden="true"></pk-status>
  </pk-tab>
  <pk-tab-heading slot="nav">Elements</pk-tab-heading>
  <pk-tab slot="nav" value="entries">
    <pk-icon slot="icon" icon="list" aria-hidden="true"></pk-icon>
    Entries
    <pk-status slot="status" status="inactive" aria-hidden="true"></pk-status>
  </pk-tab>
  <pk-tab slot="nav" value="users">
    <pk-icon slot="icon" icon="house" aria-hidden="true"></pk-icon>
    Users
    <pk-status slot="status" status="inactive" aria-hidden="true"></pk-status>
  </pk-tab>
  <pk-tab-panel value="hubspot">HubSpot integration settings</pk-tab-panel>
  <pk-tab-panel value="mailchimp">Mailchimp integration settings</pk-tab-panel>
  <pk-tab-panel value="entries">Entries settings</pk-tab-panel>
  <pk-tab-panel value="users">Users settings</pk-tab-panel>
</pk-tabs>
`.trim(),
});
