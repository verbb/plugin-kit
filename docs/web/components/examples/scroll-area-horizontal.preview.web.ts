import '@verbb/plugin-kit-web/components/scroll-area/pk-scroll-area.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

export default defineWebPreview({
    label: 'Horizontal Scrolling',
    title: 'Horizontal scrolling example',
    layout: 'plain',
    html: `
<pk-scroll-area orientation="horizontal" style="width:16rem">
  <div style="display:flex;gap:8px;width:max-content;padding:8px">
    <div style="min-width:6rem">Alpha</div><div style="min-width:6rem">Beta</div><div style="min-width:6rem">Gamma</div><div style="min-width:6rem">Delta</div>
  </div>
</pk-scroll-area>
`.trim(),
});
