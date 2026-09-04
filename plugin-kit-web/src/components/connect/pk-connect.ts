import {
    buildConnectPayload,
    escapeCpHtml,
    resolveConnectError,
    sendCpConnectRequest,
    serializeCpForm,
    watchCpFormDirty,
    type ConnectLabels,
    type ConnectStatus,
    type ErrorContent,
} from '@verbb/plugin-kit-core';
import { html, LitElement, nothing } from 'lit';
import { customElement, property, state } from '../../decorators.js';

import '../button/pk-button.js';
import '../dialog/pk-dialog.js';
import '../icon/pk-icon.js';
import '../status/pk-status.js';
import type { PkStatusVariant } from '../status/pk-status.js';
import { pkConnectStyles } from './pk-connect.styles.js';

const pkStatusForState = (status: ConnectStatus): PkStatusVariant => {
    if (status === 'connected') {
        return 'on';
    }

    if (status === 'error') {
        return 'off';
    }

    return 'disabled';
};

/**
 * Credentials / REST connect row for Craft CP source settings.
 *
 * **Light DOM** — mounts inside Craft `.field.lightswitch-field` and reuses CP
 * `.heading` / `.input` columns (see `pk-connect-oauth` for the same rationale).
 *
 * @fires pk-status-change - `detail.status` is the new {@link ConnectStatus}.
 */
@customElement('pk-connect')
export class PkConnect extends LitElement {
    static override styles = pkConnectStyles;

    /** Craft controller action, e.g. `metrix/sources/check-connection`. */
    @property({ reflect: true })
    action = '';

    @property({ reflect: true })
    status: ConnectStatus = 'disconnected';

    @property({ attribute: 'form-selector' })
    formSelector = '#main-form';

    @property({ attribute: 'source-id' })
    sourceId: string | null = null;

    /** POST key for the record id (`sourceId` default; Formie uses `id`). */
    @property({ attribute: 'id-param' })
    idParam = 'sourceId';

    @property()
    type = '';

    @property({ attribute: 'label-connected' })
    labelConnected = 'Connected';

    @property({ attribute: 'label-not-connected' })
    labelNotConnected = 'Not Connected';

    @property({ attribute: 'label-connecting' })
    labelConnecting = 'Connecting…';

    @property({ attribute: 'label-error' })
    labelError = 'Error';

    @property({ attribute: 'label-connect' })
    labelConnect = 'Connect';

    @property({ attribute: 'label-refresh' })
    labelRefresh = 'Refresh';

    @property({ attribute: 'label-save-to-connect' })
    labelSaveToConnect = 'Save to connect.';

    @property({ attribute: 'label-error-heading' })
    labelErrorHeading = 'Connection error';

    @property({ attribute: 'label-generic-error' })
    labelGenericError = 'Unable to connect to the provider.';

    @property({ attribute: 'label-show-details' })
    labelShowDetails = 'Show details';

    @property({ attribute: 'label-hide-details' })
    labelHideDetails = 'Hide details';

    @property({ attribute: 'label-close' })
    labelClose = 'Close';

    @state()
    private isDirty = false;

    @state()
    private loading = false;

    @state()
    private showDetails = false;

    private unwatchDirty: (() => void) | null = null;
    private errorDialog: HTMLElement | null = null;

    override createRenderRoot(): HTMLElement | DocumentFragment {
        // Light DOM — Craft field chrome and pk-* children share document tokens.
        return this;
    }

    override connectedCallback(): void {
        super.connectedCallback();
        this.unwatchDirty = watchCpFormDirty({
            formSelector: this.formSelector,
            host: this,
            onDirty: () => {
                this.isDirty = true;
            },
        });
    }

    override disconnectedCallback(): void {
        this.unwatchDirty?.();
        this.unwatchDirty = null;
        this.errorDialog?.remove();
        this.errorDialog = null;
        super.disconnectedCallback();
    }

    private get labels(): ConnectLabels {
        return {
            connected: this.labelConnected,
            notConnected: this.labelNotConnected,
            connecting: this.labelConnecting,
            error: this.labelError,
            connect: this.labelConnect,
            refresh: this.labelRefresh,
            saveToConnect: this.labelSaveToConnect,
            errorHeading: this.labelErrorHeading,
            genericError: this.labelGenericError,
            showDetails: this.labelShowDetails,
            hideDetails: this.labelHideDetails,
        };
    }

    private get fieldHost(): HTMLElement | null {
        return this.closest('.pk-connect-field');
    }

    private get statusLabel(): string {
        switch (this.status) {
            case 'connected':
                return this.labelConnected;
            case 'error':
                return this.labelError;
            case 'connecting':
                return this.labelConnecting;
            default:
                return this.labelNotConnected;
        }
    }

    private get statusLabelMuted(): boolean {
        return this.status !== 'connected' && this.status !== 'error';
    }

    private get actionLabel(): string {
        return this.status === 'connected' ? this.labelRefresh : this.labelConnect;
    }

    private setConnectStatus(status: ConnectStatus): void {
        this.status = status;
        this.dispatchEvent(
            new CustomEvent<{ status: ConnectStatus }>('pk-status-change', {
                detail: { status },
                bubbles: true,
            }),
        );
    }

    private setModalOpen(open: boolean): void {
        this.fieldHost?.classList.toggle('pk-connect-field--modal-open', open);

        if (!open) {
            this.showDetails = false;
        }
    }

    private ensureErrorDialog(): HTMLElement {
        if (this.errorDialog) {
            return this.errorDialog;
        }

        const dialog = document.createElement('pk-dialog');
        dialog.className = 'pk-connect-dialog';
        dialog.setAttribute('without-header', '');
        dialog.innerHTML = [
            `<pk-button slot="trigger" type="button" variant="none" size="none" icon class="pk-connect-dialog__close" data-dialog="close" aria-label="${escapeCpHtml(this.labelClose)}">`,
            '<pk-icon icon="xmark"></pk-icon>',
            '</pk-button>',
            '<div class="pk-connection-error">',
            '<div class="pk-connection-error__stack">',
            '<div class="pk-connection-error__icon"><pk-icon icon="triangle-exclamation"></pk-icon></div>',
            '<h3 class="pk-connection-error__heading"></h3>',
            '<p class="pk-connection-error__message"></p>',
            '<div class="pk-connection-error__details hidden">',
            '<button type="button" class="pk-connection-error__details-toggle">',
            '<pk-icon icon="chevron-right"></pk-icon>',
            `<span class="pk-connection-error__details-label">${escapeCpHtml(this.labelShowDetails)}</span>`,
            '</button>',
            '<div class="pk-connection-error__trace hidden"></div>',
            '</div>',
            '</div>',
            '</div>',
        ].join('');

        document.body.appendChild(dialog);

        const detailsToggle = dialog.querySelector<HTMLButtonElement>('.pk-connection-error__details-toggle');
        const traceEl = dialog.querySelector('.pk-connection-error__trace');
        const detailsLabel = dialog.querySelector('.pk-connection-error__details-label');
        const detailsWrap = dialog.querySelector('.pk-connection-error__details');
        const chevron = dialog.querySelector('pk-icon');

        detailsToggle?.addEventListener('click', () => {
            this.showDetails = !this.showDetails;
            traceEl?.classList.toggle('hidden', !this.showDetails);
            chevron?.classList.toggle('is-open', this.showDetails);

            if (detailsLabel) {
                detailsLabel.textContent = this.showDetails
                    ? this.labelHideDetails
                    : this.labelShowDetails;
            }
        });

        dialog.addEventListener('pk-open-change', (event) => {
            const open = Boolean((event as CustomEvent<{ open?: boolean }>).detail?.open);
            this.setModalOpen(open);

            if (!open) {
                traceEl?.classList.add('hidden');
                chevron?.classList.remove('is-open');

                if (detailsLabel) {
                    detailsLabel.textContent = this.labelShowDetails;
                }
            }
        });

        this.errorDialog = dialog;
        return dialog;
    }

    private showErrorModal(error: ErrorContent): void {
        const dialog = this.ensureErrorDialog() as HTMLElement & { open: boolean };
        const heading = dialog.querySelector('.pk-connection-error__heading');
        const message = dialog.querySelector('.pk-connection-error__message');
        const detailsWrap = dialog.querySelector('.pk-connection-error__details');
        const traceEl = dialog.querySelector('.pk-connection-error__trace');

        if (heading) {
            heading.textContent = error.heading || this.labelErrorHeading;
        }

        if (message) {
            message.textContent = error.text || this.labelGenericError;
        }

        const trace = error.traceAsString || error.trace || '';

        if (trace && detailsWrap && traceEl) {
            detailsWrap.classList.remove('hidden');
            traceEl.innerHTML = trace;
            traceEl.classList.add('hidden');
        } else {
            detailsWrap?.classList.add('hidden');
        }

        this.showDetails = false;
        dialog.open = true;
        this.setModalOpen(true);
    }

    private async handleConnectClick(event: Event): Promise<void> {
        event.preventDefault();

        if (this.isDirty || this.loading || !this.action) {
            return;
        }

        this.loading = true;
        this.setConnectStatus('connecting');
        this.setModalOpen(false);

        const values = serializeCpForm(this.formSelector, this);
        const payload = buildConnectPayload(values, {
            idParam: this.idParam,
            sourceId: this.sourceId,
            type: this.type || values.type,
        });

        try {
            const response = await sendCpConnectRequest(this.action, payload);
            this.loading = false;

            if (response?.data?.success) {
                this.setConnectStatus('connected');
                return;
            }

            if (response?.data?.message || response?.data?.success === false) {
                this.setConnectStatus('error');
                this.showErrorModal(
                    resolveConnectError(response?.data?.message ?? null, this.labels),
                );
            }
        } catch (error) {
            this.loading = false;
            this.setConnectStatus('error');
            this.showErrorModal(resolveConnectError(error, this.labels));
        }
    }

    override render() {
        if (this.isDirty) {
            return html`
                <div class="heading">
                    <span class="warning with-icon">${this.labelSaveToConnect}</span>
                </div>
            `;
        }

        return html`
            <div class="heading">
                <pk-status
                    status=${pkStatusForState(this.status)}
                    class="pk-connect__status-icon"
                ></pk-status><span class=${this.statusLabelMuted ? 'light' : nothing}>${this.statusLabel}</span>
            </div>

            <div class="input ltr">
                <pk-button
                    type="button"
                    size="xs"
                    variant="default"
                    class="pk-connect__action"
                    spinner-size="xs"
                    ?loading=${this.loading}
                    ?disabled=${this.loading || this.isDirty}
                    @click=${this.handleConnectClick}
                >
                    ${this.actionLabel}
                </pk-button>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'pk-connect': PkConnect;
    }
}
