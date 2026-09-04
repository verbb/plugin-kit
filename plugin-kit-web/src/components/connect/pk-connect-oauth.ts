import { submitCpFormAction, watchCpFormDirty } from '@verbb/plugin-kit-core';
import { html, LitElement } from 'lit';
import { customElement, property, state } from '../../decorators.js';

import '../button/pk-button.js';
import '../status/pk-status.js';
import { pkConnectStyles } from './pk-connect.styles.js';

/**
 * OAuth connect row for Craft CP settings.
 *
 * **Light DOM** — the row mounts inside Craft's `.field.lightswitch-field` wrapper and
 * reuses CP column classes (`.heading` / `.input`) so it lines up with Provider/Enabled
 * rows without shadow-piercing or duplicating Craft field chrome. Action buttons use
 * `pk-button`; submission goes through `Craft.submitForm` (same as `.formsubmit`).
 */
@customElement('pk-connect-oauth')
export class PkConnectOauth extends LitElement {
    static override styles = pkConnectStyles;

    @property({ type: Boolean, reflect: true })
    connected = false;

    @property({ attribute: 'connect-action' })
    connectAction = '';

    @property({ attribute: 'disconnect-action' })
    disconnectAction = '';

    @property({ attribute: 'param-name' })
    paramName = '';

    @property({ attribute: 'param-value' })
    paramValue = '';

    @property({ attribute: 'connect-redirect' })
    connectRedirect = '';

    @property({ attribute: 'disconnect-redirect' })
    disconnectRedirect = '';

    @property({ attribute: 'form-selector' })
    formSelector = '#main-form';

    /** When true, skip dirty-form watching (e.g. Formie read-only OAuth mini-form). */
    @property({ type: Boolean, attribute: 'skip-dirty-watch' })
    skipDirtyWatch = false;

    @property({ attribute: 'label-connected' })
    labelConnected = 'Connected';

    @property({ attribute: 'label-not-connected' })
    labelNotConnected = 'Not Connected';

    @property({ attribute: 'label-connect' })
    labelConnect = 'Connect';

    @property({ attribute: 'label-disconnect' })
    labelDisconnect = 'Disconnect';

    @property({ attribute: 'label-save-to-connect' })
    labelSaveToConnect = 'Save to connect.';

    @state()
    private isDirty = false;

    private unwatchDirty: (() => void) | null = null;

    override createRenderRoot(): HTMLElement | DocumentFragment {
        return this;
    }

    override connectedCallback(): void {
        super.connectedCallback();

        if (this.skipDirtyWatch) {
            return;
        }

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
        super.disconnectedCallback();
    }

    private submitOAuthAction(action: string, redirect: string): void {
        submitCpFormAction({
            formSelector: this.formSelector,
            host: this,
            action,
            redirect,
            paramName: this.paramName,
            paramValue: this.paramValue,
        });
    }

    private handleConnectClick(event: Event): void {
        event.preventDefault();
        this.submitOAuthAction(this.connectAction, this.connectRedirect);
    }

    private handleDisconnectClick(event: Event): void {
        event.preventDefault();
        this.submitOAuthAction(this.disconnectAction, this.disconnectRedirect);
    }

    override render() {
        if (this.isDirty) {
            return html`
                <div class="heading">
                    <span class="warning with-icon">${this.labelSaveToConnect}</span>
                </div>
            `;
        }

        if (this.connected) {
            return html`
                <div class="heading">
                    <pk-status status="on" class="pk-connect__status-icon"></pk-status>${this.labelConnected}
                </div>

                <div class="input ltr">
                    <pk-button
                        type="button"
                        size="xs"
                        variant="default"
                        class="pk-connect__action"
                        @click=${this.handleDisconnectClick}
                    >
                        ${this.labelDisconnect}
                    </pk-button>
                </div>
            `;
        }

        return html`
            <div class="heading">
                <pk-status status="disabled" class="pk-connect__status-icon"></pk-status><span class="light">${this.labelNotConnected}</span>
            </div>

            <div class="input ltr">
                <pk-button
                    type="button"
                    size="xs"
                    variant="default"
                    class="pk-connect__action"
                    @click=${this.handleConnectClick}
                >
                    ${this.labelConnect}
                </pk-button>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'pk-connect-oauth': PkConnectOauth;
    }
}
