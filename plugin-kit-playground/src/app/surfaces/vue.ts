import { createApp, h, type App } from 'vue';
import { PluginKitProvider } from '@verbb/plugin-kit-vue';

import WorkshopVueView from './WorkshopVueView.vue';

// Workshop previews use `<Icon icon="…">` by name — register the full curated set.
import '@verbb/plugin-kit-icons/all.js';

type VueSurfaceHandle = {
    app: App;
    unmount: () => void;
};

let handle: VueSurfaceHandle | null = null;

export function mountVueSurface(componentId: string, outlet: HTMLElement): () => void {
    unmountVueSurface();

    const mountHost = document.createElement('div');
    mountHost.className = 'pg-vue-mount';
    outlet.replaceChildren(mountHost);

    const app = createApp({
        setup() {
            return () => h(
                PluginKitProvider,
                { translationCategory: 'plugin-kit' },
                {
                    default: () => h(WorkshopVueView, { componentId }),
                },
            );
        },
    });

    app.mount(mountHost);

    handle = {
        app,
        unmount: () => app.unmount(),
    };

    return unmountVueSurface;
}

export function unmountVueSurface(): void {
    handle?.unmount();
    handle = null;
}
