import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';
import { mountOrderExample } from './data-table-order.fixtures';
import fixtureSource from './data-table-order.fixtures.ts?raw';

export default defineWebPreview({
    label: 'Manual Order',
    title: 'Drag or use the keyboard to order filesystems',
    layout: 'plain',
    language: 'ts',
    code: fixtureSource,
    html: '<label><input type="checkbox"> Fail next save</label><pk-data-table manual-order></pk-data-table><output aria-live="polite">Drag a handle, or focus it and press Up or Down.</output>',
    enhance: mountOrderExample,
});
