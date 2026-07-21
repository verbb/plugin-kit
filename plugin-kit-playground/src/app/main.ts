import type { WebPlaygroundSurface, WorkshopRoute } from '@verbb/plugin-kit-playground';
import { ensureDocumentScrollStability } from '../../../plugin-kit-web/src/utils/documentScrollStability.ts';

import { mountFouceLab } from './dev/fouce.ts';

import { createComponentPreviewShell, type ComponentPreviewShell } from './component-preview.ts';
import { createDebugDock } from './debug-dock.ts';
import { startWorkshopRouter } from './router.ts';
import { createWorkshopShell } from './shell.ts';
import { mountReactSurface } from './surfaces/react.tsx';
import { mountVueSurface } from './surfaces/vue.ts';
import { mountWebSurface } from './surfaces/web.ts';

// Workshop uses `<pk-icon icon="…">` by name across surfaces — register the full set once.
import '@verbb/plugin-kit-icons/all.js';

import '../../../plugin-kit-web/src/styles/playground.css';
import '../../../plugin-kit-web/src/styles/overlay-content.css';
import '../../../plugin-kit-web/src/tokens/tokens.css';
import '../../../plugin-kit-web/src/styles/utilities/fouce.css';
import './dev/craft-cp.css';
import './dev/pk-button-demo-states.css';
import './dev/pk-checkbox-demo-states.css';
import './dev/pk-lightswitch-demo-states.css';
import './dev/pk-field-demo-states.css';
import './dev/pk-select-demo-states.css';
import './workshop.css';

const root = document.querySelector('#workshop-root');

if (!root) {
    throw new Error('Workshop root element not found');
}

ensureDocumentScrollStability();

const shell = createWorkshopShell(root);
const debugDock = createDebugDock(shell.debugDock);

let surfaceTeardown: (() => void) | null = null;
let fouceHandle: { teardown: () => void } | null = null;
let nestedOverlaysHandle: { teardown: () => void } | null = null;
let editableTablePerfHandle: { teardown: () => void } | null = null;
let slottedHostHandle: { teardown: () => void } | null = null;
let previewShell: ComponentPreviewShell | null = null;
let activeComponentId: string | null = null;

const teardownActiveSurface = () => {
    surfaceTeardown?.();
    surfaceTeardown = null;
    fouceHandle?.teardown();
    fouceHandle = null;
    nestedOverlaysHandle?.teardown();
    nestedOverlaysHandle = null;
    editableTablePerfHandle?.teardown();
    editableTablePerfHandle = null;
    slottedHostHandle?.teardown();
    slottedHostHandle = null;
    previewShell = null;
    activeComponentId = null;
    shell.outlet.replaceChildren();
};

function mountSurface(
    surface: WebPlaygroundSurface,
    componentId: string,
    outlet: HTMLElement,
): Promise<() => void> | (() => void) {
    switch (surface) {
        case 'web':
            return mountWebSurface(componentId, outlet);
        case 'react':
            return mountReactSurface(componentId, outlet);
        case 'vue':
            return mountVueSurface(componentId, outlet);
    }
}

const renderRoute = async (route: WorkshopRoute) => {
    shell.update(route);

    if (route.kind === 'tools') {
        teardownActiveSurface();

        if (route.tool === 'debug') {
            shell.openDebugDock();
            shell.outlet.innerHTML = `
                <div class="pg-page" style="padding: 32px">
                    <div class="pg-page__eyebrow">Dev tools</div>
                    <h1 class="pg-page__title">Debug dock</h1>
                    <p class="pg-page__lead">
                        The debug dock is open on the right. It streams Lit update rates, captured errors,
                        and freeze-doctor output (Ctrl/Cmd+Shift+U). Toggle with the sidebar button or Ctrl/Cmd+D.
                    </p>
                </div>
            `;
            return;
        }

        if (route.tool === 'fouce') {
            fouceHandle = mountFouceLab(shell.outlet, { litmon: true });
            return;
        }

        if (route.tool === 'nested-overlays') {
            const { mountNestedOverlaysLab } = await import('./dev/nested-overlays.ts');
            nestedOverlaysHandle = mountNestedOverlaysLab(shell.outlet);
            return;
        }

        if (route.tool === 'editable-table-perf') {
            const { mountEditableTablePerfLab } = await import('./dev/editable-table-perf.ts');
            editableTablePerfHandle = mountEditableTablePerfLab(shell.outlet);
            return;
        }

        if (route.tool === 'slotted-host') {
            const { mountSlottedHostLab } = await import('./dev/slotted-host.ts');
            slottedHostHandle = mountSlottedHostLab(shell.outlet);
            return;
        }

        return;
    }

    if (route.kind !== 'component') {
        return;
    }

    const sameComponent = activeComponentId === route.componentId;

    if (!sameComponent) {
        teardownActiveSurface();
        previewShell = createComponentPreviewShell(shell.outlet, route);
        activeComponentId = route.componentId;
    } else {
        surfaceTeardown?.();
        surfaceTeardown = null;
        previewShell?.update(route);
    }

    surfaceTeardown = await mountSurface(route.surface, route.componentId, previewShell!.outlet);
};

startWorkshopRouter((route) => renderRoute(route));

console.log('Plugin Kit workshop ready — http://localhost:5175');
