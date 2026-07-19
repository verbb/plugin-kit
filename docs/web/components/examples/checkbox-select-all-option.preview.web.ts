import '@verbb/plugin-kit-web/components/checkbox-select/pk-checkbox-select.js';
import '@verbb/plugin-kit-web/components/checkbox/pk-checkbox.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

type CheckboxSelectValue = string[] | '*';

type PkCheckboxSelectEl = HTMLElement & {
    value: CheckboxSelectValue;
};

const selectMarkup = `
<pk-checkbox-select
  show-all-option
  all-label="All forms"
  options='[{"label":"Contact Form","value":"contact"},{"label":"Newsletter","value":"newsletter"},{"label":"Support","value":"support"}]'
  value='[]'
></pk-checkbox-select>
`.trim();

/** Live `Value:` readout — mirrors React docs so `*` vs concrete arrays is obvious. */
function enhanceValuePreview(root: HTMLElement): () => void {
    const select = root.querySelector('pk-checkbox-select') as PkCheckboxSelectEl | null;
    const readout = root.querySelector<HTMLElement>('[data-value-preview]');

    if (!select || !readout) {
        return () => undefined;
    }

    const sync = () => {
        readout.textContent = JSON.stringify(select.value);
    };

    const onChange = (event: Event) => {
        const detail = (event as CustomEvent<{ value?: CheckboxSelectValue }>).detail;
        if (detail && 'value' in detail) {
            readout.textContent = JSON.stringify(detail.value);
            return;
        }
        sync();
    };

    select.addEventListener('pk-change', onChange);
    sync();

    return () => {
        select.removeEventListener('pk-change', onChange);
    };
}

export default defineWebPreview({
    label: 'All Option',
    title: 'All option example',
    layout: 'stack',
    // Copyable snippet stays the control only; demo chrome stays in `html` + `enhance`.
    code: selectMarkup,
    html: `
<div style="display:flex;flex-direction:column;gap:1rem;font-size:14px">
  ${selectMarkup}
  <div style="border-radius:0.25rem;background:#f1f5f9;padding:0.75rem;font-size:12px;font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace">
    <strong>Value:</strong> <span data-value-preview>[]</span>
  </div>
</div>
`.trim(),
    enhance: enhanceValuePreview,
});
