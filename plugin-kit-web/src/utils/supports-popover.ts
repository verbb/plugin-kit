/** Whether the host supports the Popover API (`popover` + `showPopover` / `hidePopover`). */
export const SUPPORTS_POPOVER = typeof globalThis.HTMLElement !== 'undefined'
    && Object.prototype.hasOwnProperty.call(globalThis.HTMLElement.prototype, 'popover');
