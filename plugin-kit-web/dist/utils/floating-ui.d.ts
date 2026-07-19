import { Placement } from '@floating-ui/dom';
export type FloatingPlacement = Placement;
export type AttachFloatingOptions = {
    reference: HTMLElement;
    floating: HTMLElement;
    placement?: FloatingPlacement;
    offset?: number;
    dismissKey?: object;
    onDismiss?: () => void;
};
export type FloatingCleanup = () => void;
/** Position a floating element relative to a reference —  popup pattern. */
export declare function attachFloating({ reference, floating, placement, offset: mainAxis, dismissKey, onDismiss, }: AttachFloatingOptions): FloatingCleanup;
//# sourceMappingURL=floating-ui.d.ts.map