import { f as A, l as n, m as i, p as b, s as e, u as t } from "../../chunks/lit-Dnn7gEi2.js";
import { c as __decorate, l as PkElement } from "../../chunks/pk-base-BlxAYXJD.js";
//#region src/components/button-group/pk-button-group.styles.ts
var pkButtonGroupStyles = i`
    @layer pk-component {
        :host {
            display: inline-flex;
            width: fit-content;
            vertical-align: middle;
        }

        .group {
            display: flex;
            position: relative;
            isolation: isolate;
            flex-wrap: nowrap;
            gap: 0;
            width: fit-content;
            max-width: 100%;
            align-items: stretch;
        }

        :host([orientation='horizontal']) .group {
            flex-direction: row;
        }

        :host([orientation='vertical']) .group {
            flex-direction: column;
            align-items: stretch;
        }

        :host([orientation='vertical']) ::slotted(pk-button),
        :host([orientation='vertical']) ::slotted(pk-toggle),
        :host([orientation='vertical']) ::slotted(pk-input),
        :host([orientation='vertical']) ::slotted(pk-input-group),
        :host([orientation='vertical']) ::slotted(.button-group-text),
        :host([orientation='vertical']) ::slotted(select.button-group-select) {
            align-self: stretch;
            width: 100%;
            max-width: 100%;
            box-sizing: border-box;
        }

        @media (hover: hover) {
            .group > :hover,
            ::slotted(:hover) {
                z-index: 1;
            }
        }

        .group > :focus-visible,
        ::slotted(:focus-visible),
        ::slotted(:focus-within),
        ::slotted([aria-checked='true']),
        ::slotted([checked]) {
            position: relative;
            z-index: 2;
        }

        /* Flush join: filled controls sit edge-to-edge; outlined controls overlap 1px to collapse borders */
        :host([orientation='horizontal']) {
            --pk-bg-horizontal-indent: 0;
            --pk-bg-horizontal-indent-outlined: -1px;
            --pk-btn-group-gap: 1px;
            --pk-btn-group-divider-color-outline: var(--pk-color-slate-400);
            --pk-btn-group-divider-color-dashed: var(--pk-color-slate-500);
        }

        :host([orientation='vertical']) {
            --pk-bg-vertical-indent: 0;
            --pk-bg-vertical-indent-outlined: -1px;
            --pk-btn-group-gap: 1px;
            --pk-btn-group-divider-color-outline: var(--pk-color-slate-400);
            --pk-btn-group-divider-color-dashed: var(--pk-color-slate-500);
        }

        :host([separators][orientation='horizontal']) {
            --pk-bg-horizontal-indent: 0;
        }

        :host([separators][orientation='vertical']) {
            --pk-bg-vertical-indent: 0;
        }

        ::slotted([data-pk-group-orientation='horizontal']:not([data-pk-group-item-first]):not([data-pk-group-item-last])) {
            --pk-bg-start-start-radius: 0;
            --pk-bg-start-end-radius: 0;
            --pk-bg-end-start-radius: 0;
            --pk-bg-end-end-radius: 0;
        }

        ::slotted([data-pk-group-orientation='horizontal'][data-pk-group-item-first]:not([data-pk-group-item-last])) {
            --pk-bg-start-end-radius: 0;
            --pk-bg-end-end-radius: 0;
        }

        ::slotted([data-pk-group-orientation='horizontal'][data-pk-group-item-last]:not([data-pk-group-item-first])) {
            --pk-bg-start-start-radius: 0;
            --pk-bg-end-start-radius: 0;
        }

        ::slotted([data-pk-group-orientation='vertical']:not([data-pk-group-item-first]):not([data-pk-group-item-last])) {
            --pk-bg-start-start-radius: 0;
            --pk-bg-start-end-radius: 0;
            --pk-bg-end-start-radius: 0;
            --pk-bg-end-end-radius: 0;
        }

        ::slotted([data-pk-group-orientation='vertical'][data-pk-group-item-first]:not([data-pk-group-item-last])) {
            --pk-bg-end-start-radius: 0;
            --pk-bg-end-end-radius: 0;
        }

        ::slotted([data-pk-group-orientation='vertical'][data-pk-group-item-last]:not([data-pk-group-item-first])) {
            --pk-bg-start-start-radius: 0;
            --pk-bg-start-end-radius: 0;
        }

        :host([exclusive]) ::slotted(pk-button[aria-pressed='true']) {
            --pk-btn-fill: var(--pk-color-gray-500);
            --pk-btn-fill-hover: var(--pk-color-gray-550);
            --pk-btn-fill-active: var(--pk-color-gray-600);
            --pk-btn-on: var(--pk-color-white);
        }

        :host:has(::slotted(pk-button-group-separator)) {
            --pk-btn-group-separator-color: transparent;
        }

        ::slotted(pk-input),
        ::slotted(pk-input-group) {
            width: auto;
            flex: 0 1 auto;
            align-self: stretch;
        }

        ::slotted(pk-popover),
        ::slotted(pk-dropdown-menu) {
            display: inline-flex;
            align-self: auto;
            flex: 0 0 auto;
        }

        ::slotted(.button-group-text) {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            min-height: var(--pk-btn-height-default);
            padding: 0 0.625rem;
            border-width: 1px;
            border-style: solid;
            border-color: var(--pk-color-slate-400);
            background: var(--pk-color-gray-100);
            color: var(--pk-color-gray-700);
            font-family: var(--pk-font-family);
            font-size: var(--pk-font-size-sm);
            font-weight: 500;
            line-height: var(--pk-line-height);
            box-sizing: border-box;
            white-space: nowrap;
            border-top-left-radius: var(--pk-bg-start-start-radius, var(--pk-radius-lg));
            border-top-right-radius: var(--pk-bg-start-end-radius, var(--pk-radius-lg));
            border-bottom-left-radius: var(--pk-bg-end-start-radius, var(--pk-radius-lg));
            border-bottom-right-radius: var(--pk-bg-end-end-radius, var(--pk-radius-lg));
        }

        :host([orientation='horizontal']) ::slotted([data-pk-group-orientation='horizontal'][data-pk-group-join]:not([data-pk-group-divider]).button-group-text),
        :host([orientation='horizontal']) ::slotted([data-pk-group-orientation='horizontal'][data-pk-group-join]:not([data-pk-group-divider])select.button-group-select),
        :host([orientation='horizontal']) ::slotted([data-pk-group-orientation='horizontal'][data-pk-group-join]:not([data-pk-group-divider])pk-input-group) {
            margin-inline-start: var(--pk-bg-horizontal-indent-outlined, 0);
            border-left-width: 0;
        }

        :host([orientation='vertical']) ::slotted([data-pk-group-orientation='vertical'][data-pk-group-join]:not([data-pk-group-divider]).button-group-text),
        :host([orientation='vertical']) ::slotted([data-pk-group-orientation='vertical'][data-pk-group-join]:not([data-pk-group-divider])select.button-group-select),
        :host([orientation='vertical']) ::slotted([data-pk-group-orientation='vertical'][data-pk-group-join]:not([data-pk-group-divider])pk-input-group) {
            margin-block-start: var(--pk-bg-vertical-indent-outlined, 0);
            border-top-width: 0;
        }

        ::slotted(select.button-group-select) {
            display: block;
            margin: 0;
            padding: 0 10px;
            border-width: 1px;
            border-style: solid;
            border-color: var(--pk-color-slate-400);
            background: var(--pk-color-white);
            color: var(--pk-color-gray-900);
            font-family: var(--pk-font-family);
            font-size: var(--pk-font-size-base);
            line-height: 1.4;
            appearance: none;
            box-sizing: border-box;
            align-self: stretch;
            min-height: var(--pk-btn-height-default);
            height: var(--pk-btn-height-default);
            border-top-left-radius: var(--pk-bg-start-start-radius, var(--pk-radius-lg));
            border-top-right-radius: var(--pk-bg-start-end-radius, var(--pk-radius-lg));
            border-bottom-left-radius: var(--pk-bg-end-start-radius, var(--pk-radius-lg));
            border-bottom-right-radius: var(--pk-bg-end-end-radius, var(--pk-radius-lg));
        }

        ::slotted(pk-separator) {
            align-self: stretch;
        }

        ::slotted(pk-separator[orientation='vertical']),
        ::slotted(pk-button-group-separator) {
            height: auto;
            flex-shrink: 0;
        }

        :host([orientation='horizontal']) ::slotted([data-pk-group-orientation='horizontal'][data-pk-group-divider][data-pk-group-join].button-group-text),
        :host([orientation='horizontal']) ::slotted([data-pk-group-orientation='horizontal'][data-pk-group-divider][data-pk-group-join]select.button-group-select),
        :host([orientation='horizontal']) ::slotted([data-pk-group-orientation='horizontal'][data-pk-group-divider][data-pk-group-join]pk-input-group) {
            margin-inline-start: var(--pk-bg-horizontal-indent-outlined, 0);
        }

        :host([orientation='vertical']) ::slotted([data-pk-group-orientation='vertical'][data-pk-group-divider][data-pk-group-join].button-group-text),
        :host([orientation='vertical']) ::slotted([data-pk-group-orientation='vertical'][data-pk-group-divider][data-pk-group-join]select.button-group-select),
        :host([orientation='vertical']) ::slotted([data-pk-group-orientation='vertical'][data-pk-group-divider][data-pk-group-join]pk-input-group) {
            margin-block-start: var(--pk-bg-vertical-indent-outlined, 0);
        }

        :host([orientation='horizontal']) ::slotted(.button-group-text[data-pk-group-divider]),
        :host([orientation='horizontal']) ::slotted(select.button-group-select[data-pk-group-divider]),
        :host([orientation='horizontal']) ::slotted(pk-input-group[data-pk-group-divider]) {
            border-left-width: 1px;
            border-left-style: solid;
            border-left-color: var(--pk-btn-group-divider-color-outline, var(--pk-color-slate-400));
            box-shadow: none;
        }

        :host([orientation='vertical']) ::slotted(.button-group-text[data-pk-group-divider]),
        :host([orientation='vertical']) ::slotted(select.button-group-select[data-pk-group-divider]),
        :host([orientation='vertical']) ::slotted(pk-input-group[data-pk-group-divider]) {
            border-top-width: 1px;
            border-top-style: solid;
            border-top-color: var(--pk-btn-group-divider-color-outline, var(--pk-color-slate-400));
            box-shadow: none;
        }

        :host([orientation='horizontal']) ::slotted([data-pk-group-internal-trail].button-group-text),
        :host([orientation='horizontal']) ::slotted([data-pk-group-internal-trail].button-group-select),
        :host([orientation='horizontal']) ::slotted([data-pk-group-internal-trail]select.button-group-select),
        :host([orientation='horizontal']) ::slotted([data-pk-group-internal-trail]pk-input-group) {
            border-right-width: 0;
        }

        :host([orientation='vertical']) ::slotted([data-pk-group-internal-trail].button-group-text),
        :host([orientation='vertical']) ::slotted([data-pk-group-internal-trail].button-group-select),
        :host([orientation='vertical']) ::slotted([data-pk-group-internal-trail]select.button-group-select),
        :host([orientation='vertical']) ::slotted([data-pk-group-internal-trail]pk-input-group) {
            border-bottom-width: 0;
        }
    }
`;
//#endregion
//#region src/components/button-group/pk-button-group.ts
var GROUP_JOIN_ATTR = "data-pk-group-join";
var GROUP_DIVIDER_ATTR = "data-pk-group-divider";
var GROUP_ITEM_FIRST = "data-pk-group-item-first";
var GROUP_ITEM_LAST = "data-pk-group-item-last";
var GROUP_INTERNAL_TRAIL = "data-pk-group-internal-trail";
var GROUP_BTN_LAST = "data-pk-group-btn-last";
var GROUP_ORIENTATION_ATTR = "data-pk-group-orientation";
var GROUP_SEPARATOR_TAGS = new Set(["PK-SEPARATOR", "PK-BUTTON-GROUP-SEPARATOR"]);
var OVERLAY_WRAPPER_TAGS = new Set(["PK-POPOVER", "PK-DROPDOWN-MENU"]);
/** Boolean attribute defaulting to true — absent means on; `separators="false"` opts out. */
var separatorsConverter = {
	fromAttribute(value) {
		if (value === null) return true;
		return value !== "false";
	},
	toAttribute(value) {
		if (value) return "";
		return "false";
	}
};
function isGroupSeparator(element) {
	return GROUP_SEPARATOR_TAGS.has(element.tagName);
}
function getLayoutTarget(element) {
	if (OVERLAY_WRAPPER_TAGS.has(element.tagName)) return element.querySelector("[slot=\"trigger\"]") ?? element;
	return element;
}
function getLayoutTargets(element) {
	if (OVERLAY_WRAPPER_TAGS.has(element.tagName)) {
		const trigger = getLayoutTarget(element);
		return trigger === element ? [element] : [element, trigger];
	}
	return [element];
}
function getCornerTargets(element, surface) {
	return element === surface ? [element] : [element, surface];
}
function collectSyncTargets(element) {
	const surface = getLayoutTarget(element);
	return [...new Set([...getLayoutTargets(element), ...getCornerTargets(element, surface)])];
}
function clearLayoutAttrs(element) {
	for (const target of collectSyncTargets(element)) {
		target.removeAttribute(GROUP_JOIN_ATTR);
		target.removeAttribute(GROUP_DIVIDER_ATTR);
		target.removeAttribute(GROUP_ITEM_FIRST);
		target.removeAttribute(GROUP_ITEM_LAST);
		target.removeAttribute(GROUP_INTERNAL_TRAIL);
		target.removeAttribute(GROUP_BTN_LAST);
		target.removeAttribute(GROUP_ORIENTATION_ATTR);
	}
}
function isGroupTrigger(element) {
	return getLayoutTarget(element).hasAttribute("group-trigger") || element.hasAttribute("group-trigger");
}
function splitSegments(items) {
	const segments = [];
	let current = [];
	for (const item of items) {
		if (isGroupSeparator(item)) {
			if (current.length) segments.push(current);
			current = [];
			continue;
		}
		current.push(item);
	}
	if (current.length) segments.push(current);
	return segments;
}
var PkButtonGroup = class PkButtonGroup extends PkElement {
	constructor(..._args) {
		super(..._args);
		this.orientation = "horizontal";
		this.separators = true;
		this.exclusive = false;
		this.label = "";
	}
	static {
		this.styles = pkButtonGroupStyles;
	}
	firstUpdated() {
		this.scheduleSyncGroupLayout();
	}
	updated(changed) {
		if (changed.has("orientation")) {
			this.setAttribute("aria-orientation", this.orientation);
			this.scheduleSyncGroupLayout();
		}
		if (changed.has("label")) if (this.label) this.setAttribute("aria-label", this.label);
		else this.removeAttribute("aria-label");
		if (changed.has("separators") || changed.has("exclusive")) this.scheduleSyncGroupLayout();
	}
	scheduleSyncGroupLayout() {
		this.syncGroupLayout();
		queueMicrotask(() => this.syncGroupLayout());
	}
	handleSlotChange() {
		this.scheduleSyncGroupLayout();
	}
	/** Overlap-join adjacent items within each segment; 1px divider between joins when `separators` is on. */
	syncGroupLayout() {
		const items = this.defaultSlot?.assignedElements({ flatten: true }) ?? [];
		const segments = splitSegments(items);
		for (const element of items) clearLayoutAttrs(element);
		for (const element of items) for (const target of collectSyncTargets(element)) target.setAttribute(GROUP_ORIENTATION_ATTR, this.orientation);
		for (let segmentIndex = 0; segmentIndex < segments.length; segmentIndex++) {
			const segment = segments[segmentIndex];
			const isFirstSegment = segmentIndex === 0;
			const isLastSegment = segmentIndex === segments.length - 1;
			for (let index = 0; index < segment.length; index++) {
				const element = segment[index];
				const surface = getLayoutTarget(element);
				const cornerTargets = getCornerTargets(element, surface);
				const isOnly = segment.length === 1;
				const isFirst = index === 0;
				const isLast = index === segment.length - 1;
				for (const target of cornerTargets) if (isOnly) {
					if (isFirstSegment) target.setAttribute(GROUP_ITEM_FIRST, "");
					if (isLastSegment) target.setAttribute(GROUP_ITEM_LAST, "");
				} else {
					if (isFirst) target.setAttribute(GROUP_ITEM_FIRST, "");
					if (isLast) target.setAttribute(GROUP_ITEM_LAST, "");
				}
				if (isFirst) {
					if (this.separators && !isLast) for (const target of getLayoutTargets(element)) target.setAttribute(GROUP_INTERNAL_TRAIL, "");
					continue;
				}
				for (const target of getLayoutTargets(element)) {
					target.setAttribute(GROUP_JOIN_ATTR, "");
					if (this.separators) target.setAttribute(GROUP_DIVIDER_ATTR, "");
				}
				if (this.separators && !isLast) for (const target of getLayoutTargets(element)) target.setAttribute(GROUP_INTERNAL_TRAIL, "");
				if (isGroupTrigger(element)) surface.setAttribute(GROUP_BTN_LAST, "");
			}
		}
	}
	render() {
		return b`
            <div part="base" class="group" role="group" aria-label=${this.label || A}>
                <slot @slotchange=${this.handleSlotChange}></slot>
            </div>
        `;
	}
};
__decorate([n({ reflect: true })], PkButtonGroup.prototype, "orientation", void 0);
__decorate([n({
	type: Boolean,
	reflect: true,
	converter: separatorsConverter
})], PkButtonGroup.prototype, "separators", void 0);
__decorate([n({
	type: Boolean,
	reflect: true
})], PkButtonGroup.prototype, "exclusive", void 0);
__decorate([n()], PkButtonGroup.prototype, "label", void 0);
__decorate([e("slot:not([name])")], PkButtonGroup.prototype, "defaultSlot", void 0);
PkButtonGroup = __decorate([t("pk-button-group")], PkButtonGroup);
//#endregion
export { PkButtonGroup };
