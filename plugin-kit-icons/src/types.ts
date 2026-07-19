/**
 * A raw, framework-agnostic icon definition.
 *
 * Sourced from Font Awesome at build time (see `scripts/generate-icons.mjs`)
 * but shipped as plain SVG path data so consumers are not tied to Font Awesome
 * (or any icon font). Consumers bring their own font/rendering system.
 */
export type PkIcon = {
    /** Intrinsic viewBox width. */
    readonly width: number;
    /** Intrinsic viewBox height. */
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
