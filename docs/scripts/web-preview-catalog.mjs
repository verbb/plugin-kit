/** HTML + import catalog for web component doc previews. */

export const FRUIT_OPTIONS = `
<pk-option value="apple">Apple</pk-option>
<pk-option value="banana">Banana</pk-option>
<pk-option value="blueberry">Blueberry</pk-option>
<pk-option value="grapes">Grapes</pk-option>
<pk-option value="pineapple">Pineapple</pk-option>`.trim();

export const FRAMEWORK_OPTIONS = `
<pk-option value="next-js">Next.js</pk-option>
<pk-option value="sveltekit">SvelteKit</pk-option>
<pk-option value="nuxt-js">Nuxt.js</pk-option>
<pk-option value="remix">Remix</pk-option>
<pk-option value="astro">Astro</pk-option>`.trim();

const dialogClose = `
<pk-button variant="none" aria-label="Close" class="pk-dialog__close" data-dialog-close>
  <pk-icon slot="start" icon="xmark"></pk-icon>
</pk-button>`.trim();

const dialogHeader = (title, description) => `
<div slot="header" class="pk-dialog__header">
  <h3 class="pk-dialog__title">${title}</h3>
  <p data-slot="dialog-description" style="margin:0;font-size:12px;line-height:1.5;color:#64748b">${description}</p>
  ${dialogClose}
</div>`.trim();

/** Import paths keyed by preview name prefix (longest match first). */
export const IMPORTS_BY_PREFIX = [
    ['checkbox-select-field-layout', [
        '@verbb/plugin-kit-web/components/checkbox-select/pk-checkbox-select.js',
        '@verbb/plugin-kit-web/components/checkbox/pk-checkbox.js',
        '@verbb/plugin-kit-web/components/field/pk-field.js',
    ]],
    ['checkbox-select', [
        '@verbb/plugin-kit-web/components/checkbox-select/pk-checkbox-select.js',
        '@verbb/plugin-kit-web/components/checkbox/pk-checkbox.js',
    ]],
    ['checkbox-input', ['@verbb/plugin-kit-web/components/checkbox/pk-checkbox.js']],
    ['button-group', [
        '@verbb/plugin-kit-web/components/button-group/pk-button-group.js',
        '@verbb/plugin-kit-web/components/button/pk-button.js',
        '@verbb/plugin-kit-web/components/icon/pk-icon.js',
        '@verbb/plugin-kit-web/components/dropdown-menu/pk-dropdown-menu.js',
        '@verbb/plugin-kit-web/components/dropdown-menu/pk-dropdown-item.js',
        '@verbb/plugin-kit-web/components/dropdown-menu/pk-dropdown-separator.js',
        '@verbb/plugin-kit-web/components/popover/pk-popover.js',
        '@verbb/plugin-kit-web/components/input/pk-input.js',
        '@verbb/plugin-kit-web/components/input-group/pk-input-group.js',
        '@verbb/plugin-kit-web/components/input-group/pk-input-group-input.js',
        '@verbb/plugin-kit-web/components/input-group/pk-input-group-addon.js',
        '@verbb/plugin-kit-web/components/input-group/pk-input-group-text.js',
        '@verbb/plugin-kit-web/components/input-group/pk-input-group-button.js',
        '@verbb/plugin-kit-web/components/separator/pk-separator.js',
    ]],
    ['dropdown-menu', [
        '@verbb/plugin-kit-web/components/dropdown-menu/pk-dropdown-menu.js',
        '@verbb/plugin-kit-web/components/dropdown-menu/pk-dropdown-item.js',
        '@verbb/plugin-kit-web/components/dropdown-menu/pk-dropdown-label.js',
        '@verbb/plugin-kit-web/components/dropdown-menu/pk-dropdown-separator.js',
        '@verbb/plugin-kit-web/components/button/pk-button.js',
        '@verbb/plugin-kit-web/components/icon/pk-icon.js',
    ]],
    ['radio-group', [
        '@verbb/plugin-kit-web/components/radio-group/pk-radio-group.js',
        '@verbb/plugin-kit-web/components/radio-group/pk-radio.js',
        '@verbb/plugin-kit-web/components/field/pk-field.js',
    ]],
    ['toggle-group', [
        '@verbb/plugin-kit-web/components/toggle-group/pk-toggle-group.js',
        '@verbb/plugin-kit-web/components/toggle/pk-toggle.js',
        '@verbb/plugin-kit-web/components/icon/pk-icon.js',
    ]],
    ['date-picker-date-time', [
        '@verbb/plugin-kit-web/components/date-picker/pk-date-picker.js',
        '@verbb/plugin-kit-web/components/calendar/pk-calendar.js',
        '@verbb/plugin-kit-web/components/time-picker/pk-time-picker.js',
    ]],
    ['date-picker', [
        '@verbb/plugin-kit-web/components/date-picker/pk-date-picker.js',
        '@verbb/plugin-kit-web/components/calendar/pk-calendar.js',
    ]],
    ['time-picker', ['@verbb/plugin-kit-web/components/time-picker/pk-time-picker.js']],
    ['field', [
        '@verbb/plugin-kit-web/components/field/pk-field.js',
        '@verbb/plugin-kit-web/components/input/pk-input.js',
        '@verbb/plugin-kit-web/components/button/pk-button.js',
        '@verbb/plugin-kit-web/components/icon/pk-icon.js',
    ]],
    ['icon-in-context', [
        '@verbb/plugin-kit-web/components/button/pk-button.js',
        '@verbb/plugin-kit-web/components/icon/pk-icon.js',
    ]],
    ['icon', ['@verbb/plugin-kit-web/components/icon/pk-icon.js']],
    ['input-group', [
        '@verbb/plugin-kit-web/components/input-group/pk-input-group.js',
        '@verbb/plugin-kit-web/components/input-group/pk-input-group-input.js',
        '@verbb/plugin-kit-web/components/input-group/pk-input-group-addon.js',
        '@verbb/plugin-kit-web/components/input-group/pk-input-group-text.js',
        '@verbb/plugin-kit-web/components/input-group/pk-input-group-button.js',
        '@verbb/plugin-kit-web/components/icon/pk-icon.js',
    ]],
    ['color-input', ['@verbb/plugin-kit-web/components/color-input/pk-color-input.js']],
    ['code-editor', ['@verbb/plugin-kit-web/components/code-editor/pk-code-editor.js']],
    ['copy-button', [
        '@verbb/plugin-kit-web/components/copy-button/pk-copy-button.js',
        '@verbb/plugin-kit-web/components/icon/pk-icon.js',
        '@verbb/plugin-kit-web/components/input/pk-input.js',
    ]],
    ['tiptap-editor', ['@verbb/plugin-kit-web/components/tiptap/pk-tiptap-editor.js']],
    ['tiptap-input', ['@verbb/plugin-kit-web/components/tiptap/pk-tiptap-input.js']],
    ['tiptap-content', ['@verbb/plugin-kit-web/components/tiptap/pk-tiptap-content.js']],
    ['scroll-area', ['@verbb/plugin-kit-web/components/scroll-area/pk-scroll-area.js']],
    ['checkbox', ['@verbb/plugin-kit-web/components/checkbox/pk-checkbox.js']],
    ['calendar', ['@verbb/plugin-kit-web/components/calendar/pk-calendar.js']],
    ['combobox', [
        '@verbb/plugin-kit-web/components/combobox/pk-combobox.js',
        '@verbb/plugin-kit-web/components/select/pk-option.js',
        '@verbb/plugin-kit-web/components/select/pk-option-group.js',
        '@verbb/plugin-kit-web/components/separator/pk-separator.js',
    ]],
    ['select', [
        '@verbb/plugin-kit-web/components/select/pk-select.js',
        '@verbb/plugin-kit-web/components/select/pk-option.js',
        '@verbb/plugin-kit-web/components/select/pk-option-group.js',
        '@verbb/plugin-kit-web/components/separator/pk-separator.js',
        '@verbb/plugin-kit-web/components/status/pk-status.js',
        '@verbb/plugin-kit-web/components/icon/pk-icon.js',
    ]],
    ['input', [
        '@verbb/plugin-kit-web/components/input/pk-input.js',
        '@verbb/plugin-kit-web/components/icon/pk-icon.js',
        '@verbb/plugin-kit-web/components/input-group/pk-input-group.js',
        '@verbb/plugin-kit-web/components/input-group/pk-input-group-input.js',
        '@verbb/plugin-kit-web/components/input-group/pk-input-group-addon.js',
        '@verbb/plugin-kit-web/components/input-group/pk-input-group-text.js',
    ]],
    ['textarea', ['@verbb/plugin-kit-web/components/textarea/pk-textarea.js']],
    ['dialog', [
        '@verbb/plugin-kit-web/components/dialog/pk-dialog.js',
        '@verbb/plugin-kit-web/components/button/pk-button.js',
        '@verbb/plugin-kit-web/components/icon/pk-icon.js',
        '@verbb/plugin-kit-web/components/input/pk-input.js',
        '@verbb/plugin-kit-web/components/field/pk-field.js',
    ]],
    ['popover', [
        '@verbb/plugin-kit-web/components/popover/pk-popover.js',
        '@verbb/plugin-kit-web/components/button/pk-button.js',
        '@verbb/plugin-kit-web/components/input/pk-input.js',
    ]],
    ['tooltip', [
        '@verbb/plugin-kit-web/components/tooltip/pk-tooltip.js',
        '@verbb/plugin-kit-web/components/button/pk-button.js',
        '@verbb/plugin-kit-web/components/icon/pk-icon.js',
    ]],
    ['lightswitch', ['@verbb/plugin-kit-web/components/lightswitch/pk-lightswitch.js']],
    ['separator', ['@verbb/plugin-kit-web/components/separator/pk-separator.js']],
    ['status', ['@verbb/plugin-kit-web/components/status/pk-status.js']],
    ['spinner', [
        '@verbb/plugin-kit-web/components/spinner/pk-spinner.js',
        '@verbb/plugin-kit-web/components/button/pk-button.js',
    ]],
    ['tabs', [
        '@verbb/plugin-kit-web/components/tabs/pk-tabs.js',
        '@verbb/plugin-kit-web/components/tabs/pk-tab.js',
        '@verbb/plugin-kit-web/components/tabs/pk-tab-heading.js',
        '@verbb/plugin-kit-web/components/tabs/pk-tab-panel.js',
        '@verbb/plugin-kit-web/components/icon/pk-icon.js',
        '@verbb/plugin-kit-web/components/status/pk-status.js',
    ]],
    ['toggle', [
        '@verbb/plugin-kit-web/components/toggle/pk-toggle.js',
        '@verbb/plugin-kit-web/components/icon/pk-icon.js',
    ]],
];

export function importsForPreview(name) {
    for (const [prefix, imports] of IMPORTS_BY_PREFIX) {
        if (name.startsWith(`${prefix}-`)) {
            return imports;
        }
    }

    return [];
}

function catalogCalendarDate(offsetDays = 0) {
    const date = new Date();
    date.setDate(date.getDate() + offsetDays);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

function catalogCalendarRange(fromOffsetDays = 0, toOffsetDays = 7) {
    return `${catalogCalendarDate(fromOffsetDays)}/${catalogCalendarDate(toOffsetDays)}`;
}

/** HTML markup keyed by preview basename (without .preview.web.ts). */
export const PREVIEW_HTML = {
    // calendar — also hand-authored with runtime-relative dates; generate-web-previews skips calendar-*.
    'calendar-single': `<pk-calendar value="${catalogCalendarDate()}"></pk-calendar>`,
    'calendar-disabled': `<pk-calendar value="${catalogCalendarDate()}" disabled-dates="${catalogCalendarDate(3)},${catalogCalendarDate(4)},${catalogCalendarDate(5)}"></pk-calendar>`,
    'calendar-range': `<pk-calendar mode="range" value="${catalogCalendarRange(0, 7)}"></pk-calendar>`,
    'calendar-dropdown-captions': `
<pk-calendar value="${catalogCalendarDate()}"></pk-calendar>
<pk-calendar mode="range" value="${catalogCalendarRange(0, 7)}"></pk-calendar>`.trim(),
    'calendar-dual-month': `<pk-calendar mode="range" months="2" value="${catalogCalendarRange(0, 14)}"></pk-calendar>`,
    'calendar-week-numbers': `<pk-calendar value="${catalogCalendarDate()}" with-week-numbers></pk-calendar>`,
    'calendar-view-stepper': `
<div style="font-size:12px;color:#6b7280;margin:0 0 8px">Click the month/year title to step into month and year views.</div>
<pk-calendar value="${catalogCalendarDate()}"></pk-calendar>`.trim(),
    'calendar-disabled-days-of-week': `<pk-calendar value="${catalogCalendarDate()}" disabled-days-of-week="sat sun"></pk-calendar>`,

    // checkbox
    'checkbox-basic': `<pk-checkbox aria-label="Enable notifications"></pk-checkbox>`,
    'checkbox-checked': `<pk-checkbox checked aria-label="Enable notifications"></pk-checkbox>`,
    'checkbox-disabled': `<pk-checkbox disabled aria-label="Enable notifications"></pk-checkbox>`,

    // checkbox-input
    'checkbox-input-basic': `<pk-checkbox>Enable notifications</pk-checkbox>`,
    'checkbox-input-description': `<pk-checkbox hint="Receive email when entries are updated.">Enable notifications</pk-checkbox>`,
    'checkbox-input-disabled': `<pk-checkbox disabled>Enable notifications</pk-checkbox>`,
    'checkbox-input-grouped-options': `
<fieldset style="border:0;margin:0;padding:0;display:flex;flex-direction:column;gap:8px">
  <legend style="font-size:14px;font-weight:500;margin-bottom:8px">Notification preferences</legend>
  <pk-checkbox checked>Email updates</pk-checkbox>
  <pk-checkbox>Push notifications</pk-checkbox>
  <pk-checkbox disabled>SMS alerts</pk-checkbox>
</fieldset>`.trim(),

    // checkbox-select — options/value are JSON attrs (not slotted pk-checkbox)
    'checkbox-select-basic': `
<pk-checkbox-select
  options='[{"label":"Contact Form","value":"contact"},{"label":"Newsletter","value":"newsletter"},{"label":"Support","value":"support"}]'
  value='["contact"]'
></pk-checkbox-select>`.trim(),
    'checkbox-select-all-option': `
<pk-checkbox-select
  show-all-option
  all-label="All forms"
  options='[{"label":"Contact Form","value":"contact"},{"label":"Newsletter","value":"newsletter"},{"label":"Support","value":"support"}]'
  value='[]'
></pk-checkbox-select>`.trim(),
    'checkbox-select-all-selected': `
<pk-checkbox-select
  show-all-option
  all-label="All forms"
  options='[{"label":"Contact Form","value":"contact"},{"label":"Newsletter","value":"newsletter"},{"label":"Support","value":"support"}]'
  value="*"
></pk-checkbox-select>`.trim(),
    'checkbox-select-selected-values': `
<div style="font-size:14px;font-weight:700">Select fruits</div>
<pk-checkbox-select
  options='[{"label":"Apple","value":"apple"},{"label":"Banana","value":"banana"},{"label":"Blueberry","value":"blueberry"},{"label":"Grapes","value":"grapes"}]'
  value='["apple","grapes"]'
></pk-checkbox-select>`.trim(),
    'checkbox-select-field-layout': `
<pk-field
  label="Forms to monitor"
  instructions="Choose which forms should trigger notifications."
>
  <pk-checkbox-select
    options='[{"label":"Contact Form","value":"contact"},{"label":"Newsletter","value":"newsletter"},{"label":"Support","value":"support"}]'
    value='["contact","newsletter"]'
  ></pk-checkbox-select>
</pk-field>`.trim(),
    'checkbox-select-disabled-states': `
<div style="font-size:14px;font-weight:700;margin-bottom:0.5rem">Disabled - All selected</div>
<pk-checkbox-select
  disabled
  show-all-option
  options='[{"label":"Apple","value":"apple"},{"label":"Banana","value":"banana"},{"label":"Blueberry","value":"blueberry"},{"label":"Grapes","value":"grapes"}]'
  value="*"
></pk-checkbox-select>

<div style="font-size:14px;font-weight:700;margin:1.5rem 0 0.5rem">Disabled - Some selected</div>
<pk-checkbox-select
  disabled
  show-all-option
  options='[{"label":"Apple","value":"apple"},{"label":"Banana","value":"banana"},{"label":"Blueberry","value":"blueberry"},{"label":"Grapes","value":"grapes"}]'
  value='["apple","banana"]'
></pk-checkbox-select>`.trim(),
    'checkbox-select-long-list': `
<pk-checkbox-select
  options='[{"label":"Entry titles and slugs","value":"titles"},{"label":"Author names","value":"authors"},{"label":"Section and entry type metadata","value":"sections"},{"label":"Submission status labels","value":"statuses"},{"label":"Integration response summaries","value":"integrations"},{"label":"Very long option label that should wrap cleanly without pushing the checkbox out of alignment","value":"long"}]'
  value='["titles","statuses"]'
  style="max-width:24rem"
></pk-checkbox-select>`.trim(),

    // code-editor
    'code-editor-basic': `<pk-code-editor language="html" value="&lt;p&gt;Hello &lt;strong&gt;world&lt;/strong&gt;&lt;/p&gt;" rows="8"></pk-code-editor>`,
    'code-editor-long-html': `<pk-code-editor language="html" rows="14" value="&lt;!DOCTYPE html&gt;&#10;&lt;html lang=&quot;en&quot;&gt;&#10;&lt;head&gt;&#10;  &lt;meta charset=&quot;utf-8&quot; /&gt;&#10;  &lt;title&gt;Submission received&lt;/title&gt;&#10;&lt;/head&gt;&#10;&lt;body&gt;&#10;  &lt;p&gt;Hi {{ user.name }},&lt;/p&gt;&#10;  &lt;p&gt;&#10;    Your submission for &lt;strong&gt;{{ form.title }}&lt;/strong&gt; was received.&#10;  &lt;/p&gt;&#10;  &lt;ul&gt;&#10;    &lt;li&gt;Reference: {{ submission.id }}&lt;/li&gt;&#10;    &lt;li&gt;Submitted: {{ submission.date }}&lt;/li&gt;&#10;  &lt;/ul&gt;&#10;  &lt;p&gt;Thanks,&lt;br /&gt;{{ siteName }}&lt;/p&gt;&#10;&lt;/body&gt;&#10;&lt;/html&gt;"></pk-code-editor>`,
    'code-editor-languages': `
<!-- Hand-authored in code-editor-languages.preview.web.ts — matches React samples. -->
<pk-code-editor language="javascript" rows="8"></pk-code-editor>
<pk-code-editor language="css" rows="7"></pk-code-editor>
<pk-code-editor language="json" rows="7"></pk-code-editor>`.trim(),
    'code-editor-layout': `
<!-- Hand-authored in code-editor-layout.preview.web.ts — matches React layout demos. -->
<pk-code-editor language="html" rows="4"></pk-code-editor>
<pk-code-editor language="html" rows="16"></pk-code-editor>
<pk-code-editor language="html" rows="8" tab-size="2"></pk-code-editor>
<pk-code-editor language="html" rows="8" tab-size="8"></pk-code-editor>
<pk-code-editor language="html" rows="8"></pk-code-editor>`.trim(),
    'code-editor-states': `
<div style="display:flex;flex-direction:column;gap:1rem">
  <pk-code-editor language="html" invalid rows="4" value="&lt;p&gt;Invalid markup&lt;/p&gt;"></pk-code-editor>
  <pk-code-editor language="html" readonly rows="4" value="&lt;p&gt;Read-only content&lt;/p&gt;"></pk-code-editor>
</div>`.trim(),

    // color-input — aligned to published React docs / playground (#35e533 family)
    'color-input-basic': `
<div style="display:flex;flex-direction:column;gap:4px;max-width:20rem">
  <pk-color-input value="#35e533"></pk-color-input>
  <div style="font-size:11px;color:#4b5563">Value: <code>#35e533</code></div>
</div>`.trim(),
    'color-input-resolved': `
<div style="display:flex;flex-direction:column;gap:16px;max-width:26rem">
  <div style="display:flex;flex-direction:column;gap:4px">
    <pk-color-input></pk-color-input>
    <div style="font-size:11px;color:#4b5563">Value: <code>(empty)</code></div>
  </div>
  <div style="display:flex;flex-direction:column;gap:4px">
    <pk-color-input value="#a9"></pk-color-input>
    <div style="font-size:11px;color:#4b5563">Value: <code>#a9</code></div>
  </div>
  <div style="display:flex;flex-direction:column;gap:4px">
    <pk-color-input value="#9c4"></pk-color-input>
    <div style="font-size:11px;color:#4b5563">Value: <code>#9c4</code></div>
  </div>
  <div style="display:flex;flex-direction:column;gap:4px">
    <pk-color-input value="#35e533"></pk-color-input>
    <div style="font-size:11px;color:#4b5563">Value: <code>#35e533</code></div>
  </div>
  <div style="display:flex;flex-direction:column;gap:4px">
    <pk-color-input value="#35e533" invalid></pk-color-input>
    <div style="font-size:11px;color:#4b5563">Value: <code>#35e533</code></div>
  </div>
  <div style="display:flex;flex-direction:column;gap:4px">
    <pk-color-input value="#35e533" disabled></pk-color-input>
    <div style="font-size:11px;color:#4b5563">Value: <code>#35e533</code></div>
  </div>
</div>`.trim(),
    'color-input-sizes': `
<div style="display:flex;flex-direction:column;gap:12px">
  <div style="display:flex;align-items:center;gap:16px">
    <div style="width:64px;font-size:12px;color:#64748b;flex-shrink:0">xs</div>
    <div style="display:flex;flex-direction:column;gap:4px">
      <pk-color-input size="xs" value="#35e533"></pk-color-input>
      <div style="font-size:11px;color:#4b5563">Value: <code>#35e533</code></div>
    </div>
  </div>
  <div style="display:flex;align-items:center;gap:16px">
    <div style="width:64px;font-size:12px;color:#64748b;flex-shrink:0">sm</div>
    <div style="display:flex;flex-direction:column;gap:4px">
      <pk-color-input size="sm" value="#35e533"></pk-color-input>
      <div style="font-size:11px;color:#4b5563">Value: <code>#35e533</code></div>
    </div>
  </div>
  <div style="display:flex;align-items:center;gap:16px">
    <div style="width:64px;font-size:12px;color:#64748b;flex-shrink:0">default</div>
    <div style="display:flex;flex-direction:column;gap:4px">
      <pk-color-input value="#35e533"></pk-color-input>
      <div style="font-size:11px;color:#4b5563">Value: <code>#35e533</code></div>
    </div>
  </div>
  <div style="display:flex;align-items:center;gap:16px">
    <div style="width:64px;font-size:12px;color:#64748b;flex-shrink:0">lg</div>
    <div style="display:flex;flex-direction:column;gap:4px">
      <pk-color-input size="lg" value="#35e533"></pk-color-input>
      <div style="font-size:11px;color:#4b5563">Value: <code>#35e533</code></div>
    </div>
  </div>
  <div style="display:flex;align-items:center;gap:16px">
    <div style="width:64px;font-size:12px;color:#64748b;flex-shrink:0">xl</div>
    <div style="display:flex;flex-direction:column;gap:4px">
      <pk-color-input size="xl" value="#35e533"></pk-color-input>
      <div style="font-size:11px;color:#4b5563">Value: <code>#35e533</code></div>
    </div>
  </div>
</div>`.trim(),
    'color-input-states': `
<pk-color-input value="#e64d4c"></pk-color-input>
<pk-color-input value="#ff" invalid></pk-color-input>
<pk-color-input value="#64748b" disabled></pk-color-input>`.trim(),

    // combobox
    'combobox-input-mode': `<pk-combobox placeholder="Select a framework">${FRAMEWORK_OPTIONS}</pk-combobox>`,
    'combobox-sizes': `
<div style="display:flex;flex-direction:column;gap:12px">
  <div style="display:flex;align-items:center;gap:12px">
    <div style="width:96px;font-size:12px;color:#64748b;flex-shrink:0">Extra small</div>
    <pk-combobox size="xs" placeholder="Select a fruit" value="apple">${FRUIT_OPTIONS}</pk-combobox>
  </div>
  <div style="display:flex;align-items:center;gap:12px">
    <div style="width:96px;font-size:12px;color:#64748b;flex-shrink:0">Small</div>
    <pk-combobox size="sm" placeholder="Select a fruit" value="apple">${FRUIT_OPTIONS}</pk-combobox>
  </div>
  <div style="display:flex;align-items:center;gap:12px">
    <div style="width:96px;font-size:12px;color:#64748b;flex-shrink:0">Default</div>
    <pk-combobox placeholder="Select a fruit" value="apple">${FRUIT_OPTIONS}</pk-combobox>
  </div>
  <div style="display:flex;align-items:center;gap:12px">
    <div style="width:96px;font-size:12px;color:#64748b;flex-shrink:0">Large</div>
    <pk-combobox size="lg" placeholder="Select a fruit" value="apple">${FRUIT_OPTIONS}</pk-combobox>
  </div>
</div>`.trim(),
    'combobox-widths': `
<pk-combobox placeholder="Select a fruit" style="width:100%;max-width:20rem">${FRUIT_OPTIONS}</pk-combobox>
<pk-combobox placeholder="Select a fruit" style="width:12rem">${FRUIT_OPTIONS}</pk-combobox>`.trim(),
    'combobox-popup-mode': `<pk-combobox popup-mode placeholder="Select a country" value="ar">
<pk-option value="ar">Argentina</pk-option>
<pk-option value="au">Australia</pk-option>
<pk-option value="br">Brazil</pk-option>
<pk-option value="ca">Canada</pk-option>
</pk-combobox>`,
    'combobox-multiple': `<pk-combobox multiple placeholder="Add frameworks…">${FRAMEWORK_OPTIONS}</pk-combobox>`,
    'combobox-grouped': `<pk-combobox placeholder="Select produce…">
<pk-option-group label="Fruits">
  <pk-option value="apple">Apple</pk-option>
  <pk-option value="banana">Banana</pk-option>
</pk-option-group>
<pk-separator></pk-separator>
<pk-option-group label="Vegetables">
  <pk-option value="carrot">Carrot</pk-option>
  <pk-option value="broccoli">Broccoli</pk-option>
</pk-option-group>
</pk-combobox>`,
    // Hand-authored: static options + delay toggles + async fetchOptions (see SKIP_PREVIEW_NAMES).
    'combobox-high-level-input': `<pk-combobox clearable placeholder="Select a framework" value="next-js">${FRAMEWORK_OPTIONS}</pk-combobox>`,
    // Hand-authored: async fetchOptions with value="apple" (see SKIP_PREVIEW_NAMES).
    'combobox-async-search': `<pk-combobox async clearable placeholder="Search fruits…" start-typing-message="Start typing to search fruits…" value="apple"></pk-combobox>`,
    'combobox-allow-create': `<pk-combobox allow-create placeholder="Search or create tags…" style="min-width:16rem">
  <pk-option value="design">Design</pk-option>
  <pk-option value="engineering">Engineering</pk-option>
  <pk-option value="marketing">Marketing</pk-option>
</pk-combobox>`,
    'combobox-allow-custom-value': `<pk-combobox allow-custom-value placeholder="Type or select a color…" style="min-width:16rem">
  <pk-option value="red">Red</pk-option>
  <pk-option value="green">Green</pk-option>
  <pk-option value="blue">Blue</pk-option>
</pk-combobox>`,

    // copy-button — icon slot is required; empty buttons look like blank previews
    'copy-button-basic': `
<pk-input value="https://verbb.io" readonly style="width:16rem"></pk-input>
<pk-copy-button value="https://verbb.io">
  <pk-icon slot="icon" icon="clipboard" aria-hidden="true"></pk-icon>
</pk-copy-button>`.trim(),
    'copy-button-variants': `
<div style="display:flex;align-items:center;gap:0.5rem;flex-wrap:wrap">
  <pk-input value="FORMIE_LICENSE_KEY" readonly style="width:16rem"></pk-input>
  <pk-copy-button value="FORMIE_LICENSE_KEY">
    <pk-icon slot="icon" icon="clipboard" aria-hidden="true"></pk-icon>
  </pk-copy-button>
</div>
<div style="display:flex;align-items:center;gap:0.5rem;flex-wrap:wrap">
  <pk-copy-button value="FORMIE_LICENSE_KEY" variant="default">
    <pk-icon slot="icon" icon="clipboard" aria-hidden="true"></pk-icon>
  </pk-copy-button>
  <pk-copy-button value="FORMIE_LICENSE_KEY" variant="outline">
    <pk-icon slot="icon" icon="clipboard" aria-hidden="true"></pk-icon>
  </pk-copy-button>
  <pk-copy-button value="FORMIE_LICENSE_KEY" variant="transparent">
    <pk-icon slot="icon" icon="clipboard" aria-hidden="true"></pk-icon>
  </pk-copy-button>
  <pk-copy-button value="FORMIE_LICENSE_KEY" variant="none">
    <pk-icon slot="icon" icon="clipboard" aria-hidden="true"></pk-icon>
  </pk-copy-button>
</div>`.trim(),

    // date-picker
    'date-picker-basic': `<pk-date-picker placeholder="Select a date"></pk-date-picker>`,
    'date-picker-states': `
<pk-date-picker placeholder="Select a date"></pk-date-picker>
<pk-date-picker disabled placeholder="Select a date"></pk-date-picker>
<pk-date-picker invalid placeholder="Select a date"></pk-date-picker>`.trim(),
    'date-picker-constraints': `
<pk-date-picker disable-past placeholder="Future dates only"></pk-date-picker>
<pk-date-picker disable-future placeholder="Past dates only"></pk-date-picker>
<pk-date-picker disabled-days-of-week="sat sun" placeholder="Weekdays only"></pk-date-picker>
<pk-date-picker min="2026-01-01" max="2026-12-31" placeholder="Within 2026"></pk-date-picker>`.trim(),
    'date-picker-range': `<pk-date-picker mode="range" months="2" label="Booking" placeholder="Select a range"></pk-date-picker>`,
    'date-picker-date-time': `
<pk-date-picker value="2026-05-20" placeholder="Pick a date"></pk-date-picker>
<pk-time-picker value="09:00" placeholder="Select time"></pk-time-picker>`.trim(),

    // dialog
    'dialog-basic': `
<pk-dialog>
  <pk-button slot="trigger">Open dialog</pk-button>
  ${dialogHeader('Dialog title', 'Short description of the dialog content.')}
  <div class="pk-dialog__body">This is the dialog body area.</div>
  <pk-button slot="footer" data-dialog-close>Cancel</pk-button>
  <pk-button slot="footer" variant="primary">Save</pk-button>
</pk-dialog>`.trim(),
    'dialog-confirmation': `
<pk-dialog disable-pointer-dismissal>
  <pk-button slot="trigger" variant="primary">Delete entry</pk-button>
  ${dialogHeader('Delete this entry?', 'This action cannot be undone. The entry will be removed from the current site.')}
  <div class="pk-dialog__body">Use a confirmation dialog when the user needs a clear chance to back out before a destructive action.</div>
  <pk-button slot="footer" data-dialog-close>Cancel</pk-button>
  <pk-button slot="footer" variant="primary">Delete</pk-button>
</pk-dialog>`.trim(),
    'dialog-initial-focus': `
<pk-dialog>
  <pk-button slot="trigger">Edit field</pk-button>
  <div slot="header" class="pk-dialog__header">
    <h3 class="pk-dialog__title">Edit Field</h3>
    ${dialogClose}
  </div>
  <div class="pk-dialog__body" style="display:flex;flex-direction:column;gap:1rem">
    <pk-field label="Label" instructions="The label that describes this field." required translatable>
      <pk-input value="Test" autofocus></pk-input>
    </pk-field>
    <pk-field label="Placeholder" instructions="The text that will be shown if the field doesn’t have a value.">
      <pk-input placeholder="Placeholder text"></pk-input>
    </pk-field>
  </div>
  <pk-button slot="footer" data-dialog-close>Cancel</pk-button>
  <pk-button slot="footer" variant="primary">Save</pk-button>
</pk-dialog>`.trim(),
    'dialog-scrollable': `
<pk-dialog>
  <pk-button slot="trigger">Open scrollable dialog</pk-button>
  ${dialogHeader('Review settings', 'Long forms should scroll inside the dialog body.')}
  <div class="pk-dialog__body">
    <p style="margin:0 0 12px">Setting group 1: long forms and review screens should scroll inside the dialog body instead of pushing actions off screen.</p>
    <p style="margin:0 0 12px">Setting group 2: long forms and review screens should scroll inside the dialog body instead of pushing actions off screen.</p>
    <p style="margin:0 0 12px">Setting group 3: long forms and review screens should scroll inside the dialog body instead of pushing actions off screen.</p>
    <p style="margin:0 0 12px">Setting group 4: long forms and review screens should scroll inside the dialog body instead of pushing actions off screen.</p>
    <p style="margin:0">Setting group 5: long forms and review screens should scroll inside the dialog body instead of pushing actions off screen.</p>
  </div>
  <pk-button slot="footer" data-dialog-close>Cancel</pk-button>
  <pk-button slot="footer" variant="primary">Save</pk-button>
</pk-dialog>`.trim(),

    // dropdown-menu
    'dropdown-menu-basic': `
<pk-dropdown-menu>
  <pk-button slot="trigger" with-caret>Options</pk-button>
  <pk-dropdown-item value="profile">Profile</pk-dropdown-item>
  <pk-dropdown-item value="settings">Settings</pk-dropdown-item>
  <pk-dropdown-separator></pk-dropdown-separator>
  <pk-dropdown-item value="delete" destructive>Delete</pk-dropdown-item>
</pk-dropdown-menu>`.trim(),
    'dropdown-menu-grouped': `
<pk-dropdown-menu>
  <pk-button slot="trigger" with-caret>Open menu</pk-button>
  <pk-dropdown-label>General</pk-dropdown-label>
  <pk-dropdown-item value="new-file">New File</pk-dropdown-item>
  <pk-dropdown-item value="duplicate">Duplicate</pk-dropdown-item>
  <pk-dropdown-separator></pk-dropdown-separator>
  <pk-dropdown-label>Preferences</pk-dropdown-label>
  <pk-dropdown-item value="line-numbers" type="checkbox" checked>Show line numbers</pk-dropdown-item>
  <pk-dropdown-item value="word-wrap" type="checkbox">Word wrap</pk-dropdown-item>
</pk-dropdown-menu>`.trim(),
    'dropdown-menu-triggers': `
<pk-dropdown-menu>
  <pk-button slot="trigger" with-caret>Open menu</pk-button>
  <pk-dropdown-item value="profile">Profile</pk-dropdown-item>
  <pk-dropdown-item value="settings">Settings</pk-dropdown-item>
</pk-dropdown-menu>
<pk-dropdown-menu>
  <pk-button slot="trigger" aria-label="Open menu">
    <pk-icon slot="start" icon="ellipsis"></pk-icon>
  </pk-button>
  <pk-dropdown-item value="edit">Edit</pk-dropdown-item>
  <pk-dropdown-item value="duplicate">Duplicate</pk-dropdown-item>
</pk-dropdown-menu>`.trim(),
    'dropdown-menu-submenus': `
<pk-dropdown-menu>
  <pk-button slot="trigger" with-caret>Open menu</pk-button>
  <pk-dropdown-item value="new">New File</pk-dropdown-item>
  <pk-dropdown-item value="share">
    Share
    <pk-dropdown-menu slot="submenu">
      <pk-dropdown-item value="email">Email</pk-dropdown-item>
      <pk-dropdown-item value="link">Copy link</pk-dropdown-item>
    </pk-dropdown-menu>
  </pk-dropdown-item>
</pk-dropdown-menu>`.trim(),
    'dropdown-menu-selection': `
<pk-dropdown-menu>
  <pk-button slot="trigger" with-caret>View</pk-button>
  <pk-dropdown-item value="cards" type="radio" radio-group="view" checked>Cards</pk-dropdown-item>
  <pk-dropdown-item value="table" type="radio" radio-group="view">Table</pk-dropdown-item>
  <pk-dropdown-separator></pk-dropdown-separator>
  <pk-dropdown-item value="compact" type="checkbox">Compact density</pk-dropdown-item>
</pk-dropdown-menu>`.trim(),
    'dropdown-menu-icons': `
<pk-dropdown-menu>
  <pk-button slot="trigger" aria-label="Field actions">
    <pk-icon slot="start" icon="ellipsis"></pk-icon>
  </pk-button>
  <pk-dropdown-item value="edit">
    <pk-icon slot="prefix" icon="pen" aria-hidden="true"></pk-icon>
    Edit
  </pk-dropdown-item>
  <pk-dropdown-item value="make-required">
    <pk-icon slot="prefix" icon="asterisk" aria-hidden="true"></pk-icon>
    Make required
  </pk-dropdown-item>
  <pk-dropdown-item value="duplicate">
    <pk-icon slot="prefix" icon="copy" aria-hidden="true"></pk-icon>
    Duplicate
  </pk-dropdown-item>
  <pk-dropdown-separator></pk-dropdown-separator>
  <pk-dropdown-item value="move-up">
    <pk-icon slot="prefix" icon="arrow-up" aria-hidden="true"></pk-icon>
    Move up
  </pk-dropdown-item>
  <pk-dropdown-item value="move-down">
    <pk-icon slot="prefix" icon="arrow-down" aria-hidden="true"></pk-icon>
    Move down
  </pk-dropdown-item>
  <pk-dropdown-separator></pk-dropdown-separator>
  <pk-dropdown-item value="delete" destructive>
    <pk-icon slot="prefix" icon="xmark" aria-hidden="true"></pk-icon>
    Delete
  </pk-dropdown-item>
</pk-dropdown-menu>`.trim(),
    'dropdown-menu-sizes': `
<pk-dropdown-menu size="xs">
  <pk-button slot="trigger" size="xs" with-caret>xs</pk-button>
  <pk-dropdown-label>Actions</pk-dropdown-label>
  <pk-dropdown-item value="edit">Edit</pk-dropdown-item>
  <pk-dropdown-item value="duplicate">Duplicate</pk-dropdown-item>
  <pk-dropdown-separator></pk-dropdown-separator>
  <pk-dropdown-item value="delete" destructive>Delete</pk-dropdown-item>
</pk-dropdown-menu>
<pk-dropdown-menu size="sm">
  <pk-button slot="trigger" size="sm" with-caret>sm</pk-button>
  <pk-dropdown-label>Actions</pk-dropdown-label>
  <pk-dropdown-item value="edit">Edit</pk-dropdown-item>
  <pk-dropdown-item value="duplicate">Duplicate</pk-dropdown-item>
  <pk-dropdown-separator></pk-dropdown-separator>
  <pk-dropdown-item value="delete" destructive>Delete</pk-dropdown-item>
</pk-dropdown-menu>
<pk-dropdown-menu>
  <pk-button slot="trigger" with-caret>default</pk-button>
  <pk-dropdown-label>Actions</pk-dropdown-label>
  <pk-dropdown-item value="edit">Edit</pk-dropdown-item>
  <pk-dropdown-item value="duplicate">Duplicate</pk-dropdown-item>
  <pk-dropdown-separator></pk-dropdown-separator>
  <pk-dropdown-item value="delete" destructive>Delete</pk-dropdown-item>
</pk-dropdown-menu>
<pk-dropdown-menu size="lg">
  <pk-button slot="trigger" size="lg" with-caret>lg</pk-button>
  <pk-dropdown-label>Actions</pk-dropdown-label>
  <pk-dropdown-item value="edit">Edit</pk-dropdown-item>
  <pk-dropdown-item value="duplicate">Duplicate</pk-dropdown-item>
  <pk-dropdown-separator></pk-dropdown-separator>
  <pk-dropdown-item value="delete" destructive>Delete</pk-dropdown-item>
</pk-dropdown-menu>`.trim(),

    // input
    // field
    'field-standalone-labels': `
<pk-input
  label="Title"
  instructions="Standalone controls can still expose their own label and instructions."
  placeholder="My entry"
></pk-input>`.trim(),
    'field-errors-and-warnings': `
<pk-field
  label="Entry title"
  instructions="Shown on the public entry page."
  required
  warning="This title is similar to an existing entry."
>
  <li slot="errors">Title is required.</li>
  <pk-input placeholder="My entry" invalid></pk-input>
</pk-field>`.trim(),
    'field-translatable': `
<pk-field
  label="Label"
  instructions="The label that describes this field."
  required
  translatable
>
  <pk-input placeholder="Test"></pk-input>
</pk-field>`.trim(),
    'field-tip': `
<pk-field
  label="System Name"
  instructions="How you'll refer to this field in your templates."
  required
  tip="This can begin with an environment variable."
>
  <pk-input placeholder="my-handle" value="testing" mono></pk-input>
</pk-field>`.trim(),
    'field-header-end': `
<pk-field
  label="Static Options"
  instructions="Add, remove, or reorder option rows manually."
>
  <pk-button slot="header-end" size="sm">
    <pk-icon slot="start" icon="plus"></pk-icon>
    Bulk add options
  </pk-button>
  <div>Option rows would render here.</div>
</pk-field>`.trim(),

    // icon — gallery HTML is built at runtime from @verbb/plugin-kit-icons
    'icon-gallery': `<div data-pk-icon-gallery><!-- populated from bundled icons --></div>`,
    'icon-common': `
<pk-icon icon="plus"></pk-icon>
<pk-icon icon="xmark"></pk-icon>
<pk-icon icon="chevron-down"></pk-icon>
<pk-icon icon="pen"></pk-icon>
<pk-icon icon="gear"></pk-icon>
<pk-icon icon="ellipsis"></pk-icon>
<pk-icon icon="trash"></pk-icon>
<pk-icon icon="check"></pk-icon>
<pk-icon icon="search"></pk-icon>`.trim(),
    'icon-sizing': `
<pk-icon icon="gear" style="font-size:12px"></pk-icon>
<pk-icon icon="gear" style="font-size:16px"></pk-icon>
<pk-icon icon="gear" style="font-size:24px"></pk-icon>
<pk-icon icon="gear" style="font-size:32px"></pk-icon>`.trim(),
    'icon-color': `
<pk-icon icon="triangle-exclamation" style="color:#1c2e36;font-size:24px"></pk-icon>
<pk-icon icon="triangle-exclamation" style="color:#64748b;font-size:24px"></pk-icon>
<pk-icon icon="triangle-exclamation" style="color:#0ea5e9;font-size:24px"></pk-icon>
<pk-icon icon="triangle-exclamation" style="color:#10b981;font-size:24px"></pk-icon>
<pk-icon icon="triangle-exclamation" style="color:#f59e0b;font-size:24px"></pk-icon>
<pk-icon icon="triangle-exclamation" style="color:#ef4444;font-size:24px"></pk-icon>`.trim(),
    'icon-accessibility': `
<pk-icon icon="gear" label="Settings" style="font-size:24px"></pk-icon>
<pk-icon icon="trash" label="Delete" style="font-size:24px"></pk-icon>`.trim(),
    'icon-in-context': `
<pk-button variant="dashed">
  <pk-icon slot="start" icon="plus"></pk-icon>
  Add a link
</pk-button>
<pk-button aria-label="Settings">
  <pk-icon slot="start" icon="gear"></pk-icon>
</pk-button>`.trim(),
    'icon-aliases': `
<pk-icon icon="cog" style="font-size:24px"></pk-icon>
<pk-icon icon="gear" style="font-size:24px"></pk-icon>
<pk-icon icon="cross" style="font-size:24px"></pk-icon>
<pk-icon icon="xmark" style="font-size:24px"></pk-icon>`.trim(),

    // input-group
    'input-group-icon': `
<pk-input-group>
  <pk-input-group-input placeholder="Search..."></pk-input-group-input>
  <pk-input-group-addon>
    <pk-icon icon="search" aria-hidden="true"></pk-icon>
  </pk-input-group-addon>
</pk-input-group>
<pk-input-group>
  <pk-input-group-input placeholder="Search..."></pk-input-group-input>
  <pk-input-group-addon align="inline-end">
    <pk-icon icon="search" aria-hidden="true"></pk-icon>
  </pk-input-group-addon>
</pk-input-group>`.trim(),
    'input-group-text': `
<pk-input-group>
  <pk-input-group-input placeholder="0.00"></pk-input-group-input>
  <pk-input-group-addon>
    <pk-input-group-text>$</pk-input-group-text>
  </pk-input-group-addon>
</pk-input-group>
<pk-input-group>
  <pk-input-group-input placeholder="example.com"></pk-input-group-input>
  <pk-input-group-addon align="inline-start">
    <pk-input-group-text>https://</pk-input-group-text>
  </pk-input-group-addon>
</pk-input-group>`.trim(),
    'input-group-button': `
<pk-input-group>
  <pk-input-group-input placeholder="example.com/contact"></pk-input-group-input>
  <pk-input-group-addon align="inline-start">
    <pk-input-group-text>https://</pk-input-group-text>
  </pk-input-group-addon>
  <pk-input-group-addon align="inline-end">
    <pk-input-group-button>Search</pk-input-group-button>
  </pk-input-group-addon>
</pk-input-group>`.trim(),

    'input-basic': `<pk-input placeholder="Search entries"></pk-input>`,
    'input-sizes': `
<pk-input size="xs" placeholder="Extra small"></pk-input>
<pk-input size="sm" placeholder="Small"></pk-input>
<pk-input placeholder="Default"></pk-input>
<pk-input size="lg" placeholder="Large"></pk-input>`.trim(),
    'input-widths': `
<pk-input placeholder="Full width by default" style="max-width:20rem"></pk-input>
<pk-input placeholder="Fixed width" style="width:220px"></pk-input>`.trim(),
    'input-validation': `<pk-input invalid value="Missing slug"></pk-input>`,
    'input-disabled': `<pk-input disabled value="Read only value"></pk-input>`,
    'input-adornments': `
<pk-input placeholder="Search entries" style="max-width:20rem">
  <pk-icon slot="start" icon="search"></pk-icon>
</pk-input>
<pk-input-group style="max-width:20rem">
  <pk-input-group-input value="49"></pk-input-group-input>
  <pk-input-group-addon align="inline-end">
    <pk-input-group-text>USD</pk-input-group-text>
  </pk-input-group-addon>
</pk-input-group>`.trim(),

    // lightswitch — size/state captions match published docs + playground
    'lightswitch-basic': `<pk-lightswitch></pk-lightswitch>`,
    'lightswitch-sizes': `
<div style="display:flex;align-items:center;gap:8px;font-size:14px">
  <pk-lightswitch size="xxs"></pk-lightswitch>
  <span>Extra extra small</span>
</div>
<div style="display:flex;align-items:center;gap:8px;font-size:14px">
  <pk-lightswitch size="xs"></pk-lightswitch>
  <span>Extra small</span>
</div>
<div style="display:flex;align-items:center;gap:8px;font-size:14px">
  <pk-lightswitch size="sm"></pk-lightswitch>
  <span>Small</span>
</div>
<div style="display:flex;align-items:center;gap:8px;font-size:14px">
  <pk-lightswitch></pk-lightswitch>
  <span>Default</span>
</div>`.trim(),
    'lightswitch-checked': `<pk-lightswitch checked>Enable notifications</pk-lightswitch>`,
    'lightswitch-disabled': `<pk-lightswitch disabled>Sync in background</pk-lightswitch>`,
    'lightswitch-labels': `
<pk-lightswitch checked>Enable notifications</pk-lightswitch>
<pk-lightswitch instructions="Save form changes while editing.">Auto-save drafts</pk-lightswitch>`.trim(),

    // popover
    'popover-basic': `
<pk-popover>
  <pk-button slot="trigger">Open popover</pk-button>
  <div>
    <strong style="font-size:14px;color:#0f172a">Dimensions</strong>
    <p style="margin:4px 0 0;font-size:13px;color:#64748b;line-height:1.5">Set the width and height for the selected element.</p>
  </div>
</pk-popover>`.trim(),
    'popover-placement': `
<pk-popover placement="top">
  <pk-button slot="trigger">Top</pk-button>
  <div>Popover on top</div>
</pk-popover>
<pk-popover placement="bottom">
  <pk-button slot="trigger">Bottom</pk-button>
  <div>Popover on bottom</div>
</pk-popover>`.trim(),
    'popover-with-arrow': `
<pk-popover with-arrow placement="top">
  <pk-button slot="trigger">Top</pk-button>
  <div>
    <strong style="font-size:14px">Arrow popover</strong>
    <p style="margin:4px 0 0;font-size:13px;color:#64748b;line-height:1.5">The arrow tracks placement and stays aimed at the trigger.</p>
  </div>
</pk-popover>
<pk-popover with-arrow placement="bottom">
  <pk-button slot="trigger">Bottom</pk-button>
  <div>
    <strong style="font-size:14px">Arrow popover</strong>
    <p style="margin:4px 0 0;font-size:13px;color:#64748b;line-height:1.5">The arrow tracks placement and stays aimed at the trigger.</p>
  </div>
</pk-popover>`.trim(),
    'popover-form': `
<pk-popover>
  <pk-button slot="trigger">Edit dimensions</pk-button>
  <div style="display:flex;flex-direction:column;gap:12px;min-width:16rem">
    <pk-input placeholder="Width"></pk-input>
    <pk-input placeholder="Height"></pk-input>
    <pk-button variant="primary">Apply</pk-button>
  </div>
</pk-popover>`.trim(),

    // radio-group
    'radio-group-basic': `
<pk-radio-group name="delivery" value="standard">
  <pk-radio value="standard">Standard shipping</pk-radio>
  <pk-radio value="express">Express shipping</pk-radio>
  <pk-radio value="pickup">Local pickup</pk-radio>
</pk-radio-group>`.trim(),
    'radio-group-supporting-descriptions': `
<pk-radio-group name="plan" value="pro">
  <pk-radio value="starter">Starter — for small teams getting started</pk-radio>
  <pk-radio value="pro">Pro — for growing teams with advanced needs</pk-radio>
  <pk-radio value="enterprise">Enterprise — custom limits and support</pk-radio>
</pk-radio-group>`.trim(),
    'radio-group-disabled-options': `
<pk-radio-group name="tier" value="basic">
  <pk-radio value="basic">Basic</pk-radio>
  <pk-radio value="standard">Standard</pk-radio>
  <pk-radio value="premium" disabled>Premium (unavailable)</pk-radio>
</pk-radio-group>`.trim(),
    'radio-group-layout-error': `
<pk-radio-group name="visibility" invalid orientation="horizontal">
  <pk-radio value="public">Public</pk-radio>
  <pk-radio value="private">Private</pk-radio>
</pk-radio-group>`.trim(),

    // scroll-area
    'scroll-area-vertical': `
<pk-scroll-area style="height:8rem;width:16rem">
  <div style="padding:8px;display:flex;flex-direction:column;gap:8px">
    <div>Item 1</div><div>Item 2</div><div>Item 3</div><div>Item 4</div><div>Item 5</div><div>Item 6</div><div>Item 7</div><div>Item 8</div>
  </div>
</pk-scroll-area>`.trim(),
    'scroll-area-horizontal': `
<pk-scroll-area orientation="horizontal" style="width:16rem">
  <div style="display:flex;gap:8px;width:max-content;padding:8px">
    <div style="min-width:6rem">Alpha</div><div style="min-width:6rem">Beta</div><div style="min-width:6rem">Gamma</div><div style="min-width:6rem">Delta</div>
  </div>
</pk-scroll-area>`.trim(),
    'scroll-area-virtualized': `
<pk-scroll-area style="height:10rem;width:18rem">
  <div style="padding:8px;display:flex;flex-direction:column;gap:6px">
    ${Array.from({ length: 20 }, (_, i) => `<div>Row ${i + 1}</div>`).join('')}
  </div>
</pk-scroll-area>`.trim(),

    // select
    'select-basic': `<pk-select placeholder="Select a fruit">${FRUIT_OPTIONS}</pk-select>`,
    'select-sizes': `
<pk-select size="xs" placeholder="Select a fruit" value="apple">${FRUIT_OPTIONS}</pk-select>
<pk-select size="sm" placeholder="Select a fruit" value="apple">${FRUIT_OPTIONS}</pk-select>
<pk-select placeholder="Select a fruit" value="apple">${FRUIT_OPTIONS}</pk-select>
<pk-select size="lg" placeholder="Select a fruit" value="apple">${FRUIT_OPTIONS}</pk-select>`.trim(),
    'select-widths': `
<pk-select placeholder="Select a fruit" width="full" style="max-width:20rem">${FRUIT_OPTIONS}</pk-select>
<pk-select placeholder="Select a fruit" style="width:12rem">${FRUIT_OPTIONS}</pk-select>`.trim(),
    'select-grouped': `<pk-select placeholder="Select produce">
<pk-option-group label="Fruits">${FRUIT_OPTIONS}</pk-option-group>
<pk-separator></pk-separator>
<pk-option-group label="Vegetables">
  <pk-option value="carrot">Carrot</pk-option>
  <pk-option value="broccoli">Broccoli</pk-option>
</pk-option-group>
</pk-select>`,
    'select-status-input': `<pk-select placeholder="Select status" value="new">
<pk-option value="new"><pk-status slot="start" status="live"></pk-status> New</pk-option>
<pk-option value="pending"><pk-status slot="start" status="pending"></pk-status> Pending</pk-option>
<pk-option value="disabled"><pk-status slot="start" status="disabled"></pk-status> Disabled</pk-option>
</pk-select>`,
    'select-decorations': `<pk-select value="demo" style="min-width:12rem">
  <pk-icon slot="start" icon="house" aria-hidden="true"></pk-icon>
  <pk-icon slot="end" icon="flag-checkered" aria-hidden="true"></pk-icon>
  <pk-option value="demo">Medium</pk-option>
  <pk-option value="large">Large</pk-option>
</pk-select>`,

    // separator
    'separator-horizontal': `
<div>Section A</div>
<pk-separator></pk-separator>
<div>Section B</div>
<pk-separator></pk-separator>
<div>Section C</div>`.trim(),
    'separator-vertical': `
<div style="display:flex;align-items:center;gap:12px;height:2rem">
  <span>Left</span>
  <pk-separator orientation="vertical"></pk-separator>
  <span>Center</span>
  <pk-separator orientation="vertical"></pk-separator>
  <span>Right</span>
</div>`.trim(),

    // spinner
    'spinner-basic': `<pk-spinner></pk-spinner>`,
    'spinner-colors': `
<pk-spinner tone="sky"></pk-spinner>
<pk-spinner tone="emerald"></pk-spinner>
<pk-spinner tone="violet"></pk-spinner>
<pk-spinner tone="amber"></pk-spinner>`.trim(),
    'spinner-variants': `
<pk-button loading>default</pk-button>
<pk-button variant="primary" loading>primary</pk-button>
<pk-button variant="secondary" loading>secondary</pk-button>
<pk-button variant="dashed" loading>dashed</pk-button>
<pk-button variant="outline" loading>outline</pk-button>
<pk-button variant="transparent" loading>transparent</pk-button>`.trim(),
    'spinner-sizes': `
<pk-spinner size="xxs"></pk-spinner>
<pk-spinner size="xs"></pk-spinner>
<pk-spinner size="sm"></pk-spinner>
<pk-spinner size="md"></pk-spinner>
<pk-spinner size="lg"></pk-spinner>
<pk-spinner size="xl"></pk-spinner>`.trim(),

    // status
    // status — full built-in alias set (preview builds the grid at runtime)
    'status-variants': `
<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(9rem,1fr));gap:12px;width:100%">
  <div style="display:flex;align-items:center;gap:8px;font-size:13px;color:#374151">
    <pk-status status="live" aria-label="live"></pk-status>
    <span>live</span>
  </div>
  <!-- …remaining built-in aliases rendered by status-variants.preview.web.ts -->
</div>`.trim(),

    // tabs
    'tabs-basic': `
<pk-tabs value="general">
  <pk-tab slot="nav" value="general">General</pk-tab>
  <pk-tab slot="nav" value="seo">SEO</pk-tab>
  <pk-tab slot="nav" value="advanced">Advanced</pk-tab>
  <pk-tab-panel value="general">General settings content.</pk-tab-panel>
  <pk-tab-panel value="seo">SEO settings content.</pk-tab-panel>
  <pk-tab-panel value="advanced">Advanced settings content.</pk-tab-panel>
</pk-tabs>`.trim(),
    'tabs-pane': `
<pk-tabs variant="pane" value="overview">
  <pk-tab slot="nav" value="overview">Overview</pk-tab>
  <pk-tab slot="nav" value="activity">Activity</pk-tab>
  <pk-tab-panel value="overview">Overview panel content.</pk-tab-panel>
  <pk-tab-panel value="activity">Activity panel content.</pk-tab-panel>
</pk-tabs>`.trim(),
    'tabs-modal': `
<pk-tabs variant="modal" value="content">
  <pk-tab slot="nav" value="content">Content</pk-tab>
  <pk-tab slot="nav" value="settings">Settings</pk-tab>
  <pk-tab-panel value="content">Modal tab content.</pk-tab-panel>
  <pk-tab-panel value="settings">Modal tab settings.</pk-tab-panel>
</pk-tabs>`.trim(),
    'tabs-disabled-overflow': `
<div style="display:flex;flex-direction:column;gap:12px;max-width:520px">
  <!-- Default / Pane / Modal rows — same overflow tab set; see tabs-disabled-overflow.preview.web.ts -->
  <pk-tabs value="general">
    <pk-tab slot="nav" value="general">General</pk-tab>
    <pk-tab slot="nav" value="content">Content</pk-tab>
    <pk-tab slot="nav" value="notifications">Notifications</pk-tab>
    <pk-tab slot="nav" value="integrations">Integrations</pk-tab>
    <pk-tab slot="nav" value="advanced" disabled>Advanced</pk-tab>
    <pk-tab-panel value="general">General content</pk-tab-panel>
    <pk-tab-panel value="content">Content settings</pk-tab-panel>
    <pk-tab-panel value="notifications">Notification settings</pk-tab-panel>
    <pk-tab-panel value="integrations">Integration settings</pk-tab-panel>
    <pk-tab-panel value="advanced">Advanced settings</pk-tab-panel>
  </pk-tabs>
</div>`.trim(),
    'tabs-sidebar': `
<pk-tabs variant="sidebar" value="hubspot" aria-label="Sidebar" style="min-height:16rem">
  <pk-tab-heading slot="nav">CRM</pk-tab-heading>
  <pk-tab slot="nav" value="hubspot">
    <pk-icon slot="icon" icon="gear" aria-hidden="true"></pk-icon>
    HubSpot
    <pk-status slot="status" status="inactive" aria-hidden="true"></pk-status>
  </pk-tab>
  <pk-tab-heading slot="nav">Email marketing</pk-tab-heading>
  <pk-tab slot="nav" value="mailchimp">
    <pk-icon slot="icon" icon="share" aria-hidden="true"></pk-icon>
    Mailchimp
    <pk-status slot="status" status="inactive" aria-hidden="true"></pk-status>
  </pk-tab>
  <pk-tab-heading slot="nav">Elements</pk-tab-heading>
  <pk-tab slot="nav" value="entries">
    <pk-icon slot="icon" icon="list" aria-hidden="true"></pk-icon>
    Entries
    <pk-status slot="status" status="inactive" aria-hidden="true"></pk-status>
  </pk-tab>
  <pk-tab slot="nav" value="users">
    <pk-icon slot="icon" icon="house" aria-hidden="true"></pk-icon>
    Users
    <pk-status slot="status" status="inactive" aria-hidden="true"></pk-status>
  </pk-tab>
  <pk-tab-panel value="hubspot">HubSpot integration settings</pk-tab-panel>
  <pk-tab-panel value="mailchimp">Mailchimp integration settings</pk-tab-panel>
  <pk-tab-panel value="entries">Entries settings</pk-tab-panel>
  <pk-tab-panel value="users">Users settings</pk-tab-panel>
</pk-tabs>`.trim(),

    // textarea
    'textarea-basic': `<pk-textarea placeholder="Write a short description"></pk-textarea>`,
    'textarea-sizes': `
<pk-textarea size="sm" placeholder="Small"></pk-textarea>
<pk-textarea placeholder="Default"></pk-textarea>`.trim(),
    'textarea-widths': `
<pk-textarea placeholder="Full width by default" style="max-width:24rem"></pk-textarea>
<pk-textarea placeholder="Fixed width" style="width:320px"></pk-textarea>`.trim(),
    'textarea-validation': `<pk-textarea invalid value="Too short"></pk-textarea>`,
    'textarea-disabled': `<pk-textarea disabled value="Read only content"></pk-textarea>`,
    'textarea-resize': `<pk-textarea placeholder="Resize vertically" style="resize:vertical;min-height:6rem"></pk-textarea>`,
    'textarea-character-count': `
<div style="display:flex;flex-direction:column;gap:4px;max-width:24rem">
  <pk-textarea max-length="120" value="Short helper text for a settings screen."></pk-textarea>
  <div data-char-count style="text-align:right;font-size:12px;color:#6b7280">40/120</div>
</div>`.trim(),

    // time-picker
    'time-picker-basic': `<pk-time-picker value="09:30"></pk-time-picker>`,
    'time-picker-empty': `<pk-time-picker placeholder="Select time"></pk-time-picker>`,
    'time-picker-states': `
<pk-time-picker value="09:30"></pk-time-picker>
<pk-time-picker disabled value="09:30"></pk-time-picker>
<pk-time-picker invalid value="99:99"></pk-time-picker>`.trim(),

    // tiptap
    'tiptap-content-basic': `<pk-tiptap-content value='[{"type":"paragraph","content":[{"type":"text","text":"Hello world"}]}]'></pk-tiptap-content>`,
    'tiptap-editor-basic': `<pk-tiptap-editor buttons="bold,italic,underline,strikethrough,code,h2,unordered-list,ordered-list" value='[{"type":"paragraph","content":[{"type":"text","text":"Hello from the editor."}]}]'></pk-tiptap-editor>`,
    'tiptap-editor-expanded-toolbar': `<pk-tiptap-editor buttons="h1,h2,h3,bold,italic,underline,strikethrough,unordered-list,ordered-list,blockquote,code,code-block,link,table,undo,redo" value='[{"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Kitchen Sink Demo"}]}]'></pk-tiptap-editor>`,
    'tiptap-editor-grouped-toolbar': `<pk-tiptap-editor toolbar='[{"preset":"headings","headingLevels":[1,2,3,4]},"|","bold","italic","underline"]' value='[{"type":"paragraph","content":[{"type":"text","text":"Grouped toolbar demo"}]}]'></pk-tiptap-editor>`,
    'tiptap-editor-variable-insertion': `<pk-tiptap-editor buttons="bold,italic,variable" value='[{"type":"paragraph","content":[{"type":"text","text":"Hello "},{"type":"variableTag","attrs":{"label":"User Email","value":"{userEmail}"}}]}]'></pk-tiptap-editor>`,
    'tiptap-input-plain': `<pk-tiptap-input value="Hello world" placeholder="Write something"></pk-tiptap-input>`,
    'tiptap-input-general-variables': `<pk-tiptap-input variables='[{"label":"Form Name","value":"{formName}"}]' placeholder="Subject line"></pk-tiptap-input>`,
    'tiptap-input-field-variables': `<pk-tiptap-input variables='[{"label":"Name","value":"{name}"}]' placeholder="Notification body"></pk-tiptap-input>`,
    'tiptap-input-email-variables': `<pk-tiptap-input variables='[{"label":"Email","value":"{email}"}]' placeholder="Email subject"></pk-tiptap-input>`,
    'tiptap-input-selector-fields': `<pk-tiptap-input variables='[{"label":"Name Field","value":"{nameField}"}]' placeholder="Insert field token"></pk-tiptap-input>`,
    'tiptap-input-states': `
<pk-tiptap-input value="Invalid value" invalid></pk-tiptap-input>
<pk-tiptap-input value="Disabled value" disabled></pk-tiptap-input>
<pk-tiptap-input value="Read-only value" readonly></pk-tiptap-input>`.trim(),

    // toggle
    'toggle-basic': `
<pk-toggle aria-label="Bold">
  <pk-icon icon="bold"></pk-icon>
  Bold
</pk-toggle>`.trim(),
    'toggle-variants': `
<pk-toggle><pk-icon icon="bold"></pk-icon> Bold</pk-toggle>
<pk-toggle variant="outline"><pk-icon icon="italic"></pk-icon> Italic</pk-toggle>`.trim(),
    'toggle-sizes': `
<pk-toggle size="sm"><pk-icon icon="bold"></pk-icon> Bold</pk-toggle>
<pk-toggle><pk-icon icon="italic"></pk-icon> Italic</pk-toggle>
<pk-toggle size="lg"><pk-icon icon="underline"></pk-icon> Underline</pk-toggle>`.trim(),
    'toggle-pressed': `
<pk-toggle pressed><pk-icon icon="italic"></pk-icon> Italic</pk-toggle>
<pk-toggle variant="outline" pressed><pk-icon icon="bold"></pk-icon> Bold</pk-toggle>`.trim(),
    'toggle-disabled': `<pk-toggle disabled><pk-icon icon="bold"></pk-icon> Bold</pk-toggle>`,

    // toggle-group
    'toggle-group-basic': `
<pk-toggle-group variant="outline" spacing="0">
  <pk-toggle data-value="left" aria-label="Align left"><pk-icon icon="align-left"></pk-icon></pk-toggle>
  <pk-toggle data-value="center" aria-label="Align center"><pk-icon icon="align-center"></pk-icon></pk-toggle>
  <pk-toggle data-value="right" aria-label="Align right"><pk-icon icon="align-right"></pk-icon></pk-toggle>
</pk-toggle-group>`.trim(),
    'toggle-group-variants': `
<pk-toggle-group spacing="0">
  <pk-toggle data-value="bold" aria-label="Bold"><pk-icon icon="bold"></pk-icon></pk-toggle>
  <pk-toggle data-value="italic" aria-label="Italic"><pk-icon icon="italic"></pk-icon></pk-toggle>
</pk-toggle-group>
<pk-toggle-group variant="outline" spacing="0">
  <pk-toggle data-value="bold" aria-label="Bold"><pk-icon icon="bold"></pk-icon></pk-toggle>
  <pk-toggle data-value="italic" aria-label="Italic"><pk-icon icon="italic"></pk-icon></pk-toggle>
</pk-toggle-group>`.trim(),
    'toggle-group-sizes': `
<pk-toggle-group size="sm" spacing="0">
  <pk-toggle data-value="left" aria-label="Align left"><pk-icon icon="align-left"></pk-icon></pk-toggle>
  <pk-toggle data-value="center" aria-label="Align center"><pk-icon icon="align-center"></pk-icon></pk-toggle>
</pk-toggle-group>
<pk-toggle-group spacing="0">
  <pk-toggle data-value="left" aria-label="Align left"><pk-icon icon="align-left"></pk-icon></pk-toggle>
  <pk-toggle data-value="center" aria-label="Align center"><pk-icon icon="align-center"></pk-icon></pk-toggle>
</pk-toggle-group>
<pk-toggle-group size="lg" spacing="0">
  <pk-toggle data-value="left" aria-label="Align left"><pk-icon icon="align-left"></pk-icon></pk-toggle>
  <pk-toggle data-value="center" aria-label="Align center"><pk-icon icon="align-center"></pk-icon></pk-toggle>
</pk-toggle-group>`.trim(),
    'toggle-group-orientation': `
<pk-toggle-group spacing="0">
  <pk-toggle data-value="left" aria-label="Align left"><pk-icon icon="align-left"></pk-icon></pk-toggle>
  <pk-toggle data-value="center" aria-label="Align center"><pk-icon icon="align-center"></pk-icon></pk-toggle>
  <pk-toggle data-value="right" aria-label="Align right"><pk-icon icon="align-right"></pk-icon></pk-toggle>
</pk-toggle-group>
<pk-toggle-group orientation="vertical" spacing="0">
  <pk-toggle data-value="left" aria-label="Align left"><pk-icon icon="align-left"></pk-icon></pk-toggle>
  <pk-toggle data-value="center" aria-label="Align center"><pk-icon icon="align-center"></pk-icon></pk-toggle>
  <pk-toggle data-value="right" aria-label="Align right"><pk-icon icon="align-right"></pk-icon></pk-toggle>
</pk-toggle-group>`.trim(),
    'toggle-group-spacing': `
<pk-toggle-group spacing="0">
  <pk-toggle data-value="bold" aria-label="Bold"><pk-icon icon="bold"></pk-icon></pk-toggle>
  <pk-toggle data-value="italic" aria-label="Italic"><pk-icon icon="italic"></pk-icon></pk-toggle>
</pk-toggle-group>
<pk-toggle-group spacing="2">
  <pk-toggle data-value="bold" aria-label="Bold"><pk-icon icon="bold"></pk-icon></pk-toggle>
  <pk-toggle data-value="italic" aria-label="Italic"><pk-icon icon="italic"></pk-icon></pk-toggle>
</pk-toggle-group>`.trim(),
    'toggle-group-selection': `
<pk-toggle-group spacing="0" value='["bold"]'>
  <pk-toggle data-value="bold" aria-label="Bold"><pk-icon icon="bold"></pk-icon></pk-toggle>
  <pk-toggle data-value="italic" aria-label="Italic"><pk-icon icon="italic"></pk-icon></pk-toggle>
  <pk-toggle data-value="underline" aria-label="Underline"><pk-icon icon="underline"></pk-icon></pk-toggle>
</pk-toggle-group>
<pk-toggle-group multiple spacing="0" value='["left"]'>
  <pk-toggle data-value="left" aria-label="Align left"><pk-icon icon="align-left"></pk-icon></pk-toggle>
  <pk-toggle data-value="center" aria-label="Align center"><pk-icon icon="align-center"></pk-icon></pk-toggle>
  <pk-toggle data-value="right" aria-label="Align right"><pk-icon icon="align-right"></pk-icon></pk-toggle>
</pk-toggle-group>`.trim(),

    // tooltip
    'tooltip-basic': `<pk-tooltip content="Additional context for this action."><pk-button slot="trigger">Hover me</pk-button></pk-tooltip>`,
    'tooltip-action-hints': `
<pk-tooltip content="Duplicate this entry.">
  <pk-button slot="trigger" aria-label="Duplicate">
    <pk-icon slot="start" icon="clone" aria-hidden="true"></pk-icon>
  </pk-button>
</pk-tooltip>`.trim(),
    'tooltip-placement': `
<pk-tooltip placement="top" content="Top tooltip"><pk-button slot="trigger">Top</pk-button></pk-tooltip>
<pk-tooltip placement="bottom" content="Bottom tooltip"><pk-button slot="trigger">Bottom</pk-button></pk-tooltip>`.trim(),
    'tooltip-keyboard': `<pk-tooltip content="Focus to reveal on keyboard."><pk-button slot="trigger">Focus me</pk-button></pk-tooltip>`,

    // button-group
    'button-group-basic': `
<pk-button-group>
  <pk-button variant="primary"><pk-icon slot="start" icon="pen-to-square"></pk-icon> Edit</pk-button>
  <pk-button variant="primary"><pk-icon slot="start" icon="eye"></pk-icon> Preview</pk-button>
  <pk-button variant="primary" group-trigger aria-label="More actions"></pk-button>
</pk-button-group>`.trim(),
    'button-group-menu-trigger': `
<div style="display:flex;flex-direction:column;gap:20px">
  <div>
    <div style="font-size:12px;color:#6b7280;margin:0 0 8px">Use — disclosure end-cap with <code>group-trigger</code> (Craft <code>.menubtn</code>)</div>
    <pk-button-group>
      <pk-button variant="primary"><pk-icon slot="start" icon="pen-to-square"></pk-icon> Edit</pk-button>
      <pk-button variant="primary"><pk-icon slot="start" icon="eye"></pk-icon> Preview</pk-button>
      <pk-button variant="primary" group-trigger aria-label="More actions"></pk-button>
    </pk-button-group>
  </div>
  <div>
    <div style="font-size:12px;color:#6b7280;margin:0 0 8px">Avoid — chevron slotted as an icon keeps a full square hit target</div>
    <pk-button-group>
      <pk-button variant="primary"><pk-icon slot="start" icon="pen-to-square"></pk-icon> Edit</pk-button>
      <pk-button variant="primary"><pk-icon slot="start" icon="eye"></pk-icon> Preview</pk-button>
      <pk-button variant="primary" aria-label="More actions"><pk-icon slot="start" icon="chevron-down"></pk-icon></pk-button>
    </pk-button-group>
  </div>
  <div>
    <div style="font-size:12px;color:#6b7280;margin:0 0 8px">Different pattern — icon-only actions stay square (no <code>group-trigger</code>)</div>
    <pk-button-group>
      <pk-button variant="primary" aria-label="Edit"><pk-icon slot="start" icon="pen-to-square"></pk-icon></pk-button>
      <pk-button variant="primary" aria-label="Preview"><pk-icon slot="start" icon="eye"></pk-icon></pk-button>
      <pk-button variant="primary" aria-label="Export"><pk-icon slot="start" icon="download"></pk-icon></pk-button>
    </pk-button-group>
  </div>
</div>`.trim(),
    'button-group-separators': `
<div style="display:flex;flex-direction:column;gap:20px">
  <div>
    <div style="font-size:12px;color:#6b7280;margin:0 0 8px">On (default) — 1px divider between controls</div>
    <pk-button-group>
      <pk-button variant="primary">Save</pk-button>
      <pk-button variant="primary">Save and continue</pk-button>
    </pk-button-group>
  </div>
  <div>
    <div style="font-size:12px;color:#6b7280;margin:0 0 8px">Off (<code>separators="false"</code>) — flush join</div>
    <pk-button-group separators="false">
      <pk-button variant="primary">Save</pk-button>
      <pk-button variant="primary">Save and continue</pk-button>
    </pk-button-group>
  </div>
</div>`.trim(),
    'button-group-split-actions': `
<pk-button-group>
  <pk-button variant="primary">Publish</pk-button>
  <pk-button variant="primary" group-trigger aria-label="More publish actions"></pk-button>
</pk-button-group>
<pk-button-group>
  <pk-button variant="outline"><pk-icon slot="start" icon="download"></pk-icon> Export</pk-button>
  <pk-button variant="outline" group-trigger aria-label="More export actions"></pk-button>
</pk-button-group>`.trim(),
    'button-group-sizes': `
<pk-button-group size="sm">
  <pk-button variant="primary">Small</pk-button>
  <pk-button variant="primary">Group</pk-button>
</pk-button-group>
<pk-button-group>
  <pk-button variant="primary">Default</pk-button>
  <pk-button variant="primary">Group</pk-button>
</pk-button-group>`.trim(),
    'button-group-orientation': `
<pk-button-group orientation="vertical">
  <pk-button variant="outline">First</pk-button>
  <pk-button variant="outline">Second</pk-button>
  <pk-button variant="outline">Third</pk-button>
</pk-button-group>`.trim(),
    'button-group-other-controls': `
<pk-button-group>
  <pk-input placeholder="Search" style="width:12rem"></pk-input>
  <pk-button variant="primary">Search</pk-button>
</pk-button-group>`.trim(),
    'button-group-dropdown': `
<pk-button-group>
  <pk-button variant="primary">Actions</pk-button>
  <pk-dropdown-menu>
    <pk-button slot="trigger" variant="primary" group-trigger aria-label="More actions"></pk-button>
    <pk-dropdown-item value="duplicate">Duplicate</pk-dropdown-item>
    <pk-dropdown-item value="delete" destructive>Delete</pk-dropdown-item>
  </pk-dropdown-menu>
</pk-button-group>`.trim(),
    'button-group-popover': `
<pk-button-group>
  <pk-button variant="primary">Filter</pk-button>
  <pk-popover>
    <pk-button slot="trigger" variant="primary" group-trigger aria-label="Filter options"></pk-button>
    <div style="min-width:12rem;padding:0.75rem">Filter options</div>
  </pk-popover>
</pk-button-group>`.trim(),
};

/** Optional source-code overrides when rendered preview markup needs demo-only wrappers. */
export const PREVIEW_CODE = {
    'color-input-basic': '<pk-color-input value="#35e533"></pk-color-input>',
    'color-input-resolved': `
<pk-color-input></pk-color-input>
<pk-color-input value="#a9"></pk-color-input>
<pk-color-input value="#9c4"></pk-color-input>
<pk-color-input value="#35e533"></pk-color-input>
<pk-color-input value="#35e533" invalid></pk-color-input>
<pk-color-input value="#35e533" disabled></pk-color-input>
`.trim(),
    'color-input-sizes': `
<pk-color-input size="xs" value="#35e533"></pk-color-input>
<pk-color-input size="sm" value="#35e533"></pk-color-input>
<pk-color-input value="#35e533"></pk-color-input>
<pk-color-input size="lg" value="#35e533"></pk-color-input>
<pk-color-input size="xl" value="#35e533"></pk-color-input>
`.trim(),
};
