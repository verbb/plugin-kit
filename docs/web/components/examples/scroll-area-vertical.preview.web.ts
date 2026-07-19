import '@verbb/plugin-kit-web/components/scroll-area/pk-scroll-area.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

export default defineWebPreview({
    label: 'Basic Vertical Scrolling',
    title: 'Basic vertical scrolling example',
    layout: 'plain',
    html: `
<pk-scroll-area style="height:8rem;width:16rem">
  <div style="padding:8px;display:flex;flex-direction:column;gap:8px">
    <div>Item 1</div><div>Item 2</div><div>Item 3</div><div>Item 4</div><div>Item 5</div><div>Item 6</div><div>Item 7</div><div>Item 8</div>
  </div>
</pk-scroll-area>
`.trim(),
});
