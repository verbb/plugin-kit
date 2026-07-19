import type { PkIcon, PkIconRenderOptions } from './types.js';

const escapeHtml = (value: string): string => {
    return value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
};

/** Build the `viewBox` value for an icon. */
export const iconViewBox = (icon: PkIcon): string => {
    return `0 0 ${icon.width} ${icon.height}`;
};

/**
 * Render a {@link PkIcon} to a standalone SVG markup string.
 *
 * Framework-agnostic: web components pass the result through Lit's `unsafeSVG`,
 * or parse it into an element. React consumers should use their own component
 * (the raw {@link PkIcon} data is exported for that purpose).
 */
export const iconToSvg = (icon: PkIcon, options: PkIconRenderOptions = {}): string => {
    const { title, className, attributes = {} } = options;

    const attrs: Record<string, string> = {
        xmlns: 'http://www.w3.org/2000/svg',
        viewBox: iconViewBox(icon),
        ...attributes,
    };

    if (className) {
        attrs.class = className;
    }

    if (title) {
        attrs.role = 'img';
    } else {
        attrs['aria-hidden'] = 'true';
        attrs.focusable = 'false';
    }

    const attrString = Object.entries(attrs)
        .map(([key, value]) => { return `${key}="${escapeHtml(value)}"`; })
        .join(' ');

    const titleMarkup = title ? `<title>${escapeHtml(title)}</title>` : '';

    return `<svg ${attrString}>${titleMarkup}<path fill="currentColor" d="${escapeHtml(icon.path)}"/></svg>`;
};
