import { ConnectStatus } from '@verbb/plugin-kit-core';
import { LitElement } from 'lit';
/**
 * Credentials / REST connect row for Craft CP source settings.
 *
 * **Light DOM** — mounts inside Craft `.field.lightswitch-field` and reuses CP
 * `.heading` / `.input` columns (see `pk-connect-oauth` for the same rationale).
 *
 * @fires pk-status-change - `detail.status` is the new {@link ConnectStatus}.
 */
export declare class PkConnect extends LitElement {
    static styles: import('lit').CSSResult;
    /** Craft controller action, e.g. `metrix/sources/check-connection`. */
    action: string;
    status: ConnectStatus;
    formSelector: string;
    sourceId: string | null;
    /** POST key for the record id (`sourceId` default; Formie uses `id`). */
    idParam: string;
    type: string;
    labelConnected: string;
    labelNotConnected: string;
    labelConnecting: string;
    labelError: string;
    labelConnect: string;
    labelRefresh: string;
    labelSaveToConnect: string;
    labelErrorHeading: string;
    labelGenericError: string;
    labelShowDetails: string;
    labelHideDetails: string;
    labelClose: string;
    private isDirty;
    private loading;
    private showDetails;
    private unwatchDirty;
    private errorDialog;
    createRenderRoot(): HTMLElement | DocumentFragment;
    connectedCallback(): void;
    disconnectedCallback(): void;
    private get labels();
    private get fieldHost();
    private get statusLabel();
    private get statusLabelMuted();
    private get actionLabel();
    private setConnectStatus;
    private setModalOpen;
    private ensureErrorDialog;
    private showErrorModal;
    private handleConnectClick;
    render(): import('lit-html').TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'pk-connect': PkConnect;
    }
}
//# sourceMappingURL=pk-connect.d.ts.map