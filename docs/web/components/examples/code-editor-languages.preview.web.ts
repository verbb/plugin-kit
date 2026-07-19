import '@verbb/plugin-kit-web/components/code-editor/pk-code-editor.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';
import { encodeCodeEditorValue } from './encodeCodeEditorValue';

// Matches React `code-editor-languages` samples.
const javascriptSample = `export function buildSettings(config) {
  return {
    enabled: config.enabled ?? true,
    retries: Math.max(1, config.retries ?? 3),
    notify: config.notify ?? 'admin',
  };
}`;

const cssSample = `.notification-banner {
  display: flex;
  gap: 0.75rem;
  padding: 0.875rem 1rem;
  border: 1px solid rgba(96, 125, 159, 0.35);
  border-radius: 0.375rem;
  background: #ffffff;
}`;

const jsonSample = `{
  "enabled": true,
  "settings": {
    "subject": "New submission",
    "template": "notifications/submission-received"
  }
}`;

const markup = `
<div style="display:flex;flex-direction:column;gap:1.5rem">
  <pk-code-editor language="javascript" rows="8" value="${encodeCodeEditorValue(javascriptSample)}"></pk-code-editor>
  <pk-code-editor language="css" rows="7" value="${encodeCodeEditorValue(cssSample)}"></pk-code-editor>
  <pk-code-editor language="json" rows="7" value="${encodeCodeEditorValue(jsonSample)}"></pk-code-editor>
</div>
`.trim();

export default defineWebPreview({
    label: 'Other Languages',
    title: 'JavaScript, CSS, and JSON examples',
    layout: 'plain',
    html: markup,
    code: markup,
});
