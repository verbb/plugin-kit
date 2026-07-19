import '@verbb/plugin-kit-web/components/icon/pk-icon.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

export default defineWebPreview({
    label: "Color",
    title: "Color example",
    layout: "row",
    html: `
<pk-icon icon="triangle-exclamation" style="color:#1c2e36;font-size:24px"></pk-icon>
<pk-icon icon="triangle-exclamation" style="color:#64748b;font-size:24px"></pk-icon>
<pk-icon icon="triangle-exclamation" style="color:#0ea5e9;font-size:24px"></pk-icon>
<pk-icon icon="triangle-exclamation" style="color:#10b981;font-size:24px"></pk-icon>
<pk-icon icon="triangle-exclamation" style="color:#f59e0b;font-size:24px"></pk-icon>
<pk-icon icon="triangle-exclamation" style="color:#ef4444;font-size:24px"></pk-icon>
`.trim(),
});
