import { css } from 'lit';

export const pkInputGroupTextareaStyles = css`
    @layer pk-component {
        :host {
            display: flex;
            flex: 1 1 auto;
            min-width: 0;
            align-self: stretch;
        }

        .textarea {
            display: block;
            width: 100%;
            min-width: 0;
            min-height: 5rem;
            margin: 0;
            padding: 7px 10px;
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
            resize: none;
        }

        .textarea::placeholder {
            color: var(--pk-color-gray-400);
        }

        .textarea:disabled {
            cursor: not-allowed;
        }
    }
`;
