import type { WebComponentRegistryEntry } from '../catalog/registry.js';
import type { WebPlaygroundSurface } from '../catalog/config.js';
import { getWebRegistryEntry } from '../catalog/registry.js';

export function renderPlaceholderPlayground(
    root: HTMLElement,
    options: {
        entry: WebComponentRegistryEntry;
        surface: WebPlaygroundSurface;
    },
): void {
    root.replaceChildren();

    const page = document.createElement('div');
    page.className = 'pg-page';
    page.innerHTML = `
        <div class="pg-page__hero">
            <div class="pg-page__eyebrow">Workshop</div>
            <h1 class="pg-page__title"></h1>
            <p class="pg-page__lead"></p>
        </div>
        <div class="pg-card">
            <div class="pg-card__inner">
                <p class="pg-placeholder__meta">Not implemented in plugin-kit-web yet</p>
                <p class="pg-placeholder__copy"></p>
            </div>
        </div>
    `;

    page.querySelector('.pg-page__title')!.textContent = options.entry.title;
    page.querySelector('.pg-page__lead')!.textContent = options.entry.description;
    page.querySelector('.pg-placeholder__copy')!.textContent = 'No playground page for this component yet.';

    root.append(page);
}

export function renderUnknownPlayground(root: HTMLElement, componentId: string): void {
    const entry = getWebRegistryEntry(componentId);

    if (entry) {
        renderPlaceholderPlayground(root, { entry, surface: 'web' });
        return;
    }

    root.replaceChildren();
    const page = document.createElement('div');
    page.className = 'pg-page';
    page.innerHTML = `<h1 class="pg-page__title">Unknown component: ${componentId}</h1>`;
    root.append(page);
}
