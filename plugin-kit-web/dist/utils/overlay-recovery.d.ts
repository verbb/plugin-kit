/**
 * Production overlay recovery — detects and clears stuck pk-dialog / popup /
 * scroll-lock states that leave the page scrollable but unclickable.
 *
 * Dev tooling with richer diagnostics lives in plugin-kit-playground `lit-debug.ts`.
 */
export type OverlayFreezeKind = 'healthy' | 'stuck-overlay' | 'inconclusive';
export type OverlayFreezeClassification = {
    kind: OverlayFreezeKind;
    /** One-line verdict for the lab / freeze doctor. */
    summary: string;
    signals: string[];
};
export type OverlayDiagnostic = {
    openDialogCount: number;
    popoverOpenCount: number;
    covererCount: number;
    portalCount: number;
    scrollLocked: boolean;
    scrollLockDepth: number;
    inertCount: number;
    centerStack: string[];
    /** Human-readable lines suitable for support bundles. */
    report: string;
};
export type OverlayRecoveryResult = {
    actions: string[];
    diagnostic: OverlayDiagnostic;
};
/** Inspect open overlays and pointer blockers across document + known shadow roots. */
export declare const diagnoseOverlayBlockers: () => OverlayDiagnostic;
/**
 * Quick verdict: is the tab "broken" (hung) or "stuck" (overlay state)?
 * Run while the page feels frozen — if this returns, the main thread is still alive.
 */
export declare const classifyOverlayFreeze: () => OverlayFreezeClassification;
/** Force-close overlays and clear scroll lock. Returns actions taken for logging. */
export declare const recoverOverlays: () => OverlayRecoveryResult;
//# sourceMappingURL=overlay-recovery.d.ts.map