import '@verbb/plugin-kit-web/components/autocomplete/pk-autocomplete.js';
import '@verbb/plugin-kit-web/components/select/pk-option.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

export default defineWebPreview({
    label: 'Basic',
    title: 'Freeform path suggestions',
    layout: 'stack',
    html: `
<pk-autocomplete
  label="Icons Path"
  instructions="Provide the full path to your icon files. Aliases are also supported."
  placeholder="Type a path or pick an alias…"
  width="full"
  value="@webroot/"
>
  <pk-option value="@webroot/">@webroot/</pk-option>
  <pk-option value="@webroot/cpnav-icons/">@webroot/cpnav-icons/</pk-option>
  <pk-option value="@storage/">@storage/</pk-option>
  <pk-option value="$PRIMARY_SITE_URL">$PRIMARY_SITE_URL</pk-option>
</pk-autocomplete>
`.trim(),
});
