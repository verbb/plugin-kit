import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { customElement, property, state } from '../../decorators.js';

import { PkElement } from '../../base/pk-element.js';
import { PkCopyErrorEvent, PkCopyEvent } from '../../events/pk-copy.js';
import { check, copy, renderIconHtml } from '../../icons/index.js';
import { HasSlotController } from '../../internal/has-slot.js';
import { copyToClipboard, resolveCopyValue } from '../../utils/copy-to-clipboard.js';
import type { PkButtonVariant } from '../button/pk-button.js';
import '../button/pk-button.js';
import { pkCopyButtonStyles } from './pk-copy-button.styles.js';

const SUCCESS_ICON = renderIconHtml(check).replace(
    '<svg',
    '<svg slot="start" part="success-icon"',
);
const COPY_ICON = renderIconHtml(copy).replace(
    '<svg',
    '<svg slot="start" part="copy-icon"',
);

const COPIED_RESET_MS = 2000;

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
@customElement('pk-copy-button')
export class PkCopyButton extends PkElement {
    static override styles = pkCopyButtonStyles;

    private readonly hasSlotController = new HasSlotController(this, 'icon');

    @property()
    value = '';

    /**
     * Element id to copy from — `from="el[attr]"` or `from="el.value"`.
     * Takes precedence over `value` when set.
     */
    @property()
    from = '';

    @property({ type: Boolean, reflect: true })
    disabled = false;

    @property({ reflect: true })
    variant: PkButtonVariant = 'transparent';

    /** Accessible name shown while the copy action is available. */
    @property({ attribute: 'aria-label' })
    ariaLabel = 'Copy';

    /** Accessible name shown briefly after copying succeeds. */
    @property({ attribute: 'copied-label' })
    copiedLabel = 'Copied';

    @state()
    private copied = false;

    private resetTimer?: number;

    override disconnectedCallback(): void {
        window.clearTimeout(this.resetTimer);
        super.disconnectedCallback();
    }

    private resetCopied = (): void => {
        this.copied = false;
    };

    private scheduleReset(): void {
        window.clearTimeout(this.resetTimer);
        this.resetTimer = window.setTimeout(this.resetCopied, COPIED_RESET_MS);
    }

    /** Copy the configured value and emit the corresponding result event. */
    async copy(): Promise<void> {
        if (this.disabled) {
            return;
        }

        const root = this.getRootNode() as Document | ShadowRoot;
        const valueToCopy = resolveCopyValue(root, this.from, this.value);

        if (valueToCopy == null || valueToCopy === '') {
            this.dispatchEvent(new PkCopyErrorEvent());
            return;
        }

        try {
            await copyToClipboard(valueToCopy);
            this.copied = true;
            this.scheduleReset();
            this.dispatchEvent(new PkCopyEvent(valueToCopy));
        } catch {
            this.dispatchEvent(new PkCopyErrorEvent());
        }
    }

    override render() {
        // slot=end → in-control chrome (pk-input end adornment); padless glyph button.
        const inControl = this.getAttribute('slot') === 'end';

        return html`
            <pk-button
                part="button"
                variant=${inControl ? 'none' : this.variant}
                size=${inControl ? 'none' : 'default'}
                ?icon=${inControl}
                aria-label=${this.copied ? this.copiedLabel : this.ariaLabel}
                ?disabled=${this.disabled}
                @click=${this.copy}
            >
                ${this.copied
                    ? unsafeHTML(SUCCESS_ICON)
                    : this.hasSlotController.test('icon')
                      ? html`<slot name="icon" slot="start"></slot>`
                      : unsafeHTML(COPY_ICON)}
            </pk-button>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'pk-copy-button': PkCopyButton;
    }
}
