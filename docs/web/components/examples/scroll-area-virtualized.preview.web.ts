import '@verbb/plugin-kit-web/components/scroll-area/pk-scroll-area.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

export default defineWebPreview({
    label: 'Long Lists',
    title: 'Long lists example',
    layout: 'stack',
    html: `
<pk-scroll-area style="height:10rem;width:18rem">
  <div style="padding:8px;display:flex;flex-direction:column;gap:6px">
    <div>Row 1</div><div>Row 2</div><div>Row 3</div><div>Row 4</div><div>Row 5</div><div>Row 6</div><div>Row 7</div><div>Row 8</div><div>Row 9</div><div>Row 10</div><div>Row 11</div><div>Row 12</div><div>Row 13</div><div>Row 14</div><div>Row 15</div><div>Row 16</div><div>Row 17</div><div>Row 18</div><div>Row 19</div><div>Row 20</div>
  </div>
</pk-scroll-area>
`.trim(),
});
