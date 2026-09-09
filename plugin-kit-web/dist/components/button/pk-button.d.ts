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
 * @csspart base - The native button / link element
 *
 * @cssproperty [--pk-btn-height=var(--pk-btn-height-default)] - Control height (also min-height).
 * @cssproperty [--pk-btn-font=var(--pk-btn-font-default)] - Label font size.
 * @cssproperty [--pk-btn-padding-inline=var(--pk-btn-padding-inline-default)] - Horizontal padding.
 * @cssproperty [--pk-btn-padding-block=0] - Vertical padding override.
 * @cssproperty [--pk-btn-icon-size=var(--pk-btn-icon-size-default)] - Start/end slot glyph size.
 * @cssproperty [--pk-btn-icon-gap=var(--pk-btn-icon-gap-default)] - Gap between icons and label.
 * @cssproperty [--pk-btn-caret-size=var(--pk-btn-caret-size-default)] - Built-in caret glyph size.
 * @cssproperty [--pk-btn-radius=var(--pk-btn-radius-default)] - Border radius.
 * @cssproperty [--pk-btn-fill] - Background fill (filled variants).
 * @cssproperty [--pk-btn-fill-hover] - Hover fill.
 * @cssproperty [--pk-btn-fill-active] - Active / pressed fill.
 * @cssproperty [--pk-btn-on] - Foreground color on filled variants.
 *
 * @dependency pk-spinner - Loading indicator rendered while `loading` is set.
 */
export declare class PkButton extends PkElement {
    static shadowRootOptions: ShadowRootInit;
    static styles: import('lit').CSSResult[];
    /** Visual treatment — filled, outline, link, etc. */
    variant: PkButtonVariant;
    /** Shared CP size scale (`xxs` … `xl`); `none` skips presets for host token overrides. */
    size: PkButtonSize;
    /** Disables the control and blocks activation. */
    disabled: boolean;
    /** Shows an inline spinner and prevents activation while busy. */
    loading: boolean;
    /**
     * Override loading spinner size. When unset, derived from `size` via
     * `getButtonSpinnerSize` — same defaults as v1 Button (xxs/xs → xxs, lg/xl → sm, else xs).
     * Formie New Form passes `xs` on `size="lg"` so the ring stays size-4 (1rem), not sm (1.5rem).
     */
    spinnerSize?: PkSpinnerSize;
    /** Loading spinner visual style. Defaults from the button variant when unset. */
    spinnerVariant?: PkSpinnerVariant;
    /** Loading spinner tone. Defaults from the button variant when unset. */
    spinnerTone?: PkSpinnerTone;
    /** Shows a disclosure caret after the label. */
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
    /** When set, renders as an anchor instead of a button. */
    href?: string;
    /** Anchor `target` when `href` is set. */
    target?: string;
    /** Anchor `rel` when `href` is set. */
    rel?: string;
    /** Native `name` when used as a submit/reset control. */
    name?: string;
    /** Native `value` when used as a submit control. */
    value?: string;
    /**
     * Accessible name for icon-only / unlabeled controls.
     * Applied as `aria-label` — never as HTML `title` (no native hover tooltip).
     * Prefer the `aria-label` attribute when setting from markup; `title` remains
     * as a concise alias for the same accessible name.
     */
    title: string;
    /** Accessible name — wins over {@link title} when both are set. */
    ariaLabel: string | null;
    /** Native button type — ignored when `href` is set. */
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