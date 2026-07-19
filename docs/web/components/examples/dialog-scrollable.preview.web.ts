import '@verbb/plugin-kit-web/components/dialog/pk-dialog.js';
import '@verbb/plugin-kit-web/components/button/pk-button.js';
import '@verbb/plugin-kit-web/components/icon/pk-icon.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

const paragraphs = Array.from({ length: 10 }, (_, index) => (
    `<p style="margin:0 0 12px">Setting group ${index + 1}: long forms and review screens should scroll inside the dialog body instead of pushing actions off screen.</p>`
)).join('\n    ');

export default defineWebPreview({
    label: 'Scrollable Content',
    title: 'Scrollable dialog content example',
    layout: 'plain',
    html: `
<pk-dialog>
  <pk-button slot="trigger">Open long dialog</pk-button>
  <div slot="header" class="pk-dialog__header">
    <h3 class="pk-dialog__title">Review settings</h3>
    <p data-slot="dialog-description" style="margin:0;font-size:12px;line-height:1.5;color:#64748b">Long content constrained inside the body.</p>
    <pk-button variant="none" aria-label="Close" class="pk-dialog__close" data-dialog-close>
      <pk-icon slot="start" icon="xmark"></pk-icon>
    </pk-button>
  </div>
  <div class="pk-dialog__body">
    ${paragraphs}
  </div>
  <pk-button slot="footer" data-dialog-close>Cancel</pk-button>
  <pk-button slot="footer" variant="primary">Save settings</pk-button>
</pk-dialog>
`.trim(),
});
