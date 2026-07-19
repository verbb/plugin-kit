export type PkOverlaySource = 'close-button' | 'light-dismiss' | 'pointer-dismiss' | 'escape' | 'api' | 'unknown';
/** Mirrors  `pk-show`. */
export declare class PkShowEvent extends Event {
    constructor();
}
export declare class PkAfterShowEvent extends Event {
    constructor();
}
/** Mirrors  `pk-hide` (cancelable). */
export declare class PkHideEvent extends Event {
    readonly detail: {
        source: PkOverlaySource;
    };
    constructor(source?: PkOverlaySource);
}
export declare class PkAfterHideEvent extends Event {
    constructor();
}
declare global {
    interface GlobalEventHandlersEventMap {
        'pk-show': PkShowEvent;
        'pk-after-show': PkAfterShowEvent;
        'pk-hide': PkHideEvent;
        'pk-after-hide': PkAfterHideEvent;
    }
}
//# sourceMappingURL=overlay-lifecycle.d.ts.map