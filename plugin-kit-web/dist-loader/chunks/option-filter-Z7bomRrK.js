import { t as syncListboxSeparators } from "./sync-listbox-separators-Dk_E_IVa.js";
//#region src/utils/popup-content-exit.ts
/**
* Wait for `pk-popup-content-out` on a listbox panel, then clear the `closing` class.
* Shared by Combobox and Autocomplete so exit motion stays one implementation.
*/
function waitForPopupContentExitAnimation(panel, fallbackMs = 150) {
	if (!panel) return Promise.resolve();
	return new Promise((resolve) => {
		let settled = false;
		const finish = () => {
			if (settled) return;
			settled = true;
			panel.removeEventListener("animationend", onAnimationEnd);
			window.clearTimeout(fallback);
			panel.classList.remove("closing");
			resolve();
		};
		const onAnimationEnd = (event) => {
			if (event.target === panel && event.animationName.startsWith("pk-popup-content-out")) finish();
		};
		panel.classList.add("closing");
		panel.addEventListener("animationend", onAnimationEnd);
		const fallback = window.setTimeout(finish, fallbackMs);
	});
}
//#endregion
//#region src/internal/sync-filtered-options.ts
/**
* Apply filter visibility, match highlight, option ids, and group empty markers.
* Shared by Combobox and Autocomplete — not a full listbox controller.
*/
function syncFilteredOptions(config) {
	const { host, options, visible, listboxId, filterQuery, isSelected } = config;
	for (const option of options) {
		option.selected = isSelected(option.value);
		option.hidden = !visible.includes(option);
		option.optionId = `${listboxId}-option-${option.value}`;
		option.matchQuery = filterQuery;
	}
	for (const group of host.querySelectorAll("pk-option-group")) {
		const groupOptions = [...group.querySelectorAll("pk-option")];
		const filterEmpty = groupOptions.length > 0 && groupOptions.every((option) => option.hidden);
		group.toggleAttribute("data-pk-filter-empty", filterEmpty);
	}
	syncListboxSeparators(host);
}
//#endregion
//#region src/utils/async-option-fetch.ts
var AsyncOptionFetcher = class {
	constructor(getHandler, callbacks) {
		this.getHandler = getHandler;
		this.timer = null;
		this.requestId = 0;
		this.abortController = null;
		this.callbacks = callbacks;
		this.debounceMs = callbacks.debounceMs ?? 200;
		this.errorLabel = callbacks.errorLabel ?? "options";
	}
	schedule(query) {
		if (this.timer !== null) window.clearTimeout(this.timer);
		this.timer = window.setTimeout(() => {
			this.timer = null;
			this.run(query);
		}, this.debounceMs);
	}
	cancel() {
		if (this.timer !== null) {
			window.clearTimeout(this.timer);
			this.timer = null;
		}
		this.abortController?.abort();
		this.abortController = null;
	}
	async run(query) {
		const handler = this.getHandler();
		if (!handler) return;
		const requestId = ++this.requestId;
		this.abortController?.abort();
		this.abortController = new AbortController();
		if (!query) {
			this.callbacks.onEmptyQuery?.();
			return;
		}
		this.callbacks.onLoading?.();
		try {
			const results = await handler(query, this.abortController.signal);
			if (requestId !== this.requestId) return;
			this.callbacks.onResults(results);
		} catch (error) {
			if (this.abortController?.signal.aborted || requestId !== this.requestId) return;
			if (error instanceof DOMException && error.name === "AbortError") return;
			console.error(`Failed to load ${this.errorLabel}:`, error);
			this.callbacks.onError?.("Failed to load options. Please try again.");
			this.callbacks.onResults([]);
		} finally {
			if (requestId === this.requestId) this.callbacks.onSettled?.();
		}
	}
};
//#endregion
//#region src/utils/option-filter.ts
/**
* Default Combobox / Autocomplete filter: label, value, or full search text substring.
* Rich options may set a short `label` for the closed input — still match subtitle text.
*/
function defaultOptionFilter(option, query) {
	const label = option.getLabel().toLowerCase();
	const value = option.value.toLowerCase();
	const searchText = (option.getSearchText?.() ?? label).toLowerCase();
	return label.includes(query) || value.includes(query) || searchText.includes(query);
}
/** Resolve a custom filter or the default substring match. */
function matchesOptionFilter(option, query, filter) {
	if (filter) return filter(option, query);
	return defaultOptionFilter(option, query);
}
//#endregion
export { waitForPopupContentExitAnimation as i, AsyncOptionFetcher as n, syncFilteredOptions as r, matchesOptionFilter as t };
