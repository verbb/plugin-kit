import '@verbb/plugin-kit-web/components/editable-table/pk-editable-table.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';
import {
    bindEditableTableInRoot,
    editableTableCompactSelection,
    editableTablePreviewSource,
} from './editable-table.fixtures';

const { addRowLabel, thin, radio } = editableTableCompactSelection;

const thinDemo = {
    addRowLabel,
    columns: [...thin.columns],
    rows: thin.rows.map((row) => ({ ...row })),
};

const radioDemo = {
    addRowLabel,
    columns: [...radio.columns],
    rows: radio.rows.map((row) => ({ ...row })),
};

export default defineWebPreview({
    label: 'Compact Selection Columns',
    title: 'Compact selection columns example',
    // plain — stack layout caps the preview root at 420px (meant for form controls).
    layout: 'plain',
    language: 'js',
    code: [
        editableTablePreviewSource(thinDemo, {
            varName: 'thinTable',
            selector: '#thin',
            htmlAttrs: 'id="thin" add-row-label="Add an option"',
        }),
        '',
        editableTablePreviewSource(radioDemo, {
            includeImport: false,
            varName: 'radioTable',
            selector: '#radio',
            htmlAttrs: 'id="radio" add-row-label="Add an option"',
        }),
    ].join('\n'),
    html: `
<div style="display:flex;flex-direction:column;gap:24px">
  <pk-editable-table id="thin" add-row-label="Add an option"></pk-editable-table>
  <pk-editable-table id="radio" add-row-label="Add an option"></pk-editable-table>
</div>
`.trim(),
    enhance: (root) => {
        bindEditableTableInRoot(root, '#thin', thinDemo);
        bindEditableTableInRoot(root, '#radio', radioDemo);
    },
});
