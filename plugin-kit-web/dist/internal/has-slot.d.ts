import { ReactiveController, ReactiveControllerHost } from 'lit';
/** Detects whether named slots have assigned content —  `HasSlotController`. */
export declare class HasSlotController implements ReactiveController {
    private readonly host;
    private readonly slotNames;
    private readonly boundSlots;
    /** Last-seen content presence per slot, so we only re-render on real changes. */
    private readonly lastHasContent;
    constructor(host: ReactiveControllerHost & HTMLElement, ...slotNames: string[]);
    hostConnected(): void;
    hostUpdated(): void;
    hostDisconnected(): void;
    /**
     * Bind a `slotchange` listener to each watched slot once it exists.
     *
     * Deliberately does NOT call `requestUpdate()` here: this runs from
     * `hostUpdated()` (after an update completes), so requesting one would trigger
     * Lit's "scheduled an update after an update completed" warning and, if a
     * slot's element identity changed between renders, an infinite update loop.
     * The initial render already reflects light-DOM content (children exist before
     * upgrade), and the initial `slotchange` covers any late-assigned content — so
     * `handleSlotChange` is the single, deduped path that schedules re-renders.
     */
    private bindSlotListeners;
    private findSlot;
    private handleSlotChange;
    test(name: string, ssrFlag?: boolean): boolean;
    private hasLightDomSlotContent;
}
//# sourceMappingURL=has-slot.d.ts.map