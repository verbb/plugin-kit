import { css } from "lit";
//#region src/components/connect/pk-connect.styles.ts
/**
* Connect row layout on the custom-element host (light DOM).
*
* Mirrors `styles/connect/pk-connect.css` — document CSS is canonical for CP;
* keep `:host` rules in sync as a bundled fallback when document CSS is present.
*/
var pkConnectStyles = css`
    @layer pk-component {
        :host {
            display: flex;
            flex-wrap: nowrap;
            align-items: stretch;
            justify-content: space-between;
            box-sizing: border-box;
            width: 100%;
            flex: 1 1 100%;
            min-width: 0;
            min-height: 2.75rem;
        }

        :host .heading {
            display: flex;
            align-items: center;
            gap: var(--pk-connect-status-gap, 15px);
            margin: 0;
            flex: 1 1 auto;
            min-width: 0;
            line-height: 1.125rem;
            padding-block: 0.75rem;
            padding-inline: var(--pk-connect-heading-padding-inline, var(--m, 1rem) var(--s, 0.75rem));
            color: var(--pk-connect-heading-color, var(--gray-600, #515f6c));
        }

        :host .heading:only-child {
            flex: 1 1 100%;
        }

        :host .input {
            display: flex;
            align-items: center;
            flex: 0 0 auto;
            padding-block: var(--pk-connect-input-padding-block, var(--s, 0.75rem));
            padding-inline: var(--pk-connect-input-padding-inline, 10px var(--m, 1rem));
        }

        :host .heading .light {
            color: var(--pk-connect-muted-color, var(--gray-500, #606d7b));
        }

        :host .heading pk-status.pk-connect__status-icon {
            display: block;
            flex-shrink: 0;
            width: 0.75rem;
            height: 0.75rem;
            --pk-status-ring: var(--gray-500);
        }

        :host .heading .warning.with-icon::before {
            margin-inline-end: 7px;
        }
    }
`;
//#endregion
export { pkConnectStyles as t };

//# sourceMappingURL=pk-connect.styles-BhW406jt.js.map