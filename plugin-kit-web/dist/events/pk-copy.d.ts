/** Emitted when copy-button successfully copies text. */
export declare class PkCopyEvent extends Event {
    readonly detail: {
        value: string;
    };
    constructor(value: string);
}
/** Emitted when copy-button fails to copy text. */
export declare class PkCopyErrorEvent extends Event {
    constructor();
}
declare global {
    interface GlobalEventHandlersEventMap {
        'pk-copy': PkCopyEvent;
        'pk-copy-error': PkCopyErrorEvent;
    }
}
//# sourceMappingURL=pk-copy.d.ts.map