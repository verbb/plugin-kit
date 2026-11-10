import '@verbb/plugin-kit-web/components/chart.js';
import type { WebPreviewEnhance, WebPreviewLayout } from '../../../.vitepress/theme/components/codeBlocks';
import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';

/** Element selector → properties assigned from script once the markup is in place. */
type PropertyAssignments = Record<string, Record<string, unknown>>;

type ChartPreviewOptions = {
    label: string;
    title: string;
    /** Element markup, shown in the copyable code and mounted in the preview. */
    markup: string;
    /** Registration imports for the copyable `<script type="module">`. */
    imports?: string[];
    /** Object and array properties, which cannot be expressed as plain attributes. */
    properties?: PropertyAssignments;
    /** Extra statements appended to the copyable script, mirroring `enhance`. */
    script?: string;
    /** Preview-only wrapper markup around `markup` (the copyable code stays the element only). */
    frame?: (markup: string) => string;
    layout?: WebPreviewLayout;
    enhance?: WebPreviewEnhance;
};

const isPrimitive = (value: unknown) => value === null || ['string', 'number', 'boolean'].includes(typeof value);

const pad = (depth: number) => '  '.repeat(depth);

const objectKey = (key: string) => (/^[A-Za-z_$][\w$]*$/.test(key) ? key : `'${key}'`);

/** Serialise example data as a readable JavaScript literal for the copyable snippet. */
export function toLiteral(value: unknown, depth = 0): string {
    if (value === null || value === undefined) {
        return 'null';
    }

    if (typeof value === 'string') {
        return `'${value.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;
    }

    if (typeof value === 'number' || typeof value === 'boolean') {
        return String(value);
    }

    if (Array.isArray(value)) {
        if (value.every(isPrimitive)) {
            return `[${value.map((item) => toLiteral(item)).join(', ')}]`;
        }

        return `[\n${value.map((item) => `${pad(depth + 1)}${toLiteral(item, depth + 1)},`).join('\n')}\n${pad(depth)}]`;
    }

    const entries = Object.entries(value as Record<string, unknown>).filter(([, item]) => item !== undefined);
    const inline = `{ ${entries.map(([key, item]) => `${objectKey(key)}: ${toLiteral(item)}`).join(', ')} }`;

    if (entries.every(([, item]) => isPrimitive(item)) && inline.length <= 96) {
        return inline;
    }

    return `{\n${entries.map(([key, item]) => `${pad(depth + 1)}${objectKey(key)}: ${toLiteral(item, depth + 1)},`).join('\n')}\n${pad(depth)}}`;
}

function indent(text: string, depth: number): string {
    return text.split('\n').map((line) => (line ? `${pad(depth)}${line}` : line)).join('\n');
}

/**
 * Web preview whose copyable code is the element markup plus a module script that
 * assigns the same data the live preview uses, so the two never drift apart.
 */
export function defineChartPreview(options: ChartPreviewOptions) {
    const imports = options.imports ?? ["import '@verbb/plugin-kit-web/components/chart.js';"];
    const assignments = Object.entries(options.properties ?? {}).flatMap(([selector, properties]) => (
        Object.entries(properties).map(([name, value]) => `document.querySelector('${selector}').${name} = ${toLiteral(value)};`)
    ));
    const body = [imports.join('\n'), ...assignments, options.script?.trim()].filter(Boolean).join('\n\n');
    const markup = options.markup.trim();

    return defineWebPreview({
        label: options.label,
        title: options.title,
        layout: options.layout ?? 'plain',
        language: 'html',
        code: `${markup}\n\n<script type="module">\n${indent(body, 1)}\n</script>`,
        html: options.frame ? options.frame(markup) : markup,
        enhance: (root) => {
            for (const [selector, properties] of Object.entries(options.properties ?? {})) {
                const element = root.querySelector(selector);

                if (element) {
                    Object.assign(element, properties);
                }
            }

            return options.enhance?.(root);
        },
    });
}
