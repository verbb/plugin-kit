import { toValue, watchEffect, type MaybeRefOrGetter } from 'vue';

export type UiWatchdogOptions = {
    /** Milliseconds without a heartbeat tick before reporting stuck UI. */
    stallMs?: number;
    /** When false, the watchdog is paused (e.g. app fault screen already shown). */
    enabled?: MaybeRefOrGetter<boolean>;
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
    // Hold the latest callback in a mutable box so the interval does not restart when
    // the caller passes a new function identity (same idea as React’s useRef pattern).
    const onStallBox = { current: onStall };
    onStallBox.current = onStall;

    watchEffect((onCleanup) => {
        onStallBox.current = onStall;

        if (!toValue(enabled)) {
            return;
        }

        let lastTick = performance.now();
        let fired = false;
        let rafId = 0;

        const tick = () => {
            lastTick = performance.now();
            rafId = window.requestAnimationFrame(tick);
        };

        rafId = window.requestAnimationFrame(tick);

        const intervalId = window.setInterval(() => {
            if (fired) {
                return;
            }

            const elapsed = performance.now() - lastTick;

            if (elapsed >= stallMs) {
                fired = true;
                onStallBox.current();
            }
        }, Math.min(500, stallMs / 2));

        onCleanup(() => {
            window.cancelAnimationFrame(rafId);
            window.clearInterval(intervalId);
        });
    });
};
