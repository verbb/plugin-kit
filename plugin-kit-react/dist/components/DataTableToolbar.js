import { createPluginKitComponent } from "../utils/create-plugin-kit-component.js";
import React from "react";
import { PkDataTableToolbar } from "@verbb/plugin-kit-web/components/data-table/pk-data-table-toolbar.js";
//#region src/components/DataTableToolbar.tsx
/** React facade over `<pk-data-table-toolbar>`. The table it names renders the toolbar into it. */
var PkDataTableToolbarElement = createPluginKitComponent({
	tagName: "pk-data-table-toolbar",
	elementClass: PkDataTableToolbar,
	react: React
});
var DataTableToolbar = PkDataTableToolbarElement;
//#endregion
export { DataTableToolbar, PkDataTableToolbarElement };

//# sourceMappingURL=DataTableToolbar.js.map