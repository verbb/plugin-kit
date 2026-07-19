import '@verbb/plugin-kit-web/components/icon/pk-icon.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

export default defineWebPreview({
    label: "Common Icons",
    title: "Common icons example",
    layout: "row",
    html: `
<pk-icon icon="plus"></pk-icon>
<pk-icon icon="xmark"></pk-icon>
<pk-icon icon="chevron-down"></pk-icon>
<pk-icon icon="pen"></pk-icon>
<pk-icon icon="gear"></pk-icon>
<pk-icon icon="ellipsis"></pk-icon>
<pk-icon icon="trash"></pk-icon>
<pk-icon icon="check"></pk-icon>
<pk-icon icon="search"></pk-icon>
`.trim(),
});
