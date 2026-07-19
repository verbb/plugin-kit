export type PortalContainer = HTMLElement | ShadowRoot | null;
export type PortalContainerRef = {
    current: PortalContainer;
};
export type PortalContainerInput = PortalContainer | PortalContainerRef;
export declare const setPortalClassName: (className: string) => void;
export declare const getPortalClassName: (className?: string) => string | undefined;
export declare const setPortalContainer: (container: PortalContainerInput) => void;
export declare const getPortalContainer: (container?: PortalContainerInput) => PortalContainer | undefined;
export declare const setShadowRootSelectors: (selectors: string[]) => void;
export declare const getShadowRootSelectors: () => string[];
/**
 * Resolve where floating content should be portaled.
 * Falls back to document.body when no container is configured.
 */
export declare const getPortalMountNode: (container?: PortalContainerInput) => HTMLElement;
export declare const getPortalTargetForAppend: () => HTMLElement | undefined;
//# sourceMappingURL=portal.d.ts.map