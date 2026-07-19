import '@verbb/plugin-kit-web/components/editable-table/pk-editable-table.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';
import {
    bindEditableTableInRoot,
    editableTableMixedFieldTypes,
    editableTablePreviewSource,
} from './editable-table.fixtures';

export default defineWebPreview({
    label: 'Mixed Field Types',
    title: 'Mixed field types example',
    layout: 'plain',
    language: 'js',
    code: editableTablePreviewSource(editableTableMixedFieldTypes, {
        htmlAttrs: 'add-row-label="Add row"',
    }),
    html: `<pk-editable-table add-row-label="Add row"></pk-editable-table>`,
    enhance: (root) => {
        bindEditableTableInRoot(root, 'pk-editable-table', editableTableMixedFieldTypes);
    },
});
