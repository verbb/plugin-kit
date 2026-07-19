#!/usr/bin/env node
/**
 * Sync docs/vue/components/*.md from docs/web/components/*.md.
 *
 * Vue pages get the same teaching prose as web, with:
 * - `.preview.web.ts` → `.preview.vue.ts`
 * - `pk-*` tags / links rewritten to Vue component names / `/vue/components/…`
 * - no WC “canonical API” / facade intro
 *
 * Skips web-only pages Vue does not document yet (e.g. input-group stays web-only
 * until Vue nav includes it). Creates missing vue/*.md when a matching preview exists
 * or when react already documents the slug.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const docsRoot = path.resolve(__dirname, '..');
const vueComponentsDir = path.join(docsRoot, 'vue/components');
const reactComponentsDir = path.join(docsRoot, 'react/components');
const webComponentsDir = path.join(docsRoot, 'web/components');
const vueExamplesDir = path.join(vueComponentsDir, 'examples');

const SPECIAL = {
    'checkbox-input': 'CheckboxInput',
    'tiptap-editor': 'TiptapEditor',
    'tiptap-input': 'TiptapInput',
    'tiptap-content': 'TiptapContent',
    'button-group': 'ButtonGroup',
    'button-group-separator': 'ButtonGroupSeparator',
    'button-group-text': 'ButtonGroupText',
    'dropdown-menu': 'DropdownMenu',
    'dropdown-item': 'DropdownItem',
    'dropdown-label': 'DropdownLabel',
    'dropdown-separator': 'DropdownSeparator',
    'tab-heading': 'TabHeading',
    'tab-panel': 'TabPanel',
    'option-group': 'OptionGroup',
    'copy-button': 'CopyButton',
    'color-input': 'ColorInput',
    'date-picker': 'DatePicker',
    'time-picker': 'TimePicker',
    'scroll-area': 'ScrollArea',
    'radio-group': 'RadioGroup',
    'toggle-group': 'ToggleGroup',
    'lightswitch': 'Lightswitch',
    'checkbox-select': 'CheckboxSelect',
    'code-editor': 'CodeEditor',
    'editable-table': 'EditableTable',
    'input-group': 'InputGroup',
};

const ATTR_TO_PROP = {
    'group-trigger': 'groupTrigger',
    'with-caret': 'withCaret',
    'with-arrow': 'withArrow',
    'with-week-numbers': 'withWeekNumbers',
    'disabled-days-of-week': 'disabledDaysOfWeek',
    'disable-past': 'disablePast',
    'disable-future': 'disableFuture',
    'allow-create': 'allowCreate',
    'allow-custom-value': 'allowCustomValue',
};

/** React-only convenience wrappers — skip until Vue ships them. */
const SKIP_SLUGS = new Set([
    'checkbox-input',
]);

function vueName(slug) {
    if (Object.prototype.hasOwnProperty.call(SPECIAL, slug)) {
        return SPECIAL[slug];
    }

    return slug
        .split('-')
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join('');
}

function buildTagMap(vueSlugs) {
    const tagToVue = {
        'pk-option': 'Option',
        'pk-tab': 'Tab',
        'pk-icon': 'Icon',
        'pk-field': 'Field',
        'pk-status': 'Status',
        'pk-input': 'Input',
        'pk-button': 'Button',
        'pk-spinner': 'Spinner',
        'pk-separator': 'Separator',
        'pk-checkbox': 'Checkbox',
        'pk-select': 'Select',
        'pk-combobox': 'Combobox',
        'pk-dialog': 'Dialog',
        'pk-popover': 'Popover',
        'pk-tooltip': 'Tooltip',
        'pk-calendar': 'Calendar',
        'pk-tabs': 'Tabs',
        'pk-toggle': 'Toggle',
        'pk-textarea': 'Textarea',
    };

    for (const slug of vueSlugs) {
        tagToVue[`pk-${slug}`] = vueName(slug);
    }

    for (const [slug, name] of Object.entries(SPECIAL)) {
        tagToVue[`pk-${slug}`] = name;
    }

    return tagToVue;
}

function rewriteProse(text, tagToVue, vueSlugs) {
    let next = text.replace(/\]\(\/web\/components\/([^)#]+)\)/g, (match, slug) => (
        vueSlugs.has(slug) ? `](/vue/components/${slug})` : match
    ));

    next = next.replace(/\]\(\/react\/components\/([^)#]+)\)/g, (match, slug) => (
        vueSlugs.has(slug) ? `](/vue/components/${slug})` : match
    ));

    const tagsSorted = Object.keys(tagToVue).sort((a, b) => b.length - a.length);

    for (const tag of tagsSorted) {
        const name = tagToVue[tag];
        next = next.replaceAll(`<${tag}`, `<${name}`);
        next = next.replaceAll(`</${tag}>`, `</${name}>`);
        next = next.replaceAll(`\`${tag}\``, `\`${name}\``);
    }

    for (const [attr, prop] of Object.entries(ATTR_TO_PROP)) {
        next = next.replaceAll(`\`${attr}\``, `\`${prop}\``);
        next = next.replaceAll(`${attr}=`, `${prop}=`);
        next = next.replaceAll(` ${attr} `, ` ${prop} `);
        next = next.replaceAll(` ${attr}\``, ` ${prop}\``);
    }

    next = next
        .replaceAll('` attribute', '` prop')
        .replaceAll(' attribute when', ' prop when')
        .replaceAll('JSON `options` attribute', '`options` prop');

    next = next.replace(/\bpk-([a-z0-9-]+)\b/g, (match, slug) => tagToVue[`pk-${slug}`] ?? match);

    next = next.replace(
        /::: warning Web component pending[\s\S]*?:::\n*/g,
        '',
    );

    return next;
}

function hasVuePreviewsForSlug(slug) {
    if (!fs.existsSync(vueExamplesDir)) {
        return false;
    }

    return fs.readdirSync(vueExamplesDir).some((file) => (
        file.startsWith(`${slug}-`) && file.endsWith('.preview.vue.ts')
    ));
}

function rewritePreviewSrcs(content, slug) {
    // Prefer vue previews; if a specific preview file is missing, leave the src
    // (ComponentPreview will warn) — better than pointing at React.
    return content.replace(
        /<ComponentPreview\s+src="\.\/examples\/([^"]+)\.preview\.vue\.ts"\s*\/>/g,
        (full, base) => {
            const vueFile = path.join(vueExamplesDir, `${base}.preview.vue.ts`);
            if (fs.existsSync(vueFile)) {
                return full;
            }

            console.warn(`missing vue preview: ${base}.preview.vue.ts (slug ${slug})`);
            return full;
        },
    );
}

function main() {
    fs.mkdirSync(vueComponentsDir, { recursive: true });

    const reactSlugs = new Set(
        fs.readdirSync(reactComponentsDir)
            .filter((f) => f.endsWith('.md'))
            .map((f) => f.replace(/\.md$/, '')),
    );

    // Vue docs cover the same component set as React (minus React-only wrappers).
    const vueSlugs = new Set([...reactSlugs].filter((slug) => !SKIP_SLUGS.has(slug)));
    const tagToVue = buildTagMap(vueSlugs);

    for (const file of fs.readdirSync(webComponentsDir).filter((f) => f.endsWith('.md'))) {
        const slug = file.replace(/\.md$/, '');

        if (!vueSlugs.has(slug)) {
            continue;
        }

        const webPath = path.join(webComponentsDir, file);
        const vuePath = path.join(vueComponentsDir, file);
        const webContent = fs.readFileSync(webPath, 'utf8');

        let next = webContent.replaceAll('.preview.web.ts', '.preview.vue.ts');
        next = rewriteProse(next, tagToVue, vueSlugs);
        next = rewritePreviewSrcs(next, slug);

        // If Vue has no previews for this slug yet, still publish the page — prose
        // matches React/Web; live demos land as previews are generated.
        if (!hasVuePreviewsForSlug(slug) && !fs.existsSync(vuePath)) {
            console.warn(`synced vue ${slug} (no matching *.preview.vue.ts yet)`);
        }

        fs.writeFileSync(vuePath, `${next.trim()}\n`);
        console.log(`synced vue ${slug}`);
    }
}

main();
