import { PkElement } from '../../base/pk-element.js';
import { PkButtonVariant } from '../button/pk-button.js';
/**
 * Copy button — copies text to the clipboard and briefly shows a check icon.
 *
 * @slot icon - Copy icon (SVG supplied by the consumer)
 *
 * @event pk-copy - Emitted when text is copied successfully
 * @event pk-copy-error - Emitted when copying fails
 *
 * @csspart button - Trigger button
 * @csspart success-icon - Success icon shown after copying
 */
export declare class PkCopyButton extends PkElement {
    static styles: import('lit').CSSResult;
    value: string;
    /**
     * Element id to copy from — `from="el[attr]"` or `from="el.value"`.
     * Takes precedence over `value` when set.
     */
    from: string;
    disabled: boolean;
    variant: PkButtonVariant;
    private copied;
    private resetTimer?;
    disconnectedCallback(): void;
    private resetCopied;
    private scheduleReset;
    private handleCopy;
    render(): import('lit-html').TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'pk-copy-button': PkCopyButton;
    }
}
//# sourceMappingURL=pk-copy-button.d.ts.map