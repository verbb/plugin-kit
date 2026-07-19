import { css } from 'lit';

/**
 * Indigo chip matching kit v1 VariableTagView (`bg-[#5C6BC0] text-white rounded-[2px]`).
 * Shared by rich editor + single-line input ProseMirror hosts.
 */
const variableTagStyles = css`
    .pk-variable-tag {
        position: relative;
        display: inline-flex;
        align-items: stretch;
        max-width: 100%;
        margin-inline: 1px;
        margin-block-start: -3px;
        padding: 0;
        border-radius: 2px;
        background: #5c6bc0;
        color: #fff;
        font-size: 11px;
        font-weight: 400;
        line-height: 1;
        white-space: nowrap;
        vertical-align: middle;
        overflow: hidden;
        cursor: default;
        box-sizing: border-box;
    }

    /* Unresolved / missing reference — muted grey (not alarm yellow). */
    .pk-variable-tag--unresolved {
        background: var(--pk-color-gray-100, #f3f4f6);
        color: var(--pk-color-gray-600, #4b5563);
        box-shadow: inset 0 0 0 1px var(--pk-color-gray-300, #d1d5db);
    }

    .pk-variable-tag--unresolved.ProseMirror-selectednode {
        box-shadow:
            inset 0 0 0 1px var(--pk-color-gray-400, #9ca3af),
            0 0 0 2px rgba(156, 163, 175, 0.45);
    }

    .pk-variable-tag.ProseMirror-selectednode {
        outline: none;
        box-shadow: 0 0 0 2px rgba(123, 140, 232, 0.5);
    }

    .pk-variable-tag__label {
        display: inline-flex;
        align-items: center;
        max-width: 220px;
        margin: 0;
        padding: 4px 5px;
        border: 0;
        background: transparent;
        color: inherit;
        font: inherit;
        font-size: inherit;
        line-height: inherit;
        text-align: left;
        overflow: hidden;
        text-overflow: ellipsis;
        cursor: pointer;
        user-select: none;
    }

    .pk-variable-tag__remove {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        align-self: stretch;
        margin: 0;
        padding: 4px 5px 4px 4px;
        border: 0;
        background: transparent;
        color: inherit;
        cursor: pointer;
        line-height: 0;
        appearance: none;
    }

    .pk-variable-tag__remove svg {
        display: block;
        width: 10px;
        height: 10px;
        pointer-events: none;
    }
`;

export const tiptapProseMirrorStyles = css`
    @layer pk-component {
        .ProseMirror {
            outline: none;
            min-height: 2rem;
            padding: 1rem;
            background: rgb(251, 252, 254);
            /* Craft CP body text (~gray-700), not gray-900. */
            color: var(--pk-color-gray-700);
            font-family: var(--pk-font-family);
            /* Match pk-input / body (14px). sm (13px) matched field instructions and looked undersized vs v1. */
            font-size: var(--pk-font-size-base);
            line-height: 1.5;
            white-space: pre-wrap;
            box-sizing: border-box;
        }

        .ProseMirror p {
            margin: 0 0 0.5rem;
        }

        .ProseMirror p:last-child {
            margin-bottom: 0;
        }

        .ProseMirror h1 {
            font-size: 1.25rem;
            font-weight: 700;
            margin: 0 0 0.5rem;
        }

        .ProseMirror h2 {
            font-size: 1.125rem;
            font-weight: 600;
            margin: 0 0 0.5rem;
        }

        .ProseMirror h3,
        .ProseMirror h4,
        .ProseMirror h5,
        .ProseMirror h6 {
            font-weight: 600;
            margin: 0 0 0.5rem;
        }

        .ProseMirror a {
            color: var(--pk-color-blue-600);
            text-decoration: underline;
            cursor: pointer;
        }

        .ProseMirror ul,
        .ProseMirror ol {
            margin: 0 0 0.5rem;
            padding-left: 1.25rem;
        }

        .ProseMirror blockquote {
            margin: 0 0 0.5rem;
            padding-left: 0.75rem;
            border-left: 3px solid var(--pk-color-gray-300);
            color: var(--pk-color-gray-600);
        }

        .ProseMirror code {
            font-family: var(--pk-font-family-mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace);
            font-size: var(--pk-font-size-mono, 0.9em);
            line-height: var(--pk-line-height-mono, 1.5);
            background: var(--pk-color-gray-100);
            border-radius: 0.2rem;
            padding: 0.1rem 0.25rem;
        }

        .ProseMirror pre {
            margin: 0 0 0.5rem;
            padding: 0.75rem;
            background: var(--pk-color-gray-900);
            color: var(--pk-color-gray-50);
            border-radius: var(--pk-radius-md);
            overflow-x: auto;
            font-family: var(--pk-font-family-mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace);
            font-size: var(--pk-font-size-mono, 0.9em);
            line-height: var(--pk-line-height-mono, 1.5);
        }

        ${variableTagStyles}
    }
`;

/**
 * Single-line TipTap field — same box metrics as `pk-input` .input
 * (14px / line-height 1.4 / padding 6px 8px).
 *
 * ProseMirror always injects `br.ProseMirror-trailingBreak` for the caret.
 * Never `display: none` it — that freezes one-liner docs after the first character.
 * Clip to one line height instead so the break cannot inflate the control.
 */
export const tiptapInputProseMirrorStyles = css`
    @layer pk-component {
        .ProseMirror {
            outline: none;
            margin: 0;
            /* Match stock pk-input padding by default. Hosts can override density via
             * --pk-tiptap-input-* (light DOM cannot style .ProseMirror in the shadow tree).
             */
            padding-block: var(--pk-tiptap-input-padding-block, 6px);
            padding-inline-start: var(--pk-tiptap-input-padding-inline-start, 8px);
            padding-inline-end: var(--pk-tiptap-input-padding-inline-end, 8px);
            /* One-liner clip: padding + control line-height (v1 text-sm), not a fixed shell token. */
            height: var(--pk-tiptap-input-height, calc(var(--pk-input-control-line-height, 1.25rem) + 12px));
            max-height: var(--pk-tiptap-input-height, calc(var(--pk-input-control-line-height, 1.25rem) + 12px));
            background: var(--pk-input-bg);
            /* Craft CP body / field value text. */
            color: var(--pk-color-gray-700);
            font-family: var(--pk-font-family);
            font-size: var(--pk-tiptap-input-font-size, var(--pk-font-size-base));
            line-height: var(--pk-tiptap-input-line-height, var(--pk-input-control-line-height, 1.25rem));
            white-space: nowrap;
            overflow-x: auto;
            overflow-y: hidden;
            box-sizing: border-box;
            scrollbar-width: none;
        }

        .ProseMirror::-webkit-scrollbar {
            display: none;
        }

        /* OneLinerDocument is inline-only; keep p inline if a schema ever wraps text. */
        .ProseMirror p {
            margin: 0;
            display: inline;
            line-height: inherit;
        }

        /* Read-only display: no input padding/height box (v1 skipped chrome when readOnly).
         * Inherit color/weight so list name links (text-blue-600 font-bold) show through. */
        :host([readonly]) .ProseMirror {
            padding-block: 0;
            padding-inline: 0;
            height: auto;
            max-height: none;
            background: transparent;
            overflow: visible;
            white-space: normal;
            color: inherit;
            font-weight: inherit;
            font-size: inherit;
        }

        ${variableTagStyles}
    }
`;

export const tiptapContentProseMirrorStyles = css`
    @layer pk-component {
        /* Inherit host color/size so light-DOM wrappers (warning banners, badges)
           can restyle read-only TipTap without piercing the shadow tree. */
        .ProseMirror {
            outline: none;
            color: inherit;
            font-family: inherit;
            font-size: inherit;
            line-height: inherit;
        }

        .ProseMirror p {
            margin: 0;
        }
    }
`;
