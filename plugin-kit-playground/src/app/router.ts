import type { WorkshopRoute } from '@verbb/plugin-kit-playground';
import {
    getDefaultWorkshopRoute,
    parseWorkshopLocation,
    workshopPath,
} from '@verbb/plugin-kit-playground';

export type RouteHandler = (route: WorkshopRoute) => void | Promise<void>;

export function startWorkshopRouter(onRoute: RouteHandler): void {
    const go = (href: string, replace = false) => {
        const url = new URL(href, location.origin);
        let route = parseWorkshopLocation(url);

        if (route?.kind === 'component') {
            // Canonicalize legacy /web/foo paths to /foo?surface=web
            const canonical = workshopPath(route);

            if (replace) {
                history.replaceState(route, '', canonical);
            } else if (location.pathname + location.search !== canonical) {
                history.pushState(route, '', canonical);
            }
        } else if (!route) {
            route = getDefaultWorkshopRoute();
            const path = workshopPath(route);

            if (replace) {
                history.replaceState(route, '', path);
            } else {
                history.pushState(route, '', path);
            }
        } else {
            const path = workshopPath(route);

            if (replace) {
                history.replaceState(route, '', path);
            } else if (location.pathname + location.search !== path) {
                history.pushState(route, '', path);
            }
        }

        void onRoute(route);
    };

    document.addEventListener('click', (event) => {
        const target = event.target;

        if (!(target instanceof Element)) {
            return;
        }

        const link = target.closest<HTMLAnchorElement>('a[href^="/"]');

        if (!link || link.target === '_blank' || link.hasAttribute('download')) {
            return;
        }

        if (link.classList.contains('is-disabled') || link.getAttribute('aria-disabled') === 'true') {
            event.preventDefault();
            return;
        }

        const url = new URL(link.href, location.origin);

        if (url.origin !== location.origin) {
            return;
        }

        event.preventDefault();
        go(url.pathname + url.search);
    });

    window.addEventListener('popstate', () => {
        const route = parseWorkshopLocation(location) ?? getDefaultWorkshopRoute();
        void onRoute(route);
    });

    const initial = parseWorkshopLocation(location);

    if (!initial) {
        go(workshopPath(getDefaultWorkshopRoute()), true);
        return;
    }

    go(workshopPath(initial), true);
}

export function navigateWorkshop(route: WorkshopRoute, replace = false): void {
    const path = workshopPath(route);

    if (replace) {
        history.replaceState(route, '', path);
    } else {
        history.pushState(route, '', path);
    }

    window.dispatchEvent(new PopStateEvent('popstate'));
}
