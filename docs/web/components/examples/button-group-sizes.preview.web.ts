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
    label: 'Sizes',
    title: 'Sizes example',
    layout: 'stack',
    html: `
<pk-button-group>
  <pk-button size="xxs" variant="primary">Extra extra small</pk-button>
  <pk-button size="xxs" variant="primary">Group</pk-button>
</pk-button-group>
<pk-button-group>
  <pk-button size="xs" variant="primary">Extra small</pk-button>
  <pk-button size="xs" variant="primary">Group</pk-button>
</pk-button-group>
<pk-button-group>
  <pk-button size="sm" variant="primary">Small</pk-button>
  <pk-button size="sm" variant="primary">Group</pk-button>
</pk-button-group>
<pk-button-group>
  <pk-button size="default" variant="primary">Default</pk-button>
  <pk-button size="default" variant="primary">Group</pk-button>
</pk-button-group>
<pk-button-group>
  <pk-button size="lg" variant="primary">Large</pk-button>
  <pk-button size="lg" variant="primary">Group</pk-button>
</pk-button-group>
<pk-button-group>
  <pk-button size="xl" variant="primary">Extra large</pk-button>
  <pk-button size="xl" variant="primary">Group</pk-button>
</pk-button-group>
`.trim(),
});
