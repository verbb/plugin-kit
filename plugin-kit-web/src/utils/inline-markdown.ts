import { nothing } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { until } from 'lit/directives/until.js';

type InlineRenderer = (content: string) => string;

/*
 * markdown-it (with linkify-it) is about 260 KB, and every labelled control renders through `pk-field`. A static
 * import would put it in every consumer's bundle, so the renderer loads on first use in its own chunk. Once it has
 * loaded, rendering is synchronous; until then a field shows its text as written, then swaps in the formatted HTML.
 */
let renderer: InlineRenderer | undefined;
let loading: Promise<InlineRenderer> | undefined;

const loadRenderer = (): Promise<InlineRenderer> =>
    (loading ??= import('@verbb/plugin-kit-core/utils/markdown').then((module) => (renderer = module.renderInlineMarkdown)));

const toTemplate = (html: string) => (html ? unsafeHTML(html) : nothing);

/** Renders inline markdown for Lit templates (bold, italic, links, code). */
export function inlineMarkdown(content: string): unknown {
    if (!content) {
        return nothing;
    }

    if (renderer) {
        return toTemplate(renderer(content));
    }

    return until(loadRenderer().then((render) => toTemplate(render(content))), content);
}
