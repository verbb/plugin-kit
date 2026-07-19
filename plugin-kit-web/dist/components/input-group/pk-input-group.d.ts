import { PkElement } from '../../base/pk-element.js';
/**
 * Groups an input with addons inside one field boundary — ShadCN / Base UI input-group pattern.
 *
 * Place `pk-input-group-input` or `pk-input-group-textarea` first in the DOM, then addons.
 * Use the addon `align` prop to position them visually.
 *
 * @slot - Input controls and addons
 *
 * @csspart base - Group shell
 */
export declare class PkInputGroup extends PkElement {
    static styles: import('lit').CSSResult[];
    private defaultSlot;
    private hostAriaMirror?;
    /** Watch slotted control `invalid` / `disabled` / `aria-invalid` for host chrome attrs. */
    private controlStateObserver?;
    disconnectedCallback(): void;
    firstUpdated(): void;
    private connectAriaMirror;
    private connectControlStateObserver;
    private observeAssignedControls;
    private handleSlotChange;
    private syncSlotDerivedState;
    /** Block addons live in light DOM; `:host(:has())` cannot see slotted children from shadow styles. */
    private syncBlockLayout;
    /**
     * Mirror control invalid/disabled onto the host so shadow styles can paint shell chrome
     * without `:host(:has(…))` (unreliable for light-DOM slotted children in Chromium).
     */
    private syncControlChromeState;
    render(): import('lit-html').TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'pk-input-group': PkInputGroup;
    }
}
//# sourceMappingURL=pk-input-group.d.ts.map