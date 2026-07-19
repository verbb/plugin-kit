import '@verbb/plugin-kit-web/components/button-group/pk-button-group.js';
import '@verbb/plugin-kit-web/components/button/pk-button.js';
import '@verbb/plugin-kit-web/components/icon/pk-icon.js';
import '@verbb/plugin-kit-web/components/dropdown-menu/pk-dropdown-menu.js';
import '@verbb/plugin-kit-web/components/dropdown-menu/pk-dropdown-item.js';
import '@verbb/plugin-kit-web/components/dropdown-menu/pk-dropdown-separator.js';
import '@verbb/plugin-kit-web/components/popover/pk-popover.js';
import '@verbb/plugin-kit-web/components/input/pk-input.js';
import '@verbb/plugin-kit-web/components/input-group/pk-input-group.js';
import '@verbb/plugin-kit-web/components/input-group/pk-input-group-input.js';
import '@verbb/plugin-kit-web/components/input-group/pk-input-group-addon.js';
import '@verbb/plugin-kit-web/components/input-group/pk-input-group-text.js';
import '@verbb/plugin-kit-web/components/input-group/pk-input-group-button.js';
import '@verbb/plugin-kit-web/components/separator/pk-separator.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

export default defineWebPreview({
    label: 'Other Controls',
    title: 'Other controls example',
    layout: 'plain',
    html: `
<pk-button-group>
  <pk-input placeholder="Search" style="width:12rem"></pk-input>
  <pk-button variant="primary">Search</pk-button>
</pk-button-group>
`.trim(),
});
