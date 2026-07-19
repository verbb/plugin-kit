import { html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';

import { check, renderIconHtml } from '../../icons/index.js';
import { PkElement } from '../../base/pk-element.js';
import { splitHighlightParts } from '../../utils/highlight-text.js';
import { pkOptionStyles } from './pk-option.styles.js';

const CHECK_ICON = renderIconHtml(check);

/**
 * Select option — use inside `pk-select` or `pk-combobox`.
 *
 * @slot start - Presentational decoration before the label (e.g. `pk-status`).
 * @slot - Option label
 *
 * @csspart start - Start decoration container
 * @csspart option - Option button
 * @csspart label - Option label
 * @csspart check - Selected-state check indicator
 */
@customElement('pk-option')
export class PkOption extends PkElement {
    static override styles = pkOptionStyles;

    @property()
    value = '';

    /**
     * Optional short label for the closed trigger / filter identity (v1 itemToStringLabel).
     * When set, preferred over concatenating rich default-slot text (title + subtitle).
     */
    @property()
    label = '';

    @property({ type: Boolean, reflect: true })
    disabled = false;

    @property({ type: Boolean, reflect: true })
    selected = false;

    @property({ type: Boolean, reflect: true })
    highlighted = false;

    @property({ type: Boolean, reflect: true })
    hidden = false;

    @property({ type: Number, attribute: 'focus-index' })
    focusIndex = -1;

    @property()
    optionId = '';

    /** When set, the label renders with matching query text highlighted (combobox filter). */
    @property({ attribute: false })
    matchQuery = '';

    focusControl(preventScroll = true): void {
        this.shadowRoot?.querySelector<HTMLButtonElement>('.option')?.focus({ preventScroll });
    }

    /**
     * Label for the closed combobox/select value.
     * Prefers the `label` attribute when set; otherwise default-slot text
     * (excluding `slot="start"`), joined with spaces for multi-node layouts.
     */
    getLabel(): string {
        if (this.label.trim()) {
            return this.label.trim();
        }

        const labelSlot = this.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])');

        if (!labelSlot) {
            return this.textContent?.trim() ?? this.value;
        }

        // Join with spaces so multi-line custom labels ("Link" + "Craft CMS") do not
        // concatenate into "LinkCraft CMS" when no explicit `label` is set.
        return labelSlot.assignedNodes()
            .map((node) => (node.textContent ?? '').trim())
            .filter(Boolean)
            .join(' ')
            .trim();
    }

    /** Full default-slot text for typeahead matching (includes subtitle lines). */
    getSearchText(): string {
        const labelSlot = this.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])');

        if (!labelSlot) {
            return this.getLabel();
        }

        const fromSlot = labelSlot.assignedNodes()
            .map((node) => (node.textContent ?? '').trim())
            .filter(Boolean)
            .join(' ')
            .trim();

        return fromSlot || this.getLabel();
    }

    /** True when the default slot has element children (custom multi-line / rich layouts). */
    private hasRichLabelContent(): boolean {
        return [...this.children].some((node) => {
            if (!(node instanceof HTMLElement)) {
                return false;
            }

            // Named slots (e.g. start) are not part of the label.
            return !node.slot || node.slot === '';
        });
    }

    /** Light-DOM elements assigned to the start decoration slot. */
    getStartElements(): HTMLElement[] {
        return [...this.querySelectorAll(':scope > [slot="start"]')].filter(
            (node): node is HTMLElement => node instanceof HTMLElement,
        );
    }

    override firstUpdated(): void {
        const startSlot = this.shadowRoot?.querySelector<HTMLSlotElement>('slot[name="start"]');

        startSlot?.addEventListener('slotchange', () => this.syncStartDecoration());
        this.syncStartDecoration();
    }

    private syncStartDecoration(): void {
        this.toggleAttribute('data-has-start', this.getStartElements().length > 0);
    }

    private handleClick(): void {
        if (this.disabled) {
            return;
        }

        this.dispatchEvent(new CustomEvent('pk-option-select', {
            detail: { value: this.value },
            bubbles: true,
            composed: true,
        }));
    }

    private handleMouseEnter(): void {
        if (this.disabled || this.hidden) {
            return;
        }

        this.dispatchEvent(new CustomEvent('pk-option-highlight', {
            detail: { value: this.value },
            bubbles: true,
            composed: true,
        }));
    }

    private handleKeyDown(event: KeyboardEvent): void {
        const navKeys = new Set([
            'ArrowDown',
            'ArrowUp',
            'ArrowLeft',
            'ArrowRight',
            'Home',
            'End',
            'Enter',
            ' ',
            'Escape',
        ]);

        if (!navKeys.has(event.key)) {
            return;
        }

        const owner = this.closest('pk-select, pk-combobox');
        const panel = owner ? null : this.closest('[role="listbox"]');

        if (!owner && !panel) {
            return;
        }

        event.preventDefault();
        event.stopPropagation();

        const keydownEvent = new CustomEvent('pk-listbox-keydown', {
            detail: { keyboardEvent: event },
            bubbles: true,
        });

        if (owner) {
            owner.dispatchEvent(keydownEvent);
            return;
        }

        panel!.dispatchEvent(keydownEvent);
    }

    private renderLabel() {
        const query = this.matchQuery.trim();
        // Flat highlight replaces the default slot — that collapses custom layouts
        // (title + subtitle) into one run when filtering. Keep the slot for rich content.
        if (!query || this.hasRichLabelContent()) {
            return html`
                <span part="label" class="label">
                    <slot></slot>
                </span>
            `;
        }

        const label = this.getLabel();
        const parts = splitHighlightParts(label, query);

        return html`
            <span part="label" class="label">
                ${parts.map((part) => part.match
                    ? html`<mark class="match">${part.text}</mark>`
                    : html`<span>${part.text}</span>`)}
            </span>
        `;
    }

    override render() {
        return html`
            <button
                part="option"
                type="button"
                class="option"
                role="option"
                id=${this.optionId || nothing}
                ?disabled=${this.disabled}
                aria-disabled=${this.disabled ? 'true' : nothing}
                aria-selected=${this.selected ? 'true' : 'false'}
                tabindex=${this.focusIndex}
                @click=${this.handleClick}
                @mouseenter=${this.handleMouseEnter}
                @keydown=${this.handleKeyDown}
            >
                <span part="start" class="start">
                    <slot name="start"></slot>
                </span>
                ${this.renderLabel()}
                <span part="check" class="check" aria-hidden="true">${unsafeSVG(CHECK_ICON)}</span>
            </button>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'pk-option': PkOption;
    }
}
