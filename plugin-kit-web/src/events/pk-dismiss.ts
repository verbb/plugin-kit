/** Emitted before a dismissible component hides itself. Prevent to keep it visible. */
export class PkDismissEvent extends Event {
    constructor() {
        super('pk-dismiss', { bubbles: true, cancelable: true, composed: true });
    }
}

declare global {
    interface GlobalEventHandlersEventMap {
        'pk-dismiss': PkDismissEvent;
    }
}
