import '@verbb/plugin-kit-web/components/code-editor/pk-code-editor.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';
import { encodeCodeEditorValue } from './encodeCodeEditorValue';

// Matches the React `code-editor-long-html` example (Formie-style notification template).
const emailTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>Submission received</title>
</head>
<body>
  <p>Hi {{ user.name }},</p>
  <p>
    Your submission for <strong>{{ form.title }}</strong> was received.
  </p>
  <ul>
    <li>Reference: {{ submission.id }}</li>
    <li>Submitted: {{ submission.date }}</li>
  </ul>
  <p>Thanks,<br />{{ siteName }}</p>
</body>
</html>`;

const markup = `<pk-code-editor language="html" rows="14" value="${encodeCodeEditorValue(emailTemplate)}"></pk-code-editor>`;

export default defineWebPreview({
    label: 'Longer HTML',
    title: 'Longer HTML template example',
    layout: 'plain',
    html: markup,
    code: markup,
});
