import '@verbb/plugin-kit-web/components/checkbox/pk-checkbox.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

export default defineWebPreview({
    label: 'Basic Usage',
    title: 'Basic usage example',
    layout: 'row',
    html: `
<pk-checkbox>Enable notifications</pk-checkbox>
`.trim(),
});
