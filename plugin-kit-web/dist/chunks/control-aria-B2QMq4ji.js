//#region src/internal/control-aria.ts
/** ARIA attributes mirrored from a field shell host onto the focusable native control. */
var MIRRORED_ARIA_ATTRIBUTES = [
	"aria-labelledby",
	"aria-describedby",
	"aria-invalid",
	"aria-errormessage",
	"aria-required",
	"aria-label"
];
/** True when a parent `pk-field` (or similar) has wired external field chrome. */
function hasExternalFieldAria(host) {
	return host.hasAttribute("aria-labelledby") || host.hasAttribute("aria-describedby") || host.hasAttribute("aria-errormessage");
}
/** Copy mirrored ARIA attributes from `source` onto `target`. */
function mirrorAriaAttributes(source, target) {
	for (const name of MIRRORED_ARIA_ATTRIBUTES) {
		const value = source.getAttribute(name);
		if (value !== null) target.setAttribute(name, value);
		else target.removeAttribute(name);
	}
}
/** Wire label/instructions/required/invalid for standalone controls ( internal layout). */
function syncStandaloneControlAria({ control, labelId, instructionsId, hasLabel, hasInstructions, required = false, invalid = false }) {
	if (hasLabel && labelId) control.setAttribute("aria-labelledby", labelId);
	else control.removeAttribute("aria-labelledby");
	if (hasInstructions && instructionsId) control.setAttribute("aria-describedby", instructionsId);
	else control.removeAttribute("aria-describedby");
	if (required) control.setAttribute("aria-required", "true");
	else control.removeAttribute("aria-required");
	if (invalid) control.setAttribute("aria-invalid", "true");
	else control.removeAttribute("aria-invalid");
	control.removeAttribute("aria-errormessage");
}
/** Observes host ARIA attribute changes and mirrors them to a focusable inner control. */
var HostAriaMirror = class {
	constructor(host, getTarget, onSync) {
		this.host = host;
		this.getTarget = getTarget;
		this.onSync = onSync;
	}
	connect() {
		this.sync();
		this.observer = new MutationObserver(() => {
			this.sync();
		});
		this.observer.observe(this.host, {
			attributes: true,
			attributeFilter: [...MIRRORED_ARIA_ATTRIBUTES]
		});
	}
	disconnect() {
		this.observer?.disconnect();
		this.observer = void 0;
	}
	sync() {
		if (!hasExternalFieldAria(this.host)) {
			this.onSync?.();
			return;
		}
		const target = this.getTarget();
		if (!target) return;
		mirrorAriaAttributes(this.host, target);
	}
};
//#endregion
export { syncStandaloneControlAria as n, HostAriaMirror as t };

//# sourceMappingURL=control-aria-B2QMq4ji.js.map