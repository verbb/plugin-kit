import { PkElement } from '../../base/pk-element.js';
export type PkAlertVariant = 'neutral' | 'info' | 'success' | 'warning' | 'error';
export type PkAlertAppearance = 'accent' | 'filled-outlined' | 'filled' | 'outlined' | 'plain';
export type PkAlertAnnouncement = 'off' | 'polite' | 'assertive';
export type PkAlertSize = 'sm' | 'default' | 'lg';
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
export declare class PkAlert extends PkElement {
    static styles: import('lit').CSSResult;
    private readonly hasSlotController;
    variant: PkAlertVariant;
    /** Overall density, including typography, icons, spacing, details, and actions. */
    size: PkAlertSize;
    /** Visual treatment, independent from the alert's semantic variant. */
    appearance: PkAlertAppearance;
    heading: string;
    hideIcon: boolean;
    dismissible: boolean;
    announce: PkAlertAnnouncement;
    detailsLabel: string;
    detailsOpen: boolean;
    copyable: boolean;
    copyLabel: string;
    copiedLabel: string;
    copyErrorLabel: string;
    dismissLabel: string;
    private detailsSlot;
    private copyButton?;
    private copyStatus;
    private copyFailed;
    private copyStatusResetTimer?;
    disconnectedCallback(): void;
    private hasTitle;
    private hasDetails;
    private get detailsValue();
    private resetCopyStatusLater;
    private showCopySuccess;
    private showCopyError;
    private handleCopySuccess;
    private handleCopyError;
    private selectDetails;
    /** Copy the plain text assigned to the details slot. */
    copyDetails(): Promise<void>;
    /** Request dismissal and hide the alert unless the event is prevented. */
    dismiss(): void;
    /** Show an alert hidden by `dismiss()`. */
    show(): void;
    private handleDetailsToggle;
    private renderIcon;
    render(): import('lit-html').TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'pk-alert': PkAlert;
    }
}
//# sourceMappingURL=pk-alert.d.ts.map