import '@verbb/plugin-kit-web/components/button-group/pk-button-group.js';
import '@verbb/plugin-kit-web/components/button/pk-button.js';
import '@verbb/plugin-kit-web/components/dropdown-menu/pk-dropdown-menu.js';
import '@verbb/plugin-kit-web/components/dropdown-menu/pk-dropdown-item.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

export default defineWebPreview({
    label: 'Dropdown',
    title: 'Dropdown example',
    layout: 'plain',
    html: `
<pk-button-group>
  <pk-button variant="primary">Actions</pk-button>
  <pk-dropdown-menu>
    <pk-button slot="trigger" variant="primary" group-trigger aria-label="More actions"></pk-button>
    <pk-dropdown-item value="duplicate">Duplicate</pk-dropdown-item>
    <pk-dropdown-item value="delete" destructive>Delete</pk-dropdown-item>
  </pk-dropdown-menu>
</pk-button-group>
`.trim(),
});
