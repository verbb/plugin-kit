import { html } from 'lit';
import { customElement, query } from 'lit/decorators.js';

import { PkElement } from '../../base/pk-element.js';
import { HostAriaMirror } from '../../internal/control-aria.js';
import { pkInputGroupStyles } from './pk-input-group.styles.js';

function getSlottedFocusTarget(slot: HTMLSlotElement): HTMLElement | null {
    const [control] = slot.assignedElements({ flatten: true });

    if (!(control instanceof HTMLElement)) {
        return null;
    }

    if (control.matches('pk-input-group-input, pk-input-group-textarea')) {
        const inner = control.shadowRoot?.querySelector('input, textarea');

        return inner instanceof HTMLElement ? inner : null;
    }

    const nested = control.querySelector('input, textarea, select, button[aria-haspopup]');

    return nested instanceof HTMLElement ? nested : null;
}

/**
 * Groups an input with addons inside one field boundary — ShadCN / Base UI input-group pattern.
 *
 * Place `pk-input-group-input` or `pk-input-group-textarea` first in the DOM, then addons.
 * Use the addon `align` prop to position them visually.
 *
 * @slot - Input controls and addons
 *
 * @csspart base - Group shell
 */
@customElement('pk-input-group')
export class PkInputGroup extends PkElement {
    static override styles = pkInputGroupStyles;

    @query('slot')
    private defaultSlot!: HTMLSlotElement;

    private hostAriaMirror?: HostAriaMirror;

    /** Watch slotted control `invalid` / `disabled` / `aria-invalid` for host chrome attrs. */
    private controlStateObserver?: MutationObserver;

    override disconnectedCallback(): void {
        this.hostAriaMirror?.disconnect();
        this.hostAriaMirror = undefined;
        this.controlStateObserver?.disconnect();
        this.controlStateObserver = undefined;
        super.disconnectedCallback();
    }

    override firstUpdated(): void {
        this.syncSlotDerivedState();
        this.connectAriaMirror();
        this.connectControlStateObserver();
    }

    private connectAriaMirror(): void {
        this.hostAriaMirror?.disconnect();
        this.hostAriaMirror = new HostAriaMirror(
            this,
            () => (this.defaultSlot ? getSlottedFocusTarget(this.defaultSlot) : null),
        );
        this.hostAriaMirror.connect();
    }

    private connectControlStateObserver(): void {
        this.controlStateObserver?.disconnect();
        this.controlStateObserver = new MutationObserver(() => {
            this.syncControlChromeState();
        });
        this.observeAssignedControls();
    }

    private observeAssignedControls(): void {
        if (!this.controlStateObserver) {
            return;
        }

        this.controlStateObserver.disconnect();

        for (const element of this.defaultSlot?.assignedElements({ flatten: true }) ?? []) {
            this.controlStateObserver.observe(element, {
                attributes: true,
                attributeFilter: ['invalid', 'disabled', 'aria-invalid'],
            });
        }
    }

    private handleSlotChange = (): void => {
        this.syncSlotDerivedState();
        this.observeAssignedControls();
        this.hostAriaMirror?.sync();
    };

    private syncSlotDerivedState(): void {
        this.syncBlockLayout();
        this.syncControlChromeState();
    }

    /** Block addons live in light DOM; `:host(:has())` cannot see slotted children from shadow styles. */
    private syncBlockLayout(): void {
        const elements = this.defaultSlot?.assignedElements({ flatten: true }) ?? [];
        const blockLayout = elements.some((element) =>
            element.matches('pk-input-group-addon[align="block-start"], pk-input-group-addon[align="block-end"]'),
        );

        this.toggleAttribute('data-block-layout', blockLayout);
    }

    /**
     * Mirror control invalid/disabled onto the host so shadow styles can paint shell chrome
     * without `:host(:has(…))` (unreliable for light-DOM slotted children in Chromium).
     */
    private syncControlChromeState(): void {
        const elements = this.defaultSlot?.assignedElements({ flatten: true }) ?? [];
        const control = elements.find((element) =>
            element.matches('pk-input-group-input, pk-input-group-textarea'),
        );

        const isInvalid = Boolean(
            control
            && (control.hasAttribute('invalid')
                || control.getAttribute('aria-invalid') === 'true'
                || ('invalid' in control && Boolean((control as HTMLElement & { invalid?: boolean }).invalid))),
        );

        const isDisabled = elements.some((element) =>
            element.hasAttribute('disabled')
            || ('disabled' in element && Boolean((element as HTMLElement & { disabled?: boolean }).disabled)),
        );

        this.toggleAttribute('data-invalid', isInvalid);
        this.toggleAttribute('data-disabled', isDisabled);
    }

    override render() {
        return html`
            <div part="base" class="group" role="group">
                <slot @slotchange=${this.handleSlotChange}></slot>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'pk-input-group': PkInputGroup;
    }
}
