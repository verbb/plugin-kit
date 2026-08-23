import { LitElement } from 'lit';
/**
 * OAuth connect row for Craft CP settings.
 *
 * **Light DOM** — the row mounts inside Craft's `.field.lightswitch-field` wrapper and
 * reuses CP column classes (`.heading` / `.input`) so it lines up with Provider/Enabled
 * rows without shadow-piercing or duplicating Craft field chrome. Action buttons use
 * `pk-button`; submission goes through `Craft.submitForm` (same as `.formsubmit`).
 */
export declare class PkConnectOauth extends LitElement {
    static styles: import('lit').CSSResult;
    connected: boolean;
    connectAction: string;
    disconnectAction: string;
    paramName: string;
    paramValue: string;
    connectRedirect: string;
    disconnectRedirect: string;
    formSelector: string;
    /** When true, skip dirty-form watching (e.g. Formie read-only OAuth mini-form). */
    skipDirtyWatch: boolean;
    labelConnected: string;
    labelNotConnected: string;
    labelConnect: string;
    labelDisconnect: string;
    labelSaveToConnect: string;
    private isDirty;
    private unwatchDirty;
    createRenderRoot(): HTMLElement | DocumentFragment;
    connectedCallback(): void;
    disconnectedCallback(): void;
    private submitOAuthAction;
    private handleConnectClick;
    private handleDisconnectClick;
    render(): import('lit-html').TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'pk-connect-oauth': PkConnectOauth;
    }
}
//# sourceMappingURL=pk-connect-oauth.d.ts.map