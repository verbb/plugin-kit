import '@verbb/plugin-kit-web/components/tabs/pk-tabs.js';
import '@verbb/plugin-kit-web/components/tabs/pk-tab.js';
import '@verbb/plugin-kit-web/components/tabs/pk-tab-panel.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

/** Same tab set as playground overflow — long labels force scroll; Advanced is disabled. */
const overflowTabsMarkup = `
  <pk-tab slot="nav" value="general">General</pk-tab>
  <pk-tab slot="nav" value="content">Content</pk-tab>
  <pk-tab slot="nav" value="notifications">Notifications</pk-tab>
  <pk-tab slot="nav" value="integrations">Integrations</pk-tab>
  <pk-tab slot="nav" value="advanced" disabled>Advanced</pk-tab>
  <pk-tab-panel value="general">General content</pk-tab-panel>
  <pk-tab-panel value="content">Content settings</pk-tab-panel>
  <pk-tab-panel value="notifications">Notification settings</pk-tab-panel>
  <pk-tab-panel value="integrations">Integration settings</pk-tab-panel>
  <pk-tab-panel value="advanced">Advanced settings</pk-tab-panel>
`.trim();

function variantRow(label: string, tabsOpen: string, wrapStyle: string): string {
    return `
<div style="display:grid;grid-template-columns:5rem minmax(0,1fr);gap:1rem;align-items:start">
  <div style="padding-top:0.625rem;font-size:12px;font-weight:600;color:#64748b">${label}</div>
  <div style="${wrapStyle}">
    ${tabsOpen}
      ${overflowTabsMarkup}
    </pk-tabs>
  </div>
</div>`.trim();
}

export default defineWebPreview({
    label: 'Disabled and Overflow',
    title: 'Disabled and overflowing tabs example',
    layout: 'plain',
    // Short snippet — live preview stacks default / pane / modal like the playground.
    code: [
        '<pk-tabs value="general">',
        '  <pk-tab slot="nav" value="general">General</pk-tab>',
        '  <pk-tab slot="nav" value="advanced" disabled>Advanced</pk-tab>',
        '  …',
        '</pk-tabs>',
    ].join('\n'),
    html: `
<div style="display:flex;flex-direction:column;gap:12px;max-width:520px">
${variantRow(
    'Default',
    '<pk-tabs value="general">',
    'max-width:28rem',
)}
${variantRow(
    'Pane',
    '<pk-tabs variant="pane" value="general">',
    'max-width:28rem;height:220px',
)}
${variantRow(
    'Modal',
    '<pk-tabs variant="modal" value="general">',
    'max-width:28rem;height:220px;overflow:hidden;border:1px solid #e2e8f0;border-radius:6px',
)}
</div>
`.trim(),
});
