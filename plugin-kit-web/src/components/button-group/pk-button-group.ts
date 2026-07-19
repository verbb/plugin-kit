import { html, nothing } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import type { PropertyValues } from 'lit';

import { PkElement } from '../../base/pk-element.js';
import { pkButtonGroupStyles } from './pk-button-group.styles.js';

export type PkButtonGroupOrientation = 'horizontal' | 'vertical';

const GROUP_JOIN_ATTR = 'data-pk-group-join';
const GROUP_DIVIDER_ATTR = 'data-pk-group-divider';
const GROUP_ITEM_FIRST = 'data-pk-group-item-first';
const GROUP_ITEM_LAST = 'data-pk-group-item-last';
const GROUP_INTERNAL_TRAIL = 'data-pk-group-internal-trail';
const GROUP_BTN_LAST = 'data-pk-group-btn-last';
const GROUP_ORIENTATION_ATTR = 'data-pk-group-orientation';
const GROUP_SEPARATOR_TAGS = new Set(['PK-SEPARATOR', 'PK-BUTTON-GROUP-SEPARATOR']);
const OVERLAY_WRAPPER_TAGS = new Set(['PK-POPOVER', 'PK-DROPDOWN-MENU']);

/** Boolean attribute defaulting to true — absent means on; `separators="false"` opts out. */
const separatorsConverter = {
    fromAttribute(value: string | null): boolean {
        if (value === null) {
            return true;
        }

        return value !== 'false';
    },
    toAttribute(value: boolean): string | null {
        if (value) {
            return '';
        }

        return 'false';
    },
};

function isGroupSeparator(element: Element): boolean {
    return GROUP_SEPARATOR_TAGS.has(element.tagName);
}

function getLayoutTarget(element: Element): Element {
    if (OVERLAY_WRAPPER_TAGS.has(element.tagName)) {
        return element.querySelector('[slot="trigger"]') ?? element;
    }

    return element;
}

function getLayoutTargets(element: Element): Element[] {
    if (OVERLAY_WRAPPER_TAGS.has(element.tagName)) {
        const trigger = getLayoutTarget(element);

        return trigger === element ? [element] : [element, trigger];
    }

    return [element];
}

function getCornerTargets(element: Element, surface: Element): Element[] {
    return element === surface ? [element] : [element, surface];
}

function collectSyncTargets(element: Element): Element[] {
    const surface = getLayoutTarget(element);

    return [...new Set([...getLayoutTargets(element), ...getCornerTargets(element, surface)])];
}

function clearLayoutAttrs(element: Element): void {
    for (const target of collectSyncTargets(element)) {
        target.removeAttribute(GROUP_JOIN_ATTR);
        target.removeAttribute(GROUP_DIVIDER_ATTR);
        target.removeAttribute(GROUP_ITEM_FIRST);
        target.removeAttribute(GROUP_ITEM_LAST);
        target.removeAttribute(GROUP_INTERNAL_TRAIL);
        target.removeAttribute(GROUP_BTN_LAST);
        target.removeAttribute(GROUP_ORIENTATION_ATTR);
    }
}

function isGroupTrigger(element: Element): boolean {
    const target = getLayoutTarget(element);

    return target.hasAttribute('group-trigger')
        || element.hasAttribute('group-trigger');
}

function splitSegments(items: Element[]): Element[][] {
    const segments: Element[][] = [];
    let current: Element[] = [];

    for (const item of items) {
        if (isGroupSeparator(item)) {
            if (current.length) {
                segments.push(current);
            }

            current = [];
            continue;
        }

        current.push(item);
    }

    if (current.length) {
        segments.push(current);
    }

    return segments;
}

/**
 * Visually groups related buttons —  `pk-button-group` pattern (CSS var join, no JS).
 *
 * @slot - Buttons, toolbars, and overlay triggers
 *
 * @csspart base - Group container
 */
@customElement('pk-button-group')
export class PkButtonGroup extends PkElement {
    static override styles = pkButtonGroupStyles;

    @property({ reflect: true })
    orientation: PkButtonGroupOrientation = 'horizontal';

    /**
     * Draw 1px dividers between adjacent controls (Craft default).
     * Set `separators="false"` for flush join. Explicit `pk-button-group-separator` elements always work for segment splits.
     */
    @property({ type: Boolean, reflect: true, converter: separatorsConverter })
    separators = true;

    /**
     * Exclusive icon/text toggle styling — Craft `.btngroup--exclusive`.
     * Use with `pk-toggle` items for view-mode pickers.
     */
    @property({ type: Boolean, reflect: true })
    exclusive = false;

    /** Accessible label for the group —  `pk-button-group.label`. */
    @property()
    label = '';

    @query('slot:not([name])')
    private defaultSlot!: HTMLSlotElement;

    override firstUpdated(): void {
        this.scheduleSyncGroupLayout();
    }

    override updated(changed: PropertyValues): void {
        if (changed.has('orientation')) {
            this.setAttribute('aria-orientation', this.orientation);
            this.scheduleSyncGroupLayout();
        }

        if (changed.has('label')) {
            if (this.label) {
                this.setAttribute('aria-label', this.label);
            } else {
                this.removeAttribute('aria-label');
            }
        }

        if (changed.has('separators') || changed.has('exclusive')) {
            this.scheduleSyncGroupLayout();
        }
    }

    private scheduleSyncGroupLayout(): void {
        this.syncGroupLayout();
        queueMicrotask(() => this.syncGroupLayout());
    }

    private handleSlotChange(): void {
        this.scheduleSyncGroupLayout();
    }

    /** Overlap-join adjacent items within each segment; 1px divider between joins when `separators` is on. */
    private syncGroupLayout(): void {
        const items = this.defaultSlot?.assignedElements({ flatten: true }) ?? [];
        const segments = splitSegments(items);

        for (const element of items) {
            clearLayoutAttrs(element);
        }

        for (const element of items) {
            for (const target of collectSyncTargets(element)) {
                target.setAttribute(GROUP_ORIENTATION_ATTR, this.orientation);
            }
        }

        for (let segmentIndex = 0; segmentIndex < segments.length; segmentIndex++) {
            const segment = segments[segmentIndex];
            const isFirstSegment = segmentIndex === 0;
            const isLastSegment = segmentIndex === segments.length - 1;

            for (let index = 0; index < segment.length; index++) {
                const element = segment[index];
                const surface = getLayoutTarget(element);
                const cornerTargets = getCornerTargets(element, surface);
                const isOnly = segment.length === 1;
                const isFirst = index === 0;
                const isLast = index === segment.length - 1;

                for (const target of cornerTargets) {
                    if (isOnly) {
                        if (isFirstSegment) {
                            target.setAttribute(GROUP_ITEM_FIRST, '');
                        }

                        if (isLastSegment) {
                            target.setAttribute(GROUP_ITEM_LAST, '');
                        }
                    } else {
                        if (isFirst) {
                            target.setAttribute(GROUP_ITEM_FIRST, '');
                        }

                        if (isLast) {
                            target.setAttribute(GROUP_ITEM_LAST, '');
                        }
                    }
                }

                if (isFirst) {
                    if (this.separators && !isLast) {
                        for (const target of getLayoutTargets(element)) {
                            target.setAttribute(GROUP_INTERNAL_TRAIL, '');
                        }
                    }

                    continue;
                }

                for (const target of getLayoutTargets(element)) {
                    target.setAttribute(GROUP_JOIN_ATTR, '');

                    if (this.separators) {
                        target.setAttribute(GROUP_DIVIDER_ATTR, '');
                    }
                }

                if (this.separators && !isLast) {
                    for (const target of getLayoutTargets(element)) {
                        target.setAttribute(GROUP_INTERNAL_TRAIL, '');
                    }
                }

                if (isGroupTrigger(element)) {
                    surface.setAttribute(GROUP_BTN_LAST, '');
                }
            }
        }
    }

    override render() {
        return html`
            <div part="base" class="group" role="group" aria-label=${this.label || nothing}>
                <slot @slotchange=${this.handleSlotChange}></slot>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'pk-button-group': PkButtonGroup;
    }
}
