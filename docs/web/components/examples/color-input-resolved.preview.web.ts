import '@verbb/plugin-kit-web/components/color-input/pk-color-input.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

const row = (displayValue: string, inputAttrs: string) => `
<div style="display:flex;flex-direction:column;gap:4px">
  <pk-color-input${inputAttrs}></pk-color-input>
  <div style="font-size:11px;color:#4b5563">Value: <code>${displayValue}</code></div>
</div>`.trim();

const source = `
<pk-color-input></pk-color-input>
<pk-color-input value="#a9"></pk-color-input>
<pk-color-input value="#9c4"></pk-color-input>
<pk-color-input value="#35e533"></pk-color-input>
<pk-color-input value="#35e533" invalid></pk-color-input>
<pk-color-input value="#35e533" disabled></pk-color-input>
`.trim();

export default defineWebPreview({
    label: 'Resolved Values',
    title: 'Resolved values example',
    layout: 'stack',
    code: source,
    html: `
<div style="display:flex;flex-direction:column;gap:16px;max-width:26rem">
  ${row('(empty)', '')}
  ${row('#a9', ' value="#a9"')}
  ${row('#9c4', ' value="#9c4"')}
  ${row('#35e533', ' value="#35e533"')}
  ${row('#35e533', ' value="#35e533" invalid')}
  ${row('#35e533', ' value="#35e533" disabled')}
</div>
`.trim(),
});
