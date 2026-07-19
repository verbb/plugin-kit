export const codeEditorPlaygroundMeta = {
    eyebrow: 'Components',
    title: 'CodeEditor',
    description: 'CodeMirror field with syntax highlighting.',
} as const;

export const codeEditorPlaygroundSections = {
    basic: {
        title: 'Basic usage',
        description: 'HTML mode with line numbers and `pk-change` output.',
        initialValue: '<p>Hello {{ name }}</p>',
    },
    longerHtml: {
        title: 'Longer HTML template',
        description: 'Multi-line HTML content.',
        rows: 14,
        initialValue: `<!DOCTYPE html>
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
</html>`,
    },
    languages: {
        title: 'Other languages',
        description: 'javascript, css, json, text.',
        javascript: {
            value: `export function buildSettings(config) {
  return {
    enabled: config.enabled ?? true,
    retries: Math.max(1, config.retries ?? 3),
    notify: config.notify ?? 'admin',
  };
}`,
            rows: 8,
        },
        css: {
            value: `.notification-banner {
  display: flex;
  gap: 0.75rem;
  padding: 0.875rem 1rem;
  border: 1px solid rgba(96, 125, 159, 0.35);
  border-radius: 0.375rem;
  background: #ffffff;
}

.notification-banner strong {
  color: rgb(31, 41, 51);
}`,
            rows: 10,
        },
        json: {
            value: `{
  "enabled": true,
  "settings": {
    "subject": "New submission",
    "template": "notifications/submission-received",
    "recipients": ["admin@example.com"]
  }
}`,
            rows: 9,
        },
        text: {
            value: `export function hello() {
  return "world";
}`,
            rows: 4,
        },
    },
    validationAndReadOnly: {
        title: 'Validation and read-only',
        description: 'Invalid, readonly, and disabled states.',
        invalidValue: '<p>Invalid markup</p>',
        readOnlyValue: '<p>Read-only content</p>',
    },
    layoutOptions: {
        title: 'Rows, tab size, and line numbers',
        description: '`rows`, `tab-size`, and `line-numbers`.',
        sampleValue: `<section>
  <h2>Order summary</h2>
  <p>Status: {{ order.status }}</p>
  <ul>
    <li>{{ line.one }}</li>
    <li>{{ line.two }}</li>
  </ul>
</section>`,
        tabSampleValue: `<section>
\t<h2>Order summary</h2>
\t<p>Status: {{ order.status }}</p>
\t<ul>
\t\t<li>{{ line.one }}</li>
\t\t<li>{{ line.two }}</li>
\t</ul>
</section>`,
        rows: {
            compact: 4,
            spacious: 16,
        },
        tabSize: {
            narrow: 2,
            wide: 8,
        },
    },
} as const;

export type CodeEditorPlaygroundLanguage = 'html' | 'text' | 'javascript' | 'css' | 'json';
