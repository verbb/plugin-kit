import '@verbb/plugin-kit-web/components/dialog/pk-dialog.js';
import '@verbb/plugin-kit-web/components/button/pk-button.js';
import '@verbb/plugin-kit-web/components/icon/pk-icon.js';
import '@verbb/plugin-kit-web/components/input/pk-input.js';
import '@verbb/plugin-kit-web/components/field/pk-field.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

export default defineWebPreview({
    label: 'Basic Dialog',
    title: 'Basic dialog example',
    layout: 'plain',
    html: `
<pk-dialog>
  <pk-button slot="trigger">Open dialog</pk-button>
  <div slot="header" class="pk-dialog__header">
  <h3 class="pk-dialog__title">Dialog title</h3>
  <p data-slot="dialog-description" style="margin:0;font-size:12px;line-height:1.5;color:#64748b">Short description of the dialog content.</p>
  <pk-button variant="none" aria-label="Close" class="pk-dialog__close" data-dialog-close>
  <pk-icon slot="start" icon="xmark"></pk-icon>
</pk-button>
</div>
  <div class="pk-dialog__body">This is the dialog body area.</div>
  <pk-button slot="footer" data-dialog-close>Cancel</pk-button>
  <pk-button slot="footer" variant="primary">Save</pk-button>
</pk-dialog>
`.trim(),
});
