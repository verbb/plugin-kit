import '@verbb/plugin-kit-web/components/dialog/pk-dialog.js';
import '@verbb/plugin-kit-web/components/button/pk-button.js';
import '@verbb/plugin-kit-web/components/icon/pk-icon.js';
import '@verbb/plugin-kit-web/components/input/pk-input.js';
import '@verbb/plugin-kit-web/components/field/pk-field.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

export default defineWebPreview({
    label: "Initial Focus",
    title: "Initial focus example",
    layout: "plain",
    html: `
<pk-dialog>
  <pk-button slot="trigger">Edit field</pk-button>
  <div slot="header" class="pk-dialog__header">
    <h3 class="pk-dialog__title">Edit Field</h3>
    <pk-button variant="none" aria-label="Close" class="pk-dialog__close" data-dialog-close>
      <pk-icon slot="start" icon="xmark"></pk-icon>
    </pk-button>
  </div>
  <div class="pk-dialog__body" style="display:flex;flex-direction:column;gap:1rem">
    <pk-field label="Label" instructions="The label that describes this field." required translatable>
      <pk-input value="Test" autofocus></pk-input>
    </pk-field>
    <pk-field label="Placeholder" instructions="The text that will be shown if the field doesn’t have a value.">
      <pk-input placeholder="Placeholder text"></pk-input>
    </pk-field>
  </div>
  <pk-button slot="footer" data-dialog-close>Cancel</pk-button>
  <pk-button slot="footer" variant="primary">Save</pk-button>
</pk-dialog>
`.trim(),
});
