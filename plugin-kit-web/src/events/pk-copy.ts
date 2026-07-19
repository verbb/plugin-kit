/** Emitted when copy-button successfully copies text. */
export class PkCopyEvent extends Event {
    readonly detail: { value: string };

    constructor(value: string) {
        super('pk-copy', { bubbles: true, cancelable: false, composed: true });
        this.detail = { value };
    }
}

/** Emitted when copy-button fails to copy text. */
export class PkCopyErrorEvent extends Event {
    constructor() {
        super('pk-copy-error', { bubbles: true, cancelable: false, composed: true });
    }
}

declare global {
    interface GlobalEventHandlersEventMap {
        'pk-copy': PkCopyEvent;
        'pk-copy-error': PkCopyErrorEvent;
    }
}
