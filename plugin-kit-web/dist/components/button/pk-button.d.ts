import { PkElement } from '../../base/pk-element.js';
import { PkSpinnerSize, PkSpinnerTone, PkSpinnerVariant } from '../spinner/pk-spinner.js';
export type { PkSpinnerSize };
export type PkButtonVariant = 'default' | 'primary' | 'secondary' | 'outline' | 'transparent' | 'link' | 'dashed' | 'none';
export type PkButtonSize = 'default' | 'xxs' | 'xs' | 'sm' | 'lg' | 'xl' | 'none';
/**
 * Craft-aligned action button.
 *
 * @slot - Button label
 * @slot start - Leading icon or prefix
 * @slot end - Trailing icon or suffix
 *
 * @csspart base - The native button element
 */
export declare class PkButton extends PkElement {
    static shadowRootOptions: ShadowRootInit;
    static styles: import('lit').CSSResult[];
    variant: PkButtonVariant;
    size: PkButtonSize;
    disabled: boolean;
    loading: boolean;
    /**
     * Override loading spinner size. When unset, derived from `size` via
     * `getButtonSpinnerSize` — same defaults as v1 Button (xxs/xs → xxs, lg/xl → sm, else xs).
     * Formie New Form passes `xs` on `size="lg"` so the ring stays size-4 (1rem), not sm (1.5rem).
     */
    spinnerSize?: PkSpinnerSize;
    spinnerVariant?: PkSpinnerVariant;
    spinnerTone?: PkSpinnerTone;
    withCaret: boolean;
    /**
     * Compact chevron-only trigger for grouped split actions — Craft `.menubtn`.
     *
     * Not a variant or size: set this boolean on the disclosure end-cap in a split group.
     * Hides label/icons and draws a CSS `::after` chevron (0.4375rem, 2px borders).
     * Inherits `variant`/`size` from sibling buttons; inline padding narrows to 8px.
     * Do not pass a chevron icon — use `icon` + a start-slot icon for a padless square control.
     */
    groupTrigger: boolean;
    /**
     * Compact icon density: padless box that hugs the glyph (no square hit target).
     *
     * Prefer default icon-only usage for action rows — without this flag, icon-only
     * buttons are square (`width`/`height` = size height) with the glyph from
     * `--pk-btn-icon-size`. Use `icon` for dense × / ⋯ in cells.
     * For one-off dimensions use `size="none"` and set `--pk-btn-*` on the host.
     */
    icon: boolean;
    href?: string;
    target?: string;
    rel?: string;
    name?: string;
    value?: string;
    title: string;
    type: 'button' | 'submit' | 'reset';
    /**
     * HTML form owner id — same as native `<button form="…">`.
     * Needed when the submit control lives outside the `<form>` (e.g. dialog footer).
     */
    form?: string;
    private hasDefaultSlotContent;
    private hasStartSlotContent;
    private hasEndSlotContent;
    private defaultSlotChanged;
    private iconSlotChanged;
    private startSlotChanged;
    private endSlotChanged;
    private buttonClasses;
    connectedCallback(): void;
    disconnectedCallback(): void;
    /**
     * Resolve the light-DOM form for submit/reset.
     * Prefer `form` id (dialog footer submitters), then ancestor `<form>`.
     * Never target Craft’s `#main` shell.
     */
    private resolveAssociatedForm;
    /**
     * Shadow inner `<button type="submit|reset">` is not a form owner for an
     * ancestor light-DOM `<form>` — bridge click → `requestSubmit` / `reset`.
     * Skip Craft’s `#main` shell form (same guard as implicit Enter submit).
     */
    private handleHostClick;
    render(): import('lit-html').TemplateResult<1>;
    private renderInner;
}
declare global {
    interface HTMLElementTagNameMap {
        'pk-button': PkButton;
    }
}
//# sourceMappingURL=pk-button.d.ts.map