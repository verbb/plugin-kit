import '@verbb/plugin-kit-web/components/combobox/pk-combobox.js';
import '@verbb/plugin-kit-web/components/select/pk-option.js';
import '@verbb/plugin-kit-web/components/select/pk-option-group.js';
import '@verbb/plugin-kit-web/components/separator/pk-separator.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

const fruitOptions = `
<pk-option value="apple">Apple</pk-option>
<pk-option value="banana">Banana</pk-option>
<pk-option value="blueberry">Blueberry</pk-option>
<pk-option value="grapes">Grapes</pk-option>
<pk-option value="pineapple">Pineapple</pk-option>
`.trim();

const sizeRow = (label: string, sizeAttr: string) => `
<div style="display:flex;align-items:center;gap:12px">
  <div style="width:96px;font-size:12px;color:#64748b;flex-shrink:0">${label}</div>
  <pk-combobox${sizeAttr} placeholder="Select a fruit" value="apple">${fruitOptions}</pk-combobox>
</div>
`.trim();

const markup = `
<div style="display:flex;flex-direction:column;gap:12px">
  ${sizeRow('Extra small', ' size="xs"')}
  ${sizeRow('Small', ' size="sm"')}
  ${sizeRow('Default', '')}
  ${sizeRow('Large', ' size="lg"')}
</div>
`.trim();

export default defineWebPreview({
    label: 'Sizes',
    title: 'Sizes example',
    layout: 'stack',
    // Copyable snippet stays the four controls without demo row labels.
    code: `
<pk-combobox size="xs" placeholder="Select a fruit" value="apple">${fruitOptions}</pk-combobox>
<pk-combobox size="sm" placeholder="Select a fruit" value="apple">${fruitOptions}</pk-combobox>
<pk-combobox placeholder="Select a fruit" value="apple">${fruitOptions}</pk-combobox>
<pk-combobox size="lg" placeholder="Select a fruit" value="apple">${fruitOptions}</pk-combobox>
`.trim(),
    html: markup,
});
