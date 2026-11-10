import { c as n, g as i, h as b, l as customElement, o as e } from "../../chunks/lit-DDs3j8Nc.js";
import { c as __decorate, l as PkElement } from "../../chunks/pk-base-Dlxhq-0r.js";
import { t as dataTableStyles } from "../../chunks/styles-DPyzUoC3.js";
//#region src/components/data-table/pk-data-table-toolbar.ts
var PkDataTableToolbar = class PkDataTableToolbar extends PkElement {
	constructor(..._args) {
		super(..._args);
		this.htmlFor = "";
	}
	static {
		this.styles = [dataTableStyles, i`
            :host {
                display: block;
                min-width: 0;
            }

            .toolbar {
                margin-bottom: 0;
            }
        `];
	}
	connectedCallback() {
		super.connectedCallback();
		if (this.hasUpdated) this.connectTable();
	}
	disconnectedCallback() {
		this.table?.detachToolbar(this);
		this.table = void 0;
		super.disconnectedCallback();
	}
	firstUpdated() {
		this.connectTable();
	}
	updated(changed) {
		if (changed.has("htmlFor") && changed.get("htmlFor") !== void 0) {
			this.table?.detachToolbar(this);
			this.table = void 0;
			this.connectTable();
		}
	}
	/** @internal Attach to the table named by `for`, or to `table` when it connects first. */
	connectTable(table) {
		const found = table ?? this.findTable();
		if (!found || !this.hasUpdated) return;
		if (this.table && this.table !== found) this.table.detachToolbar(this);
		this.table = found;
		found.attachToolbar(this);
	}
	findTable() {
		if (!this.htmlFor) return null;
		const element = this.getRootNode().getElementById?.(this.htmlFor) ?? this.ownerDocument.getElementById(this.htmlFor);
		return element?.localName === "pk-data-table" ? element : null;
	}
	render() {
		return b`<div class="mount"></div>`;
	}
};
__decorate([n({ attribute: "for" })], PkDataTableToolbar.prototype, "htmlFor", void 0);
__decorate([e(".mount")], PkDataTableToolbar.prototype, "mount", void 0);
PkDataTableToolbar = __decorate([customElement("pk-data-table-toolbar")], PkDataTableToolbar);
//#endregion
export { PkDataTableToolbar };
