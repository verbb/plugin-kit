import { createPkComponent } from "../createPkComponent.js";
import "@verbb/plugin-kit-web/components/editable-table.js";
//#region src/components/EditableTable.ts
/** Vue facade over `<pk-editable-table>`. Behavior and styles live in the web component. */
var EditableTable = createPkComponent({
	name: "PkEditableTable",
	tagName: "pk-editable-table"
});
var PkEditableTableElement = EditableTable;
//#endregion
export { EditableTable, PkEditableTableElement };

//# sourceMappingURL=EditableTable.js.map