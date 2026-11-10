import { css, html } from 'lit';
import { customElement, property, query } from '../../decorators.js';
import { PkElement } from '../../base/pk-element.js';
import { dataTableStyles } from './styles.js';
import type { PkDataTable } from './pk-data-table.js';

/**
 * Renders a `pk-data-table`'s toolbar somewhere else on the page, such as a sticky page header,
 * like the toolbar above a Craft element index. Set `for` to the table's `id`. The table keeps
 * its search, filters, View menu and labels; this element only gives them a place to render.
 *
 * Put toolbar slot content in this element rather than the table.
 *
 * @slot toolbar-start - Controls before search.
 * @slot toolbar-controls - Additional controls after search/filter controls and before View.
 * @slot toolbar-end - Product actions after the standard controls.
 * @csspart toolbar - Toolbar container.
 */
@customElement('pk-data-table-toolbar')
export class PkDataTableToolbar extends PkElement {
    static override styles = [
        dataTableStyles,
        css`
            :host {
                display: block;
                min-width: 0;
            }

            .toolbar {
                margin-bottom: 0;
            }
        `,
    ];

    /** The `id` of the `pk-data-table` whose toolbar this renders. */
    @property({ attribute: 'for' }) htmlFor = '';

    /** @internal Where the table renders its toolbar. */
    @query('.mount') mount?: HTMLElement;

    private table?: PkDataTable;

    override connectedCallback(): void {
        super.connectedCallback();
        if (this.hasUpdated) this.connectTable();
    }

    override disconnectedCallback(): void {
        this.table?.detachToolbar(this);
        this.table = undefined;
        super.disconnectedCallback();
    }

    protected override firstUpdated(): void {
        this.connectTable();
    }

    protected override updated(changed: Map<PropertyKey, unknown>): void {
        if (changed.has('htmlFor') && changed.get('htmlFor') !== undefined) {
            this.table?.detachToolbar(this);
            this.table = undefined;
            this.connectTable();
        }
    }

    /** @internal Attach to the table named by `for`, or to `table` when it connects first. */
    connectTable(table?: PkDataTable): void {
        const found = table ?? this.findTable();
        if (!found || !this.hasUpdated) return;
        if (this.table && this.table !== found) this.table.detachToolbar(this);
        this.table = found;
        found.attachToolbar(this);
    }

    private findTable(): PkDataTable | null {
        if (!this.htmlFor) return null;
        const root = this.getRootNode() as Document | ShadowRoot;
        const element = root.getElementById?.(this.htmlFor) ?? this.ownerDocument.getElementById(this.htmlFor);
        return element?.localName === 'pk-data-table' ? (element as PkDataTable) : null;
    }

    override render() {
        return html`<div class="mount"></div>`;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'pk-data-table-toolbar': PkDataTableToolbar;
    }
}
