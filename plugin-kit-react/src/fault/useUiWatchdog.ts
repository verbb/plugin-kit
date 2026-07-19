import { useEffect, useRef } from 'react';

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
export const useUiWatchdog = ({
    stallMs = 3000,
    enabled = true,
    onStall,
}: UiWatchdogOptions): void => {
    const lastTickRef = useRef(performance.now());
    const firedRef = useRef(false);
    const onStallRef = useRef(onStall);
    onStallRef.current = onStall;

    useEffect(() => {
        if (!enabled) {
            return;
        }

        firedRef.current = false;
        lastTickRef.current = performance.now();

        let rafId = 0;

        const tick = () => {
            lastTickRef.current = performance.now();
            rafId = window.requestAnimationFrame(tick);
        };

        rafId = window.requestAnimationFrame(tick);

        const intervalId = window.setInterval(() => {
            if (firedRef.current) {
                return;
            }

            const elapsed = performance.now() - lastTickRef.current;

            if (elapsed >= stallMs) {
                firedRef.current = true;
                onStallRef.current();
            }
        }, Math.min(500, stallMs / 2));

        return () => {
            window.cancelAnimationFrame(rafId);
            window.clearInterval(intervalId);
        };
    }, [enabled, stallMs]);
};
