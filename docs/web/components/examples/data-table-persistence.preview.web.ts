import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';
import { mountRememberedTable } from './data-table-persistence.fixtures';
import source from './data-table-persistence.fixtures.ts?raw';

export default defineWebPreview({
    label: 'Remembered View',
    title: 'Column preferences and sorting survive recreating the table.',
    layout: 'plain',
    language: 'ts',
    code: source,
    html: '<pk-button data-recreate style="margin-bottom:12px">Recreate table</pk-button><div data-table style="padding:2px"></div>',
    enhance: mountRememberedTable,
});
