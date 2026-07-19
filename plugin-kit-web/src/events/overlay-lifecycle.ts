export type PkOverlaySource = 'close-button' | 'light-dismiss' | 'pointer-dismiss' | 'escape' | 'api' | 'unknown';

/** Mirrors  `pk-show`. */
export class PkShowEvent extends Event {
    constructor() {
        super('pk-show', { bubbles: true, cancelable: false, composed: true });
    }
}

export class PkAfterShowEvent extends Event {
    constructor() {
        super('pk-after-show', { bubbles: true, cancelable: false, composed: true });
    }
}

/** Mirrors  `pk-hide` (cancelable). */
export class PkHideEvent extends Event {
    readonly detail: { source: PkOverlaySource };

    constructor(source: PkOverlaySource = 'unknown') {
        super('pk-hide', { bubbles: true, cancelable: true, composed: true });
        this.detail = { source };
    }
}

export class PkAfterHideEvent extends Event {
    constructor() {
        super('pk-after-hide', { bubbles: true, cancelable: false, composed: true });
    }
}

declare global {
    interface GlobalEventHandlersEventMap {
        'pk-show': PkShowEvent;
        'pk-after-show': PkAfterShowEvent;
        'pk-hide': PkHideEvent;
        'pk-after-hide': PkAfterHideEvent;
    }
}
