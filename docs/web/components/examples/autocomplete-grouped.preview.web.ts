import '@verbb/plugin-kit-web/components/autocomplete/pk-autocomplete.js';
import '@verbb/plugin-kit-web/components/select/pk-option.js';
import '@verbb/plugin-kit-web/components/select/pk-option-group.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

export default defineWebPreview({
    label: 'Grouped',
    title: 'Grouped aliases and env vars',
    layout: 'stack',
    html: `
<pk-autocomplete width="full" placeholder="Path, alias, or env…">
  <pk-option-group label="Aliases">
    <pk-option value="@webroot/">@webroot/</pk-option>
    <pk-option value="@storage/">@storage/</pk-option>
  </pk-option-group>
  <pk-option-group label="Environment">
    <pk-option value="$PRIMARY_SITE_URL">$PRIMARY_SITE_URL</pk-option>
    <pk-option value="$CRAFT_WEB_ROOT">$CRAFT_WEB_ROOT</pk-option>
  </pk-option-group>
</pk-autocomplete>
`.trim(),
});
