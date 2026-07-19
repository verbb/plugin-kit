import '@verbb/plugin-kit-web/components/dropdown-menu/pk-dropdown-menu.js';
import '@verbb/plugin-kit-web/components/dropdown-menu/pk-dropdown-item.js';
import '@verbb/plugin-kit-web/components/dropdown-menu/pk-dropdown-label.js';
import '@verbb/plugin-kit-web/components/dropdown-menu/pk-dropdown-separator.js';
import '@verbb/plugin-kit-web/components/button/pk-button.js';
import '@verbb/plugin-kit-web/components/icon/pk-icon.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

export default defineWebPreview({
    label: 'Grouped Options',
    title: 'Grouped options example',
    layout: 'plain',
    html: `
<pk-dropdown-menu>
  <pk-button slot="trigger" with-caret>Open menu</pk-button>
  <pk-dropdown-label>General</pk-dropdown-label>
  <pk-dropdown-item value="new-file">New File</pk-dropdown-item>
  <pk-dropdown-item value="duplicate">Duplicate</pk-dropdown-item>
  <pk-dropdown-separator></pk-dropdown-separator>
  <pk-dropdown-label>Preferences</pk-dropdown-label>
  <pk-dropdown-item value="line-numbers" type="checkbox" checked>Show line numbers</pk-dropdown-item>
  <pk-dropdown-item value="word-wrap" type="checkbox">Word wrap</pk-dropdown-item>
</pk-dropdown-menu>
`.trim(),
});
