import { html, nothing, type ReactiveController } from 'lit';
import { repeat } from 'lit/directives/repeat.js';
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';
import { xmark, renderIconHtml } from '../../icons/index.js';
import type { PkDataTable } from './pk-data-table.js';
import type { PkDialog } from '../dialog/pk-dialog.js';
import type { PkSelect } from '../select/pk-select.js';
import type { PkInput } from '../input/pk-input.js';
import {
    dataTableLabels,
    type DataTableFilter,
    type DataTableFilterValue,
    type DataTableLabels,
} from './model.js';
import {
    dataTableFilterOperator,
    dataTableFilterOperators,
    filterNeedsValue,
    filterValueIsBlank,
    type DataTableFilterOperator,
} from './filter-model.js';
import '../dialog/pk-dialog.js';

interface FilterRule {
    id: string;
    operator: DataTableFilterOperator;
    value: DataTableFilterValue;
}
const operatorLabels: Record<DataTableFilterOperator, keyof DataTableLabels> = {
    contains: 'filterContains',
    'not-contains': 'filterNotContains',
    equals: 'filterEquals',
    'not-equals': 'filterNotEquals',
    'starts-with': 'filterStartsWith',
    'ends-with': 'filterEndsWith',
    in: 'filterIn',
    'not-in': 'filterNotIn',
    between: 'filterBetween',
    'greater-than': 'filterGreaterThan',
    'at-least': 'filterAtLeast',
    'less-than': 'filterLessThan',
    'at-most': 'filterAtMost',
    empty: 'filterEmpty',
    'not-empty': 'filterNotEmpty',
};

/** Owns a filter-editing session; only Apply mutates the table's public query. */
export class DataTableFilterController implements ReactiveController {
    private rules: FilterRule[] = [];
    private error = '';
    private opened = false;
    private closing = false;
    private preserveUnknown = true;
    private signature = '';
    private resizeObserver?: ResizeObserver;
    private positionFrame?: number;
    private pendingAdd?: string;
    private pendingType?: { id: string; nextId: string };
    constructor(private host: PkDataTable) {
        host.addController(this);
    }

    private text(
        key: keyof DataTableLabels,
        values: Record<string, string | number> = {},
    ): string {
        return (this.host.labels[key] ?? dataTableLabels[key]).replace(
            /\{(\w+)\}/g,
            (match, key: string) => String(values[key] ?? match),
        );
    }
    private get dialog(): PkDialog | null {
        return this.host.renderRoot.querySelector<PkDialog>('.filter-dialog');
    }
    private get trigger(): HTMLElement | null {
        return this.host.renderRoot.querySelector<HTMLElement>(
            '.filter-trigger',
        );
    }
    private get available(): DataTableFilter[] {
        return this.host.filters.filter(
            (filter) => !this.rules.some((rule) => rule.id === filter.id),
        );
    }
    private get querySignature(): string {
        return JSON.stringify([
            this.host.query.filters,
            this.host.query.filterOperators,
            this.host.filters,
        ]);
    }

    hostUpdated(): void {
        // External query/definition changes remain authoritative over a draft.
        if (
            this.opened &&
            !this.closing &&
            this.signature !== this.querySignature
        ) {
            this.resetDraft();
            this.host.requestUpdate();
        }
    }
    hostDisconnected(): void {
        this.stopObserving();
        this.pendingAdd = undefined;
        this.opened = false;
        this.closing = false;
    }
    private resetDraft(): void {
        this.rules = this.host.filters
            .filter((filter) =>
                Object.hasOwn(this.host.query.filters, filter.id),
            )
            .map((filter) => ({
                id: filter.id,
                operator: dataTableFilterOperator(
                    filter,
                    this.host.query.filterOperators?.[filter.id],
                ),
                value: structuredClone(this.host.query.filters[filter.id]),
            }));
        this.error = '';
        this.preserveUnknown = true;
        this.signature = this.querySignature;
    }
    private position = (): void => {
        const anchor =
            this.host.renderRoot.querySelector<HTMLElement>('.search') ??
            this.host.renderRoot.querySelector<HTMLElement>('.toolbar');
        const dialog = this.dialog;
        if (!anchor || !dialog) return;
        const box = anchor.getBoundingClientRect();
        const viewport = this.host.ownerDocument.defaultView!;
        const anchored =
            box.width >= 450 &&
            box.bottom >= 0 &&
            viewport.innerHeight - box.bottom >= 240;
        dialog.toggleAttribute('data-anchored', anchored);
        dialog.style.setProperty(
            '--filter-left',
            `${Math.max(8, Math.min(box.left + 1, viewport.innerWidth - box.width - 8))}px`,
        );
        dialog.style.setProperty('--filter-top', `${box.bottom}px`);
        dialog.style.setProperty('--filter-width', `${box.width - 2}px`);
        dialog.style.setProperty(
            '--filter-max-height',
            `${Math.max(200, viewport.innerHeight - box.bottom - 12)}px`,
        );
    };
    private stopObserving(): void {
        if (this.positionFrame !== undefined)
            cancelAnimationFrame(this.positionFrame);
        this.positionFrame = undefined;
        this.resizeObserver?.disconnect();
        this.resizeObserver = undefined;
        const viewport = this.host.ownerDocument.defaultView;
        viewport?.removeEventListener('resize', this.position);
        viewport?.removeEventListener('scroll', this.position, true);
    }
    async show(): Promise<void> {
        if (this.opened || this.closing) return;
        this.resetDraft();
        this.opened = true;
        this.host.requestUpdate();
        await this.host.updateComplete;
        const dialog = this.dialog;
        if (!dialog || !this.host.isConnected) return;
        await dialog.updateComplete;
        this.position();
        this.resizeObserver = new ResizeObserver(() => {
            if (this.positionFrame !== undefined)
                cancelAnimationFrame(this.positionFrame);
            this.positionFrame = requestAnimationFrame(() => {
                this.positionFrame = undefined;
                this.position();
            });
        });
        const anchor =
            this.host.renderRoot.querySelector('.search') ??
            this.host.renderRoot.querySelector('.toolbar');
        if (anchor) this.resizeObserver.observe(anchor);
        this.host.ownerDocument.defaultView?.addEventListener(
            'resize',
            this.position,
        );
        this.host.ownerDocument.defaultView?.addEventListener(
            'scroll',
            this.position,
            true,
        );
        await dialog.show();
        this.focusRule(this.rules[0]?.id);
    }
    private focusRule(id?: string): void {
        const control = id
            ? this.host.renderRoot.querySelector<HTMLElement>(
                  `.filter-rule[data-id="${CSS.escape(id)}"] .filter-type`,
              )
            : this.host.renderRoot.querySelector<HTMLElement>('.add-filter');
        (
            control ??
            this.host.renderRoot.querySelector<HTMLElement>('.filter-apply')
        )?.focus({ preventScroll: true });
    }
    private afterHide(event: Event): void {
        if (event.target !== this.dialog) return;
        this.stopObserving();
        this.opened = false;
        this.closing = false;
        this.error = '';
        this.host.requestUpdate();
        // The dialog restores its outer host; restore the actual nested search trigger afterwards.
        setTimeout(() => {
            if (!this.opened && this.host.isConnected)
                this.trigger?.focus({ preventScroll: true });
        }, 0);
    }
    private async close(): Promise<void> {
        if (this.closing) return;
        this.closing = true;
        await this.dialog?.hide();
    }
    private change(id: string, patch: Partial<FilterRule>): void {
        this.rules = this.rules.map((rule) =>
            rule.id === id ? { ...rule, ...patch } : rule,
        );
        this.error = '';
        this.host.requestUpdate();
    }
    private async add(id: string): Promise<void> {
        const filter = this.available.find((filter) => filter.id === id);
        if (!filter) return;
        this.rules = [
            ...this.rules,
            { id, operator: dataTableFilterOperator(filter), value: '' },
        ];
        this.host.requestUpdate();
        await this.host.updateComplete;
        this.focusRule(id);
    }
    private async remove(id: string): Promise<void> {
        const index = this.rules.findIndex((rule) => rule.id === id);
        this.rules = this.rules.filter((rule) => rule.id !== id);
        this.error = '';
        this.host.requestUpdate();
        await this.host.updateComplete;
        this.focusRule(this.rules[index]?.id ?? this.rules[index - 1]?.id);
    }
    private clearDraft(): void {
        this.rules = [];
        this.preserveUnknown = false;
        this.error = '';
        this.host.requestUpdate();
        void this.host.updateComplete.then(() => this.focusRule());
    }
    operatorLabel(
        filter: DataTableFilter,
        operator: DataTableFilterOperator,
    ): string {
        if (filter.type === 'date-range') {
            const dates: Partial<
                Record<DataTableFilterOperator, keyof DataTableLabels>
            > = {
                'greater-than': 'filterAfter',
                'at-least': 'filterOnOrAfter',
                'less-than': 'filterBefore',
                'at-most': 'filterOnOrBefore',
            };
            if (dates[operator]) return this.text(dates[operator]!);
        }
        return this.text(operatorLabels[operator]);
    }
    private async apply(): Promise<void> {
        if (this.closing) return;
        const filters = this.preserveUnknown
            ? { ...this.host.query.filters }
            : {};
        const operators = this.preserveUnknown
            ? { ...this.host.query.filterOperators }
            : {};
        for (const filter of this.host.filters) {
            delete filters[filter.id];
            delete operators[filter.id];
        }
        for (const rule of this.rules) {
            const filter = this.host.filters.find(
                (filter) => filter.id === rule.id,
            );
            if (!filter) continue;
            if (
                filterNeedsValue(rule.operator) &&
                filterValueIsBlank(rule.value)
            )
                continue;
            if (
                filterNeedsValue(rule.operator) &&
                (filter.type === 'number-range' || filter.type === 'date-range')
            ) {
                const values = Array.isArray(rule.value)
                    ? rule.value
                    : [rule.value];
                const numbers = values.map((value) =>
                    !value
                        ? undefined
                        : filter.type === 'date-range'
                          ? Date.parse(value)
                          : Number(value),
                );
                if (
                    numbers.some(
                        (number) =>
                            number !== undefined && !Number.isFinite(number),
                    )
                ) {
                    this.error = this.text('filterValueError', {
                        label: filter.label,
                    });
                } else if (
                    rule.operator === 'between' &&
                    numbers[0] != null &&
                    numbers[1] != null &&
                    numbers[0] > numbers[1]
                ) {
                    this.error = this.text('filterRangeError', {
                        label: filter.label,
                    });
                }
                if (this.error) {
                    this.host.requestUpdate();
                    await this.host.updateComplete;
                    this.focusRule(rule.id);
                    return;
                }
            }
            filters[rule.id] = filterNeedsValue(rule.operator)
                ? structuredClone(rule.value)
                : '';
            if (rule.operator !== dataTableFilterOperator(filter))
                operators[rule.id] = rule.operator;
        }
        const changed =
            JSON.stringify([filters, operators]) !==
            JSON.stringify([
                this.host.query.filters,
                this.host.query.filterOperators ?? {},
            ]);
        // Do not request data while the builder is closing over a consumer's newly rendered table.
        this.closing = true;
        if (changed)
            this.host.setQuery({ filters, filterOperators: operators });
        await this.dialog?.hide();
    }
    private renderValue(filter: DataTableFilter, rule: FilterRule) {
        if (!filterNeedsValue(rule.operator)) return nothing;
        if (
            filter.type === 'select' ||
            filter.type === 'multi-select' ||
            filter.type === 'boolean'
        ) {
            const options =
                filter.type === 'boolean'
                    ? [
                          { value: 'true', label: this.text('yes') },
                          { value: 'false', label: this.text('no') },
                      ]
                    : (filter.options ?? []);
            return html`<pk-select
                class="filter-value"
                width="full"
                aria-label=${filter.label}
                .placeholder=${this.text('all')}
                .multiple=${filter.type === 'multi-select'}
                .value=${Array.isArray(rule.value) ? '' : rule.value}
                .values=${Array.isArray(rule.value) ? rule.value : rule.value ? [rule.value] : []}
                @change=${(event: Event) => {
                    const select = event.currentTarget as PkSelect;
                    this.change(rule.id, {
                        value:
                            filter.type === 'multi-select'
                                ? [...select.values]
                                : select.value,
                    });
                }}
                >${options.map((option) => html`<pk-option .value=${option.value}>${option.label}</pk-option>`)}</pk-select
            >`;
        }
        const range = rule.operator === 'between';
        const values = range
            ? Array.isArray(rule.value)
                ? rule.value
                : [rule.value, '']
            : [Array.isArray(rule.value) ? (rule.value[0] ?? '') : rule.value];
        return html`<div class="filter-values">
            ${values.map(
                (value, index) =>
                    html`<pk-input
                        class="filter-input"
                        type=${filter.type === 'date-range' ? 'date' : filter.type === 'number-range' ? 'number' : 'text'}
                        .label=${range ? `${filter.label}: ${this.text(index ? 'to' : 'from')}` : filter.label}
                        .placeholder=${range ? this.text(index ? 'to' : 'from') : ''}
                        .value=${value}
                        @input=${(event: Event) => {
                            const value = (event.currentTarget as PkInput)
                                .value;
                            const next = [...values];
                            next[index] = value;
                            this.change(rule.id, {
                                value: range ? next : value,
                            });
                        }}
                    ></pk-input>`,
            )}
        </div>`;
    }
    renderTrigger(slot?: string) {
        if (!this.host.filters.length && !this.host.showFilters) return nothing;
        const count =
            Object.keys(this.host.query.filters).length +
            (this.host.query.criteria &&
            Object.keys(this.host.query.criteria).length
                ? 1
                : 0);
        return html`<pk-button
            class="filter-trigger"
            slot=${slot ?? nothing}
            variant="transparent"
            size="sm"
            ?data-active=${this.opened || count > 0}
            aria-label=${`${this.text('filters')}${count ? ` (${count})` : ''}`}
            aria-haspopup="dialog"
            aria-expanded=${this.opened ? 'true' : 'false'}
            @click=${() => this.show()}
            ><svg
                class="direction-icon"
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="currentColor"
            >
                <path
                    d="M3 4h18a1 1 0 0 1 .8 1.6L15 14v6a1 1 0 0 1-1.5.86l-4-2.4A1 1 0 0 1 9 17.6V14L2.2 5.6A1 1 0 0 1 3 4Z"
                /></svg
            >${count ? html`<span>${count}</span>` : nothing}</pk-button
        >`;
    }
    renderDialog() {
        return html`<pk-dialog
            class="filter-dialog"
            .label=${this.text('filterResults')}
            without-header
            @pk-after-hide=${(event: Event) => this.afterHide(event)}
            @keydown=${(event: KeyboardEvent) => {
                if (
                    event.key === 'Enter' &&
                    event
                        .composedPath()
                        .some(
                            (node) =>
                                (node as Element).localName === 'pk-input',
                        ) &&
                    !event
                        .composedPath()
                        .some(
                            (node) =>
                                (node as Element).localName === 'pk-select',
                        )
                ) {
                    event.preventDefault();
                    void this.apply();
                }
            }}
            ><div class="filter-builder" part="filter-builder">
                ${this.rules.length ? html`<p class="filter-intro">${this.text('filterMatch')}</p>` : nothing}
                ${repeat(
                    this.rules,
                    (rule) => rule.id,
                    (rule, index) => {
                        const filter = this.host.filters.find(
                            (filter) => filter.id === rule.id,
                        );
                        if (!filter) return nothing;
                        return html`<div
                            class="filter-rule"
                            part="filter-rule"
                            data-id=${rule.id}
                            role="group"
                            aria-label=${filter.label}
                        >
                            <pk-select
                                class="filter-type"
                                aria-label=${`${filter.label}: ${this.text('filterType')}`}
                                width="full"
                                .value=${rule.id}
                                @change=${(event: Event) => {
                                    this.pendingType = {
                                        id: rule.id,
                                        nextId: (
                                            event.currentTarget as PkSelect
                                        ).value,
                                    };
                                }}
                                @pk-after-hide=${(event: Event) => {
                                    if (
                                        event.target !== event.currentTarget ||
                                        this.pendingType?.id !== rule.id
                                    )
                                        return;
                                    const id = this.pendingType.nextId;
                                    this.pendingType = undefined;
                                    const next = this.host.filters.find(
                                        (filter) => filter.id === id,
                                    );
                                    if (!next || id === rule.id) return;
                                    // Finish closing before replacing the keyed rule and its select.
                                    this.change(rule.id, {
                                        id,
                                        operator: dataTableFilterOperator(next),
                                        value: '',
                                    });
                                    void this.host.updateComplete.then(() =>
                                        this.focusRule(id),
                                    );
                                }}
                            >
                                ${[filter, ...this.available].map((item) => html`<pk-option .value=${item.id}>${item.label}</pk-option>`)}
                            </pk-select>
                            <pk-select
                                class="filter-operator"
                                width="full"
                                .value=${rule.operator}
                                aria-label=${this.text('filterOperator', { label: filter.label })}
                                @change=${(event: Event) => {
                                    const operator = (
                                        event.currentTarget as PkSelect
                                    ).value as DataTableFilterOperator;
                                    this.change(rule.id, {
                                        operator,
                                        value:
                                            operator === 'between'
                                                ? Array.isArray(rule.value)
                                                    ? rule.value
                                                    : [rule.value, '']
                                                : filter.type === 'multi-select'
                                                  ? rule.value
                                                  : Array.isArray(rule.value)
                                                    ? (rule.value[0] ?? '')
                                                    : rule.value,
                                    });
                                }}
                            >
                                ${dataTableFilterOperators(filter).map((operator) => html`<pk-option .value=${operator}>${this.operatorLabel(filter, operator)}</pk-option>`)}
                            </pk-select>
                            ${this.renderValue(filter, rule)}
                            <pk-button
                                class="filter-remove"
                                variant="transparent"
                                size="sm"
                                aria-label=${this.text('removeFilter', { label: filter.label })}
                                @click=${() => this.remove(rule.id)}
                                ><span class="icon" aria-hidden="true"
                                    >${unsafeSVG(renderIconHtml(xmark))}</span
                                ></pk-button
                            >
                        </div>`;
                    },
                )}
                ${
                    this.host.filters.length
                        ? html`<div class="filter-add">
                              <pk-select
                                  class="add-filter"
                                  aria-label=${this.text('addFilter')}
                                  .placeholder=${this.available.length ? this.text('addFilter') : this.text('allFiltersAdded')}
                                  .disabled=${!this.available.length}
                                  .value=${''}
                                  @change=${(event: Event) => {
                                      const select =
                                          event.currentTarget as PkSelect;
                                      const id = select.value;
                                      select.value = '';
                                      this.pendingAdd = id;
                                  }}
                                  @pk-after-hide=${(event: Event) => {
                                      if (
                                          event.target !==
                                              event.currentTarget ||
                                          !this.pendingAdd
                                      )
                                          return;
                                      const id = this.pendingAdd;
                                      this.pendingAdd = undefined;
                                      void this.add(id);
                                  }}
                                  >${this.available.map((filter) => html`<pk-option .value=${filter.id}>${filter.label}</pk-option>`)}</pk-select
                              >
                          </div>`
                        : nothing
                }
                <slot name="filters"></slot>
                ${this.error ? html`<p class="filter-error" role="alert">${this.error}</p>` : nothing}
            </div>
            <div slot="footer" class="filter-footer" part="filter-footer">
                <pk-button
                    variant="transparent"
                    .disabled=${!this.rules.length && !Object.keys(this.host.query.filters).length}
                    @click=${() => this.clearDraft()}
                    >${this.text('clear')}</pk-button
                >
                <span class="filter-footer-spacer"></span>
                <pk-button @click=${() => this.close()}
                    >${this.text('cancelFilters')}</pk-button
                >
                <pk-button
                    class="filter-apply"
                    variant="secondary"
                    @click=${() => this.apply()}
                    >${this.text('applyFilters')}</pk-button
                >
            </div></pk-dialog
        >`;
    }
}
