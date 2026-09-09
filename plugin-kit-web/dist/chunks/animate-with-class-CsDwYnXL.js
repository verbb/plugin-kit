//#region src/utils/animate-with-class.ts
/**
* Run a CSS animation class on an element and resolve when it finishes.
* Resolves on animationend/cancel, immediately when no CSS animation runs, or on timeout
* so overlay hide can never hang forever (stuck `active` / missing `after-hide`).
*/
function animateWithClass(el, className, timeoutMs = 500) {
	return new Promise((resolve) => {
		const controller = new AbortController();
		const { signal } = controller;
		if (el.classList.contains(className)) {
			resolve();
			return;
		}
		el.classList.add(className);
		let resolved = false;
		const onEnd = () => {
			if (resolved) return;
			resolved = true;
			el.classList.remove(className);
			window.clearTimeout(timeoutId);
			resolve();
			controller.abort();
		};
		el.addEventListener("animationend", onEnd, {
			once: true,
			signal
		});
		el.addEventListener("animationcancel", onEnd, {
			once: true,
			signal
		});
		const timeoutId = window.setTimeout(onEnd, timeoutMs);
		requestAnimationFrame(() => {
			if (!resolved && el.getAnimations().length === 0) onEnd();
		});
	});
}
//#endregion
export { animateWithClass as t };

//# sourceMappingURL=animate-with-class-CsDwYnXL.js.map