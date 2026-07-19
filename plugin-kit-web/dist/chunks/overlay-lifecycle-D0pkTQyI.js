//#region src/events/overlay-lifecycle.ts
/** Mirrors  `pk-show`. */
var PkShowEvent = class extends Event {
	constructor() {
		super("pk-show", {
			bubbles: true,
			cancelable: false,
			composed: true
		});
	}
};
var PkAfterShowEvent = class extends Event {
	constructor() {
		super("pk-after-show", {
			bubbles: true,
			cancelable: false,
			composed: true
		});
	}
};
/** Mirrors  `pk-hide` (cancelable). */
var PkHideEvent = class extends Event {
	constructor(source = "unknown") {
		super("pk-hide", {
			bubbles: true,
			cancelable: true,
			composed: true
		});
		this.detail = { source };
	}
};
var PkAfterHideEvent = class extends Event {
	constructor() {
		super("pk-after-hide", {
			bubbles: true,
			cancelable: false,
			composed: true
		});
	}
};
//#endregion
export { PkShowEvent as i, PkAfterShowEvent as n, PkHideEvent as r, PkAfterHideEvent as t };

//# sourceMappingURL=overlay-lifecycle-D0pkTQyI.js.map