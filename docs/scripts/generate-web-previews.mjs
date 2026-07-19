#!/usr/bin/env node
/**
 * Generate web/components/examples/*.preview.web.ts from react preview metadata
 * and rewrite web/components/*.md with ComponentPreview tags.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import {
    PREVIEW_CODE,
    PREVIEW_HTML,
    importsForPreview,
} from './web-preview-catalog.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const docsRoot = path.resolve(__dirname, '..');
const reactExamplesDir = path.join(docsRoot, 'react/components/examples');
const webExamplesDir = path.join(docsRoot, 'web/components/examples');
const reactComponentsDir = path.join(docsRoot, 'react/components');
const webComponentsDir = path.join(docsRoot, 'web/components');

const SKIP_PREVIEW_NAMES = new Set([
    'button-variants',
    'button-sizes',
    'button-icons',
    'button-icon-only-sizes',
    'button-loading',
    'button-disabled-link',
    // Built from @verbb/plugin-kit-icons at runtime — do not overwrite with catalog stub.
    'icon-gallery',
    // Full status alias grid built at runtime — do not overwrite with catalog stub.
    'status-variants',
    // Multi-variant overflow stack — do not overwrite with catalog stub.
    'tabs-disabled-overflow',
    // Live character-count enhance — do not overwrite with catalog stub.
    'textarea-character-count',
    // Live Value: enhance for all-option — do not overwrite with catalog stub.
    'checkbox-select-all-option',
    // Live Value: enhance for selected-values — do not overwrite with catalog stub.
    'checkbox-select-selected-values',
    // Encodes a multi-line email template at runtime to match React — do not overwrite.
    'code-editor-long-html',
    // Encodes React-matching language samples at runtime — do not overwrite.
    'code-editor-languages',
    // Layout demos + lineNumbers=false enhance — do not overwrite.
    'code-editor-layout',
    // Matches React validation/read-only samples — do not overwrite.
    'code-editor-states',
    // Labeled size rows + clean copyable code — do not overwrite.
    'combobox-sizes',
    // Seeds multi-select `values` via enhance (JS property) — do not overwrite.
    'combobox-multiple',
    // Static + delay toggles + async fetchOptions — do not overwrite with catalog stub.
    'combobox-high-level-input',
    // Async fetchOptions demo (no static options) — do not overwrite with catalog stub.
    'combobox-async-search',
]);

function shouldSkipPreview(name) {
    if (SKIP_PREVIEW_NAMES.has(name)) {
        return true;
    }

    // Calendar demos compute values relative to today — keep hand-authored previews.
    if (name.startsWith('calendar-')) {
        return true;
    }

    return name.startsWith('editable-table-');
}

const WEB_SECTION_PROSE = {
    input: {
        Adornments: `Use \`slot="start"\` / \`slot="end"\` for icons or short units **inside** the field border. Prefer this for a single leading/trailing glyph (search, currency). Use [input groups](/web/components/input-group) when the adornment is a separate control (button, select) or multi-part addon.

\`\`\`html
<pk-input placeholder="Search">
  <pk-icon slot="start" icon="search"></pk-icon>
</pk-input>
\`\`\``,
    },
    combobox: {
        'Higher-Level Input API': `\`pk-combobox\` covers the common single-select and async loading cases — static \`pk-option\` children for local lists, or \`async\` + \`fetchOptions\` when results come from a remote search.`,
        'Async Search': `Set \`async\` and assign \`fetchOptions={(query, signal) => ...}\` (a JS property) so options load as the user types. No static \`pk-option\` children are needed — the control owns loading and empty states.`,
    },
};

function parseReactPreviewMeta(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const label = content.match(/label:\s*'([^']+)'/)?.[1]
        ?? content.match(/label:\s*"([^"]+)"/)?.[1]
        ?? 'Preview';
    const title = content.match(/title:\s*'([^']+)'/)?.[1]
        ?? content.match(/title:\s*"([^"]+)"/)?.[1]
        ?? `${label} example`;
    const layout = content.includes('stackStyle') ? 'stack' : content.includes('rowStyle') ? 'row' : 'plain';

    return { label, title, layout };
}

function buildPreviewFile(name, meta) {
    const html = PREVIEW_HTML[name];

    if (!html) {
        throw new Error(`Missing HTML catalog entry for ${name}`);
    }

    const imports = importsForPreview(name);
    const importLines = imports.map((entry) => `import '${entry}';`).join('\n');
    const code = PREVIEW_CODE[name];
    const codeLine = code ? `    code: \`\n${code}\n\`.trim(),\n` : '';

    return `${importLines}
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

export default defineWebPreview({
    label: '${meta.label.replace(/'/g, "\\'")}',
    title: '${meta.title.replace(/'/g, "\\'")}',
    layout: '${meta.layout}',
${codeLine}\
    html: \`
${html}
\`.trim(),
});
`;
}

function parseComponentMd(content) {
    const lines = content.split('\n');
    const title = lines[0].replace(/^#\s+/, '').trim();
    let i = 1;

    while (i < lines.length && lines[i].trim() === '') {
        i += 1;
    }

    const introLines = [];

    while (i < lines.length && !lines[i].startsWith('## ') && !lines[i].startsWith('<ComponentPreview') && !lines[i].startsWith(':::')) {
        introLines.push(lines[i]);
        i += 1;
    }

    const sections = [];

    while (i < lines.length) {
        if (lines[i].startsWith('## ')) {
            const heading = lines[i].replace(/^##\s+/, '').trim();
            i += 1;
            const proseLines = [];
            const previews = [];

            while (i < lines.length && !lines[i].startsWith('## ')) {
                const previewMatch = lines[i].match(/^<ComponentPreview\s+src="\.\/examples\/([^"]+)\.preview\.tsx"\s*\/?>$/);

                if (previewMatch) {
                    previews.push(previewMatch[1]);
                } else if (!lines[i].match(/^<ComponentPreview/)) {
                    proseLines.push(lines[i]);
                }

                i += 1;
            }

            sections.push({
                heading,
                prose: proseLines.join('\n').trim(),
                previews,
            });
        } else {
            i += 1;
        }
    }

    return {
        title,
        intro: introLines.join('\n').trim(),
        sections,
    };
}

function isBaseUiApiSection(heading, prose) {
    return heading.toLowerCase() === 'api reference' && /base ui/i.test(prose);
}

function pkTag(slug) {
    if (slug === 'checkbox-input') {
        return 'pk-checkbox';
    }

    const map = {
        'tiptap-editor': 'pk-tiptap-editor',
        'tiptap-input': 'pk-tiptap-input',
        'tiptap-content': 'pk-tiptap-content',
    };

    return map[slug] ?? `pk-${slug}`;
}

function extractWebIntro(webContent) {
    const lines = webContent.split('\n');
    const intro = [];

    for (let i = 1; i < lines.length; i += 1) {
        const line = lines[i];

        if (line.startsWith('`pk-') || line.startsWith(':::') || line.startsWith('## ') || line.startsWith('- [React')) {
            break;
        }

        if (line.trim()) {
            intro.push(line);
        }
    }

    return intro.join('\n').trim();
}

function buildWebPage(slug, reactParsed, webContent) {
    const tag = pkTag(slug);
    const webIntro = extractWebIntro(webContent) || reactParsed.intro.replace(/^::: info[\s\S]*?:::\s*/m, '').trim();
    const lines = [
        `# ${reactParsed.title}`,
        '',
        webIntro,
        '',
    ];

    if (slug === 'checkbox' && !webIntro.includes('CheckboxInput')) {
        lines.push(
            'For the common labeled row pattern, use [CheckboxInput](/web/components/checkbox-input).',
            '',
        );
    }

    if (!tag) {
        lines.push(
            '::: warning Web component pending',
            'This UI is currently documented through the **React 1.x** stack only. A `<pk-*>` web component is planned.',
            ':::',
            '',
        );
    }

    for (const section of reactParsed.sections) {
        if (isBaseUiApiSection(section.heading, section.prose)) {
            continue;
        }

        if ((section.previews?.length ?? 0) > 0 && !section.prose) {
            continue;
        }

        lines.push(`## ${section.heading}`, '');

        if (section.prose || WEB_SECTION_PROSE[slug]?.[section.heading]) {
            lines.push(WEB_SECTION_PROSE[slug]?.[section.heading] ?? section.prose, '');
        }

        for (const previewName of section.previews ?? []) {
            if (PREVIEW_HTML[previewName]) {
                lines.push(`<ComponentPreview src="./examples/${previewName}.preview.web.ts" />`, '');
            }
        }
    }

    return `${lines.join('\n').trim()}\n`;
}

function main() {
    fs.mkdirSync(webExamplesDir, { recursive: true });

    const reactPreviews = fs.readdirSync(reactExamplesDir)
        .filter((file) => file.endsWith('.preview.tsx'))
        .map((file) => file.replace('.preview.tsx', ''))
        .filter((name) => !shouldSkipPreview(name));

    let created = 0;
    const missing = [];

    for (const name of reactPreviews) {
        if (!PREVIEW_HTML[name]) {
            missing.push(name);
            continue;
        }

        const meta = parseReactPreviewMeta(path.join(reactExamplesDir, `${name}.preview.tsx`));
        const outputPath = path.join(webExamplesDir, `${name}.preview.web.ts`);
        fs.writeFileSync(outputPath, buildPreviewFile(name, meta));
        created += 1;
    }

    const mdUpdated = [];

    for (const file of fs.readdirSync(reactComponentsDir).filter((entry) => entry.endsWith('.md'))) {
        const slug = file.replace(/\.md$/, '');

        // Button keeps hand-authored web-only prose (icon density). Do not overwrite it.
        if (slug === 'button') {
            continue;
        }

        const reactPath = path.join(reactComponentsDir, file);
        const webPath = path.join(webComponentsDir, file);
        const reactParsed = parseComponentMd(fs.readFileSync(reactPath, 'utf8'));
        const existingWeb = fs.existsSync(webPath) ? fs.readFileSync(webPath, 'utf8') : '';
        fs.writeFileSync(webPath, buildWebPage(slug, reactParsed, existingWeb));
        mdUpdated.push(slug);
    }

    console.log(`Created/updated ${created} preview.web.ts files`);
    console.log(`Updated ${mdUpdated.length} web component md files`);

    if (missing.length > 0) {
        console.log('Missing HTML catalog entries:', missing.join(', '));
        process.exitCode = 1;
    }
}

main();
