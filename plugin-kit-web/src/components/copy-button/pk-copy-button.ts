import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { customElement, property, state } from 'lit/decorators.js';

import { PkElement } from '../../base/pk-element.js';
import { PkCopyErrorEvent, PkCopyEvent } from '../../events/pk-copy.js';
import { check, renderIconHtml } from '../../icons/index.js';
import { copyToClipboard, resolveCopyValue } from '../../utils/copy-to-clipboard.js';
import type { PkButtonVariant } from '../button/pk-button.js';
import '../button/pk-button.js';
import { pkCopyButtonStyles } from './pk-copy-button.styles.js';

const SUCCESS_ICON = renderIconHtml(check).replace(
    '<svg',
    '<svg slot="start" part="success-icon"',
);

const COPIED_RESET_MS = 2000;

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
@customElement('pk-copy-button')
export class PkCopyButton extends PkElement {
    static override styles = pkCopyButtonStyles;

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

    private async handleCopy(): Promise<void> {
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
        return html`
            <pk-button
                part="button"
                variant=${this.variant}
                size="default"
                title="Copy"
                ?disabled=${this.disabled}
                @click=${this.handleCopy}
            >
                ${this.copied
                    ? unsafeHTML(SUCCESS_ICON)
                    : html`<slot name="icon" slot="start"></slot>`}
            </pk-button>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'pk-copy-button': PkCopyButton;
    }
}
