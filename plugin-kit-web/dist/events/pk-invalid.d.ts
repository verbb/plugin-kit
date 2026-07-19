/** Fired when a form control fails constraint validation — mirrors  `pk-invalid`. */
export declare class PkInvalidEvent extends Event {
    constructor();
}
declare global {
    interface GlobalEventHandlersEventMap {
        'pk-invalid': PkInvalidEvent;
    }
}
//# sourceMappingURL=pk-invalid.d.ts.map