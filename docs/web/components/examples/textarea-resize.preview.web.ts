import '@verbb/plugin-kit-web/components/textarea/pk-textarea.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

export default defineWebPreview({
    label: 'Resize',
    title: 'Resize example',
    layout: 'stack',
    // &#10; encodes newlines so the attribute and live preview stay in sync.
    html: `
<pk-textarea value="Try dragging the resize handle.&#10;&#10;It should resize vertically."></pk-textarea>
`.trim(),
});
