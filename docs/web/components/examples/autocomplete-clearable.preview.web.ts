import '@verbb/plugin-kit-web/components/autocomplete/pk-autocomplete.js';
import '@verbb/plugin-kit-web/components/select/pk-option.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

export default defineWebPreview({
    label: 'Clearable',
    title: 'Clearable autocomplete',
    layout: 'stack',
    html: `
<pk-autocomplete
  clearable
  width="full"
  placeholder="Icons path…"
  value="@webroot/cpnav-icons/"
>
  <pk-option value="@webroot/">@webroot/</pk-option>
  <pk-option value="@webroot/cpnav-icons/">@webroot/cpnav-icons/</pk-option>
  <pk-option value="@storage/icons/">@storage/icons/</pk-option>
</pk-autocomplete>
`.trim(),
});
