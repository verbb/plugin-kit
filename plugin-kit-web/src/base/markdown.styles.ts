import { css } from 'lit';

/** Shared inline markdown styling for field instructions, errors, and warnings. */
export const inlineMarkdownStyles = css`
    @layer pk-component {
        .pk-inline-markdown a {
            color: var(--pk-color-blue-500);
            text-decoration: none;
        }

        .pk-inline-markdown a:hover {
            text-decoration: underline;
        }

        /* Craft p code — gray chip; tip/warning/error override bg/border on pk-field. */
        .pk-inline-markdown code {
            /* Craft --border-hairline ≈ gray-800 @ 10%. */
            border: 1px solid color-mix(in srgb, var(--pk-color-gray-800) 10%, transparent);
            border-radius: var(--pk-radius-sm);
            background: var(--pk-color-gray-100);
            padding-block: 0.0625em;
            padding-inline: 0.25em;
            font-family: var(--pk-font-family-mono, ui-monospace, monospace);
            /* v1 field help/errors used [&_code]:text-[0.85em] — tighter than --pk-font-size-mono (0.9em). */
            font-size: var(--pk-inline-markdown-code-font-size, 0.85em);
            line-height: var(--pk-line-height-mono, 1.5);
            /* Inherit tip/warning/error/instructions text color (Craft parity). */
            color: inherit;
        }
    }
`;
