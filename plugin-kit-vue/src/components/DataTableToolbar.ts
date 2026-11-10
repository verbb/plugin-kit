import { createPkComponent } from '../createPkComponent.js';
import '@verbb/plugin-kit-web/components/data-table/pk-data-table-toolbar.js';

/** Vue facade over `<pk-data-table-toolbar>`. The table it names renders the toolbar into it. */
export const DataTableToolbar = createPkComponent({
    name: 'PkDataTableToolbar',
    tagName: 'pk-data-table-toolbar',
});

export const PkDataTableToolbarElement = DataTableToolbar;

export type DataTableToolbarProps = Record<string, unknown>;
