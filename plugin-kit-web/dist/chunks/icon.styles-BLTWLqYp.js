import { css } from "lit";
//#region src/base/icon.styles.ts
/** Shared icon sizing for slotted SVGs inside shadow DOM. */
var iconStyles = css`
    @layer pk-component {
        slot[name='start']::slotted(svg),
        slot[name='end']::slotted(svg) {
            display: block;
            width: 1em;
            height: 1em;
            flex-shrink: 0;
            pointer-events: none;
            vertical-align: middle;
            overflow: visible;
        }
    }
`;
//#endregion
export { iconStyles as t };

//# sourceMappingURL=icon.styles-BLTWLqYp.js.map