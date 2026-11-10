import { PkElement } from '../../base/pk-element.js';
import { PkDataTable } from './pk-data-table.js';
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
export declare class PkDataTableToolbar extends PkElement {
    static styles: import('lit').CSSResult[];
    /** The `id` of the `pk-data-table` whose toolbar this renders. */
    htmlFor: string;
    /** @internal Where the table renders its toolbar. */
    mount?: HTMLElement;
    private table?;
    connectedCallback(): void;
    disconnectedCallback(): void;
    protected firstUpdated(): void;
    protected updated(changed: Map<PropertyKey, unknown>): void;
    /** @internal Attach to the table named by `for`, or to `table` when it connects first. */
    connectTable(table?: PkDataTable): void;
    private findTable;
    render(): import('lit-html').TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'pk-data-table-toolbar': PkDataTableToolbar;
    }
}
//# sourceMappingURL=pk-data-table-toolbar.d.ts.map