/** Preview with transforms so Lit retains ownership of row order and custom cell instances. */
export declare class DataTableRowOrderController {
    private enabled;
    private commit;
    private cancelled;
    private session?;
    private frame?;
    constructor(enabled: () => boolean, commit: (fromIndex: number, toIndex: number) => void, cancelled: () => void);
    get active(): boolean;
    start(event: PointerEvent): void;
    cancel(announce?: boolean): void;
    checkGeometry(): void;
    private preview;
    private scrollParents;
    private autoScroll;
}
//# sourceMappingURL=row-order-controller.d.ts.map