import '@verbb/plugin-kit-web/components/icon/pk-icon.js';
import '@verbb/plugin-kit-web/components/input-group/pk-input-group.js';
import '@verbb/plugin-kit-web/components/input-group/pk-input-group-input.js';
import '@verbb/plugin-kit-web/components/input-group/pk-input-group-addon.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

export default defineWebPreview({
    label: "Icon Addons",
    title: "Icon addons example",
    layout: "stack",
    html: `
<pk-input-group>
  <pk-input-group-input placeholder="Search..."></pk-input-group-input>
  <pk-input-group-addon>
    <pk-icon icon="search" aria-hidden="true"></pk-icon>
  </pk-input-group-addon>
</pk-input-group>
<pk-input-group>
  <pk-input-group-input placeholder="Search..."></pk-input-group-input>
  <pk-input-group-addon align="inline-end">
    <pk-icon icon="search" aria-hidden="true"></pk-icon>
  </pk-input-group-addon>
</pk-input-group>
`.trim(),
});
