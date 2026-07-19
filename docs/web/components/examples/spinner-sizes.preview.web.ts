import '@verbb/plugin-kit-web/components/spinner/pk-spinner.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

const sizes = ['xxs', 'xs', 'sm', 'md', 'lg', 'xl'] as const;

const items = sizes.map((size) => `
<div style="display:flex;align-items:center;gap:8px">
  <pk-spinner size="${size}"></pk-spinner>
  <span style="font-size:12px;color:#64748b">${size}</span>
</div>`).join('\n');

export default defineWebPreview({
    label: 'Sizes',
    title: 'Sizes example',
    layout: 'plain',
    html: `
<div style="display:flex;flex-wrap:wrap;align-items:center;gap:24px">
${items}
</div>
`.trim(),
});
