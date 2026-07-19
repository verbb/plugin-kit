import { iconToSvg, type PkIcon } from '@verbb/plugin-kit-icons';

export type RenderIconOptions = {
    title?: string;
};

export const renderIconHtml = (
    icon: PkIcon,
    options: RenderIconOptions = {},
): string => {
    return iconToSvg(icon, { title: options.title });
};

export const createIconElement = (
    icon: PkIcon,
    options: RenderIconOptions = {},
): SVGSVGElement => {
    const template = document.createElement('template');
    template.innerHTML = renderIconHtml(icon, options);

    const element = template.content.firstElementChild;

    if (!(element instanceof SVGSVGElement)) {
        throw new Error('Icon render did not produce an SVG element.');
    }

    return element;
};
