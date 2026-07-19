/** Fired when a form control fails constraint validation — mirrors  `pk-invalid`. */
export class PkInvalidEvent extends Event {
    constructor() {
        super('pk-invalid', { bubbles: true, cancelable: false, composed: true });
    }
}

declare global {
    interface GlobalEventHandlersEventMap {
        'pk-invalid': PkInvalidEvent;
    }
}
