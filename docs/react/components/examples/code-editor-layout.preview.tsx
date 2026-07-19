import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

// #region example
import { CodeEditor } from '@verbb/plugin-kit-react/components';

const sampleMarkup = `<section>
  <h2>Order summary</h2>
  <p>Status: {{ order.status }}</p>
  <ul>
    <li>{{ line.one }}</li>
    <li>{{ line.two }}</li>
  </ul>
</section>`;

const tabIndentedMarkup = `<section>
\t<h2>Order summary</h2>
\t<p>Status: {{ order.status }}</p>
\t<ul>
\t\t<li>{{ line.one }}</li>
\t\t<li>{{ line.two }}</li>
\t</ul>
</section>`;

const stackStyle = { display: 'flex', flexDirection: 'column', gap: '1.5rem' } as const;
const groupStyle = { display: 'flex', flexDirection: 'column', gap: '0.5rem' } as const;
const labelStyle = { fontSize: 14, fontWeight: 600, color: '#334155', margin: 0 } as const;

export function CodeEditorLayoutExample() {
    return (
        <div style={stackStyle}>
            <div style={groupStyle}>
                <p style={labelStyle}>rows=4</p>
                <CodeEditor value={sampleMarkup} onChange={() => {}} rows={4} />
            </div>

            <div style={groupStyle}>
                <p style={labelStyle}>rows=16</p>
                <CodeEditor value={sampleMarkup} onChange={() => {}} rows={16} />
            </div>

            <div style={groupStyle}>
                <p style={labelStyle}>tabSize=2 (tab-indented sample)</p>
                <CodeEditor value={tabIndentedMarkup} onChange={() => {}} rows={8} tabSize={2} />
            </div>

            <div style={groupStyle}>
                <p style={labelStyle}>tabSize=8 (tab-indented sample)</p>
                <CodeEditor value={tabIndentedMarkup} onChange={() => {}} rows={8} tabSize={8} />
            </div>

            <div style={groupStyle}>
                <p style={labelStyle}>lineNumbers=false</p>
                <CodeEditor value={sampleMarkup} onChange={() => {}} rows={8} lineNumbers={false} />
            </div>
        </div>
    );
}
// #endregion example

const preview: PreviewSourceDefinition = {
    label: 'Layout Options',
    title: 'Rows, tab size, and line numbers',
    language: 'tsx',
    source: true,
    render: () => <CodeEditorLayoutExample />,
};

export default preview;
