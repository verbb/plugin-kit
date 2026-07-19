import { html, nothing } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { customElement, property, state } from 'lit/decorators.js';
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';
import { chevronDown, iconToSvg } from '@verbb/plugin-kit-icons';

import { PkElement } from '../../base/pk-element.js';
import { getButtonSpinnerSize, resolveSpinnerVariant } from '../spinner/spinner-utils.js';
import type { PkSpinnerSize, PkSpinnerTone, PkSpinnerVariant } from '../spinner/pk-spinner.js';

export type { PkSpinnerSize };
import '../spinner/pk-spinner.js';
import { pkButtonStyles } from './pk-button.styles.js';

export type PkButtonVariant =
    | 'default'
    | 'primary'
    | 'secondary'
    | 'outline'
    | 'transparent'
    | 'link'
    | 'dashed'
    | 'none';

export type PkButtonSize = 'default' | 'xxs' | 'xs' | 'sm' | 'lg' | 'xl' | 'none';

const CARET_ICON = iconToSvg(chevronDown);

/**
 * Craft-aligned action button.
 *
 * @slot - Button label
 * @slot start - Leading icon or prefix
 * @slot end - Trailing icon or suffix
 *
 * @csspart base - The native button element
 */
@customElement('pk-button')
export class PkButton extends PkElement {
    static override shadowRootOptions: ShadowRootInit = {
        mode: 'open',
        delegatesFocus: true,
    };

    static override styles = pkButtonStyles;

    @property({ reflect: true })
    variant: PkButtonVariant = 'default';

    @property({ reflect: true })
    size: PkButtonSize = 'default';

    @property({ type: Boolean, reflect: true })
    disabled = false;

    @property({ type: Boolean, reflect: true })
    loading = false;

    /**
     * Override loading spinner size. When unset, derived from `size` via
     * `getButtonSpinnerSize` — same defaults as v1 Button (xxs/xs → xxs, lg/xl → sm, else xs).
     * Formie New Form passes `xs` on `size="lg"` so the ring stays size-4 (1rem), not sm (1.5rem).
     */
    @property({ reflect: true, attribute: 'spinner-size' })
    spinnerSize?: PkSpinnerSize;

    @property({ reflect: true, attribute: 'spinner-variant' })
    spinnerVariant?: PkSpinnerVariant;

    @property({ reflect: true, attribute: 'spinner-tone' })
    spinnerTone?: PkSpinnerTone;

    @property({ type: Boolean, reflect: true, attribute: 'with-caret' })
    withCaret = false;

    /**
     * Compact chevron-only trigger for grouped split actions — Craft `.menubtn`.
     *
     * Not a variant or size: set this boolean on the disclosure end-cap in a split group.
     * Hides label/icons and draws a CSS `::after` chevron (0.4375rem, 2px borders).
     * Inherits `variant`/`size` from sibling buttons; inline padding narrows to 8px.
     * Do not pass a chevron icon — use `icon` + a start-slot icon for a padless square control.
     */
    @property({ type: Boolean, reflect: true, attribute: 'group-trigger' })
    groupTrigger = false;

    /**
     * Compact icon density: padless box that hugs the glyph (no square hit target).
     *
     * Prefer default icon-only usage for action rows — without this flag, icon-only
     * buttons are square (`width`/`height` = size height) with the glyph from
     * `--pk-btn-icon-size`. Use `icon` for dense × / ⋯ in cells.
     * For one-off dimensions use `size="none"` and set `--pk-btn-*` on the host.
     */
    @property({ type: Boolean, reflect: true })
    icon = false;

    @property()
    href?: string;

    @property()
    target?: string;

    @property()
    rel?: string;

    @property()
    name?: string;

    @property()
    value?: string;

    @property()
    title = '';

    @property()
    type: 'button' | 'submit' | 'reset' = 'button';

    /**
     * HTML form owner id — same as native `<button form="…">`.
     * Needed when the submit control lives outside the `<form>` (e.g. dialog footer).
     */
    @property({ reflect: true })
    form?: string;

    @state()
    private hasDefaultSlotContent = false;

    @state()
    private hasStartSlotContent = false;

    @state()
    private hasEndSlotContent = false;

    private defaultSlotChanged(event: Event): void {
        const slot = event.target as HTMLSlotElement;
        this.hasDefaultSlotContent = slot.assignedNodes({ flatten: true }).some((node) => {
            if (node.nodeType === Node.TEXT_NODE) {
                return node.textContent?.trim();
            }

            return node.nodeType === Node.ELEMENT_NODE;
        });
    }

    private iconSlotChanged(event: Event, which: 'start' | 'end'): void {
        const slot = event.target as HTMLSlotElement;
        const hasContent = slot.assignedNodes({ flatten: true }).some((node) => {
            if (node.nodeType === Node.TEXT_NODE) {
                return node.textContent?.trim();
            }

            return node.nodeType === Node.ELEMENT_NODE;
        });

        if (which === 'start') {
            this.hasStartSlotContent = hasContent;
        } else {
            this.hasEndSlotContent = hasContent;
        }
    }

    private startSlotChanged = (event: Event): void => {
        this.iconSlotChanged(event, 'start');
    };

    private endSlotChanged = (event: Event): void => {
        this.iconSlotChanged(event, 'end');
    };

    private buttonClasses() {
        return classMap({
            button: true,
            'has-label': this.hasDefaultSlotContent,
            loading: this.loading,
            caret: this.withCaret,
            'group-trigger': this.groupTrigger,
        });
    }

    override connectedCallback(): void {
        super.connectedCallback();
        this.setAttribute('data-slot', 'button');
        this.addEventListener('click', this.handleHostClick);
    }

    override disconnectedCallback(): void {
        this.removeEventListener('click', this.handleHostClick);
        super.disconnectedCallback();
    }

    /**
     * Resolve the light-DOM form for submit/reset.
     * Prefer `form` id (dialog footer submitters), then ancestor `<form>`.
     * Never target Craft’s `#main` shell.
     */
    private resolveAssociatedForm(): HTMLFormElement | null {
        const byId = (this.form || this.getAttribute('form') || '').trim();

        if (byId) {
            const el = this.ownerDocument?.getElementById(byId);

            if (el instanceof HTMLFormElement && el.id !== 'main') {
                return el;
            }
        }

        const closest = this.closest('form');

        if (closest && closest.id !== 'main') {
            return closest;
        }

        return null;
    }

    /**
     * Shadow inner `<button type="submit|reset">` is not a form owner for an
     * ancestor light-DOM `<form>` — bridge click → `requestSubmit` / `reset`.
     * Skip Craft’s `#main` shell form (same guard as implicit Enter submit).
     */
    private handleHostClick = (event: MouseEvent): void => {
        if (this.disabled || this.loading || this.href) {
            return;
        }

        if (this.type !== 'submit' && this.type !== 'reset') {
            return;
        }

        const form = this.resolveAssociatedForm();

        if (!form) {
            return;
        }

        // Stop the inner shadow button’s non-associated default; we own submit/reset.
        event.preventDefault();
        event.stopPropagation();

        if (this.type === 'reset') {
            form.reset();
            return;
        }

        if (typeof form.requestSubmit === 'function') {
            form.requestSubmit();
            return;
        }

        form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    };

    override render() {
        // Explicit spinner-size wins (v1 Button `spinnerSize`); else map from button size.
        const spinnerSize = this.spinnerSize || getButtonSpinnerSize(this.size);
        const spinnerVariant = resolveSpinnerVariant(this.variant, this.spinnerVariant);
        const isLink = Boolean(this.href);

        return html`
            ${isLink
                ? html`
                    <a
                        part="base"
                        class=${this.buttonClasses()}
                        href=${this.href!}
                        target=${this.target ?? nothing}
                        rel=${this.rel ?? nothing}
                        title=${this.title || nothing}
                    >
                        ${this.renderInner(spinnerSize, spinnerVariant)}
                    </a>
                `
                : html`
                    <button
                        part="base"
                        class=${this.buttonClasses()}
                        type=${this.type}
                        ?disabled=${this.disabled}
                        aria-disabled=${this.disabled ? 'true' : nothing}
                        aria-busy=${this.loading ? 'true' : nothing}
                        name=${this.name ?? nothing}
                        value=${this.value ?? nothing}
                        title=${this.title || nothing}
                    >
                        ${this.renderInner(spinnerSize, spinnerVariant)}
                    </button>
                `}
        `;
    }

    private renderInner(spinnerSize: PkSpinnerSize, spinnerVariant: PkSpinnerVariant) {
        return html`
            <span
                class=${classMap({
                    'icon-slot': true,
                    'icon-slot--start': true,
                    'icon-slot--has-content': this.hasStartSlotContent,
                })}
            >
                <slot name="start" @slotchange=${this.startSlotChanged}></slot>
            </span>
            ${this.loading
                ? html`
                    <pk-spinner
                        variant=${spinnerVariant}
                        size=${spinnerSize}
                        tone=${this.spinnerTone ?? nothing}
                        centered
                    ></pk-spinner>
                `
                : nothing}
            <span
                class=${classMap({
                    label: true,
                    'is-empty': !this.hasDefaultSlotContent,
                    loading: this.loading,
                })}
            >
                <slot @slotchange=${this.defaultSlotChanged}></slot>
            </span>
            <span
                class=${classMap({
                    'icon-slot': true,
                    'icon-slot--end': true,
                    'icon-slot--has-content': this.hasEndSlotContent,
                })}
            >
                <slot name="end" @slotchange=${this.endSlotChanged}></slot>
            </span>
            ${this.withCaret || this.groupTrigger
                ? html`<span part="caret" class="caret">${unsafeSVG(CARET_ICON)}</span>`
                : nothing}
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'pk-button': PkButton;
    }
}
