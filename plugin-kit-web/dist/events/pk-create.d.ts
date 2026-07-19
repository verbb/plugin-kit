/** Fired before a combobox creates a new option — mirrors  `pk-create`. */
export declare class PkCreateEvent extends Event {
    readonly inputValue: string;
    constructor(inputValue: string);
}
declare global {
    interface GlobalEventHandlersEventMap {
        'pk-create': PkCreateEvent;
    }
}
//# sourceMappingURL=pk-create.d.ts.map