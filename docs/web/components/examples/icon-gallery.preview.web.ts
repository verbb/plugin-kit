import { icons } from '@verbb/plugin-kit-icons';
import '@verbb/plugin-kit-web/components/icon/pk-icon.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

const camelToKebab = (value: string): string => {
    return value.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
};

/** Canonical kebab-case names from the bundled set — same source as the playground gallery. */
const galleryNames = Object.keys(icons)
    .map(camelToKebab)
    .sort();

function buildGalleryHtml(): string {
    const tiles = galleryNames.map((name) => {
        return [
            `<button type="button" data-icon-name="${name}" title="Copy &lt;pk-icon icon=&quot;${name}&quot;&gt;">`,
            `  <pk-icon icon="${name}" style="font-size:22px" aria-hidden="true"></pk-icon>`,
            `  <code>${name}</code>`,
            `</button>`,
        ].join('\n');
    });

    return `<div data-pk-icon-gallery>\n${tiles.join('\n')}\n</div>`;
}

function enhanceGallery(root: HTMLElement): () => void {
    const gallery = root.querySelector('[data-pk-icon-gallery]');

    if (!gallery) {
        return () => undefined;
    }

    const timers = new Map<HTMLElement, number>();

    const onClick = (event: Event) => {
        const button = (event.target as Element | null)?.closest?.('button[data-icon-name]');

        if (!(button instanceof HTMLElement) || !gallery.contains(button)) {
            return;
        }

        const name = button.dataset.iconName;

        if (!name) {
            return;
        }

        const snippet = `<pk-icon icon="${name}"></pk-icon>`;
        void navigator.clipboard?.writeText(snippet);

        const label = button.querySelector('code');
        const previous = label?.textContent ?? name;

        button.setAttribute('data-copied', '');

        if (label) {
            label.textContent = 'Copied!';
        }

        const existing = timers.get(button);

        if (existing) {
            window.clearTimeout(existing);
        }

        timers.set(button, window.setTimeout(() => {
            button.removeAttribute('data-copied');

            if (label) {
                label.textContent = previous;
            }

            timers.delete(button);
        }, 1000));
    };

    gallery.addEventListener('click', onClick);

    return () => {
        gallery.removeEventListener('click', onClick);

        for (const timer of timers.values()) {
            window.clearTimeout(timer);
        }

        timers.clear();
    };
}

export default defineWebPreview({
    label: 'Gallery',
    title: 'Bundled icon gallery',
    layout: 'plain',
    // Short snippet in the code panel — the live preview lists every bundled icon.
    code: '<pk-icon icon="plus"></pk-icon>',
    html: buildGalleryHtml(),
    enhance: enhanceGallery,
});
