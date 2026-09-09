#!/usr/bin/env node
/**
 * Generate Web-Awesome-style API sections for component docs from
 * `plugin-kit-web/custom-elements.json` (Custom Elements Manifest).
 *
 * Voices: `web` (attrs + pk-* events), `react` (Props + onPk*), `vue` (Props + @pk-*).
 * Default generates all three into docs/{web,react,vue}/components/.
 *
 * Markers in each markdown file:
 *   <!-- pk-api:begin -->
 *   …generated…
 *   <!-- pk-api:end -->
 *
 * Usage:
 *   node scripts/generate-component-api-docs.mjs
 *   node scripts/generate-component-api-docs.mjs --voice=react
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const docsRoot = path.resolve(__dirname, '..');
const repoRoot = path.resolve(docsRoot, '..');
const webPackageRoot = path.join(repoRoot, 'plugin-kit-web');
const cemPath = path.join(webPackageRoot, 'custom-elements.json');

const API_BEGIN = '<!-- pk-api:begin -->';
const API_END = '<!-- pk-api:end -->';

/**
 * Docs page → custom element tag(s) for the generated API appendix.
 * Compound pages list family children documented on the same page.
 * `checkbox-input.md` has no CE — omitted.
 */
/** @type {Record<string, { tags: string[] }>} */
const PAGE_APIS = {
    'button.md': { tags: ['pk-button'] },
    'button-group.md': { tags: ['pk-button-group'] },
    'calendar.md': { tags: ['pk-calendar'] },
    'checkbox.md': { tags: ['pk-checkbox'] },
    'checkbox-select.md': { tags: ['pk-checkbox-select'] },
    'code-editor.md': { tags: ['pk-code-editor'] },
    'color-input.md': { tags: ['pk-color-input'] },
    'autocomplete.md': { tags: ['pk-autocomplete'] },
    'combobox.md': { tags: ['pk-combobox'] },
    'copy-button.md': { tags: ['pk-copy-button'] },
    'date-picker.md': { tags: ['pk-date-picker'] },
    'dialog.md': { tags: ['pk-dialog'] },
    'dropdown-menu.md': {
        tags: ['pk-dropdown-menu', 'pk-dropdown-item', 'pk-dropdown-label', 'pk-dropdown-separator'],
    },
    'editable-table.md': { tags: ['pk-editable-table'] },
    'field.md': { tags: ['pk-field'] },
    'icon.md': { tags: ['pk-icon'] },
    'image-browser.md': { tags: ['pk-image-browser'] },
    'input.md': { tags: ['pk-input'] },
    'input-group.md': {
        tags: [
            'pk-input-group',
            'pk-input-group-addon',
            'pk-input-group-button',
            'pk-input-group-input',
            'pk-input-group-text',
        ],
    },
    'lightswitch.md': { tags: ['pk-lightswitch'] },
    'popover.md': { tags: ['pk-popover'] },
    'radio-group.md': { tags: ['pk-radio-group', 'pk-radio'] },
    'scroll-area.md': { tags: ['pk-scroll-area'] },
    'select.md': { tags: ['pk-select', 'pk-option', 'pk-option-group'] },
    'separator.md': { tags: ['pk-separator'] },
    'spinner.md': { tags: ['pk-spinner'] },
    'status.md': { tags: ['pk-status'] },
    'tabs.md': { tags: ['pk-tabs', 'pk-tab', 'pk-tab-heading', 'pk-tab-panel'] },
    'textarea.md': { tags: ['pk-textarea'] },
    'time-picker.md': { tags: ['pk-time-picker'] },
    'tiptap-content.md': { tags: ['pk-tiptap-content'] },
    'tiptap-editor.md': { tags: ['pk-tiptap-editor'] },
    'tiptap-input.md': { tags: ['pk-tiptap-input'] },
    'toggle.md': { tags: ['pk-toggle'] },
    'toggle-group.md': { tags: ['pk-toggle-group'] },
    'tooltip.md': { tags: ['pk-tooltip'] },
};

/** Fields that are Lit/runtime internals, not consumer API. */
const FIELD_DENY = new Set([
    'assumeInteractionOn',
    'validators',
    'input',
    'validationTarget',
    'valueHasChanged',
    'hasInteracted',
    'pkRenderFailed',
    'shadowRootOptions',
    'internals',
    'formAssociated',
    'emittedEvents',
    'hostAriaMirror',
    'allValidators',
]);

/** Events inherited from bases that are not part of the component surface. */
const EVENT_DENY = new Set([
    'pk-error',
]);

/**
 * Methods to keep when inherited / public. Described helpers outside this set
 * are omitted so internal overrides do not leak into docs.
 */
const METHOD_ALLOW = new Set([
    'show',
    'hide',
    'checkValidity',
    'reportValidity',
    'setCustomValidity',
    'resetValidity',
    'focusControl',
    'getLabel',
]);

const METHOD_DENY_PREFIX = /^(form|sync|getAria|resetTo|restore|connect|handle|update|emit|openPanel|closePanel|bind|should)/;

function escapeCell(text) {
    return String(text ?? '')
        .replace(/\|/g, '\\|')
        .replace(/\n+/g, ' ')
        .trim();
}

function formatDefault(value) {
    if (value === undefined || value === null || value === '') {
        return '';
    }
    return String(value).replace(/^'|'$/g, '');
}

function slotDisplayName(name) {
    return name === '' || name == null ? '(default)' : name;
}

function loadManifest() {
    if (!fs.existsSync(cemPath)) {
        throw new Error(
            `Missing ${cemPath}. Run: npm run gen:cem -w @verbb/plugin-kit-web`,
        );
    }
    return JSON.parse(fs.readFileSync(cemPath, 'utf8'));
}

/**
 * Side-effect `import '.../pk-foo.js'` lines register peer custom elements.
 * Merge with `@dependency` JSDoc so Dependencies tables stay complete without
 * hand-tagging every composite.
 */
function discoverSideEffectDependencies(decl) {
    const moduleRel = decl._module;
    if (!moduleRel) {
        return [];
    }
    // CEM paths may be `src/components/...` or `/src/components/...`
    const rel = moduleRel.replace(/^\//, '');
    const sourcePath = path.join(webPackageRoot, rel);
    if (!fs.existsSync(sourcePath)) {
        return [];
    }
    const source = fs.readFileSync(sourcePath, 'utf8');
    const tags = new Set();
    // Bare side-effect imports only (no bindings) — matches registration DX.
    for (const match of source.matchAll(/^import\s+['"][^'"]*\/(pk-[\w-]+)\.js['"]\s*;/gm)) {
        tags.add(match[1]);
    }
    return [...tags].map((name) => ({ name, description: '' }));
}

function mergeDependencies(api, decl) {
    const byName = new Map();
    for (const dep of api.dependencies ?? []) {
        byName.set(dep.name, { ...dep });
    }
    for (const dep of discoverSideEffectDependencies(decl)) {
        // Prefer `@dependency` JSDoc descriptions when present.
        if (!byName.has(dep.name)) {
            byName.set(dep.name, dep);
        }
    }
    // Don't list the element as depending on itself.
    if (decl.tagName) {
        byName.delete(decl.tagName);
    }
    return [...byName.values()].sort((a, b) => a.name.localeCompare(b.name));
}

/** Index declarations by class name and by tagName. */
function indexManifest(manifest) {
    /** @type {Map<string, any>} */
    const byClass = new Map();
    /** @type {Map<string, any>} */
    const byTag = new Map();

    for (const mod of manifest.modules ?? []) {
        for (const decl of mod.declarations ?? []) {
            if (decl.kind !== 'class') {
                continue;
            }
            byClass.set(decl.name, { ...decl, _module: mod.path });
            if (decl.customElement && decl.tagName) {
                byTag.set(decl.tagName, { ...decl, _module: mod.path });
            }
        }
    }

    return { byClass, byTag };
}

/**
 * Walk superclass chain and collect class declarations (subclass first).
 * @param {any} decl
 * @param {Map<string, any>} byClass
 */
function inheritanceChain(decl, byClass) {
    const chain = [decl];
    let current = decl;
    const seen = new Set([decl.name]);

    while (current?.superclass?.name) {
        const parent = byClass.get(current.superclass.name);
        if (!parent || seen.has(parent.name)) {
            break;
        }
        seen.add(parent.name);
        chain.push(parent);
        current = parent;
    }

    return chain;
}

function mergeUnique(items, keyFn) {
    const out = [];
    const seen = new Set();
    for (const item of items) {
        const key = keyFn(item);
        if (seen.has(key)) {
            continue;
        }
        seen.add(key);
        out.push(item);
    }
    return out;
}

/**
 * Flatten attrs/fields/methods/events/slots/parts/css/states/deps from inheritance.
 * Subclass wins on name conflicts.
 */
function flattenApi(decl, byClass) {
    const chain = inheritanceChain(decl, byClass);

    const attributes = [];
    const fields = [];
    const methods = [];
    const events = [];
    const slots = [];
    const cssParts = [];
    const cssProperties = [];
    const cssStates = [];
    const dependencies = [];

    // Walk from base → subclass so subclass overwrites when we reverse-merge.
    for (const cls of [...chain].reverse()) {
        for (const attr of cls.attributes ?? []) {
            attributes.push({ ...attr, _from: cls.name });
        }
        for (const member of cls.members ?? []) {
            if (member.privacy === 'private' || member.privacy === 'protected') {
                continue;
            }
            if (member.static) {
                continue;
            }
            if (member.kind === 'field') {
                fields.push({ ...member, _from: cls.name });
            }
            if (member.kind === 'method') {
                methods.push({ ...member, _from: cls.name });
            }
        }
        for (const event of cls.events ?? []) {
            events.push({ ...event, _from: cls.name });
        }
        // Custom states inherit from form-associated bases (user-invalid, …).
        for (const state of cls.cssStates ?? []) {
            cssStates.push({ ...state, _from: cls.name });
        }
        // Slots / parts / css props / deps are declared on the concrete CE.
        if (cls === decl) {
            slots.push(...(cls.slots ?? []));
            cssParts.push(...(cls.cssParts ?? []));
            cssProperties.push(...(cls.cssProperties ?? []));
            dependencies.push(...(cls.dependencies ?? []));
        }
    }

    // Subclass-last: keep last occurrence per key.
    const attrsByName = new Map();
    for (const attr of attributes) {
        attrsByName.set(attr.name, attr);
    }
    const fieldsByName = new Map();
    for (const field of fields) {
        fieldsByName.set(field.name, field);
    }
    const methodsByName = new Map();
    for (const method of methods) {
        methodsByName.set(method.name, method);
    }
    const eventsByName = new Map();
    for (const event of events) {
        const name = event.name || event.type?.text;
        if (!name) {
            continue;
        }
        eventsByName.set(name, { ...event, name: event.name || name });
    }
    const statesByName = new Map();
    for (const state of cssStates) {
        statesByName.set(state.name, state);
    }
    const depsByName = new Map();
    for (const dep of dependencies) {
        depsByName.set(dep.name, dep);
    }

    return {
        attributes: [...attrsByName.values()],
        fields: [...fieldsByName.values()],
        methods: [...methodsByName.values()],
        events: [...eventsByName.values()],
        slots,
        cssParts,
        cssProperties,
        cssStates: [...statesByName.values()],
        dependencies: [...depsByName.values()],
    };
}

function fieldForAttribute(attr, fields) {
    if (attr.fieldName) {
        return fields.find((f) => f.name === attr.fieldName);
    }
    return fields.find((f) => f.attribute === attr.name || f.name === attr.name);
}

function isDocumentedField(field) {
    if (!field || FIELD_DENY.has(field.name)) {
        return false;
    }
    if (field.readonly) {
        return false;
    }
    // Explicit `@property({ attribute: false })` — CEM often omits the key entirely.
    if (field.attribute === false) {
        return Boolean(field.description);
    }
    // String attribute → covered via the attributes table.
    if (typeof field.attribute === 'string') {
        return true;
    }
    // No attribute key: either a plain getter (skip) or attribute:false that CEM omitted.
    // Keep only when described and not already represented as an attribute fieldName.
    return Boolean(field.description);
}

function isDocumentedMethod(method) {
    if (!method || METHOD_DENY_PREFIX.test(method.name)) {
        return false;
    }
    return METHOD_ALLOW.has(method.name);
}

/** Kebab / attr → camelCase field name. */
function toCamelCase(name) {
    return String(name).replace(/-([a-z])/g, (_, c) => c.toUpperCase());
}

/** `pk-foo-bar` / `foo-bar` → PascalCase component name. */
function toPascalCase(name) {
    return String(name)
        .replace(/^pk-/, '')
        .split('-')
        .filter(Boolean)
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join('');
}

/** Irregular component export names (match sync-react SPECIAL). */
const TAG_TO_COMPONENT = {
    'pk-checkbox-input': 'CheckboxInput',
    'pk-tiptap-editor': 'TiptapEditor',
    'pk-tiptap-input': 'TiptapInput',
    'pk-tiptap-content': 'TiptapContent',
    'pk-button-group': 'ButtonGroup',
    'pk-button-group-separator': 'ButtonGroupSeparator',
    'pk-button-group-text': 'ButtonGroupText',
    'pk-dropdown-menu': 'DropdownMenu',
    'pk-dropdown-item': 'DropdownItem',
    'pk-dropdown-label': 'DropdownLabel',
    'pk-dropdown-separator': 'DropdownSeparator',
    'pk-tab-heading': 'TabHeading',
    'pk-tab-panel': 'TabPanel',
    'pk-option-group': 'OptionGroup',
    'pk-copy-button': 'CopyButton',
    'pk-color-input': 'ColorInput',
    'pk-date-picker': 'DatePicker',
    'pk-time-picker': 'TimePicker',
    'pk-scroll-area': 'ScrollArea',
    'pk-radio-group': 'RadioGroup',
    'pk-toggle-group': 'ToggleGroup',
    'pk-checkbox-select': 'CheckboxSelect',
    'pk-code-editor': 'CodeEditor',
    'pk-editable-table': 'EditableTable',
    'pk-input-group': 'InputGroup',
    'pk-input-group-addon': 'InputGroupAddon',
    'pk-input-group-button': 'InputGroupButton',
    'pk-input-group-input': 'InputGroupInput',
    'pk-input-group-text': 'InputGroupText',
    'pk-input-group-textarea': 'InputGroupTextarea',
    'pk-image-browser': 'ImageBrowser',
    'pk-autocomplete': 'Autocomplete',
};

function componentDisplayName(tagName, voice) {
    if (voice === 'web') {
        return tagName;
    }
    return TAG_TO_COMPONENT[tagName] || toPascalCase(tagName);
}

/** React/Formie prop aliases documented alongside the CE property. */
const PROP_ALIASES = [
    {
        ceProp: 'invalid',
        alias: 'isInvalid',
        description: 'Alias for `invalid`.',
    },
    {
        ceProp: 'readonly',
        alias: 'readOnly',
        description: 'Alias for `readonly`.',
    },
];

function formatAttrNameCell(attr, field, voice = 'web') {
    const propName = field?.name ?? attr.fieldName ?? toCamelCase(attr.name);
    const attrName = attr.name;

    if (voice === 'web') {
        if (propName && propName !== attrName && field?.attribute !== false) {
            return `\`${propName}\` \`${attrName}\``;
        }
        if (field?.attribute === false) {
            return `\`${propName}\``;
        }
        return `\`${attrName}\``;
    }

    // React / Vue: camelCase prop only.
    return `\`${propName || toCamelCase(attrName)}\``;
}

/** React: onPkChange; Vue: @pk-change; Web: pk-change */
function formatEventName(eventName, voice) {
    if (voice === 'web') {
        return eventName;
    }
    if (voice === 'vue') {
        return `@${eventName}`;
    }
    // react
    if (eventName.startsWith('pk-')) {
        return `on${eventName
            .split('-')
            .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
            .join('')}`;
    }
    return `on${eventName.charAt(0).toUpperCase()}${eventName.slice(1)}`;
}

function propsSectionTitle(voice) {
    return voice === 'web' ? 'Attributes & Properties' : 'Props';
}

function formatDescriptionWithMeta(description, typeText, defaultValue) {
    // WA-style stack: description, then smaller Type / Default lines.
    // Markdown table cells need HTML breaks — pipe tables cannot carry real newlines.
    const lines = [];
    if (description) {
        lines.push(escapeCell(description));
    }
    if (typeText) {
        lines.push(`<small><strong>Type</strong> <code>${escapeCell(typeText)}</code></small>`);
    }
    const def = formatDefault(defaultValue);
    if (def !== '') {
        lines.push(`<small><strong>Default</strong> <code>${escapeCell(def)}</code></small>`);
    }
    return lines.length ? lines.join('<br>') : '—';
}

function renderSlots(slots, heading = '###') {
    if (!slots.length) {
        return '';
    }
    const rows = slots.map(
        (slot) =>
            `| \`${slotDisplayName(slot.name)}\` | ${escapeCell(slot.description) || '—'} |`,
    );
    return [
        `${heading} Slots`,
        '',
        '| Name | Description |',
        '| --- | --- |',
        ...rows,
        '',
    ].join('\n');
}

function renderAttributes(api, heading = '###', voice = 'web') {
    const rows = [];

    // Attribute-backed props first (from attributes list).
    const coveredFields = new Set();
    const cePropNames = new Set();
    for (const attr of api.attributes) {
        const field = fieldForAttribute(attr, api.fields);
        if (field && (FIELD_DENY.has(field.name) || field.readonly)) {
            continue;
        }
        if (field) {
            coveredFields.add(field.name);
            cePropNames.add(field.name);
        } else {
            cePropNames.add(toCamelCase(attr.name));
        }
        const propName = field?.name ?? attr.fieldName ?? toCamelCase(attr.name);
        rows.push({
            sort: propName || attr.name,
            name: formatAttrNameCell(attr, field, voice),
            description: formatDescriptionWithMeta(
                field?.description || attr.description,
                field?.type?.text || attr.type?.text,
                field?.default ?? attr.default,
            ),
        });
    }

    // Property-only fields (`attribute: false` — CEM may omit the key).
    for (const field of api.fields) {
        if (coveredFields.has(field.name) || !isDocumentedField(field)) {
            continue;
        }
        // Skip normal attributed props (already listed via attributes).
        if (typeof field.attribute === 'string') {
            continue;
        }
        // Skip undescribed getters that somehow gained a description later.
        if (!field.description) {
            continue;
        }
        cePropNames.add(field.name);
        rows.push({
            sort: field.name,
            name: `\`${field.name}\``,
            description: formatDescriptionWithMeta(
                field.description,
                field.type?.text,
                field.default,
            ),
        });
    }

    // React / Vue facade aliases (isInvalid, readOnly, …).
    if (voice !== 'web') {
        for (const alias of PROP_ALIASES) {
            if (!cePropNames.has(alias.ceProp)) {
                continue;
            }
            const base = rows.find((r) => r.name === `\`${alias.ceProp}\``);
            rows.push({
                sort: `${alias.ceProp}~${alias.alias}`,
                name: `\`${alias.alias}\``,
                description: formatDescriptionWithMeta(
                    alias.description,
                    base ? null : 'boolean',
                    undefined,
                ),
            });
        }
    }

    rows.sort((a, b) => a.sort.localeCompare(b.sort));

    if (!rows.length) {
        return '';
    }

    return [
        `${heading} ${propsSectionTitle(voice)}`,
        '',
        '| Name | Description |',
        '| --- | --- |',
        ...rows.map((r) => `| ${r.name} | ${r.description} |`),
        '',
    ].join('\n');
}

function renderMethods(methods, heading = '###') {
    const documented = methods.filter(isDocumentedMethod).sort((a, b) => a.name.localeCompare(b.name));
    if (!documented.length) {
        return '';
    }

    const rows = documented.map((method) => {
        const args = (method.parameters ?? [])
            .map((p) => {
                const type = p.type?.text ? `: ${p.type.text}` : '';
                return `${p.name}${type}`;
            })
            .join(', ');
        const sig = args ? `${method.name}(${args})` : `${method.name}()`;
        return `| \`${escapeCell(sig)}\` | ${escapeCell(method.description) || '—'} |`;
    });

    return [
        `${heading} Methods`,
        '',
        '| Name | Description |',
        '| --- | --- |',
        ...rows,
        '',
    ].join('\n');
}

function renderEvents(events, heading = '###', voice = 'web') {
    const cleaned = mergeUnique(
        events.filter((e) => {
            if (!e.name || String(e.name).startsWith('Pk')) {
                return false;
            }
            if (EVENT_DENY.has(e.name)) {
                return false;
            }
            return true;
        }),
        (e) => e.name,
    ).sort((a, b) => a.name.localeCompare(b.name));

    if (!cleaned.length) {
        return '';
    }

    const rows = cleaned.map((event) => {
        const typeText =
            event.type?.text && event.type.text !== 'Event' && event.type.text !== 'CustomEvent'
                ? event.type.text
                : null;
        let description = event.description || '';
        // Point React consumers at facade value sugar when present on some controls.
        if (voice === 'react' && event.name === 'pk-change') {
            description = description
                ? `${description} Some facades also expose value sugar via \`onChange\`.`
                : 'Some facades also expose value sugar via `onChange`.';
        }
        const body = formatDescriptionWithMeta(description, typeText, null);
        const name = formatEventName(event.name, voice);
        return `| \`${name}\` | ${body} |`;
    });

    return [
        `${heading} Events`,
        '',
        '| Name | Description |',
        '| --- | --- |',
        ...rows,
        '',
    ].join('\n');
}

function renderCssProperties(cssProperties, heading = '###') {
    if (!cssProperties.length) {
        return '';
    }
    const rows = [...cssProperties]
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((prop) => {
            // Same stacked Type/Default pattern when a default exists.
            const body = formatDescriptionWithMeta(prop.description, null, prop.default);
            return `| \`${prop.name}\` | ${body} |`;
        });

    return [
        `${heading} CSS Custom Properties`,
        '',
        '| Name | Description |',
        '| --- | --- |',
        ...rows,
        '',
    ].join('\n');
}

function renderCssParts(cssParts, heading = '###') {
    if (!cssParts.length) {
        return '';
    }
    const rows = [...cssParts]
        .sort((a, b) => a.name.localeCompare(b.name))
        .map(
            (part) =>
                `| \`${part.name}\` | ${escapeCell(part.description) || '—'} | \`::part(${part.name})\` |`,
        );

    return [
        `${heading} CSS Parts`,
        '',
        '| Name | Description | CSS selector |',
        '| --- | --- | --- |',
        ...rows,
        '',
    ].join('\n');
}

function renderCssStates(cssStates, heading = '###') {
    if (!cssStates.length) {
        return '';
    }
    const rows = [...cssStates]
        .sort((a, b) => a.name.localeCompare(b.name))
        .map(
            (state) =>
                `| \`${state.name}\` | ${escapeCell(state.description) || '—'} | \`:state(${state.name})\` |`,
        );

    return [
        `${heading} Custom States`,
        '',
        '| Name | Description | CSS selector |',
        '| --- | --- | --- |',
        ...rows,
        '',
    ].join('\n');
}

function renderDependencies(dependencies, heading = '###') {
    if (!dependencies.length) {
        return '';
    }
    const rows = [...dependencies]
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((dep) => `| \`${dep.name}\` | ${escapeCell(dep.description) || '—'} |`);

    return [
        `${heading} Dependencies`,
        '',
        'This component registers the following elements when it loads.',
        '',
        '| Name | Description |',
        '| --- | --- |',
        ...rows,
        '',
    ].join('\n');
}

function renderTagApi(tagName, decl, byClass, { withHeading = true, voice = 'web' } = {}) {
    // When a tag subhead is present, nest Slots/Attrs/… as h4 so hierarchy stays clear.
    const sectionHeading = withHeading ? '####' : '###';
    const api = flattenApi(decl, byClass);
    api.dependencies = mergeDependencies(api, decl);
    // WA section order: Slots → Attrs → Methods → Events → CSS vars → States → Parts → Deps
    const sections = [
        renderSlots(api.slots, sectionHeading),
        renderAttributes(api, sectionHeading, voice),
        renderMethods(api.methods, sectionHeading),
        renderEvents(api.events, sectionHeading, voice),
        renderCssProperties(api.cssProperties, sectionHeading),
        renderCssStates(api.cssStates, sectionHeading),
        renderCssParts(api.cssParts, sectionHeading),
        renderDependencies(api.dependencies, sectionHeading),
    ].filter(Boolean);

    const label = componentDisplayName(tagName, voice);
    const heading = withHeading ? [`### ${label}`, ''] : [];

    if (!sections.length) {
        return [...heading, '_No public API metadata found in the custom elements manifest._', ''].join('\n');
    }

    return [...heading, ...sections].join('\n');
}

function renderPageApi(tags, byTag, byClass, voice = 'web') {
    // Single-tag pages already use the component name as the page title — skip a
    // redundant Button / pk-button subhead under API.
    const withHeading = tags.length > 1;
    const blocks = [];
    for (const tag of tags) {
        const decl = byTag.get(tag);
        if (!decl) {
            const label = componentDisplayName(tag, voice);
            blocks.push(
                withHeading
                    ? `### ${label}\n\n_Tag not found in custom-elements.json._\n`
                    : `_Tag not found in custom-elements.json._\n`,
            );
            continue;
        }
        blocks.push(renderTagApi(tag, decl, byClass, { withHeading, voice }));
    }

    return [
        API_BEGIN,
        '',
        '## API',
        '',
        ...blocks,
        API_END,
        '',
    ].join('\n');
}

function injectApi(markdown, apiBlock) {
    let next = markdown;
    // Drop legacy hand-written prop tables — generated ## API replaces them.
    next = next.replace(/\n## Props\n[\s\S]*?(?=\n## )/, '\n');
    next = next.replace(/\n## Attributes \/ properties\n[\s\S]*?(?=\n## )/, '\n');

    if (next.includes(API_BEGIN) && next.includes(API_END)) {
        return next.replace(
            new RegExp(`${API_BEGIN}[\\s\\S]*?${API_END}\\n?`),
            `${apiBlock}`,
        );
    }
    return `${next.trimEnd()}\n\n${apiBlock}`;
}

const VOICE_DIRS = {
    web: path.join(docsRoot, 'web/components'),
    react: path.join(docsRoot, 'react/components'),
    vue: path.join(docsRoot, 'vue/components'),
};

function generateForVoice(voice, byTag, byClass) {
    const dir = VOICE_DIRS[voice];
    let updated = 0;
    let skipped = 0;

    for (const [fileName, config] of Object.entries(PAGE_APIS)) {
        const filePath = path.join(dir, fileName);
        if (!fs.existsSync(filePath)) {
            skipped += 1;
            continue;
        }
        const previous = fs.readFileSync(filePath, 'utf8');
        const apiBlock = renderPageApi(config.tags, byTag, byClass, voice);
        const next = injectApi(previous, apiBlock);
        if (next !== previous) {
            fs.writeFileSync(filePath, next);
            updated += 1;
            console.log(`[${voice}] updated ${fileName}`);
        }
    }

    console.log(`[${voice}] ${updated} updated, ${skipped} skipped (no page)`);
    return updated;
}

function parseVoices(argv) {
    const arg = argv.find((a) => a.startsWith('--voice='));
    if (!arg) {
        return ['web', 'react', 'vue'];
    }
    const value = arg.slice('--voice='.length);
    if (value === 'all') {
        return ['web', 'react', 'vue'];
    }
    if (!VOICE_DIRS[value]) {
        throw new Error(`Unknown voice "${value}" (use web|react|vue|all)`);
    }
    return [value];
}

function main() {
    const voices = parseVoices(process.argv.slice(2));
    const manifest = loadManifest();
    const { byClass, byTag } = indexManifest(manifest);
    let updated = 0;

    for (const voice of voices) {
        updated += generateForVoice(voice, byTag, byClass);
    }

    console.log(`API docs: ${updated} file(s) written (${voices.join(', ')})`);
}

main();
