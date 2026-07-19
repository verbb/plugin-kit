import '@verbb/plugin-kit-web/components/editable-table/pk-editable-table.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';
import {
    bindEditableTableInRoot,
    editableTableDerivedColumns,
    editableTablePreviewSource,
} from './editable-table.fixtures';

export default defineWebPreview({
    label: 'Derived Columns',
    title: 'Derived columns example',
    layout: 'plain',
    language: 'js',
    code: editableTablePreviewSource(editableTableDerivedColumns, {
        htmlAttrs: 'add-row-label="Add row"',
    }),
    html: `<pk-editable-table add-row-label="Add row"></pk-editable-table>`,
    enhance: (root) => {
        bindEditableTableInRoot(root, 'pk-editable-table', editableTableDerivedColumns);
    },
});
