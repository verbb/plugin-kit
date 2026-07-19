export type PortalContainer = HTMLElement | ShadowRoot | null;
export declare const setPortalClassName: (className: string) => void;
export declare const getPortalClassName: (className?: string) => string | undefined;
export declare const setPortalContainer: (container: PortalContainer) => void;
export declare const getPortalContainer: (container?: PortalContainer) => PortalContainer | undefined;
export declare const setShadowRootSelectors: (selectors: string[]) => void;
export declare const getShadowRootSelectors: () => string[];
/**
 * Returns an HTMLElement suitable for appendChild — mirrors React `getPortalTargetForAppend`.
 * When the portal container is a ShadowRoot, prefers a dedicated mount node inside it.
 */
export declare function getPortalTargetForAppend(container?: PortalContainer): HTMLElement | undefined;
/** Resolves where floating popup layers should mount. Falls back to `document.body`. */
export declare function getPortalMountElement(container?: PortalContainer): HTMLElement;
export declare function resolvePositionMethod(positionMethod: 'fixed' | 'absolute' | undefined, container?: PortalContainer): 'fixed' | 'absolute';
//# sourceMappingURL=portal.d.ts.map