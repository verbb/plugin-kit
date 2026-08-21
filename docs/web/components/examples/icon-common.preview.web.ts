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
<pk-icon icon="magnifying-glass"></pk-icon>
<pk-icon icon="arrows-rotate"></pk-icon>
<pk-icon icon="grip-move"></pk-icon>
<pk-icon icon="sliders"></pk-icon>
<pk-icon icon="lock"></pk-icon>
<pk-icon icon="circle-info"></pk-icon>
<pk-icon icon="circle-check"></pk-icon>
<pk-icon icon="circle-exclamation"></pk-icon>
`.trim(),
});
