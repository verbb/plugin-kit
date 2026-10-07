import { PkElement } from '../../base/pk-element.js';
export type PkStatePanelVariant = 'empty' | 'info' | 'success' | 'warning' | 'error';
export type PkStatePanelAnnouncement = 'off' | 'polite' | 'assertive';
export type PkStatePanelHeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
export type PkStatePanelSize = 'sm' | 'default' | 'lg';
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
 * @cssproperty --pk-state-panel-details-max-height - Maximum height of slotted `pre` details.
 *
 * @dependency pk-copy-button - Compact copy-details action.
 */
export declare class PkStatePanel extends PkElement {
    static styles: import('lit').CSSResult;
    private readonly hasSlotController;
    /** Semantic colour and fallback icon for the replacement state. */
    variant: PkStatePanelVariant;
    /** Overall density, including typography, icons, spacing, details, and actions. */
    size: PkStatePanelSize;
    heading: string;
    headingLevel: PkStatePanelHeadingLevel;
    /** Registered icon name. A custom `icon` slot takes precedence. */
    icon: string;
    hideIcon: boolean;
    announce: PkStatePanelAnnouncement;
    detailsLabel: string;
    detailsOpen: boolean;
    copyable: boolean;
    copyLabel: string;
    copiedLabel: string;
    copyErrorLabel: string;
    private detailsSlot;
    private copyButton?;
    private copyStatus;
    private copyFailed;
    private copyStatusResetTimer?;
    disconnectedCallback(): void;
    private hasTitle;
    private get detailsValue();
    private resetCopyStatusLater;
    private showCopySuccess;
    private showCopyError;
    private handleCopySuccess;
    private handleCopyError;
    private selectDetails;
    /** Copy the plain text assigned to the details slot. */
    copyDetails(): Promise<void>;
    private handleDetailsToggle;
    private renderIcon;
    render(): import('lit-html').TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'pk-state-panel': PkStatePanel;
    }
}
//# sourceMappingURL=pk-state-panel.d.ts.map