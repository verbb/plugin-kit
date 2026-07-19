import '@verbb/plugin-kit-web/components/dropdown-menu/pk-dropdown-menu.js';
import '@verbb/plugin-kit-web/components/dropdown-menu/pk-dropdown-item.js';
import '@verbb/plugin-kit-web/components/dropdown-menu/pk-dropdown-label.js';
import '@verbb/plugin-kit-web/components/dropdown-menu/pk-dropdown-separator.js';
import '@verbb/plugin-kit-web/components/button/pk-button.js';
import '@verbb/plugin-kit-web/components/icon/pk-icon.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

export default defineWebPreview({
    label: 'Different Triggers',
    title: 'Different triggers example',
    layout: 'plain',
    html: `
<pk-dropdown-menu>
  <pk-button slot="trigger" with-caret>Open menu</pk-button>
  <pk-dropdown-item value="profile">Profile</pk-dropdown-item>
  <pk-dropdown-item value="settings">Settings</pk-dropdown-item>
</pk-dropdown-menu>
<pk-dropdown-menu>
  <pk-button slot="trigger" aria-label="Open menu">
    <pk-icon slot="start" icon="ellipsis"></pk-icon>
  </pk-button>
  <pk-dropdown-item value="edit">Edit</pk-dropdown-item>
  <pk-dropdown-item value="duplicate">Duplicate</pk-dropdown-item>
</pk-dropdown-menu>
`.trim(),
});
