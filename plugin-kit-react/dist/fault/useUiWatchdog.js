import { useEffect, useRef } from "react";
//#region src/fault/useUiWatchdog.ts
/**
* Detects main-thread stalls via rAF heartbeat. Does not recover — callers show
* a banner or escalate to the fault UI.
*/
var useUiWatchdog = ({ stallMs = 3e3, enabled = true, onStall }) => {
	const lastTickRef = useRef(performance.now());
	const firedRef = useRef(false);
	const onStallRef = useRef(onStall);
	onStallRef.current = onStall;
	useEffect(() => {
		if (!enabled) return;
		firedRef.current = false;
		lastTickRef.current = performance.now();
		let rafId = 0;
		const tick = () => {
			lastTickRef.current = performance.now();
			rafId = window.requestAnimationFrame(tick);
		};
		rafId = window.requestAnimationFrame(tick);
		const intervalId = window.setInterval(() => {
			if (firedRef.current) return;
			if (performance.now() - lastTickRef.current >= stallMs) {
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
//#endregion
export { useUiWatchdog };

//# sourceMappingURL=useUiWatchdog.js.map