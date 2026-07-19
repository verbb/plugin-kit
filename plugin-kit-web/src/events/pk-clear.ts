/** Fired when a form control's value is cleared — mirrors  `pk-clear`. */
export class PkClearEvent extends Event {
    constructor() {
        super('pk-clear', { bubbles: true, cancelable: false, composed: true });
    }
}

declare global {
    interface GlobalEventHandlersEventMap {
        'pk-clear': PkClearEvent;
    }
}
