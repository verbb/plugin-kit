import '@verbb/plugin-kit-web/components/code-editor/pk-code-editor.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';
import { encodeCodeEditorValue } from './encodeCodeEditorValue';

// Matches React `code-editor-states` samples.
const markup = `
<div style="display:flex;flex-direction:column;gap:1rem">
  <pk-code-editor language="html" invalid rows="4" value="${encodeCodeEditorValue('<p>Invalid markup</p>')}"></pk-code-editor>
  <pk-code-editor language="html" readonly rows="4" value="${encodeCodeEditorValue('<p>Read-only content</p>')}"></pk-code-editor>
</div>
`.trim();

export default defineWebPreview({
    label: 'Validation and Read-only',
    title: 'Validation and read-only states',
    layout: 'plain',
    html: markup,
    code: markup,
});
