import '@verbb/plugin-kit-web/components/icon/pk-icon.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

export default defineWebPreview({
    label: "Accessibility",
    title: "Accessibility example",
    layout: "row",
    html: `
<pk-icon icon="trash"></pk-icon>
<pk-icon icon="trash" label="Delete"></pk-icon>
`.trim(),
});
