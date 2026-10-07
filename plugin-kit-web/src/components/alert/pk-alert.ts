import { html, nothing } from 'lit';
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';
import { customElement, property, query, state } from '../../decorators.js';

import { PkElement } from '../../base/pk-element.js';
import { PkCopyErrorEvent, PkCopyEvent } from '../../events/pk-copy.js';
import { PkDismissEvent } from '../../events/pk-dismiss.js';
import {
    circleCheck,
    circleExclamation,
    circleInfo,
    renderIconHtml,
    triangleExclamation,
    xmark,
} from '../../icons/index.js';
import { HasSlotController } from '../../internal/has-slot.js';
import { copyToClipboard } from '../../utils/copy-to-clipboard.js';
import type { PkCopyButton } from '../copy-button/pk-copy-button.js';
import '../copy-button/pk-copy-button.js';
import { pkAlertStyles } from './pk-alert.styles.js';

export type PkAlertVariant = 'neutral' | 'info' | 'success' | 'warning' | 'error';
export type PkAlertAppearance =
    | 'accent'
    | 'filled-outlined'
    | 'filled'
    | 'outlined'
    | 'plain';
export type PkAlertAnnouncement = 'off' | 'polite' | 'assertive';
export type PkAlertSize = 'sm' | 'default' | 'lg';

const COPY_STATUS_RESET_MS = 3000;

const defaultIcons = {
    neutral: circleInfo,
    info: circleInfo,
    success: circleCheck,
    warning: triangleExclamation,
    error: circleExclamation,
};

/**
 * Semantic notice for feedback, warnings and recoverable failures.
 *
 * @slot title - Alert heading. Takes precedence over the `heading` property.
 * @slot icon - Custom icon. The component supplies a variant icon by default.
 * @slot - Alert message or other primary content.
 * @slot actions - Optional primary alert actions.
 * @slot details - Optional content inside the collapsible details region.
 *
 * @event pk-dismiss - Emitted before a dismissible alert hides. Prevent to keep it visible.
 * @event pk-copy - Emitted when the details are copied successfully.
 * @event pk-copy-error - Emitted when the details cannot be copied.
 *
 * @csspart base - Alert container.
 * @csspart notice - Icon, content and dismiss-button row.
 * @csspart icon - Icon wrapper.
 * @csspart content - Heading and message wrapper.
 * @csspart title - Alert heading.
 * @csspart body - Default content wrapper.
 * @csspart dismiss-button - Dismiss button.
 * @csspart actions - Alert actions wrapper.
 * @csspart details - Collapsible details element.
 * @csspart details-summary - Details disclosure label.
 * @csspart details-content - Details content wrapper.
 * @csspart copy-button - Copy-details button.
 * @csspart copy-status - Copy result status.
 *
 * @cssproperty --pk-alert-accent - Accent, title and icon colour.
 * @cssproperty --pk-alert-background - Alert background.
 * @cssproperty --pk-alert-border - Alert and divider border colour.
 * @cssproperty --pk-alert-color - Alert host colour.
 * @cssproperty --pk-alert-body-color - Primary content colour.
 * @cssproperty --pk-alert-title-color - Heading colour.
 * @cssproperty --pk-alert-title-size - Heading font size.
 * @cssproperty --pk-alert-padding - Alert inner padding.
 * @cssproperty --pk-alert-radius - Alert corner radius.
 * @cssproperty --pk-alert-details-max-height - Maximum height of slotted `pre` details.
 *
 * @dependency pk-copy-button - Compact copy-details action.
 */
@customElement('pk-alert')
export class PkAlert extends PkElement {
    static override styles = pkAlertStyles;

    private readonly hasSlotController = new HasSlotController(
        this,
        'title',
        'icon',
        'actions',
        'details',
    );

    @property({ reflect: true })
    variant: PkAlertVariant = 'info';

    /** Overall density, including typography, icons, spacing, details, and actions. */
    @property({ reflect: true })
    size: PkAlertSize = 'default';

    /** Visual treatment, independent from the alert's semantic variant. */
    @property({ reflect: true })
    appearance: PkAlertAppearance = 'accent';

    @property()
    heading = '';

    @property({ type: Boolean, attribute: 'hide-icon', reflect: true })
    hideIcon = false;

    @property({ type: Boolean, reflect: true })
    dismissible = false;

    @property({ reflect: true })
    announce: PkAlertAnnouncement = 'off';

    @property({ attribute: 'details-label' })
    detailsLabel = 'Details';

    @property({ type: Boolean, attribute: 'details-open', reflect: true })
    detailsOpen = false;

    @property({ type: Boolean, reflect: true })
    copyable = false;

    @property({ attribute: 'copy-label' })
    copyLabel = 'Copy details';

    @property({ attribute: 'copied-label' })
    copiedLabel = 'Details copied.';

    @property({ attribute: 'copy-error-label' })
    copyErrorLabel = 'Copy failed. Select the details and copy them manually.';

    @property({ attribute: 'dismiss-label' })
    dismissLabel = 'Dismiss';

    @query('slot[name="details"]')
    private detailsSlot!: HTMLSlotElement;

    @query('pk-copy-button.copy')
    private copyButton?: PkCopyButton;

    @state()
    private copyStatus = '';

    @state()
    private copyFailed = false;

    private copyStatusResetTimer?: number;

    override disconnectedCallback(): void {
        window.clearTimeout(this.copyStatusResetTimer);
        super.disconnectedCallback();
    }

    private hasTitle(): boolean {
        return Boolean(this.heading) || this.hasSlotController.test('title');
    }

    private hasDetails(): boolean {
        return this.hasSlotController.test('details');
    }

    private get detailsValue(): string {
        return (this.detailsSlot?.assignedNodes({ flatten: true }) ?? [])
            .map((node) => node.textContent ?? '')
            .join('')
            .trim();
    }

    private resetCopyStatusLater(): void {
        window.clearTimeout(this.copyStatusResetTimer);
        this.copyStatusResetTimer = window.setTimeout(() => {
            this.copyStatus = '';
            this.copyFailed = false;
        }, COPY_STATUS_RESET_MS);
    }

    private showCopySuccess(): void {
        this.copyFailed = false;
        this.copyStatus = this.copiedLabel;
        this.resetCopyStatusLater();
    }

    private showCopyError(): void {
        this.copyFailed = true;
        this.copyStatus = this.copyErrorLabel;
        this.resetCopyStatusLater();
    }

    private handleCopySuccess(): void {
        this.showCopySuccess();
    }

    private handleCopyError(): void {
        this.showCopyError();
        this.selectDetails();
    }

    private selectDetails(): void {
        const nodes = this.detailsSlot?.assignedNodes({ flatten: true }) ?? [];
        const first = nodes[0];
        const last = nodes[nodes.length - 1];

        if (!first || !last) {
            return;
        }

        this.detailsOpen = true;

        const range = document.createRange();
        range.setStartBefore(first);
        range.setEndAfter(last);

        const selection = window.getSelection();
        selection?.removeAllRanges();
        selection?.addRange(range);
    }

    /** Copy the plain text assigned to the details slot. */
    async copyDetails(): Promise<void> {
        const value = this.detailsValue;

        if (!value) {
            this.showCopyError();
            this.dispatchEvent(new PkCopyErrorEvent());
            return;
        }

        if (this.copyButton) {
            this.copyButton.value = value;
            await this.copyButton.copy();
            return;
        }

        try {
            await copyToClipboard(value);
            this.showCopySuccess();
            const copyEvent = new PkCopyEvent(value);
            this.dispatchEvent(copyEvent);
        } catch {
            this.showCopyError();
            this.selectDetails();
            this.dispatchEvent(new PkCopyErrorEvent());
        }
    }

    /** Request dismissal and hide the alert unless the event is prevented. */
    dismiss(): void {
        if (this.dispatchEvent(new PkDismissEvent())) {
            this.hidden = true;
        }
    }

    /** Show an alert hidden by `dismiss()`. */
    show(): void {
        this.hidden = false;
    }

    private handleDetailsToggle(event: Event): void {
        this.detailsOpen = (event.currentTarget as HTMLDetailsElement).open;
    }

    private renderIcon() {
        if (this.hideIcon) {
            return nothing;
        }

        const icon = this.hasSlotController.test('icon')
            ? html`<slot name="icon"></slot>`
            : unsafeSVG(renderIconHtml(defaultIcons[this.variant] ?? defaultIcons.info));

        return html`<span part="icon" class="icon" aria-hidden="true">${icon}</span>`;
    }

    override render() {
        const role = this.announce === 'assertive'
            ? 'alert'
            : this.announce === 'polite'
                ? 'status'
                : nothing;
        const live = this.announce === 'off' ? nothing : this.announce;
        const hasActions = this.hasSlotController.test('actions');
        const hasDetails = this.hasDetails();

        return html`
            <div
                part="base"
                class="alert"
                role=${role}
                aria-live=${live}
                aria-atomic=${this.announce === 'off' ? nothing : 'true'}
            >
                <div part="notice" class="notice">
                    ${this.renderIcon()}

                    <div part="content" class="content">
                        ${this.hasTitle()
                            ? html`
                                <strong part="title" class="title">
                                    ${this.hasSlotController.test('title')
                                        ? html`<slot name="title"></slot>`
                                        : this.heading}
                                </strong>
                            `
                            : nothing}

                        <div part="body" class="body"><slot></slot></div>
                    </div>

                    ${this.dismissible
                        ? html`
                            <button
                                part="dismiss-button"
                                class="dismiss"
                                type="button"
                                aria-label=${this.dismissLabel}
                                @click=${this.dismiss}
                            >
                                ${unsafeSVG(renderIconHtml(xmark))}
                            </button>
                        `
                        : nothing}
                </div>

                ${hasActions
                    ? html`<div part="actions" class="actions"><slot name="actions"></slot></div>`
                    : nothing}

                ${hasDetails
                    ? html`
                        <details
                            part="details"
                            class="details"
                            ?open=${this.detailsOpen}
                            @toggle=${this.handleDetailsToggle}
                        >
                            <summary part="details-summary">${this.detailsLabel}</summary>
                            <div part="details-content" class="details-content">
                                <slot name="details"></slot>
                                ${this.copyable
                                    ? html`
                                        <pk-copy-button
                                            part="copy-button"
                                            class="copy"
                                            variant="transparent"
                                            aria-label=${this.copyLabel}
                                            .copiedLabel=${this.copiedLabel}
                                            .value=${this.detailsValue}
                                            @pk-copy=${this.handleCopySuccess}
                                            @pk-copy-error=${this.handleCopyError}
                                        ></pk-copy-button>
                                    `
                                    : nothing}
                            </div>

                            ${this.copyable
                                ? html`
                                    <span
                                        part="copy-status"
                                        class="copy-status"
                                        data-error=${this.copyFailed ? '' : nothing}
                                        role="status"
                                        aria-live="polite"
                                    >${this.copyStatus}</span>
                                `
                                : nothing}
                        </details>
                    `
                    : nothing}
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'pk-alert': PkAlert;
    }
}
