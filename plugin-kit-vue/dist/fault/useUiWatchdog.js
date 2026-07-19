import { toValue, watchEffect } from "vue";
//#region src/fault/useUiWatchdog.ts
/**
* Detects main-thread stalls via rAF heartbeat. Does not recover — callers show
* a banner or escalate to the fault UI.
*/
var useUiWatchdog = ({ stallMs = 3e3, enabled = true, onStall }) => {
	const onStallBox = { current: onStall };
	onStallBox.current = onStall;
	watchEffect((onCleanup) => {
		onStallBox.current = onStall;
		if (!toValue(enabled)) return;
		let lastTick = performance.now();
		let fired = false;
		let rafId = 0;
		const tick = () => {
			lastTick = performance.now();
			rafId = window.requestAnimationFrame(tick);
		};
		rafId = window.requestAnimationFrame(tick);
		const intervalId = window.setInterval(() => {
			if (fired) return;
			if (performance.now() - lastTick >= stallMs) {
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
//#endregion
export { useUiWatchdog };

//# sourceMappingURL=useUiWatchdog.js.map