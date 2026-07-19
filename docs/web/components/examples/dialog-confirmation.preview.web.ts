import '@verbb/plugin-kit-web/components/dialog/pk-dialog.js';
import '@verbb/plugin-kit-web/components/button/pk-button.js';
import '@verbb/plugin-kit-web/components/icon/pk-icon.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

export default defineWebPreview({
    label: 'Confirmation',
    title: 'Destructive confirmation dialog example',
    layout: 'plain',
    html: `
<pk-dialog disable-pointer-dismissal>
  <pk-button slot="trigger" variant="primary">Delete entry</pk-button>
  <div slot="header" class="pk-dialog__header">
    <h3 class="pk-dialog__title">Delete this entry?</h3>
    <p data-slot="dialog-description" style="margin:0;font-size:12px;line-height:1.5;color:#64748b">This action cannot be undone. The entry will be removed from the current site.</p>
    <pk-button variant="none" aria-label="Close" class="pk-dialog__close" data-dialog-close>
      <pk-icon slot="start" icon="xmark"></pk-icon>
    </pk-button>
  </div>
  <div class="pk-dialog__body">Confirmation dialog body.</div>
  <pk-button slot="footer" data-dialog-close>Cancel</pk-button>
  <pk-button slot="footer" variant="primary">Delete</pk-button>
</pk-dialog>
`.trim(),
});
