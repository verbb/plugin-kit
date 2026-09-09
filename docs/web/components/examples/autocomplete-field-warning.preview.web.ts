import '@verbb/plugin-kit-web/components/field/pk-field.js';
import '@verbb/plugin-kit-web/components/autocomplete/pk-autocomplete.js';
import '@verbb/plugin-kit-web/components/select/pk-option.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

export default defineWebPreview({
    label: 'Field warning',
    title: 'Missing path warning',
    layout: 'stack',
    html: `
<pk-field
  label="Icons Path"
  instructions="Folder of SVG files available as custom nav icons. Supports Craft aliases like \`@webroot\`."
  warning="This path does not exist yet — save the setting, then create the folder."
>
  <pk-autocomplete width="full" value="@webroot/cpnav-icons-new/">
    <pk-option value="@webroot/">@webroot/</pk-option>
    <pk-option value="@webroot/cpnav-icons/">@webroot/cpnav-icons/</pk-option>
    <pk-option value="@webroot/cpnav-icons-new/">@webroot/cpnav-icons-new/</pk-option>
    <pk-option value="@storage/icons/">@storage/icons/</pk-option>
  </pk-autocomplete>
</pk-field>
`.trim(),
});
