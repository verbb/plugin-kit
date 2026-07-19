// Side-effect: define <pk-editable-table> for createElement mounts.
import '@verbb/plugin-kit-web/components/editable-table/pk-editable-table.js';

import { bindEditableTable } from '../../../../../docs/web/components/examples/editable-table.fixtures.js';
import { editableTablePlaygroundSections } from '../../../catalog/data/meta-editable-table.js';
import type { PlaygroundSectionRendererMap } from '../../../catalog/types.js';
import type { EditableTableDemo } from '../../../../../docs/web/components/examples/editable-table.fixtures.js';
import type { PkEditableTable } from '@verbb/plugin-kit-web/components/editable-table/pk-editable-table.js';

function createBoundTable(demo: EditableTableDemo): PkEditableTable {
    const table = document.createElement('pk-editable-table') as PkEditableTable;
    bindEditableTable(table, demo);
    return table;
}

/** Web component previews — section ids match editableTablePlaygroundSpec / docs. */
export const editableTableWebSectionRenderers: PlaygroundSectionRendererMap = {
    mixedFieldTypes(preview) {
        preview.append(createBoundTable(editableTablePlaygroundSections.mixedFieldTypes.demo));
    },

    cellValidation(preview) {
        preview.append(createBoundTable(editableTablePlaygroundSections.cellValidation.demo));
    },

    derivedColumns(preview) {
        preview.append(createBoundTable(editableTablePlaygroundSections.derivedColumns.demo));
    },

    compactSelectionColumns(preview) {
        const stack = document.createElement('div');
        stack.className = 'pg-demo-stack';
        const { addRowLabel, thin, radio } = editableTablePlaygroundSections.compactSelectionColumns.demo;

        const thinHeading = document.createElement('h4');
        thinHeading.className = 'pg-subsection-title';
        thinHeading.textContent = 'Thin checkboxes';
        stack.append(thinHeading);
        stack.append(createBoundTable({
            addRowLabel,
            columns: [...thin.columns],
            rows: thin.rows.map((row) => ({ ...row })),
        }));

        const radioHeading = document.createElement('h4');
        radioHeading.className = 'pg-subsection-title';
        radioHeading.textContent = 'Radio default (allow unselect)';
        stack.append(radioHeading);
        stack.append(createBoundTable({
            addRowLabel,
            columns: [...radio.columns],
            rows: radio.rows.map((row) => ({ ...row })),
        }));

        preview.append(stack);
    },
};
