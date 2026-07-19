import { installLitUpdateMonitor } from './dev/lit-debug.js';
import type { WorkshopRoute, WorkshopToolId } from '@verbb/plugin-kit-playground';
import {
    getWebPlaygroundNavHref,
    getWorkshopToolPath,
    isWebPlaygroundNavItemActive,
    isSurfaceAvailable,
    webPlaygroundNav,
} from '@verbb/plugin-kit-playground';

export type WorkshopShell = {
    root: HTMLElement;
    outlet: HTMLElement;
    debugDock: HTMLElement;
    update: (route: WorkshopRoute) => void;
    openDebugDock: () => void;
    closeDebugDock: () => void;
    toggleDebugDock: () => void;
    isDebugDockOpen: () => boolean;
};

function navLinkHint(item: { web: boolean; react: boolean; vue: boolean }, surface: 'web' | 'react' | 'vue'): string {
    if (isSurfaceAvailable(item, surface)) {
        return '';
    }

    if (item.web) return 'WC';
    if (item.react) return 'React';
    if (item.vue) return 'Vue';
    return 'Planned';
}

export function createWorkshopShell(mount: HTMLElement): WorkshopShell {
    const app = document.createElement('div');
    app.className = 'pg-app';
    app.id = 'workshop-app';

    const sidebar = document.createElement('aside');
    sidebar.className = 'pg-sidebar pg-harness';
    sidebar.innerHTML = `
        <h1 class="pg-sidebar__title">Plugin Kit</h1>

        <nav class="pg-nav" data-workshop-nav aria-label="Components"></nav>

        <div class="pg-crosslink pg-tools">
            <p class="pg-crosslink__label">Dev tools</p>
            <a class="pg-crosslink__link" data-tool="nested-overlays" href="${getWorkshopToolPath('nested-overlays')}">Nested overlays</a>
            <a class="pg-crosslink__link" data-tool="fouce" href="${getWorkshopToolPath('fouce')}">FOUCE lab</a>
            <a class="pg-crosslink__link" data-tool="editable-table-perf" href="${getWorkshopToolPath('editable-table-perf')}">Editable table perf</a>
            <button type="button" class="pg-tools__toggle" data-debug-toggle>Debug dock</button>
        </div>
    `;

    const outlet = document.createElement('div');
    outlet.className = 'pg-main-host';
    outlet.id = 'workshop-outlet';
    outlet.setAttribute('role', 'main');

    const debugDock = document.createElement('aside');
    debugDock.className = 'pg-debug-dock';
    debugDock.id = 'workshop-debug';
    debugDock.hidden = true;
    debugDock.setAttribute('aria-label', 'Debug');

    app.append(sidebar, outlet, debugDock);
    mount.replaceChildren(app);

    const nav = sidebar.querySelector<HTMLElement>('[data-workshop-nav]')!;
    const debugToggle = sidebar.querySelector<HTMLButtonElement>('[data-debug-toggle]')!;
    const fouceLink = sidebar.querySelector<HTMLAnchorElement>('[data-tool="fouce"]')!;
    const nestedOverlaysLink = sidebar.querySelector<HTMLAnchorElement>('[data-tool="nested-overlays"]')!;
    const editableTablePerfLink = sidebar.querySelector<HTMLAnchorElement>('[data-tool="editable-table-perf"]')!;

    const setDebugDockOpen = (open: boolean) => {
        debugDock.hidden = !open;
        app.classList.toggle('pg-app--with-debug', open);
        debugToggle.setAttribute('aria-pressed', String(open));
        debugToggle.textContent = open ? 'Hide debug dock' : 'Debug dock';

        // Patch Lit only when the dock is visible — avoids performUpdate wrapping on overlay labs.
        if (open) {
            installLitUpdateMonitor({ floatingOverlay: false });
        }
    };

    debugToggle.addEventListener('click', () => {
        setDebugDockOpen(debugDock.hidden);
    });

    window.addEventListener('keydown', (event) => {
        if (event.key === 'd' && (event.metaKey || event.ctrlKey) && !event.shiftKey) {
            event.preventDefault();
            setDebugDockOpen(debugDock.hidden);
        }
    });

    const update = (route: WorkshopRoute) => {
        nav.replaceChildren();

        const surface = route.kind === 'component' ? route.surface : 'web';
        const componentId = route.kind === 'component' ? route.componentId : 'button';

        for (const item of webPlaygroundNav) {
            const link = document.createElement('a');
            link.className = 'pg-nav__link';
            link.href = getWebPlaygroundNavHref(item, surface);

            const title = document.createElement('span');
            title.textContent = item.title;
            link.append(title);

            const hint = navLinkHint(item, surface);
            if (hint) {
                const hintEl = document.createElement('span');
                hintEl.className = 'pg-nav__link-hint';
                hintEl.textContent = hint;
                link.append(hintEl);
            }

            link.classList.toggle(
                'is-active',
                route.kind === 'component' && isWebPlaygroundNavItemActive(item, surface, componentId),
            );
            nav.append(link);
        }

        fouceLink.classList.toggle('is-active', route.kind === 'tools' && route.tool === 'fouce');
        nestedOverlaysLink.classList.toggle('is-active', route.kind === 'tools' && route.tool === 'nested-overlays');
        editableTablePerfLink.classList.toggle('is-active', route.kind === 'tools' && route.tool === 'editable-table-perf');

        const toolTitles: Record<WorkshopToolId, string> = {
            fouce: 'FOUCE lab',
            debug: 'Debug',
            'nested-overlays': 'Nested overlays',
            'editable-table-perf': 'Editable table perf',
        };

        document.title = route.kind === 'tools'
            ? `Plugin Kit — ${toolTitles[route.tool]}`
            : route.kind === 'component'
                ? `Plugin Kit — ${webPlaygroundNav.find((item) => item.id === route.componentId)?.title ?? route.componentId}`
                : 'Plugin Kit — Workshop';
    };

    return {
        root: app,
        outlet,
        debugDock,
        update,
        openDebugDock: () => setDebugDockOpen(true),
        closeDebugDock: () => setDebugDockOpen(false),
        toggleDebugDock: () => setDebugDockOpen(debugDock.hidden),
        isDebugDockOpen: () => !debugDock.hidden,
    };
}
