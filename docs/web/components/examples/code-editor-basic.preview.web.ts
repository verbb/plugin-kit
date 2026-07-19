import '@verbb/plugin-kit-web/components/code-editor/pk-code-editor.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

export default defineWebPreview({
    label: 'Basic Usage',
    title: 'Basic usage example',
    layout: 'plain',
    html: `
<pk-code-editor language="html" value="&lt;p&gt;Hello &lt;strong&gt;world&lt;/strong&gt;&lt;/p&gt;" rows="8"></pk-code-editor>
`.trim(),
});
