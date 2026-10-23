import '@verbb/plugin-kit-web/components/status-label.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

const markup = `<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(7rem,1fr));gap:12px">
    <pk-status-label status="red">Red</pk-status-label>
    <pk-status-label status="orange">Orange</pk-status-label>
    <pk-status-label status="amber">Amber</pk-status-label>
    <pk-status-label status="yellow">Yellow</pk-status-label>
    <pk-status-label status="lime">Lime</pk-status-label>
    <pk-status-label status="green">Green</pk-status-label>
    <pk-status-label status="emerald">Emerald</pk-status-label>
    <pk-status-label status="teal">Teal</pk-status-label>
    <pk-status-label status="cyan">Cyan</pk-status-label>
    <pk-status-label status="sky">Sky</pk-status-label>
    <pk-status-label status="blue">Blue</pk-status-label>
    <pk-status-label status="indigo">Indigo</pk-status-label>
    <pk-status-label status="violet">Violet</pk-status-label>
    <pk-status-label status="purple">Purple</pk-status-label>
    <pk-status-label status="fuchsia">Fuchsia</pk-status-label>
    <pk-status-label status="pink">Pink</pk-status-label>
    <pk-status-label status="rose">Rose</pk-status-label>
    <pk-status-label status="gray">Gray</pk-status-label>
    <pk-status-label status="white">White</pk-status-label>
    <pk-status-label status="black">Black</pk-status-label>
</div>`;
export default defineWebPreview({
    label: 'Named Colours',
    title: 'Named Colours',
    layout: 'plain',
    code: markup,
    html: markup,
});
