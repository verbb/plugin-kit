import { css } from 'lit';

export const pkFieldStyles = css`
    @layer pk-component {
        :host {
            display: block;
            width: 100%;
        }

        .form-control__control {
            display: block;
            position: relative;
            width: 100%;
        }

        .form-control__header--with-end {
            flex-direction: row;
            align-items: flex-start;
            justify-content: space-between;
            gap: 0.75rem;
        }

        .form-control__header-main {
            display: flex;
            flex-direction: column;
            gap: 0.125rem;
            min-width: 0;
            flex: 1 1 auto;
        }

        .form-control__header-end {
            flex-shrink: 0;
        }

        .form-control__required {
            display: inline-flex;
            align-items: center;
            color: var(--pk-color-rose-600);
            line-height: 0;
        }

        .form-control__required svg {
            display: block;
            width: 10px;
            height: 10px;
        }

        .form-control__translatable {
            display: inline-flex;
            align-items: center;
            color: var(--pk-color-gray-550);
            line-height: 0;
        }

        .form-control__translatable svg {
            display: block;
            width: 1rem;
            height: 1rem;
            fill: currentColor;
        }

        .form-control__errors {
            margin: 0;
            padding-inline-start: 20px;
            color: var(--pk-color-error);
            font-family: var(--pk-font-family);
            font-size: var(--pk-font-size-base);
            line-height: var(--pk-line-height);
            list-style: square;
        }

        .form-control__errors:empty {
            display: none;
        }

        .form-control__warning {
            display: flex;
            align-items: flex-start;
            gap: 0.25rem;
            min-width: 0;
            margin: 0;
            color: var(--pk-color-warning);
            font-family: var(--pk-font-family);
            font-size: var(--pk-font-size-base);
            line-height: var(--pk-line-height);
        }

        .form-control__warning:empty {
            display: none;
        }

        .form-control__warning-icon {
            display: inline-flex;
            flex-shrink: 0;
            margin-top: 0.3em;
            width: 0.75rem;
            height: 0.75rem;
            line-height: 0;
        }

        .form-control__warning-text {
            min-width: 0;
            margin: 0;
        }

        .form-control__warning-icon svg {
            display: block;
            width: 100%;
            height: 100%;
        }

        /* Craft .warning code — amber chip matching warning text. */
        .form-control__warning .pk-inline-markdown code {
            background-color: var(--pk-color-amber-100);
            border-color: var(--pk-color-amber-300);
        }

        .form-control__tip {
            display: flex;
            align-items: flex-start;
            gap: 0.25rem;
            min-width: 0;
            margin: 0;
            color: var(--pk-color-sky-700);
            font-family: var(--pk-font-family);
            font-size: var(--pk-font-size-base);
            line-height: var(--pk-line-height);
        }

        .form-control__tip:empty {
            display: none;
        }

        .form-control__tip-icon {
            display: inline-flex;
            flex-shrink: 0;
            margin-top: 0.3em;
            width: 0.75rem;
            height: 0.75rem;
            line-height: 0;
        }

        .form-control__tip-text {
            min-width: 0;
            margin: 0;
        }

        .form-control__tip-icon svg {
            display: block;
            width: 100%;
            height: 100%;
        }

        .form-control__tip-text a {
            text-decoration: underline;
        }

        /* Craft .tip code — sky/notice chip matching tip text. */
        .form-control__tip .pk-inline-markdown code {
            background-color: var(--pk-color-sky-100);
            border-color: var(--pk-color-sky-300);
        }

        /* Craft --bg-error / --border-error pattern for field errors. */
        .form-control__errors.pk-inline-markdown code {
            background-color: var(--pk-color-red-100);
            border-color: var(--pk-color-red-300);
        }
    }
`;
