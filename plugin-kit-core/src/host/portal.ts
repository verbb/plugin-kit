export type PortalContainer = HTMLElement | ShadowRoot | null;

export type PortalContainerRef = {
    current: PortalContainer;
};

export type PortalContainerInput = PortalContainer | PortalContainerRef;

let defaultPortalClassName: string | undefined;
let defaultPortalContainer: PortalContainer | undefined;
let defaultShadowRootSelectors: string[] = ['[data-pk-shadow-root]'];

export const setPortalClassName = (className: string): void => {
    defaultPortalClassName = className.trim() || undefined;
};

export const getPortalClassName = (className?: string): string | undefined => {
    return (className ?? defaultPortalClassName)?.trim() || undefined;
};

const resolvePortalContainer = (container?: PortalContainerInput): PortalContainer | undefined => {
    if (!container) {
        return undefined;
    }

    if (typeof container === 'object' && 'current' in container) {
        return container.current ?? undefined;
    }

    return container ?? undefined;
};

export const setPortalContainer = (container: PortalContainerInput): void => {
    defaultPortalContainer = resolvePortalContainer(container);
};

export const getPortalContainer = (container?: PortalContainerInput): PortalContainer | undefined => {
    return resolvePortalContainer(container) ?? defaultPortalContainer;
};

export const setShadowRootSelectors = (selectors: string[]): void => {
    const normalizedSelectors = (selectors || [])
        .map((selector) => selector.trim())
        .filter(Boolean);

    defaultShadowRootSelectors = normalizedSelectors.length > 0
        ? normalizedSelectors
        : ['[data-pk-shadow-root]'];
};

export const getShadowRootSelectors = (): string[] => {
    return defaultShadowRootSelectors;
};

/**
 * Resolve where floating content should be portaled.
 * Falls back to document.body when no container is configured.
 */
export const getPortalMountNode = (container?: PortalContainerInput): HTMLElement => {
    const resolved = getPortalContainer(container);

    if (resolved instanceof HTMLElement) {
        return resolved;
    }

    if (resolved instanceof ShadowRoot) {
        const target = getShadowRootSelectors()
            .map((selector) => resolved.querySelector<HTMLElement>(selector))
            .find(Boolean)
            ?? (resolved.host instanceof HTMLElement ? resolved.host : undefined);

        if (target) {
            return target;
        }
    }

    return document.body;
};

export const getPortalTargetForAppend = (): HTMLElement | undefined => {
    const container = getPortalContainer();
    if (!container) {
        return undefined;
    }

    if (container instanceof HTMLElement) {
        return container;
    }

    const shadowRoot = container;
    return getShadowRootSelectors()
        .map((selector) => shadowRoot.querySelector<HTMLElement>(selector))
        .find(Boolean)
        ?? (shadowRoot.host instanceof HTMLElement ? shadowRoot.host : undefined);
};
