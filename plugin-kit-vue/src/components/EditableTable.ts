import { createPkComponent } from '../createPkComponent.js';
import '@verbb/plugin-kit-web/components/editable-table.js';

/** Vue facade over `<pk-editable-table>`. Behavior and styles live in the web component. */
export const EditableTable = createPkComponent({
    name: 'PkEditableTable',
    tagName: 'pk-editable-table',
});

export const PkEditableTableElement = EditableTable;

export type EditableTableProps = Record<string, unknown>;
