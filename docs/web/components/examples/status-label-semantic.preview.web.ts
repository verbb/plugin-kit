import '@verbb/plugin-kit-web/components/status-label.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

const markup = `<div style="display:flex;flex-wrap:wrap;gap:12px">
    <pk-status-label status="active">Active</pk-status-label>
    <pk-status-label status="active">Approved</pk-status-label>
    <pk-status-label status="pending">Awaiting review</pk-status-label>
    <pk-status-label status="inactive">Inactive</pk-status-label>
    <pk-status-label status="disabled">Disabled</pk-status-label>
    <pk-status-label status="red">Unpaid</pk-status-label>
    <pk-status-label status="blue">Packed</pk-status-label>
    <pk-status-label status="purple">Refunded</pk-status-label>
</div>`;
export default defineWebPreview({
    label: 'Semantic Statuses',
    title: 'Semantic Statuses',
    layout: 'plain',
    code: markup,
    html: markup,
});
