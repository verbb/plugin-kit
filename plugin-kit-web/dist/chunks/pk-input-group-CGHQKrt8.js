import { n as PkElement, t as __decorate } from "./decorate-W02hmVTt.js";
import { n as buttonGroupCornerRadiusStyles, r as buttonGroupCornerRoleStyles, t as buttonGroupBorderJoinStyles } from "./button-group-item.styles-DYmBR28a.js";
import { t as HostAriaMirror } from "./control-aria-B2QMq4ji.js";
import { css, html } from "lit";
import { customElement, query } from "lit/decorators.js";
//#region src/components/input-group/pk-input-group.styles.ts
var pkInputGroupStyles = [
	buttonGroupCornerRoleStyles(),
	buttonGroupCornerRadiusStyles(".group", "var(--pk-radius-lg)"),
	buttonGroupBorderJoinStyles(".group"),
	css`
        @layer pk-component {
            :host {
                display: block;
                width: 100%;
                min-width: 0;
                font-family: var(--pk-font-family);
                font-size: var(--pk-font-size-base);
                line-height: var(--pk-line-height);
            }

            :host([data-pk-group-orientation]) {
                display: flex;
                flex-direction: column;
                width: auto;
                flex: 0 1 auto;
                align-self: stretch;
            }

            :host([data-pk-group-orientation='horizontal'][data-pk-group-join]:not([data-pk-group-divider])) {
                margin-inline-start: var(--pk-bg-horizontal-indent-outlined, 0);
            }

            :host([data-pk-group-orientation='vertical'][data-pk-group-join]:not([data-pk-group-divider])) {
                margin-block-start: var(--pk-bg-vertical-indent-outlined, 0);
            }

            :host([data-pk-group-orientation='horizontal'][data-pk-group-divider][data-pk-group-join]) {
                margin-inline-start: var(--pk-bg-horizontal-indent-outlined, 0);
            }

            :host([data-pk-group-orientation='vertical'][data-pk-group-divider][data-pk-group-join]) {
                margin-block-start: var(--pk-bg-vertical-indent-outlined, 0);
            }

            :host([data-pk-group-orientation='horizontal'][data-pk-group-divider]) .group {
                border-left-width: 1px;
                border-left-style: solid;
                border-left-color: var(--pk-btn-group-divider-color-outline, var(--pk-color-slate-400));
                box-shadow: none;
            }

            :host([data-pk-group-orientation='vertical'][data-pk-group-divider]) .group {
                border-top-width: 1px;
                border-top-style: solid;
                border-top-color: var(--pk-btn-group-divider-color-outline, var(--pk-color-slate-400));
                box-shadow: none;
            }

            :host([data-pk-group-orientation='horizontal'][data-pk-group-internal-trail]) .group {
                border-right-width: 0;
            }

            :host([data-pk-group-orientation='vertical'][data-pk-group-internal-trail]) .group {
                border-bottom-width: 0;
            }

            .group {
                display: flex;
                position: relative;
                align-items: center;
                width: 100%;
                min-width: 0;
                min-height: var(--pk-btn-height-default);
                border: var(--pk-input-border, 1px solid var(--pk-input-border-color));
                border-radius: var(--pk-input-border-radius, var(--pk-radius-sm));
                background: var(--pk-input-bg);
                background-clip: padding-box;
                box-sizing: border-box;
                transition: border-color 0.12s ease, box-shadow 0.12s ease;
            }

            :host([data-block-layout]) .group {
                flex-direction: column;
                align-items: stretch;
                height: auto;
                min-height: 0;
            }

            :host([data-block-layout]) ::slotted(pk-input-group-textarea),
            :host([data-block-layout]) ::slotted(pk-input-group-addon[align='block-start']),
            :host([data-block-layout]) ::slotted(pk-input-group-addon[align='block-end']) {
                width: 100%;
                align-self: stretch;
            }

            ::slotted(pk-input-group-input),
            ::slotted(pk-input-group-textarea) {
                flex: 1 1 auto;
                min-width: 0;
            }

            ::slotted(pk-input-group-addon[align='inline-start']) {
                order: -1;
            }

            ::slotted(pk-input-group-addon[align='inline-end']) {
                order: 1;
            }

            ::slotted(pk-input-group-addon[align='block-start']) {
                order: -1;
            }

            ::slotted(pk-input-group-addon[align='block-end']) {
                order: 1;
            }

            /*
             * Do not use :host(:has(slotted…)) for focus/invalid — Chromium cannot see
             * light-DOM slotted children from shadow :has() (same reason as data-block-layout).
             * :host(:focus-within) follows the composed tree into nested shadow inputs.
             * data-invalid / data-disabled are synced from the slotted control in TS.
             */
            /* Craft focus = box-shadow only; keep resting / invalid border (no stacked border-color). */
            :host(:focus-within:not([data-invalid])) .group {
                box-shadow: var(--pk-input-focus-shadow);
            }

            :host([data-invalid]) .group {
                border-color: var(--pk-color-rose-600);
            }

            :host([data-invalid]:focus-within) .group {
                box-shadow: var(--pk-input-invalid-focus-shadow);
            }

            :host([data-disabled]) .group {
                opacity: 0.5;
            }
        }
    `
];
//#endregion
//#region src/components/input-group/pk-input-group.ts
function getSlottedFocusTarget(slot) {
	const [control] = slot.assignedElements({ flatten: true });
	if (!(control instanceof HTMLElement)) return null;
	if (control.matches("pk-input-group-input, pk-input-group-textarea")) {
		const inner = control.shadowRoot?.querySelector("input, textarea");
		return inner instanceof HTMLElement ? inner : null;
	}
	const nested = control.querySelector("input, textarea, select, button[aria-haspopup]");
	return nested instanceof HTMLElement ? nested : null;
}
var PkInputGroup = class PkInputGroup extends PkElement {
	constructor(..._args) {
		super(..._args);
		this.handleSlotChange = () => {
			this.syncSlotDerivedState();
			this.observeAssignedControls();
			this.hostAriaMirror?.sync();
		};
	}
	static {
		this.styles = pkInputGroupStyles;
	}
	disconnectedCallback() {
		this.hostAriaMirror?.disconnect();
		this.hostAriaMirror = void 0;
		this.controlStateObserver?.disconnect();
		this.controlStateObserver = void 0;
		super.disconnectedCallback();
	}
	firstUpdated() {
		this.syncSlotDerivedState();
		this.connectAriaMirror();
		this.connectControlStateObserver();
	}
	connectAriaMirror() {
		this.hostAriaMirror?.disconnect();
		this.hostAriaMirror = new HostAriaMirror(this, () => this.defaultSlot ? getSlottedFocusTarget(this.defaultSlot) : null);
		this.hostAriaMirror.connect();
	}
	connectControlStateObserver() {
		this.controlStateObserver?.disconnect();
		this.controlStateObserver = new MutationObserver(() => {
			this.syncControlChromeState();
		});
		this.observeAssignedControls();
	}
	observeAssignedControls() {
		if (!this.controlStateObserver) return;
		this.controlStateObserver.disconnect();
		for (const element of this.defaultSlot?.assignedElements({ flatten: true }) ?? []) this.controlStateObserver.observe(element, {
			attributes: true,
			attributeFilter: [
				"invalid",
				"disabled",
				"aria-invalid"
			]
		});
	}
	syncSlotDerivedState() {
		this.syncBlockLayout();
		this.syncControlChromeState();
	}
	/** Block addons live in light DOM; `:host(:has())` cannot see slotted children from shadow styles. */
	syncBlockLayout() {
		const blockLayout = (this.defaultSlot?.assignedElements({ flatten: true }) ?? []).some((element) => element.matches("pk-input-group-addon[align=\"block-start\"], pk-input-group-addon[align=\"block-end\"]"));
		this.toggleAttribute("data-block-layout", blockLayout);
	}
	/**
	* Mirror control invalid/disabled onto the host so shadow styles can paint shell chrome
	* without `:host(:has(…))` (unreliable for light-DOM slotted children in Chromium).
	*/
	syncControlChromeState() {
		const elements = this.defaultSlot?.assignedElements({ flatten: true }) ?? [];
		const control = elements.find((element) => element.matches("pk-input-group-input, pk-input-group-textarea"));
		const isInvalid = Boolean(control && (control.hasAttribute("invalid") || control.getAttribute("aria-invalid") === "true" || "invalid" in control && Boolean(control.invalid)));
		const isDisabled = elements.some((element) => element.hasAttribute("disabled") || "disabled" in element && Boolean(element.disabled));
		this.toggleAttribute("data-invalid", isInvalid);
		this.toggleAttribute("data-disabled", isDisabled);
	}
	render() {
		return html`
            <div part="base" class="group" role="group">
                <slot @slotchange=${this.handleSlotChange}></slot>
            </div>
        `;
	}
};
__decorate([query("slot")], PkInputGroup.prototype, "defaultSlot", void 0);
PkInputGroup = __decorate([customElement("pk-input-group")], PkInputGroup);
//#endregion
export { PkInputGroup as t };

//# sourceMappingURL=pk-input-group-CGHQKrt8.js.map