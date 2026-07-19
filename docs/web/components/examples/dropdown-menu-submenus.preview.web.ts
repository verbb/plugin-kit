import '@verbb/plugin-kit-web/components/dropdown-menu/pk-dropdown-menu.js';
import '@verbb/plugin-kit-web/components/dropdown-menu/pk-dropdown-item.js';
import '@verbb/plugin-kit-web/components/dropdown-menu/pk-dropdown-label.js';
import '@verbb/plugin-kit-web/components/dropdown-menu/pk-dropdown-separator.js';
import '@verbb/plugin-kit-web/components/button/pk-button.js';
import '@verbb/plugin-kit-web/components/icon/pk-icon.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

export default defineWebPreview({
    label: 'Submenus',
    title: 'Submenus example',
    layout: 'plain',
    html: `
<pk-dropdown-menu>
  <pk-button slot="trigger" with-caret>Open menu</pk-button>
  <pk-dropdown-item value="new">New File</pk-dropdown-item>
  <pk-dropdown-item value="share">
    Share
    <pk-dropdown-menu slot="submenu">
      <pk-dropdown-item value="email">Email</pk-dropdown-item>
      <pk-dropdown-item value="link">Copy link</pk-dropdown-item>
    </pk-dropdown-menu>
  </pk-dropdown-item>
</pk-dropdown-menu>
`.trim(),
});
