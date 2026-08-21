/**
 * A raw, framework-agnostic icon definition.
 *
 * Path data is stored edge-cropped (variable width × canvas height — usually
 * 512). {@link iconViewBox} expands that to a centered square at render so every
 * glyph fills `<pk-icon>`’s square `1em` host evenly, without rewriting paths.
 *
 * Shipped as plain `{ width, height, path }` — no icon font or external icon
 * runtime required.
 */
export type PkIcon = {
    /** Intrinsic glyph width (edge-cropped canvas). */
    readonly width: number;
    /** Intrinsic glyph height (edge-cropped canvas). */
    readonly height: number;
    /** SVG path `d` attribute data. */
    readonly path: string;
};
/** Options for rendering a {@link PkIcon} to an SVG string. */
export type PkIconRenderOptions = {
    /**
     * Accessible title. When provided the SVG is exposed as an image
     * (`role="img"`) with a `<title>`; otherwise it is hidden from the
     * accessibility tree (`aria-hidden="true"`).
     */
    title?: string;
    /** Value for the SVG `class` attribute. */
    className?: string;
    /** Additional attributes to set on the root `<svg>` element. */
    attributes?: Record<string, string>;
};
//# sourceMappingURL=types.d.ts.map