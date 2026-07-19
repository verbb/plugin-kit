import '@verbb/plugin-kit-web/components/radio-group/pk-radio-group.js';
import '@verbb/plugin-kit-web/components/radio-group/pk-radio.js';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

export default defineWebPreview({
    label: 'Supporting Descriptions',
    title: 'Supporting descriptions example',
    layout: 'stack',
    html: `
<pk-radio-group name="visibility" value="team">
  <pk-radio value="team">
    <span>
      <span style="font-weight:500">Team</span>
      <span style="display:block;color:#64748b">Visible to the whole team.</span>
    </span>
  </pk-radio>
  <pk-radio value="private">
    <span>
      <span style="font-weight:500">Private</span>
      <span style="display:block;color:#64748b">Only visible to you.</span>
    </span>
  </pk-radio>
</pk-radio-group>
`.trim(),
});
