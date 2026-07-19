import { renderInlineMarkdown } from '@verbb/plugin-kit-core';
import { nothing } from 'lit';
import { unsafeHTML, type UnsafeHTMLDirective } from 'lit/directives/unsafe-html.js';
import type { DirectiveResult } from 'lit/directive.js';

/** Renders inline markdown for Lit templates (bold, italic, links, code). */
export function inlineMarkdown(content: string): DirectiveResult<typeof UnsafeHTMLDirective> | typeof nothing {
    if (!content) {
        return nothing;
    }

    const html = renderInlineMarkdown(content);

    if (!html) {
        return nothing;
    }

    return unsafeHTML(html);
}
