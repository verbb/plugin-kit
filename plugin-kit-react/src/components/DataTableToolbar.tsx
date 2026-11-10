import React from 'react';
import { PkDataTableToolbar } from '@verbb/plugin-kit-web/components/data-table/pk-data-table-toolbar.js';

import { createPluginKitComponent } from '../utils/create-plugin-kit-component.js';

/** React facade over `<pk-data-table-toolbar>`. The table it names renders the toolbar into it. */
export const PkDataTableToolbarElement = createPluginKitComponent({
    tagName: 'pk-data-table-toolbar',
    elementClass: PkDataTableToolbar,
    react: React,
});

export const DataTableToolbar = PkDataTableToolbarElement;
export type DataTableToolbarProps = React.ComponentProps<typeof PkDataTableToolbarElement>;
