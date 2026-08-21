import { PkIcon, PkIconRenderOptions } from './types.js';
/**
 * Build the render `viewBox` for an icon.
 *
 * Glyphs are stored edge-cropped (variable width × canvas height). `<pk-icon>`
 * always paints into a square `1em` host, so we expand the viewBox to a centered
 * square of `max(width, height)` without rewriting path data.
 */
export declare const iconViewBox: (icon: PkIcon) => string;
/**
 * Render a {@link PkIcon} to a standalone SVG markup string.
 *
 * Framework-agnostic: web components pass the result through Lit's `unsafeSVG`,
 * or parse it into an element. React consumers should use their own component
 * (the raw {@link PkIcon} data is exported for that purpose).
 *
 * Sets `overflow="visible"` so glyphs that intentionally extend past the icon
 * canvas (for example slash variants) are not clipped when a parent uses
 * `overflow: hidden`.
 */
export declare const iconToSvg: (icon: PkIcon, options?: PkIconRenderOptions) => string;
//# sourceMappingURL=svg.d.ts.map