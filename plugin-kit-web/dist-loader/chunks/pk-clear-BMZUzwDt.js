//#region src/events/pk-clear.ts
/** Fired when a form control's value is cleared — mirrors  `pk-clear`. */
var PkClearEvent = class extends Event {
	constructor() {
		super("pk-clear", {
			bubbles: true,
			cancelable: false,
			composed: true
		});
	}
};
//#endregion
export { PkClearEvent as t };
