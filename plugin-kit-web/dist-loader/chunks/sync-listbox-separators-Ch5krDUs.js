//#region src/utils/listbox-keyboard.ts
var LISTBOX_NAVIGATION_KEYS = new Set([
	"ArrowDown",
	"ArrowUp",
	"ArrowLeft",
	"ArrowRight",
	"Home",
	"End",
	"Enter",
	" ",
	"Escape"
]);
/** Returns true for type-to-select character keys (single printable characters). */
function isListboxTypeToSelectKey(event) {
	return event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey;
}
function getEnabledListboxItems(items) {
	return items.filter((item) => {
		return !item.hasAttribute("disabled") && !item.hasAttribute("hidden") && item.getAttribute("aria-disabled") !== "true" && item.getAttribute("aria-hidden") !== "true";
	});
}
function focusListboxItem(enabled, index, focusItem) {
	if (focusItem) {
		focusItem(index);
		return;
	}
	const item = enabled[index];
	if (item instanceof HTMLElement && "focusControl" in item && typeof item.focusControl === "function") {
		item.focusControl();
		return;
	}
	item?.focus();
}
function activateListboxItem(item) {
	if (!item) return;
	const control = item.shadowRoot?.querySelector(".option");
	if (control instanceof HTMLButtonElement) {
		control.click();
		return;
	}
	item.click();
}
function handleListboxKeyDown(event, options) {
	const enabled = getEnabledListboxItems(options.items);
	const loop = options.loop === true;
	if (enabled.length === 0) return options.currentIndex;
	let index = Math.max(0, options.currentIndex);
	const current = enabled[index] ?? enabled[0];
	index = enabled.indexOf(current);
	if (index < 0) index = 0;
	switch (event.key) {
		case "ArrowDown":
		case "ArrowRight":
			event.preventDefault();
			if (loop && index >= enabled.length - 1) index = 0;
			else index = Math.min(index + 1, enabled.length - 1);
			focusListboxItem(enabled, index, options.focusItem);
			options.onSelect(index);
			return index;
		case "ArrowUp":
		case "ArrowLeft":
			event.preventDefault();
			if (loop && index <= 0) index = enabled.length - 1;
			else index = Math.max(index - 1, 0);
			focusListboxItem(enabled, index, options.focusItem);
			options.onSelect(index);
			return index;
		case "Home":
			event.preventDefault();
			index = 0;
			focusListboxItem(enabled, index, options.focusItem);
			options.onSelect(index);
			return index;
		case "End":
			event.preventDefault();
			index = enabled.length - 1;
			focusListboxItem(enabled, index, options.focusItem);
			options.onSelect(index);
			return index;
		case "Enter":
		case " ":
			if (!options.multiselect) {
				event.preventDefault();
				activateListboxItem(enabled[index]);
			}
			return index;
		case "Escape":
			event.preventDefault();
			options.onClose?.();
			return index;
		default: return index;
	}
}
/** Type-to-select string matching . */
function createTypeToSelectHandler(items, onMatch) {
	let typeToSelectString = "";
	let typeToSelectTimeout = 0;
	const reset = () => {
		typeToSelectString = "";
		window.clearTimeout(typeToSelectTimeout);
	};
	const handleKey = (event) => {
		if (event.key.length !== 1 || event.ctrlKey || event.metaKey || event.altKey) return;
		typeToSelectString += event.key.toLowerCase();
		window.clearTimeout(typeToSelectTimeout);
		typeToSelectTimeout = window.setTimeout(reset, 750);
		const enabled = getEnabledListboxItems(items);
		for (let index = 0; index < enabled.length; index += 1) if ((enabled[index]?.textContent ?? "").trim().toLowerCase().startsWith(typeToSelectString)) {
			onMatch(index);
			event.preventDefault();
			return;
		}
	};
	return {
		handleKey,
		reset
	};
}
//#endregion
//#region src/internal/sync-listbox-separators.ts
/**
* Hide listbox `pk-separator` siblings that no longer sit between two visible
* `pk-option` / `pk-option-group` items (e.g. after combobox filter hides groups).
*/
var isListboxItemHidden = (element) => {
	return element.hidden || element.hasAttribute("data-pk-filter-empty");
};
var syncListboxSeparators = (root) => {
	const children = [...root.querySelectorAll(":scope > pk-option, :scope > pk-option-group, :scope > pk-separator")];
	const nearestItem = (from, direction) => {
		for (let index = from + direction; direction < 0 ? index >= 0 : index < children.length; index += direction) {
			const child = children[index];
			if (!child || child.localName === "pk-separator") continue;
			return child;
		}
		return null;
	};
	for (let index = 0; index < children.length; index += 1) {
		const child = children[index];
		if (!child || child.localName !== "pk-separator") continue;
		const before = nearestItem(index, -1);
		const after = nearestItem(index, 1);
		child.hidden = !before || !after || isListboxItemHidden(before) || isListboxItemHidden(after);
	}
};
//#endregion
export { isListboxTypeToSelectKey as a, handleListboxKeyDown as i, LISTBOX_NAVIGATION_KEYS as n, createTypeToSelectHandler as r, syncListboxSeparators as t };
