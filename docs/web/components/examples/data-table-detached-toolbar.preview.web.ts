import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';
import { mountDataTableExample } from './data-table.fixtures';
import fixtureSource from './data-table.fixtures.ts?raw';

export default defineWebPreview({
    label: 'Detached Toolbar',
    title: 'The toolbar rendered in a page header, apart from the table it controls.',
    layout: 'plain',
    language: 'ts',
    code: fixtureSource + '\nmountDataTableExample(root, "index");',
    html: `<div style="max-height:420px;overflow:auto;position:relative;padding:2px">
  <header style="position:sticky;top:0;z-index:5;display:flex;align-items:center;gap:16px;padding:8px 0 12px;background:var(--pk-color-gray-050,#f3f7fc)">
    <strong style="font-size:18px">Members</strong>
    <pk-data-table-toolbar for="members-table" style="flex:1"></pk-data-table-toolbar>
  </header>
  <pk-data-table id="members-table" style="--pk-data-table-header-offset:58px"></pk-data-table>
</div>
<output aria-live="polite" style="display:block;margin-top:12px"></output>`,
    enhance: (root) => mountDataTableExample(root, 'index'),
});
