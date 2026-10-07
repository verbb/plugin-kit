/** Emitted before a dismissible component hides itself. Prevent to keep it visible. */
export declare class PkDismissEvent extends Event {
    constructor();
}
declare global {
    interface GlobalEventHandlersEventMap {
        'pk-dismiss': PkDismissEvent;
    }
}
//# sourceMappingURL=pk-dismiss.d.ts.map