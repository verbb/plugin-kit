import { css } from 'lit';

export const pkTiptapEditorStyles = css`
    @layer pk-component {
        :host {
            display: block;
            width: 100%;
            font-family: var(--pk-font-family);
        }

        .shell {
            overflow: hidden;
            border: var(--pk-input-border);
            border-radius: var(--pk-radius-md);
            background: #fff;
        }

        :host([invalid]) .shell,
        :host(:state(user-invalid)) .shell {
            border-color: var(--pk-color-rose-600);
        }

        .toolbar {
            display: flex;
            flex-wrap: wrap;
            gap: 0.25rem;
            padding: 0.25rem 0.5rem;
            border-bottom: 1px solid rgba(96, 125, 159, 0.4);
            background: #fff;
            box-shadow: 0 2px 3px rgba(49, 49, 93, 0.07);
        }

        .toolbar-item {
            display: inline-flex;
        }

        .toolbar-item pk-tooltip {
            display: contents;
        }

        .toolbar-btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 2rem;
            height: 2rem;
            margin: 0;
            padding: 0;
            border: 0;
            border-radius: var(--pk-radius-md);
            background: transparent;
            color: #1c2e36;
            cursor: pointer;
        }

        .toolbar-btn:hover:not(:disabled) {
            background: rgb(241, 245, 249);
        }

        .toolbar-btn[data-state='active'] {
            background: rgb(226, 232, 240);
        }

        .toolbar-btn:disabled {
            cursor: not-allowed;
            opacity: 0.5;
        }

        .toolbar-btn svg {
            display: block;
            width: 1rem;
            height: 1rem;
            pointer-events: none;
        }

        .toolbar-btn--menu {
            width: auto;
            min-width: 2rem;
            gap: 0.125rem;
            padding: 0 0.375rem;
        }

        .toolbar-btn__trigger-label {
            font-size: 0.625rem;
            font-weight: 700;
            line-height: 1;
            letter-spacing: 0.02em;
            text-transform: uppercase;
        }

        .toolbar-btn__chevron {
            display: inline-flex;
            flex-shrink: 0;
            opacity: 0.7;
        }

        .toolbar-btn__chevron svg {
            width: 0.5rem;
            height: 0.5rem;
        }

        .toolbar-separator {
            align-self: center;
            flex-shrink: 0;
            width: 1px;
            height: 1.25rem;
            margin: 0 0.125rem;
            background: rgba(96, 125, 159, 0.35);
        }

        .toolbar-btn__label {
            font-size: 0.625rem;
            font-weight: 600;
            line-height: 1;
            text-transform: uppercase;
            letter-spacing: 0.02em;
        }

        .toolbar-btn--text-style {
            max-width: 9rem;
            padding-inline: 0.5rem;
        }

        .toolbar-btn__text-style-value {
            overflow: hidden;
            font-size: var(--pk-font-size-xs);
            line-height: 1;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        .toolbar-btn--color .toolbar-btn__text-style-value {
            min-width: 1rem;
            border-bottom: 2px solid var(--text-style-trigger-color, currentColor);
            color: var(--text-style-trigger-color, currentColor);
            font-weight: 700;
            text-align: center;
        }

        pk-dropdown-menu.text-style-palette::part(panel) {
            display: grid;
            grid-template-columns: repeat(5, 2rem);
            gap: 0.625rem 0.75rem;
            width: max-content;
            min-width: 0;
            padding: 1rem;
        }

        .text-style-palette__label {
            grid-column: 1 / -1;
            color: var(--pk-color-gray-900);
        }

        .text-style-palette__label::part(label) {
            padding: 0 0 0.125rem;
            font-size: var(--pk-font-size-base);
            font-weight: 600;
        }

        .text-style-palette__label--highlight {
            margin-top: 0.375rem;
        }

        .text-style-palette__option {
            width: 2rem;
            height: 2rem;
            --pk-dropdown-item-gap: 0;
            --pk-dropdown-item-icon-size: 1.625rem;
        }

        .text-style-palette__option::part(item) {
            justify-content: center;
            width: 2rem;
            height: 2rem;
            min-height: 0;
            padding: 0;
            border-radius: 50%;
            background: transparent;
        }

        .text-style-palette__option:hover::part(item),
        .text-style-palette__option:focus-within::part(item),
        .text-style-palette__option[data-highlighted]::part(item),
        .text-style-palette__option[checked]::part(item) {
            background: transparent;
        }

        .text-style-palette__option::part(prefix) {
            width: 1.625rem;
            height: 1.625rem;
        }

        .text-style-palette__option::part(label) {
            position: absolute;
        }

        .text-style-palette__option::part(check) {
            display: none;
        }

        .text-style-palette__swatch {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 1.625rem;
            height: 1.625rem;
            box-sizing: border-box;
            border: 1px solid rgba(15, 23, 42, 0.16);
            border-radius: 50%;
        }

        /* Keep the state treatment concentric with the slotted swatch. The
           dropdown item's shadow button is wider than its prefix in some hosts. */
        .text-style-palette__option:hover .text-style-palette__swatch,
        .text-style-palette__option:focus-within .text-style-palette__swatch,
        .text-style-palette__option[data-highlighted] .text-style-palette__swatch,
        .text-style-palette__option[checked] .text-style-palette__swatch {
            box-shadow: 0 0 0 0.25rem var(--pk-color-slate-100);
        }

        .text-style-palette__swatch--text {
            border-color: var(--text-style-swatch, rgba(15, 23, 42, 0.35));
            color: var(--text-style-swatch, #1f2937);
            font-size: var(--pk-font-size-base);
            font-weight: 500;
            line-height: 1;
        }

        .text-style-palette__swatch--highlight {
            background: var(--text-style-swatch, #fff);
        }

        .text-style-palette__accessible-label {
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            white-space: nowrap;
            border: 0;
        }

        .text-style-palette pk-tooltip {
            display: contents;
        }

        /* Full toolbar replace (slot=toolbar on host when hasCustomToolbar). */
        .toolbar ::slotted([slot='toolbar']) {
            display: contents;
        }

        /* Append lane inside the stock toolbar — one flex item per slotted root (same gap). */
        .toolbar ::slotted([slot='toolbar-end']) {
            display: inline-flex;
            align-items: center;
        }

        .editor-mount {
            position: relative;
        }

        .content-error {
            display: flex;
            gap: 0.5rem;
            padding: 0.5rem 1rem;
            border-bottom: 1px solid var(--pk-color-rose-200);
            background: var(--pk-color-rose-50);
            color: var(--pk-color-rose-800);
            font-size: var(--pk-font-size-sm);
        }

        .mirror-input {
            display: none;
        }

        /* No trigger slot — collapse the host so it does not reserve shell space.
           Toolbar refresh while open is still gated by linkDialogBusy / open. */
        .link-dialog {
            display: contents;
        }

        .link-dialog__fields {
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }

        .link-bubble {
            position: absolute;
            z-index: 250;
            display: flex;
            align-items: center;
            gap: 0;
            width: max-content;
            max-width: calc(100% - 1rem);
            padding: 0;
            border: 0;
            border-radius: var(--pk-radius-md);
            background: #1c2e36;
            color: #fff;
            font-size: 12px;
            line-height: 1.5;
            overflow: visible;
            pointer-events: auto;
            white-space: nowrap;
        }

        .link-bubble__arrow {
            position: absolute;
            left: 50%;
            bottom: -0.25rem;
            width: 0.5rem;
            height: 0.5rem;
            background: #1c2e36;
            transform: translateX(-50%) rotate(45deg);
            pointer-events: none;
        }

        .link-bubble__url,
        .link-bubble__action {
            box-sizing: border-box;
            padding: 6px 8px;
            font-size: 12px;
            line-height: 1.5;
        }

        .link-bubble__url {
            display: inline-flex;
            align-items: center;
            max-width: 200px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        .link-bubble__divider {
            flex-shrink: 0;
            align-self: center;
            width: 1px;
            height: 12px;
            background: #616d73;
        }

        .link-bubble__action {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            margin: 0;
            border: 0;
            border-radius: var(--pk-radius-sm);
            background: transparent;
            color: #fff;
            font-family: inherit;
            font-weight: inherit;
            white-space: nowrap;
            cursor: pointer;
            outline: none;
            appearance: none;
            -webkit-appearance: none;
            min-height: 0;
            transition: color 0.15s ease;
        }

        .link-bubble__action:hover {
            color: rgb(255 255 255 / 0.7);
        }
    }
`;
