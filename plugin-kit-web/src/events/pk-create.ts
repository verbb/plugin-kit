/** Fired before a combobox creates a new option — mirrors  `pk-create`. */
export class PkCreateEvent extends Event {
    readonly inputValue: string;

    constructor(inputValue: string) {
        super('pk-create', { bubbles: true, cancelable: true, composed: true });
        this.inputValue = inputValue;
    }
}

declare global {
    interface GlobalEventHandlersEventMap {
        'pk-create': PkCreateEvent;
    }
}
