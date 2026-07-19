//#region src/utils/supports-popover.ts
/** Whether the host supports the Popover API (`popover` + `showPopover` / `hidePopover`). */
var SUPPORTS_POPOVER = typeof globalThis.HTMLElement !== "undefined" && Object.prototype.hasOwnProperty.call(globalThis.HTMLElement.prototype, "popover");
//#endregion
export { SUPPORTS_POPOVER as t };
