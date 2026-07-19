import '@verbb/plugin-kit-web/components/editable-table/pk-editable-table.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';
import {
    bindEditableTableInRoot,
    editableTableCellValidation,
    editableTablePreviewSource,
} from './editable-table.fixtures';

export default defineWebPreview({
    label: 'Cell Validation',
    title: 'Cell validation example',
    layout: 'plain',
    language: 'js',
    code: editableTablePreviewSource(editableTableCellValidation, {
        htmlAttrs: 'field-name="demoTable" add-row-label="Add row"',
    }),
    html: `<pk-editable-table field-name="demoTable" add-row-label="Add row"></pk-editable-table>`,
    enhance: (root) => {
        bindEditableTableInRoot(root, 'pk-editable-table', editableTableCellValidation);
    },
});
