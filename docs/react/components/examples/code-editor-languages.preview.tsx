import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

// #region example
import { CodeEditor } from '@verbb/plugin-kit-react/components';

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

const stackStyle = { display: 'flex', flexDirection: 'column', gap: '1.5rem' } as const;

export function CodeEditorLanguagesExample() {
    return (
        <div style={stackStyle}>
            <CodeEditor
                value={javascriptSample}
                onChange={() => {}}
                language="javascript"
                rows={8}
            />
            <CodeEditor
                value={cssSample}
                onChange={() => {}}
                language="css"
                rows={7}
            />
            <CodeEditor
                value={jsonSample}
                onChange={() => {}}
                language="json"
                rows={7}
            />
        </div>
    );
}
// #endregion example

const preview: PreviewSourceDefinition = {
    label: 'Other Languages',
    title: 'JavaScript, CSS, and JSON examples',
    language: 'tsx',
    source: true,
    render: () => <CodeEditorLanguagesExample />,
};

export default preview;
