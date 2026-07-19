import { PkIcon, PkIconRenderOptions } from './types.js';
/** Build the `viewBox` value for an icon. */
export declare const iconViewBox: (icon: PkIcon) => string;
/**
 * Render a {@link PkIcon} to a standalone SVG markup string.
 *
 * Framework-agnostic: web components pass the result through Lit's `unsafeSVG`,
 * or parse it into an element. React consumers should use their own component
 * (the raw {@link PkIcon} data is exported for that purpose).
 */
export declare const iconToSvg: (icon: PkIcon, options?: PkIconRenderOptions) => string;
//# sourceMappingURL=svg.d.ts.map