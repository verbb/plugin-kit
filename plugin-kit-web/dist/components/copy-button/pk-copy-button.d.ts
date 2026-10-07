import { PkElement } from '../../base/pk-element.js';
import { PkButtonVariant } from '../button/pk-button.js';
/**
 * Copy button — copies text to the clipboard and briefly shows a check icon.
 *
 * Place in `slot="end"` on `<pk-input>` (or another control with an end adornment)
 * for an in-control treatment that matches combobox / image-browser trailing actions.
 *
 * @slot icon - Custom copy icon. The component supplies a copy icon by default.
 *
 * @event pk-copy - Emitted when text is copied successfully
 * @event pk-copy-error - Emitted when copying fails
 *
 * @csspart button - Trigger button
 * @csspart copy-icon - Copy icon shown before copying
 * @csspart success-icon - Success icon shown after copying
 *
 * @cssproperty --pk-copy-button-background - Trigger background override.
 * @cssproperty --pk-copy-button-border-color - Trigger border colour override.
 * @cssproperty --pk-copy-button-color - Trigger foreground colour override.
 * @cssproperty --pk-copy-button-hover-background - Trigger hover background override.
 * @cssproperty --pk-copy-button-hover-border-color - Trigger hover border colour override.
 * @cssproperty --pk-copy-button-hover-color - Trigger hover foreground colour override.
 * @cssproperty --pk-copy-button-radius - Trigger corner radius override.
 */
export declare class PkCopyButton extends PkElement {
    static styles: import('lit').CSSResult;
    private readonly hasSlotController;
    value: string;
    /**
     * Element id to copy from — `from="el[attr]"` or `from="el.value"`.
     * Takes precedence over `value` when set.
     */
    from: string;
    disabled: boolean;
    variant: PkButtonVariant;
    /** Accessible name shown while the copy action is available. */
    ariaLabel: string;
    /** Accessible name shown briefly after copying succeeds. */
    copiedLabel: string;
    private copied;
    private resetTimer?;
    disconnectedCallback(): void;
    private resetCopied;
    private scheduleReset;
    /** Copy the configured value and emit the corresponding result event. */
    copy(): Promise<void>;
    render(): import('lit-html').TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'pk-copy-button': PkCopyButton;
    }
}
//# sourceMappingURL=pk-copy-button.d.ts.map