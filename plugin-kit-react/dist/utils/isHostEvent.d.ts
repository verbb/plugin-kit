/**
 * Nested kit overlays (tooltip, popover, select, …) emit bubbling/composed
 * `pk-open-change` / show-hide events. Facades must ignore those when they
 * listen on an ancestor host (e.g. dialog closing because a tooltip hid).
 */
export declare const isHostEvent: (event: Event) => boolean;
//# sourceMappingURL=isHostEvent.d.ts.map