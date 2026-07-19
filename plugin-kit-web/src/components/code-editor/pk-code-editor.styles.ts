import { css } from 'lit';

export const pkCodeEditorStyles = css`
    @layer pk-component {
        :host {
            display: block;
            width: 100%;
            font-family: var(--pk-font-family);
        }

        .shell {
            overflow: hidden;
            border: 1px solid rgba(96, 125, 159, 0.4);
            border-radius: var(--pk-radius-sm);
            background: #ffffff;
        }

        .shell:focus-within {
            border-color: var(--pk-color-sky-600);
            box-shadow:
                0 0 0 1px var(--pk-color-sky-600),
                0 0 4px 0 color-mix(in srgb, var(--pk-color-sky-600) 70%, transparent);
        }

        :host([invalid]) .shell,
        :host(:state(user-invalid)) .shell {
            border-color: var(--pk-color-rose-600);
        }

        :host([invalid]) .shell:focus-within,
        :host(:state(user-invalid)) .shell:focus-within {
            border-color: var(--pk-color-rose-600);
            box-shadow:
                0 0 0 1px var(--pk-color-rose-600),
                0 0 4px 0 color-mix(in srgb, var(--pk-color-rose-600) 70%, transparent);
        }

        :host([disabled]),
        :host([readonly]) {
            opacity: 0.7;
        }

        .editor-mount {
            min-height: var(--pk-code-editor-min-height, 12rem);
        }

        .editor-mount .cm-editor {
            min-height: inherit;
        }

        .mirror-input {
            display: none;
        }
    }
`;
