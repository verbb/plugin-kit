import { html, nothing } from 'lit';
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';
import { customElement, property, query, state } from '../../decorators.js';

import { PkElement } from '../../base/pk-element.js';
import { PkCopyErrorEvent, PkCopyEvent } from '../../events/pk-copy.js';
import {
    circleCheck,
    circleInfo,
    emptySet,
    renderIconHtml,
    triangleExclamation,
} from '../../icons/index.js';
import { HasSlotController } from '../../internal/has-slot.js';
import { copyToClipboard } from '../../utils/copy-to-clipboard.js';
import type { PkCopyButton } from '../copy-button/pk-copy-button.js';
import '../copy-button/pk-copy-button.js';
import '../icon/pk-icon.js';
import { pkStatePanelStyles } from './pk-state-panel.styles.js';

export type PkStatePanelVariant = 'empty' | 'info' | 'success' | 'warning' | 'error';
export type PkStatePanelAnnouncement = 'off' | 'polite' | 'assertive';
export type PkStatePanelHeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
export type PkStatePanelSize = 'sm' | 'default' | 'lg';

const COPY_STATUS_RESET_MS = 3000;

const defaultIcons = {
    empty: emptySet,
    info: circleInfo,
    success: circleCheck,
    warning: triangleExclamation,
    error: triangleExclamation,
};

/**
 * Centered replacement surface for empty, unavailable, completed or failed content regions.
 *
 * @slot title - Custom heading content. Takes precedence over the `heading` property.
 * @slot icon - Custom icon. The component supplies a variant icon by default.
 * @slot - State description or other primary content.
 * @slot details - Optional content inside the collapsible details region.
 * @slot actions - Optional buttons or links.
 *
 * @event pk-copy - Emitted when the details are copied successfully.
 * @event pk-copy-error - Emitted when the details cannot be copied.
 *
 * @csspart base - Centered state container.
 * @csspart icon-shell - Icon background container.
 * @csspart icon - Icon wrapper.
 * @csspart title - State heading.
 * @csspart body - Default content wrapper.
 * @csspart details - Collapsible details element.
 * @csspart details-summary - Details disclosure label.
 * @csspart details-content - Details content wrapper.
 * @csspart copy-button - Copy-details button.
 * @csspart copy-status - Copy result status.
 * @csspart actions - Actions wrapper.
 *
 * @cssproperty --pk-state-panel-accent - Variant accent colour.
 * @cssproperty --pk-state-panel-body-color - Primary content colour.
 * @cssproperty --pk-state-panel-title-color - Heading colour.
 * @cssproperty --pk-state-panel-title-size - Heading font size.
 * @cssproperty --pk-state-panel-icon-background - Icon container background.
 * @cssproperty --pk-state-panel-icon-shell-size - Icon container width and height.
 * @cssproperty --pk-state-panel-icon-size - Icon width and height.
 * @cssproperty --pk-state-panel-icon-radius - Icon container radius.
 * @cssproperty --pk-state-panel-content-width - Maximum content width.
 * @cssproperty --pk-state-panel-min-height - Minimum component height.
 * @cssproperty --pk-state-panel-padding - Component padding.
 * @cssproperty --pk-state-panel-details-max-height - Maximum height of diagnostic details.
 *
 * @dependency pk-copy-button - Compact copy-details action.
 */
@customElement('pk-state-panel')
export class PkStatePanel extends PkElement {
    static override styles = pkStatePanelStyles;

    private readonly hasSlotController = new HasSlotController(
        this,
        'title',
        'icon',
        'details',
        'actions',
    );

    /** Semantic colour and fallback icon for the replacement state. */
    @property({ reflect: true })
    variant: PkStatePanelVariant = 'empty';

    /** Overall density, including typography, icons, spacing, details, and actions. */
    @property({ reflect: true })
    size: PkStatePanelSize = 'default';

    @property()
    heading = '';

    @property({ type: Number, attribute: 'heading-level' })
    headingLevel: PkStatePanelHeadingLevel = 2;

    /** Registered icon name. A custom `icon` slot takes precedence. */
    @property()
    icon = '';

    @property({ type: Boolean, attribute: 'hide-icon', reflect: true })
    hideIcon = false;

    @property({ reflect: true })
    announce: PkStatePanelAnnouncement = 'off';

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

    private handleDetailsToggle(event: Event): void {
        this.detailsOpen = (event.currentTarget as HTMLDetailsElement).open;
    }

    private renderIcon() {
        if (this.hideIcon) {
            return nothing;
        }

        let icon;

        if (this.hasSlotController.test('icon')) {
            icon = html`<slot name="icon"></slot>`;
        } else if (this.icon) {
            icon = html`<pk-icon .icon=${this.icon}></pk-icon>`;
        } else {
            icon = unsafeSVG(renderIconHtml(defaultIcons[this.variant] ?? defaultIcons.empty));
        }

        return html`
            <span part="icon-shell" class="icon-shell" aria-hidden="true">
                <span part="icon" class="icon">${icon}</span>
            </span>
        `;
    }

    override render() {
        const role = this.announce === 'assertive'
            ? 'alert'
            : this.announce === 'polite'
                ? 'status'
                : nothing;
        const live = this.announce === 'off' ? nothing : this.announce;
        const hasDetails = this.hasSlotController.test('details');
        const hasActions = this.hasSlotController.test('actions');

        return html`
            <div
                part="base"
                class="panel"
                role=${role}
                aria-live=${live}
                aria-atomic=${this.announce === 'off' ? nothing : 'true'}
            >
                ${this.renderIcon()}

                ${this.hasTitle()
                    ? html`
                        <div
                            part="title"
                            class="title"
                            role="heading"
                            aria-level=${this.headingLevel}
                        >
                            ${this.hasSlotController.test('title')
                                ? html`<slot name="title"></slot>`
                                : this.heading}
                        </div>
                    `
                    : nothing}

                <div part="body" class="body"><slot></slot></div>

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
                                <div class="details-scroll">
                                    ${this.copyable
                                        ? html`
                                            <div class="copy-overlay">
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
                                            </div>
                                        `
                                        : nothing}
                                    <slot name="details"></slot>
                                </div>
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

                ${hasActions
                    ? html`<div part="actions" class="actions"><slot name="actions"></slot></div>`
                    : nothing}
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'pk-state-panel': PkStatePanel;
    }
}
