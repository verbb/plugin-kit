//#region src/utils/isHostEvent.ts
/**
* Nested kit overlays (tooltip, popover, select, …) emit bubbling/composed
* `pk-open-change` / show-hide events. Facades must ignore those when they
* listen on an ancestor host (e.g. dialog closing because a tooltip hid).
*/
var isHostEvent = (event) => {
	return event.target === event.currentTarget;
};
//#endregion
export { isHostEvent };

//# sourceMappingURL=isHostEvent.js.map