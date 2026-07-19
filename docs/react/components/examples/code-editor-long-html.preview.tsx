import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

// #region example
import { CodeEditor } from '@verbb/plugin-kit-react/components';

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

export function CodeEditorLongHtmlExample() {
    return (
        <CodeEditor
            value={emailTemplate}
            onChange={() => {}}
            language="html"
            rows={14}
        />
    );
}
// #endregion example

const preview: PreviewSourceDefinition = {
    label: 'Longer HTML',
    title: 'Longer HTML template example',
    language: 'tsx',
    source: true,
    render: () => <CodeEditorLongHtmlExample />,
};

export default preview;
