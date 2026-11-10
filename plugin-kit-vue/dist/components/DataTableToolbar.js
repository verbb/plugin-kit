import { createPkComponent } from "../createPkComponent.js";
import "@verbb/plugin-kit-web/components/data-table/pk-data-table-toolbar.js";
//#region src/components/DataTableToolbar.ts
/** Vue facade over `<pk-data-table-toolbar>`. The table it names renders the toolbar into it. */
var DataTableToolbar = createPkComponent({
	name: "PkDataTableToolbar",
	tagName: "pk-data-table-toolbar"
});
var PkDataTableToolbarElement = DataTableToolbar;
//#endregion
export { DataTableToolbar, PkDataTableToolbarElement };

//# sourceMappingURL=DataTableToolbar.js.map