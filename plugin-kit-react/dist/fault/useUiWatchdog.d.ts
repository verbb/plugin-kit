export type UiWatchdogOptions = {
    /** Milliseconds without a heartbeat tick before reporting stuck UI. */
    stallMs?: number;
    /** When false, the watchdog is paused (e.g. app fault screen already shown). */
    enabled?: boolean;
    onStall: () => void;
};
/**
 * Detects main-thread stalls via rAF heartbeat. Does not recover — callers show
 * a banner or escalate to the fault UI.
 */
export declare const useUiWatchdog: ({ stallMs, enabled, onStall, }: UiWatchdogOptions) => void;
//# sourceMappingURL=useUiWatchdog.d.ts.map