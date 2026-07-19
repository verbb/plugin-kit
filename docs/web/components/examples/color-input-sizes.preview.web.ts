import '@verbb/plugin-kit-web/components/color-input/pk-color-input.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

const sizes = ['xs', 'sm', 'default', 'lg', 'xl'] as const;

const sizeRow = (size: (typeof sizes)[number]) => {
    const sizeAttr = size === 'default' ? '' : ` size="${size}"`;

    return `
<div style="display:flex;align-items:center;gap:16px">
  <div style="width:64px;font-size:12px;color:#64748b;flex-shrink:0">${size}</div>
  <div style="display:flex;flex-direction:column;gap:4px">
    <pk-color-input value="#35e533"${sizeAttr}></pk-color-input>
    <div style="font-size:11px;color:#4b5563">Value: <code>#35e533</code></div>
  </div>
</div>`.trim();
};

const source = `
<pk-color-input size="xs" value="#35e533"></pk-color-input>
<pk-color-input size="sm" value="#35e533"></pk-color-input>
<pk-color-input value="#35e533"></pk-color-input>
<pk-color-input size="lg" value="#35e533"></pk-color-input>
<pk-color-input size="xl" value="#35e533"></pk-color-input>
`.trim();

export default defineWebPreview({
    label: 'Sizes',
    title: 'Sizes example',
    layout: 'stack',
    code: source,
    html: `
<div style="display:flex;flex-direction:column;gap:12px">
  ${sizes.map(sizeRow).join('\n  ')}
</div>
`.trim(),
});
