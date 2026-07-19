import '@verbb/plugin-kit-web/components/input/pk-input.js';
import '@verbb/plugin-kit-web/components/icon/pk-icon.js';
import '@verbb/plugin-kit-web/components/input-group/pk-input-group.js';
import '@verbb/plugin-kit-web/components/input-group/pk-input-group-input.js';
import '@verbb/plugin-kit-web/components/input-group/pk-input-group-addon.js';
import '@verbb/plugin-kit-web/components/input-group/pk-input-group-text.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

export default defineWebPreview({
    label: 'Adornments',
    title: 'Input adornment examples',
    layout: 'stack',
    html: `
<pk-input placeholder="Search entries" style="max-width:20rem">
  <pk-icon slot="start" icon="search"></pk-icon>
</pk-input>
<pk-input-group style="max-width:20rem">
  <pk-input-group-input value="49"></pk-input-group-input>
  <pk-input-group-addon align="inline-end">
    <pk-input-group-text>USD</pk-input-group-text>
  </pk-input-group-addon>
</pk-input-group>
`.trim(),
});
