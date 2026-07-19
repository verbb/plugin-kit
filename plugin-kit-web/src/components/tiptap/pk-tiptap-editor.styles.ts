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
