import '@verbb/plugin-kit-web/components/textarea/pk-textarea.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

const maxLength = 120;
const defaultValue = 'Short helper text for a settings screen.';

/** Live `n/max` readout — same composition as React docs / playground (not built into pk-textarea). */
function enhanceCharacterCount(root: HTMLElement): () => void {
    const textarea = root.querySelector('pk-textarea');
    const counter = root.querySelector<HTMLElement>('[data-char-count]');

    if (!textarea || !counter) {
        return () => undefined;
    }

    const limit = Number(textarea.getAttribute('max-length')) || maxLength;

    const sync = () => {
        const value = (textarea as HTMLElement & { value?: string }).value
            ?? textarea.getAttribute('value')
            ?? '';
        counter.textContent = `${value.length}/${limit}`;
    };

    textarea.addEventListener('input', sync);
    sync();

    return () => {
        textarea.removeEventListener('input', sync);
    };
}

export default defineWebPreview({
    label: 'Character Count',
    title: 'Textarea character count example',
    layout: 'plain',
    html: `
<div style="display:flex;flex-direction:column;gap:4px;max-width:24rem">
  <pk-textarea max-length="${maxLength}" value="${defaultValue}"></pk-textarea>
  <div data-char-count style="text-align:right;font-size:12px;color:#6b7280">${defaultValue.length}/${maxLength}</div>
</div>
`.trim(),
    enhance: enhanceCharacterCount,
});
