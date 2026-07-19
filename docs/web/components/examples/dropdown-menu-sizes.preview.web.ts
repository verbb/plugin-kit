import '@verbb/plugin-kit-web/components/dropdown-menu/pk-dropdown-menu.js';
import '@verbb/plugin-kit-web/components/dropdown-menu/pk-dropdown-item.js';
import '@verbb/plugin-kit-web/components/dropdown-menu/pk-dropdown-label.js';
import '@verbb/plugin-kit-web/components/dropdown-menu/pk-dropdown-separator.js';
import '@verbb/plugin-kit-web/components/button/pk-button.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

export default defineWebPreview({
    label: "Sizes",
    title: "Dropdown sizes example",
    layout: "row",
    html: `
<pk-dropdown-menu size="xs">
  <pk-button slot="trigger" size="xs" with-caret>xs</pk-button>
  <pk-dropdown-label>Actions</pk-dropdown-label>
  <pk-dropdown-item value="edit">Edit</pk-dropdown-item>
  <pk-dropdown-item value="duplicate">Duplicate</pk-dropdown-item>
  <pk-dropdown-separator></pk-dropdown-separator>
  <pk-dropdown-item value="delete" destructive>Delete</pk-dropdown-item>
</pk-dropdown-menu>
<pk-dropdown-menu size="sm">
  <pk-button slot="trigger" size="sm" with-caret>sm</pk-button>
  <pk-dropdown-label>Actions</pk-dropdown-label>
  <pk-dropdown-item value="edit">Edit</pk-dropdown-item>
  <pk-dropdown-item value="duplicate">Duplicate</pk-dropdown-item>
  <pk-dropdown-separator></pk-dropdown-separator>
  <pk-dropdown-item value="delete" destructive>Delete</pk-dropdown-item>
</pk-dropdown-menu>
<pk-dropdown-menu>
  <pk-button slot="trigger" with-caret>default</pk-button>
  <pk-dropdown-label>Actions</pk-dropdown-label>
  <pk-dropdown-item value="edit">Edit</pk-dropdown-item>
  <pk-dropdown-item value="duplicate">Duplicate</pk-dropdown-item>
  <pk-dropdown-separator></pk-dropdown-separator>
  <pk-dropdown-item value="delete" destructive>Delete</pk-dropdown-item>
</pk-dropdown-menu>
<pk-dropdown-menu size="lg">
  <pk-button slot="trigger" size="lg" with-caret>lg</pk-button>
  <pk-dropdown-label>Actions</pk-dropdown-label>
  <pk-dropdown-item value="edit">Edit</pk-dropdown-item>
  <pk-dropdown-item value="duplicate">Duplicate</pk-dropdown-item>
  <pk-dropdown-separator></pk-dropdown-separator>
  <pk-dropdown-item value="delete" destructive>Delete</pk-dropdown-item>
</pk-dropdown-menu>
`.trim(),
});
