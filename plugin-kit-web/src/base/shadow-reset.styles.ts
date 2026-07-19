import { css } from 'lit';

/**
 * Shadow-root baseline — box model + inherited typography inside every pk-* component.
 * Applied via PkElement.createRenderRoot(); does not replace per-component styles.
 */
export const shadowResetStyles = css`
    @layer pk-reset {
        :host {
            box-sizing: border-box;
        }

        :host *,
        :host *::before,
        :host *::after {
            box-sizing: border-box;
        }

        :host(:not([hidden])) {
            /* Prevent UA / CP margin on unstyled custom element hosts in light DOM. */
            margin: 0;
        }
    }
`;
