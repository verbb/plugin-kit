#!/usr/bin/env node
/**
 * Sync docs/react/components/*.md from docs/web/components/*.md.
 *
 * React pages get the same teaching prose as web, with:
 * - `.preview.web.ts` → `.preview.tsx`
 * - `pk-*` tags / links rewritten to React component names / `/react/components/…`
 * - no WC “canonical API” / facade intro
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const docsRoot = path.resolve(__dirname, '..');
const reactComponentsDir = path.join(docsRoot, 'react/components');
const webComponentsDir = path.join(docsRoot, 'web/components');

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

function reactName(slug) {
    if (Object.prototype.hasOwnProperty.call(SPECIAL, slug)) {
        return SPECIAL[slug];
    }

    return slug
        .split('-')
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join('');
}

function buildTagMap(reactSlugs) {
    const tagToReact = {
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

    for (const slug of reactSlugs) {
        tagToReact[`pk-${slug}`] = reactName(slug);
    }

    for (const [slug, name] of Object.entries(SPECIAL)) {
        tagToReact[`pk-${slug}`] = name;
    }

    return tagToReact;
}

function rewriteProse(text, tagToReact, reactSlugs) {
    let next = text.replace(/\]\(\/web\/components\/([^)#]+)\)/g, (match, slug) => (
        reactSlugs.has(slug) ? `](/react/components/${slug})` : match
    ));

    const tagsSorted = Object.keys(tagToReact).sort((a, b) => b.length - a.length);

    for (const tag of tagsSorted) {
        const name = tagToReact[tag];
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

    next = next.replace(/\bpk-([a-z0-9-]+)\b/g, (match, slug) => tagToReact[`pk-${slug}`] ?? match);

    // Drop web-only pending callouts on React pages.
    next = next.replace(
        /::: warning Web component pending[\s\S]*?:::\n*/g,
        '',
    );

    return next;
}

function main() {
    const reactSlugs = new Set(
        fs.readdirSync(reactComponentsDir)
            .filter((f) => f.endsWith('.md'))
            .map((f) => f.replace(/\.md$/, '')),
    );
    const tagToReact = buildTagMap(reactSlugs);

    for (const file of fs.readdirSync(webComponentsDir).filter((f) => f.endsWith('.md'))) {
        const slug = file.replace(/\.md$/, '');
        const reactPath = path.join(reactComponentsDir, file);

        if (!fs.existsSync(reactPath)) {
            continue;
        }

        // React-only surfaces (e.g. EditableTable) keep their local preview blocks —
        // sync prose from web but re-attach any existing ComponentPreview lines by section.
        const webContent = fs.readFileSync(path.join(webComponentsDir, file), 'utf8');
        const existingReact = fs.readFileSync(reactPath, 'utf8');
        const existingPreviewsByHeading = new Map();
        const sectionRe = /^## (.+)$/gm;
        const headings = [...existingReact.matchAll(sectionRe)].map((m) => m[1]);
        for (const heading of headings) {
            const block = existingReact.split(`## ${heading}`)[1]?.split(/\n## /)[0] ?? '';
            const previews = [...block.matchAll(/<ComponentPreview\s+src="([^"]+)"\s*\/?>/g)].map((m) => m[0]);
            if (previews.length) {
                existingPreviewsByHeading.set(heading, previews);
            }
        }

        let next = webContent.replaceAll('.preview.web.ts', '.preview.tsx');
        next = rewriteProse(next, tagToReact, reactSlugs);

        // If web omitted previews but React already had them, restore under matching headings.
        for (const [heading, previews] of existingPreviewsByHeading) {
            const headingLine = `## ${heading}`;
            if (!next.includes(headingLine)) {
                continue;
            }

            if (next.includes(`${headingLine}`) && !new RegExp(
                `## ${heading.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}[\\s\\S]*?<ComponentPreview`,
            ).test(next)) {
                next = next.replace(
                    new RegExp(`(## ${heading.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\n\\n[\\s\\S]*?)(?=\\n## |$)`),
                    (block) => `${block.trimEnd()}\n\n${previews.join('\n\n')}\n`,
                );
            }
        }

        fs.writeFileSync(reactPath, `${next.trim()}\n`);
        console.log(`synced react ${slug}`);
    }
}

main();
