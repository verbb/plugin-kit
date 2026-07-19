import { SUPPORTS_POPOVER } from './supports-popover.js';

export type PortalContainer = HTMLElement | ShadowRoot | null;

let defaultPortalClassName: string | undefined;
let defaultPortalContainer: PortalContainer | undefined;
let defaultShadowRootSelectors: string[] = ['[data-plugin-kit-shadow-root]'];

export const setPortalClassName = (className: string): void => {
    defaultPortalClassName = className.trim() || undefined;
};

export const getPortalClassName = (className?: string): string | undefined => {
    return (className ?? defaultPortalClassName)?.trim() || undefined;
};

export const setPortalContainer = (container: PortalContainer): void => {
    defaultPortalContainer = container;
};

export const getPortalContainer = (container?: PortalContainer): PortalContainer | undefined => {
    return container ?? defaultPortalContainer;
};

export const setShadowRootSelectors = (selectors: string[]): void => {
    const normalizedSelectors = (selectors || [])
        .map((selector) => selector.trim())
        .filter(Boolean);

    defaultShadowRootSelectors = normalizedSelectors.length > 0
        ? normalizedSelectors
        : ['[data-plugin-kit-shadow-root]'];
};

export const getShadowRootSelectors = (): string[] => {
    return defaultShadowRootSelectors;
};

/**
 * Returns an HTMLElement suitable for appendChild — mirrors React `getPortalTargetForAppend`.
 * When the portal container is a ShadowRoot, prefers a dedicated mount node inside it.
 */
export function getPortalTargetForAppend(container?: PortalContainer): HTMLElement | undefined {
    const resolved = getPortalContainer(container);

    if (!resolved) {
        return undefined;
    }

    if (resolved instanceof HTMLElement) {
        return resolved;
    }

    const shadowRoot = resolved;

    const target = getShadowRootSelectors()
        .map((selector) => shadowRoot.querySelector<HTMLElement>(selector))
        .find((node) => Boolean(node));

    if (target) {
        return target;
    }

    return shadowRoot.host instanceof HTMLElement ? shadowRoot.host : undefined;
}

/** Resolves where floating popup layers should mount. Falls back to `document.body`. */
export function getPortalMountElement(container?: PortalContainer): HTMLElement {
    return getPortalTargetForAppend(container) ?? document.body;
}

export function resolvePositionMethod(
    positionMethod: 'fixed' | 'absolute' | undefined,
    container?: PortalContainer,
): 'fixed' | 'absolute' {
    if (positionMethod) {
        return positionMethod;
    }

    if (SUPPORTS_POPOVER) {
        return 'absolute';
    }

    const resolved = getPortalContainer(container);

    if (resolved instanceof ShadowRoot) {
        return 'fixed';
    }

    return 'absolute';
}
