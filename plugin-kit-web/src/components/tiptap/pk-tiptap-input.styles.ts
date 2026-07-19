import { css } from 'lit';

export const pkTiptapInputStyles = css`
    @layer pk-component {
        :host {
            display: block;
            width: 100%;
            font-family: var(--pk-font-family);
            font-size: var(--pk-font-size-base);
            line-height: 1.4;
        }

        /* Same chrome as pk-input .input — border/radius live on the shell. */
        .shell {
            box-sizing: border-box;
            border: var(--pk-input-border);
            border-radius: var(--pk-input-border-radius, var(--pk-radius-sm));
            background: var(--pk-input-bg);
            overflow: hidden;
        }

        :host([invalid]) .shell,
        :host(:state(user-invalid)) .shell {
            border-color: var(--pk-color-rose-600);
        }

        /* Editable-table cells (v1): flush TipTap shell — chips sit in the row, not a boxed field. */
        :host([fit-cell]),
        :host([data-editable-table-input]) {
            display: block;
            height: 100%;
            min-height: 100%;
            box-sizing: border-box;
        }

        :host([fit-cell]) .shell,
        :host([data-editable-table-input]) .shell {
            border: none;
            border-radius: 0;
            background: transparent;
            box-shadow: none;
            height: 100%;
            min-height: 100%;
        }

        /* Read-only display (lists, picker cards): v1 skipped input chrome when readOnly. */
        :host([readonly]) .shell {
            border: none;
            border-radius: 0;
            background: transparent;
            box-shadow: none;
            overflow: visible;
        }

        :host([fit-cell][invalid]) .shell,
        :host([fit-cell]:state(user-invalid)) .shell,
        :host([data-editable-table-input][invalid]) .shell,
        :host([data-editable-table-input]:state(user-invalid)) .shell {
            border: none;
            box-shadow: inset 0 0 0 1px var(--pk-color-rose-600);
        }

        .editor-mount {
            display: block;
            min-width: 0;
        }

        .mirror-input {
            display: none;
        }
    }
`;
