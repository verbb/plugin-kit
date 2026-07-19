import '@verbb/plugin-kit-web/components/dropdown-menu/pk-dropdown-menu.js';
import '@verbb/plugin-kit-web/components/dropdown-menu/pk-dropdown-item.js';
import '@verbb/plugin-kit-web/components/dropdown-menu/pk-dropdown-separator.js';
import '@verbb/plugin-kit-web/components/button/pk-button.js';
import '@verbb/plugin-kit-web/components/icon/pk-icon.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

export default defineWebPreview({
    label: "Item Icons",
    title: "Items with icons example",
    layout: "plain",
    html: `
<pk-dropdown-menu>
  <pk-button slot="trigger" aria-label="Field actions">
    <pk-icon slot="start" icon="ellipsis"></pk-icon>
  </pk-button>
  <pk-dropdown-item value="edit">
    <pk-icon slot="prefix" icon="pen" aria-hidden="true"></pk-icon>
    Edit
  </pk-dropdown-item>
  <pk-dropdown-item value="make-required">
    <pk-icon slot="prefix" icon="asterisk" aria-hidden="true"></pk-icon>
    Make required
  </pk-dropdown-item>
  <pk-dropdown-item value="duplicate">
    <pk-icon slot="prefix" icon="copy" aria-hidden="true"></pk-icon>
    Duplicate
  </pk-dropdown-item>
  <pk-dropdown-separator></pk-dropdown-separator>
  <pk-dropdown-item value="move-up">
    <pk-icon slot="prefix" icon="arrow-up" aria-hidden="true"></pk-icon>
    Move up
  </pk-dropdown-item>
  <pk-dropdown-item value="move-down">
    <pk-icon slot="prefix" icon="arrow-down" aria-hidden="true"></pk-icon>
    Move down
  </pk-dropdown-item>
  <pk-dropdown-separator></pk-dropdown-separator>
  <pk-dropdown-item value="delete" destructive>
    <pk-icon slot="prefix" icon="xmark" aria-hidden="true"></pk-icon>
    Delete
  </pk-dropdown-item>
</pk-dropdown-menu>
`.trim(),
});
