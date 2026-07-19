import { html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { PropertyValues } from 'lit';

import { PkElement } from '../../base/pk-element.js';
import type { PkToggleSize, PkToggleVariant } from '../toggle/pk-toggle.js';
import { pkToggleGroupStyles } from './pk-toggle-group.styles.js';

export type PkToggleGroupOrientation = 'horizontal' | 'vertical';

const GROUP_JOIN_ATTR = 'data-pk-group-join';
const GROUP_ITEM_FIRST = 'data-pk-group-item-first';
const GROUP_ITEM_LAST = 'data-pk-group-item-last';
const GROUP_ORIENTATION_ATTR = 'data-pk-group-orientation';
const TOGGLE_ORIENTATION_ATTR = 'data-tg-orientation';

/**
 * Group of toggle buttons with shared selection.
 *
 * @slot - `pk-toggle` or `button[data-value]` items
 *
 * @csspart base - Group container
 */
@customElement('pk-toggle-group')
export class PkToggleGroup extends PkElement {
    static override styles = pkToggleGroupStyles;

    @property({ reflect: true })
    orientation: PkToggleGroupOrientation = 'horizontal';

    @property({ reflect: true })
    variant: PkToggleVariant = 'default';

    @property({ reflect: true })
    size: PkToggleSize = 'default';

    /** Gap between items — `0` joins adjacent toggles (React `spacing={0}`). */
    @property({ type: Number, reflect: true })
    spacing = 0;

    /** @deprecated Use `spacing="0"` — kept for backward compatibility. */
    @property({ type: Boolean, reflect: true })
    joined = true;

    @property({ type: Boolean })
    multiple = false;

    @property({ type: Array, attribute: false })
    value: string[] = [];

    @state()
    private items: HTMLElement[] = [];

    override connectedCallback(): void {
        super.connectedCallback();
        this.syncJoinedFromSpacing();
        this.addEventListener('click', this.handleClick);
        this.addEventListener('slotchange', this.syncItems);
    }

    override disconnectedCallback(): void {
        this.removeEventListener('click', this.handleClick);
        this.removeEventListener('slotchange', this.syncItems);
        super.disconnectedCallback();
    }

    override updated(changed: PropertyValues): void {
        if (changed.has('spacing')) {
            this.syncJoinedFromSpacing();
        }

        if (changed.has('joined') && !changed.has('spacing')) {
            this.spacing = this.joined ? 0 : 2;
        }

        if (changed.has('variant') || changed.has('size') || changed.has('spacing') || changed.has('orientation')) {
            this.syncGroupLayout();
        }

        // Keep pressed/aria-pressed in sync when value is set as a property
        // (HTML has no value attribute — docs/playground set `.value` after mount).
        if (changed.has('value') && this.items.length) {
            this.applySelection();
        }
    }

    private clearLayoutAttrs(item: HTMLElement): void {
        item.removeAttribute(GROUP_JOIN_ATTR);
        item.removeAttribute(GROUP_ITEM_FIRST);
        item.removeAttribute(GROUP_ITEM_LAST);
        item.removeAttribute(GROUP_ORIENTATION_ATTR);
        item.removeAttribute(TOGGLE_ORIENTATION_ATTR);
    }

    private syncGroupLayout(): void {
        for (const item of this.items) {
            this.clearLayoutAttrs(item);
        }

        for (const item of this.items) {
            if (this.orientation !== 'horizontal') {
                item.setAttribute(TOGGLE_ORIENTATION_ATTR, this.orientation);
            }
        }

        if (this.spacing !== 0) {
            return;
        }

        for (let index = 0; index < this.items.length; index++) {
            const item = this.items[index];
            item.setAttribute(GROUP_ORIENTATION_ATTR, this.orientation);
            item.setAttribute(GROUP_JOIN_ATTR, '');

            if (index === 0) {
                item.setAttribute(GROUP_ITEM_FIRST, '');
            }

            if (index === this.items.length - 1) {
                item.setAttribute(GROUP_ITEM_LAST, '');
            }
        }
    }

    private syncJoinedFromSpacing(): void {
        this.joined = this.spacing === 0;
    }

    private syncItems = (): void => {
        const slot = this.shadowRoot?.querySelector('slot');

        if (!slot) {
            return;
        }

        this.items = slot.assignedElements({ flatten: true }) as HTMLElement[];
        this.applyGroupProps();
        this.syncGroupLayout();
        this.applySelection();
    };

    private applyGroupProps(): void {
        for (const item of this.items) {
            if (item.tagName !== 'PK-TOGGLE') {
                continue;
            }

            item.setAttribute('variant', this.variant);
            item.setAttribute('size', this.size);
        }
    }

    private getItemValue(item: HTMLElement): string | null {
        return item.getAttribute('data-value') ?? item.dataset.value ?? null;
    }

    private isItemDisabled(item: HTMLElement): boolean {
        return item.hasAttribute('disabled') || item.matches(':disabled');
    }

    private applySelection(): void {
        for (const item of this.items) {
            const itemValue = this.getItemValue(item);

            if (!itemValue) {
                continue;
            }

            const selected = this.value.includes(itemValue);
            item.setAttribute('aria-pressed', selected ? 'true' : 'false');

            if (item.tagName === 'PK-TOGGLE') {
                if (selected) {
                    item.setAttribute('pressed', '');
                } else {
                    item.removeAttribute('pressed');
                }
            }
        }
    }

    private handleClick = (event: Event): void => {
        const target = (event.target as HTMLElement).closest('[data-value]') as HTMLElement | null;

        if (!target || !this.items.includes(target) || this.isItemDisabled(target)) {
            return;
        }

        event.preventDefault();

        const itemValue = this.getItemValue(target);

        if (!itemValue) {
            return;
        }

        if (this.multiple) {
            this.value = this.value.includes(itemValue)
                ? this.value.filter((v) => v !== itemValue)
                : [...this.value, itemValue];
        } else {
            this.value = this.value.includes(itemValue) ? [] : [itemValue];
        }

        this.applySelection();

        this.dispatchEvent(new CustomEvent('pk-value-change', {
            detail: { value: [...this.value] },
            bubbles: true,
            composed: true,
        }));
    };

    override render() {
        return html`
            <div
                part="base"
                class="group"
                role="group"
                style=${`--pk-toggle-group-spacing: ${this.spacing}`}
                @slotchange=${this.syncItems}
            >
                <slot></slot>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'pk-toggle-group': PkToggleGroup;
    }
}
