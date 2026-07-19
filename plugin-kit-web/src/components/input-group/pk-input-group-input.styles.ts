import { css } from 'lit';

export const pkInputGroupInputStyles = css`
    @layer pk-component {
        :host {
            display: flex;
            flex: 1 1 auto;
            min-width: 0;
            align-self: stretch;
        }

        .input {
            display: block;
            width: 100%;
            min-width: 0;
            margin: 0;
            padding: 6px 8px;
            border: 0;
            border-radius: 0;
            background: transparent;
            color: var(--pk-color-gray-700);
            font: inherit;
            line-height: 1.4;
            appearance: none;
            box-sizing: border-box;
            box-shadow: none;
            outline: none;
        }

        .input::placeholder {
            color: var(--pk-input-placeholder-color, var(--pk-color-gray-400));
        }

        .input:disabled {
            cursor: not-allowed;
        }

        :host([size='xs']) .input {
            padding: 4px 6px;
            font-size: 11px;
        }

        :host([size='sm']) .input {
            padding: 4px 8px;
            font-size: 12px;
        }

        :host([size='lg']) .input {
            padding: 8px 12px;
            font-size: var(--pk-font-size-base);
        }

        :host([size='xl']) .input {
            padding: 10px 16px;
            font-size: 16px;
        }
    }
`;
