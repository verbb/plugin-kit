/** Emitted when a popup repositions — mirrors  reposition semantics with pk naming. */
export class PkRepositionEvent extends Event {
    constructor() {
        super('pk-reposition', { bubbles: true, cancelable: false, composed: true });
    }
}

declare global {
    interface GlobalEventHandlersEventMap {
        'pk-reposition': PkRepositionEvent;
    }
}
