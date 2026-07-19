import '@verbb/plugin-kit-web/components/code-editor/pk-code-editor.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';
import { encodeCodeEditorValue } from './encodeCodeEditorValue';

// Matches React `code-editor-layout` samples.
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

const encodedSample = encodeCodeEditorValue(sampleMarkup);
const encodedTabs = encodeCodeEditorValue(tabIndentedMarkup);

const labelStyle = 'font-size:14px;font-weight:600;color:#334155;margin:0';

const markup = `
<div style="display:flex;flex-direction:column;gap:1.5rem">
  <div style="display:flex;flex-direction:column;gap:0.5rem">
    <p style="${labelStyle}">rows=4</p>
    <pk-code-editor language="html" rows="4" value="${encodedSample}"></pk-code-editor>
  </div>

  <div style="display:flex;flex-direction:column;gap:0.5rem">
    <p style="${labelStyle}">rows=16</p>
    <pk-code-editor language="html" rows="16" value="${encodedSample}"></pk-code-editor>
  </div>

  <div style="display:flex;flex-direction:column;gap:0.5rem">
    <p style="${labelStyle}">tabSize=2 (tab-indented sample)</p>
    <pk-code-editor language="html" rows="8" tab-size="2" value="${encodedTabs}"></pk-code-editor>
  </div>

  <div style="display:flex;flex-direction:column;gap:0.5rem">
    <p style="${labelStyle}">tabSize=8 (tab-indented sample)</p>
    <pk-code-editor language="html" rows="8" tab-size="8" value="${encodedTabs}"></pk-code-editor>
  </div>

  <div style="display:flex;flex-direction:column;gap:0.5rem">
    <p style="${labelStyle}">lineNumbers=false</p>
    <pk-code-editor data-hide-line-numbers language="html" rows="8" value="${encodedSample}"></pk-code-editor>
  </div>
</div>
`.trim();

/**
 * Lit Boolean attrs treat presence as true, and `lineNumbers` defaults to true —
 * so hide the gutter via property after mount for the labeled demo.
 */
function enhanceHideLineNumbers(root: HTMLElement): void {
    for (const editor of root.querySelectorAll<HTMLElement & { lineNumbers?: boolean }>('pk-code-editor[data-hide-line-numbers]')) {
        editor.lineNumbers = false;
    }
}

export default defineWebPreview({
    label: 'Layout Options',
    title: 'Rows, tab size, and line numbers',
    layout: 'plain',
    // Copyable snippet mirrors React's option surface without the demo-only data attr.
    code: `
<div style="display:flex;flex-direction:column;gap:1.5rem">
  <div style="display:flex;flex-direction:column;gap:0.5rem">
    <p style="${labelStyle}">rows=4</p>
    <pk-code-editor language="html" rows="4" value="${encodedSample}"></pk-code-editor>
  </div>

  <div style="display:flex;flex-direction:column;gap:0.5rem">
    <p style="${labelStyle}">rows=16</p>
    <pk-code-editor language="html" rows="16" value="${encodedSample}"></pk-code-editor>
  </div>

  <div style="display:flex;flex-direction:column;gap:0.5rem">
    <p style="${labelStyle}">tabSize=2 (tab-indented sample)</p>
    <pk-code-editor language="html" rows="8" tab-size="2" value="${encodedTabs}"></pk-code-editor>
  </div>

  <div style="display:flex;flex-direction:column;gap:0.5rem">
    <p style="${labelStyle}">tabSize=8 (tab-indented sample)</p>
    <pk-code-editor language="html" rows="8" tab-size="8" value="${encodedTabs}"></pk-code-editor>
  </div>

  <div style="display:flex;flex-direction:column;gap:0.5rem">
    <p style="${labelStyle}">lineNumbers=false</p>
    <pk-code-editor language="html" rows="8" value="${encodedSample}"></pk-code-editor>
  </div>
</div>
`.trim(),
    html: markup,
    enhance: enhanceHideLineNumbers,
});
