import '@verbb/plugin-kit-web/components/popover/pk-popover.js';
import '@verbb/plugin-kit-web/components/button/pk-button.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

export default defineWebPreview({
    label: "With Arrow",
    title: "With arrow example",
    layout: "row",
    html: `
<pk-popover with-arrow placement="top">
  <pk-button slot="trigger">Top</pk-button>
  <div>
    <strong style="font-size:14px">Arrow popover</strong>
    <p style="margin:4px 0 0;font-size:13px;color:#64748b;line-height:1.5">The arrow tracks placement and stays aimed at the trigger.</p>
  </div>
</pk-popover>
<pk-popover with-arrow placement="right">
  <pk-button slot="trigger">Right</pk-button>
  <div>
    <strong style="font-size:14px">Arrow popover</strong>
    <p style="margin:4px 0 0;font-size:13px;color:#64748b;line-height:1.5">The arrow tracks placement and stays aimed at the trigger.</p>
  </div>
</pk-popover>
<pk-popover with-arrow placement="bottom">
  <pk-button slot="trigger">Bottom</pk-button>
  <div>
    <strong style="font-size:14px">Arrow popover</strong>
    <p style="margin:4px 0 0;font-size:13px;color:#64748b;line-height:1.5">The arrow tracks placement and stays aimed at the trigger.</p>
  </div>
</pk-popover>
<pk-popover with-arrow placement="left">
  <pk-button slot="trigger">Left</pk-button>
  <div>
    <strong style="font-size:14px">Arrow popover</strong>
    <p style="margin:4px 0 0;font-size:13px;color:#64748b;line-height:1.5">The arrow tracks placement and stays aimed at the trigger.</p>
  </div>
</pk-popover>
`.trim(),
});
