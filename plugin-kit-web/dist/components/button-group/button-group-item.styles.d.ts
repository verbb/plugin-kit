import { CSSResult } from 'lit';
/**
 * Apply grouped corner radii on an inner surface — reads vars set by `pk-button-group` on the host.
 * Mirrors  `--_button-*-radius` consumption in `pk-button`.
 */
export declare function buttonGroupCornerRadiusStyles(surfaceSelector: string, fallbackRadius?: string): CSSResult;
/** Zero inner corner radii based on group position — consumed by `buttonGroupCornerRadiusStyles`. */
export declare function buttonGroupCornerRoleStyles(): CSSResult;
/** Overlap margins for grouped controls — axis follows group orientation. */
export declare function buttonGroupIndentStyles(): CSSResult;
/** Collapse the shared internal border edge on bordered grouped surfaces. */
export declare function buttonGroupBorderJoinStyles(surfaceSelector: string): CSSResult;
//# sourceMappingURL=button-group-item.styles.d.ts.map