import { webComponentRegistry } from './registry.js';

export type WebPlaygroundSurface = 'web' | 'react' | 'vue';

export type WebPlaygroundNavItem = {
    id: string;
    title: string;
    web: boolean;
    react: boolean;
    vue: boolean;
};

/** Unified workshop dev server port (all surfaces share one origin). */
export const WORKSHOP_PORT = 5175;

/** @deprecated Use WORKSHOP_PORT — kept for docs that list per-surface ports. */
export const WEB_PLAYGROUND_PORTS: Record<WebPlaygroundSurface, number> = {
    web: WORKSHOP_PORT,
    react: WORKSHOP_PORT,
    vue: WORKSHOP_PORT,
};

/** @deprecated Legacy per-surface path prefixes — use getWorkshopComponentPath instead. */
export const WEB_PLAYGROUND_PATHS: Record<WebPlaygroundSurface, string> = {
    web: '/web',
    react: '/react',
    vue: '/vue',
};

export const WEB_PLAYGROUND_LABELS: Record<WebPlaygroundSurface, string> = {
    web: 'Web components',
    react: 'React adapters',
    vue: 'Vue adapters',
};

export type WorkshopToolId =
    | 'fouce'
    | 'debug'
    | 'nested-overlays'
    | 'editable-table-perf'
    | 'slotted-host';

export type WorkshopRoute =
    | { kind: 'component'; surface: WebPlaygroundSurface; componentId: string }
    | { kind: 'tools'; tool: WorkshopToolId };

/** Unified nav derived from the web component registry. */
export const webPlaygroundNav: WebPlaygroundNavItem[] = webComponentRegistry.map((entry) => ({
    id: entry.id,
    title: entry.title,
    web: entry.web,
    react: entry.react,
    vue: entry.vue,
}));

export function isSurfaceAvailable(item: WebPlaygroundNavItem, surface: WebPlaygroundSurface): boolean {
    if (surface === 'web') {
        return item.web;
    }

    if (surface === 'react') {
        return item.react;
    }

    return item.vue;
}

/** One URL per component; surface is selected via ?surface= (defaults to web). */
export function getWorkshopComponentPath(componentId: string, surface: WebPlaygroundSurface = 'web'): string {
    if (surface === 'web') {
        return `/${componentId}`;
    }

    return `/${componentId}?surface=${surface}`;
}

export function getWorkshopToolPath(tool: WorkshopToolId): string {
    return `/tools/${tool}`;
}

function parseSurfaceParam(value: string | null): WebPlaygroundSurface {
    if (value === 'react' || value === 'vue') {
        return value;
    }

    return 'web';
}

export function parseWorkshopLocation(location: Pick<Location, 'pathname' | 'search'>): WorkshopRoute | null {
    const normalized = location.pathname.replace(/\/+$/, '') || '/';

    if (normalized === '/' || normalized === '') {
        return null;
    }

    const toolsMatch = normalized.match(
        /^\/tools\/(fouce|debug|nested-overlays|editable-table-perf|slotted-host)$/,
    );
    if (toolsMatch) {
        return { kind: 'tools', tool: toolsMatch[1] as WorkshopToolId };
    }

    // Legacy: /web/button → /button?surface=web
    const legacyMatch = normalized.match(/^\/(web|react|vue)\/([^/]+)$/);
    if (legacyMatch) {
        return {
            kind: 'component',
            surface: legacyMatch[1] as WebPlaygroundSurface,
            componentId: legacyMatch[2],
        };
    }

    const componentMatch = normalized.match(/^\/([^/]+)$/);
    if (componentMatch) {
        const params = new URLSearchParams(location.search);
        return {
            kind: 'component',
            surface: parseSurfaceParam(params.get('surface')),
            componentId: componentMatch[1],
        };
    }

    return null;
}

/** @deprecated Use parseWorkshopLocation */
export function parseWorkshopPath(pathname: string): WorkshopRoute | null {
    return parseWorkshopLocation({ pathname, search: '' });
}

export function getDefaultWorkshopRoute(): WorkshopRoute {
    const first = webPlaygroundNav.find((item) => item.web) ?? webPlaygroundNav[0];
    return { kind: 'component', surface: 'web', componentId: first?.id ?? 'button' };
}

export function getWebPlaygroundUrl(
    surface: WebPlaygroundSurface,
    componentId: string,
    _hostname = 'localhost',
): string {
    return getWorkshopComponentPath(componentId, surface);
}

export function getWebPlaygroundNavHref(
    item: WebPlaygroundNavItem,
    surface: WebPlaygroundSurface,
    _hostname = 'localhost',
): string {
    if (isSurfaceAvailable(item, surface)) {
        return getWorkshopComponentPath(item.id, surface);
    }

    for (const otherSurface of ['web', 'react', 'vue'] as const) {
        if (otherSurface !== surface && isSurfaceAvailable(item, otherSurface)) {
            return getWorkshopComponentPath(item.id, otherSurface);
        }
    }

    return getWorkshopComponentPath(item.id, surface);
}

export function isWebPlaygroundNavItemActive(
    item: WebPlaygroundNavItem,
    _surface: WebPlaygroundSurface,
    componentId: string,
): boolean {
    return item.id === componentId;
}

/** In the unified workshop, cross-surface links stay on the same origin. */
export function isWebPlaygroundNavItemExternal(
    _item: WebPlaygroundNavItem,
    _surface: WebPlaygroundSurface,
): boolean {
    return false;
}

export function getOtherPlaygroundSurfaces(surface: WebPlaygroundSurface): WebPlaygroundSurface[] {
    return (['web', 'react', 'vue'] as const).filter((candidate) => candidate !== surface);
}

/** @deprecated Surface switcher lives in the preview chrome — use getWorkshopComponentPath. */
export function getWorkshopSurfaceSwitchHref(
    surface: WebPlaygroundSurface,
    componentId: string,
): string {
    return getWorkshopComponentPath(componentId, surface);
}

export function workshopPath(route: WorkshopRoute): string {
    if (route.kind === 'tools') {
        return getWorkshopToolPath(route.tool);
    }

    return getWorkshopComponentPath(route.componentId, route.surface);
}
