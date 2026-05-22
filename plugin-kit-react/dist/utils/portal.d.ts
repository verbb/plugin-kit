import { RefObject } from 'react';
export type PortalContainer = HTMLElement | ShadowRoot | null;
export type PortalContainerInput = PortalContainer | RefObject<PortalContainer>;
export declare const setPortalClassName: (className: string) => void;
export declare const getPortalClassName: (className?: string) => string | undefined;
export declare const setPortalContainer: (container: PortalContainerInput) => void;
export declare const getPortalContainer: (container?: PortalContainerInput) => PortalContainer | undefined;
export declare const setShadowRootSelectors: (selectors: string[]) => void;
export declare const getShadowRootSelectors: () => string[];
/**
 * Returns an HTMLElement suitable for appendChild (e.g. BubbleMenu appendTo).
 * When the portal container is a ShadowRoot, returns a child element so callers
 * that expect HTMLElement get a valid target. This fixes BubbleMenu in Shadow DOM
 * contexts (e.g. form builder) where the bubble must render inside the shadow root.
 */
export declare const getPortalTargetForAppend: () => HTMLElement | undefined;
//# sourceMappingURL=portal.d.ts.map