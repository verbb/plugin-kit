import '@verbb/plugin-kit-web/components/button/pk-button.js';
import '@verbb/plugin-kit-web/components/combobox/pk-combobox.js';
import '@verbb/plugin-kit-web/components/select/pk-option.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

type AsyncOption = { value: string; label: string };

type PkComboboxEl = HTMLElement & {
    fetchOptions: ((query: string, signal: AbortSignal) => Promise<AsyncOption[]>) | null;
};

type PkButtonEl = HTMLElement & {
    variant: string;
};

const frameworks: AsyncOption[] = [
    { label: 'Next.js', value: 'next-js' },
    { label: 'SvelteKit', value: 'sveltekit' },
    { label: 'Nuxt.js', value: 'nuxt-js' },
    { label: 'Remix', value: 'remix' },
    { label: 'Astro', value: 'astro' },
];

const staticMarkup = `
<pk-combobox clearable placeholder="Select a framework" value="next-js">
  <pk-option value="next-js">Next.js</pk-option>
  <pk-option value="sveltekit">SvelteKit</pk-option>
  <pk-option value="nuxt-js">Nuxt.js</pk-option>
  <pk-option value="remix">Remix</pk-option>
  <pk-option value="astro">Astro</pk-option>
</pk-combobox>
`.trim();

const asyncMarkup = `
<pk-combobox
  async
  clearable
  placeholder="Search frameworks"
  start-typing-message="Start typing to search frameworks…"
></pk-combobox>
`.trim();

/**
 * Mirror React: static options + delay toggles + async `fetchOptions` search.
 * `fetchOptions` is a JS property (`attribute: false`) — wire it after mount.
 */
function enhanceHighLevelDemo(root: HTMLElement): () => void {
    const asyncBox = root.querySelector<PkComboboxEl>('[data-async-frameworks]');
    const delayLabel = root.querySelector<HTMLElement>('[data-delay-label]');
    const delayButtons = [...root.querySelectorAll<PkButtonEl>('[data-delay]')];
    let asyncDelayMs = 500;

    const syncDelayChrome = () => {
        for (const button of delayButtons) {
            const ms = Number(button.getAttribute('data-delay'));
            const variant = ms === asyncDelayMs ? 'primary' : 'outline';
            // Keep attribute + property in sync so Lit reflect and CSS both see the active delay.
            button.variant = variant;
            button.setAttribute('variant', variant);
        }

        if (delayLabel) {
            delayLabel.textContent = `Current delay: ${asyncDelayMs}ms`;
        }
    };

    if (asyncBox) {
        asyncBox.fetchOptions = async (query: string) => {
            await new Promise((resolve) => {
                window.setTimeout(resolve, asyncDelayMs);
            });

            const normalized = query.trim().toLowerCase();

            if (!normalized) {
                return [];
            }

            return frameworks.filter((framework) => {
                return framework.label.toLowerCase().includes(normalized);
            });
        };
    }

    const onClick = (event: Event) => {
        const target = (event.target as HTMLElement | null)?.closest?.('[data-delay]');
        if (!target) {
            return;
        }

        asyncDelayMs = Number(target.getAttribute('data-delay'));
        syncDelayChrome();
    };

    root.addEventListener('click', onClick);
    syncDelayChrome();

    return () => {
        root.removeEventListener('click', onClick);
    };
}

export default defineWebPreview({
    label: 'Higher-Level Input API',
    title: 'Higher-level input API example',
    layout: 'stack',
    // Copyable snippet stays the controls; delay chrome + fetch wiring live in html/enhance.
    code: `${staticMarkup}\n\n${asyncMarkup}`,
    html: `
<div style="display:flex;flex-direction:column;gap:16px">
  ${staticMarkup}
  <div style="display:flex;flex-wrap:wrap;align-items:center;gap:8px">
    <pk-button type="button" data-delay="500" variant="primary">0.5s</pk-button>
    <pk-button type="button" data-delay="3000" variant="outline">3s</pk-button>
    <span data-delay-label style="font-size:12px;color:#64748b">Current delay: 500ms</span>
  </div>
  <pk-combobox
    data-async-frameworks
    async
    clearable
    placeholder="Search frameworks"
    start-typing-message="Start typing to search frameworks…"
  ></pk-combobox>
</div>
`.trim(),
    enhance: enhanceHighLevelDemo,
});
