import '@verbb/plugin-kit-web/components/icon/pk-icon.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

export default defineWebPreview({
    label: "Sizing",
    title: "Sizing example",
    layout: "row",
    html: `
<pk-icon icon="gear" style="font-size:12px"></pk-icon>
<pk-icon icon="gear" style="font-size:16px"></pk-icon>
<pk-icon icon="gear" style="font-size:20px"></pk-icon>
<pk-icon icon="gear" style="font-size:24px"></pk-icon>
<pk-icon icon="gear" style="font-size:32px"></pk-icon>
<pk-icon icon="gear" style="font-size:48px"></pk-icon>
`.trim(),
});
