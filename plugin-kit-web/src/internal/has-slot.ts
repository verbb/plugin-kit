import type { ReactiveController, ReactiveControllerHost } from 'lit';

/** Detects whether named slots have assigned content —  `HasSlotController`. */
export class HasSlotController implements ReactiveController {
    private readonly slotNames: string[];

    private readonly boundSlots = new Set<HTMLSlotElement>();

    /** Last-seen content presence per slot, so we only re-render on real changes. */
    private readonly lastHasContent = new Map<string, boolean>();

    constructor(
        private readonly host: ReactiveControllerHost & HTMLElement,
        ...slotNames: string[]
    ) {
        this.slotNames = slotNames;
        host.addController(this);
    }

    hostConnected(): void {
        this.bindSlotListeners();
    }

    hostUpdated(): void {
        this.bindSlotListeners();
    }

    hostDisconnected(): void {
        for (const slot of this.boundSlots) {
            slot.removeEventListener('slotchange', this.handleSlotChange);
        }

        this.boundSlots.clear();
    }

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
    private bindSlotListeners(): void {
        for (const name of this.slotNames) {
            const slot = this.findSlot(name);

            if (!slot || this.boundSlots.has(slot)) {
                continue;
            }

            this.boundSlots.add(slot);
            slot.addEventListener('slotchange', this.handleSlotChange);

            // Seed the baseline with what the just-completed render already used.
            if (!this.lastHasContent.has(name)) {
                this.lastHasContent.set(name, this.test(name));
            }
        }
    }

    private findSlot(name: string): HTMLSlotElement | null {
        if (!this.host.shadowRoot) {
            return null;
        }

        if (!name) {
            return this.host.shadowRoot.querySelector('slot:not([name])');
        }

        return this.host.shadowRoot.querySelector(`slot[name="${name}"]`);
    }

    private handleSlotChange = (): void => {
        // Only re-render when a watched slot's content presence actually flips —
        // slotchange fires on every light-DOM mutation, so deduping here keeps a
        // busy subtree (e.g. a Tiptap editor) from thrashing the host.
        let changed = false;

        for (const name of this.slotNames) {
            const has = this.test(name);

            if (this.lastHasContent.get(name) !== has) {
                this.lastHasContent.set(name, has);
                changed = true;
            }
        }

        if (changed) {
            this.host.requestUpdate();
        }
    };

    test(name: string, ssrFlag = false): boolean {
        if (ssrFlag) {
            return true;
        }

        if (this.hasLightDomSlotContent(name)) {
            return true;
        }

        const slot = this.findSlot(name);

        if (!slot) {
            return false;
        }

        return slot.assignedNodes({ flatten: true }).some((node) => {
            if (node.nodeType === Node.TEXT_NODE) {
                return Boolean(node.textContent?.trim());
            }

            return node.nodeType === Node.ELEMENT_NODE;
        });
    }

    private hasLightDomSlotContent(name: string): boolean {
        return [...this.host.children].some((child) => child.getAttribute('slot') === name);
    }
}
