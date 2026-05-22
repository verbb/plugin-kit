import type { RefObject } from 'react';

export type PortalContainer = HTMLElement | ShadowRoot | null;
export type PortalContainerInput = PortalContainer | RefObject<PortalContainer>;

let defaultPortalClassName: string | undefined;
let defaultPortalContainer: PortalContainer | undefined;
let defaultShadowRootSelectors: string[] = ['[data-plugin-kit-shadow-root]'];

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
        .map((selector) => { return selector.trim(); })
        .filter(Boolean);

    defaultShadowRootSelectors = normalizedSelectors.length > 0 ? normalizedSelectors : ['[data-plugin-kit-shadow-root]'];
};

export const getShadowRootSelectors = (): string[] => {
    return defaultShadowRootSelectors;
};

/**
 * Returns an HTMLElement suitable for appendChild (e.g. BubbleMenu appendTo).
 * When the portal container is a ShadowRoot, returns a child element so callers
 * that expect HTMLElement get a valid target. This fixes BubbleMenu in Shadow DOM
 * contexts (e.g. form builder) where the bubble must render inside the shadow root.
 */
export const getPortalTargetForAppend = (): HTMLElement | undefined => {
    const container = getPortalContainer();
    if (!container) { return undefined; }
    if (container instanceof HTMLElement) { return container; }
    const shadowRoot = container as ShadowRoot;
    const target = getShadowRootSelectors()
        .map((selector) => { return shadowRoot.querySelector<HTMLElement>(selector); })
        .find((node) => { return !!node; })
        ?? (shadowRoot.host instanceof HTMLElement ? shadowRoot.host : undefined);
    return target ?? undefined;
};
