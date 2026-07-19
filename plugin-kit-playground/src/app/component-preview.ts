import type { WebPlaygroundSurface, WorkshopRoute } from '@verbb/plugin-kit-playground';
import {
    getWorkshopComponentPath,
    isSurfaceAvailable,
    webPlaygroundNav,
} from '@verbb/plugin-kit-playground';

export type ComponentPreviewShell = {
    root: HTMLElement;
    outlet: HTMLElement;
    update: (route: Extract<WorkshopRoute, { kind: 'component' }>) => void;
};

const SURFACE_TAB_LABELS: Record<WebPlaygroundSurface, string> = {
    web: 'Web',
    react: 'React',
    vue: 'Vue',
};

export function createComponentPreviewShell(
    mount: HTMLElement,
    initialRoute: Extract<WorkshopRoute, { kind: 'component' }>,
): ComponentPreviewShell {
    const root = document.createElement('div');
    root.className = 'pg-main pg-component-preview';

    const chrome = document.createElement('div');
    chrome.className = 'pg-preview-chrome';

    const tabs = document.createElement('div');
    tabs.className = 'pg-surface-tabs';
    tabs.setAttribute('role', 'tablist');
    tabs.setAttribute('aria-label', 'Implementation');

    for (const surface of ['web', 'react', 'vue'] as const) {
        const tab = document.createElement('a');
        tab.className = 'pg-surface-tabs__btn';
        tab.dataset.surface = surface;
        tab.setAttribute('role', 'tab');
        tab.textContent = SURFACE_TAB_LABELS[surface];
        tabs.append(tab);
    }

    chrome.append(tabs);

    const outlet = document.createElement('div');
    outlet.className = 'pg-preview-outlet';
    outlet.dataset.surfaceOutlet = '';

    root.append(chrome, outlet);
    mount.replaceChildren(root);

    const update = (route: Extract<WorkshopRoute, { kind: 'component' }>) => {
        for (const tab of tabs.querySelectorAll<HTMLAnchorElement>('[data-surface]')) {
            const tabSurface = tab.dataset.surface as WebPlaygroundSurface;
            tab.classList.toggle('is-active', tabSurface === route.surface);
            tab.href = getWorkshopComponentPath(route.componentId, tabSurface);
            tab.setAttribute('aria-selected', String(tabSurface === route.surface));

            const item = webPlaygroundNav.find((entry) => entry.id === route.componentId);
            const available = item ? isSurfaceAvailable(item, tabSurface) : tabSurface === 'web';

            tab.classList.toggle('is-disabled', !available);
            tab.setAttribute('aria-disabled', String(!available));
        }
    };

    update(initialRoute);

    return { root, outlet, update };
}
