import '@verbb/plugin-kit-web/components/checkbox-select/pk-checkbox-select.js';
import '@verbb/plugin-kit-web/components/checkbox/pk-checkbox.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

type CheckboxSelectValue = string[] | '*';

type PkCheckboxSelectEl = HTMLElement & {
    value: CheckboxSelectValue;
};

const selectMarkup = `
<div style="font-size:14px;font-weight:700">Select fruits</div>
<pk-checkbox-select
  options='[{"label":"Apple","value":"apple"},{"label":"Banana","value":"banana"},{"label":"Blueberry","value":"blueberry"},{"label":"Grapes","value":"grapes"}]'
  value='["apple","grapes"]'
></pk-checkbox-select>
`.trim();

/** Keep the debug readout synchronized with the component's computed value. */
function enhanceValuePreview(root: HTMLElement): () => void {
    const select = root.querySelector('pk-checkbox-select') as PkCheckboxSelectEl | null;
    const readout = root.querySelector<HTMLElement>('[data-value-preview]');

    if (!select || !readout) {
        return () => undefined;
    }

    const sync = () => {
        readout.textContent = JSON.stringify(select.value);
    };

    select.addEventListener('pk-change', sync);
    sync();

    return () => {
        select.removeEventListener('pk-change', sync);
    };
}

export default defineWebPreview({
    label: 'Selected Values',
    title: 'Selected values example',
    layout: 'stack',
    code: selectMarkup,
    html: `
<div style="display:flex;flex-direction:column;gap:1rem;font-size:14px">
  ${selectMarkup}
  <div style="border-radius:0.25rem;background:#f1f5f9;padding:0.75rem;font-size:12px;font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace">
    <strong>Value:</strong> <span data-value-preview>["apple","grapes"]</span>
  </div>
</div>
`.trim(),
    enhance: enhanceValuePreview,
});
