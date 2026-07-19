import '@verbb/plugin-kit-web/components/checkbox/pk-checkbox.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

export default defineWebPreview({
    label: 'Descriptions',
    title: 'Descriptions example',
    layout: 'stack',
    html: `
<pk-checkbox hint="Receive email when entries are updated.">Enable notifications</pk-checkbox>
`.trim(),
});
