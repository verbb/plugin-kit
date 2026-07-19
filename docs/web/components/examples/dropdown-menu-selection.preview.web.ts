import '@verbb/plugin-kit-web/components/dropdown-menu/pk-dropdown-menu.js';
import '@verbb/plugin-kit-web/components/dropdown-menu/pk-dropdown-item.js';
import '@verbb/plugin-kit-web/components/dropdown-menu/pk-dropdown-label.js';
import '@verbb/plugin-kit-web/components/dropdown-menu/pk-dropdown-separator.js';
import '@verbb/plugin-kit-web/components/button/pk-button.js';
import '@verbb/plugin-kit-web/components/icon/pk-icon.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

export default defineWebPreview({
    label: 'Selection Items',
    title: 'Dropdown menu selection item example',
    layout: 'plain',
    html: `
<pk-dropdown-menu>
  <pk-button slot="trigger" with-caret>View</pk-button>
  <pk-dropdown-item value="cards" type="radio" radio-group="view" checked>Cards</pk-dropdown-item>
  <pk-dropdown-item value="table" type="radio" radio-group="view">Table</pk-dropdown-item>
  <pk-dropdown-separator></pk-dropdown-separator>
  <pk-dropdown-item value="compact" type="checkbox">Compact density</pk-dropdown-item>
</pk-dropdown-menu>
`.trim(),
});
