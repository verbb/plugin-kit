import { createRoot, type Root } from 'react-dom/client';
import { PluginKitProvider } from '@verbb/plugin-kit-react';
import { getSurfacePreview, surfacePreviews } from '../../surfaces/react/previews.tsx';

import { WorkshopReactView } from './WorkshopReactView.tsx';

// Workshop previews use `<Icon icon="…">` by name — register the full curated set.
import '@verbb/plugin-kit-icons/all.js';

type ReactSurfaceHandle = {
    root: Root;
    unmount: () => void;
};

let handle: ReactSurfaceHandle | null = null;

export function mountReactSurface(componentId: string, outlet: HTMLElement): Promise<() => void> {
    unmountReactSurface();

    const mountHost = document.createElement('div');
    mountHost.className = 'pg-react-mount';
    outlet.replaceChildren(mountHost);

    const root = createRoot(mountHost);
    root.render(
        <PluginKitProvider translationCategory="plugin-kit">
            <WorkshopReactView componentId={componentId} />
        </PluginKitProvider>,
    );

    handle = {
        root,
        unmount: () => root.unmount(),
    };

    return Promise.resolve(unmountReactSurface);
}

export function unmountReactSurface(): void {
    handle?.unmount();
    handle = null;
}

export function resolveReactPreview(componentId: string) {
    return getSurfacePreview(componentId) ?? surfacePreviews[0];
}
