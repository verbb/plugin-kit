import '@verbb/plugin-kit-web/components/dropdown-menu/pk-dropdown-menu.js';
import '@verbb/plugin-kit-web/components/dropdown-menu/pk-dropdown-item.js';
import '@verbb/plugin-kit-web/components/dropdown-menu/pk-dropdown-label.js';
import '@verbb/plugin-kit-web/components/dropdown-menu/pk-dropdown-separator.js';
import '@verbb/plugin-kit-web/components/button/pk-button.js';
import '@verbb/plugin-kit-web/components/icon/pk-icon.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

export default defineWebPreview({
    label: 'Basic Menu',
    title: 'Basic menu example',
    layout: 'plain',
    html: `
<pk-dropdown-menu>
  <pk-button slot="trigger" with-caret>Options</pk-button>
  <pk-dropdown-item value="profile">Profile</pk-dropdown-item>
  <pk-dropdown-item value="settings">Settings</pk-dropdown-item>
  <pk-dropdown-separator></pk-dropdown-separator>
  <pk-dropdown-item value="delete" destructive>Delete</pk-dropdown-item>
</pk-dropdown-menu>
`.trim(),
});
