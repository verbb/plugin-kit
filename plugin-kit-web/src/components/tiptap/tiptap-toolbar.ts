import {
    alignCenter,
    alignJustify,
    alignLeft,
    alignRight,
    arrowRotateLeft,
    arrowRotateRight,
    bold,
    bracketsCurly,
    chevronDown,
    code,
    fileDashedLine,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    heading,
    highlighter,
    italic,
    link,
    listOl,
    listUl,
    minus,
    paragraph,
    quoteRight,
    strikethrough,
    subscript,
    superscript,
    table,
    textSlash,
    underline,
    renderIconHtml,
} from '../../icons/index.js';

export const TOOLBAR_CHEVRON_HTML = renderIconHtml(chevronDown);

export const TOOLBAR_ICONS: Record<string, string> = {
    bold: renderIconHtml(bold),
    italic: renderIconHtml(italic),
    underline: renderIconHtml(underline),
    strikethrough: renderIconHtml(strikethrough),
    subscript: renderIconHtml(subscript),
    superscript: renderIconHtml(superscript),
    code: renderIconHtml(bracketsCurly),
    'code-block': renderIconHtml(code),
    highlight: renderIconHtml(highlighter),
    h1: renderIconHtml(h1),
    h2: renderIconHtml(h2),
    h3: renderIconHtml(h3),
    h4: renderIconHtml(h4),
    h5: renderIconHtml(h5),
    h6: renderIconHtml(h6),
    heading: renderIconHtml(heading),
    paragraph: renderIconHtml(paragraph),
    'unordered-list': renderIconHtml(listUl),
    'ordered-list': renderIconHtml(listOl),
    blockquote: renderIconHtml(quoteRight),
    'align-left': renderIconHtml(alignLeft),
    'align-center': renderIconHtml(alignCenter),
    'align-right': renderIconHtml(alignRight),
    'align-justify': renderIconHtml(alignJustify),
    'clear-format': renderIconHtml(textSlash),
    hr: renderIconHtml(minus),
    'line-break': renderIconHtml(fileDashedLine),
    link: renderIconHtml(link),
    table: renderIconHtml(table),
    undo: renderIconHtml(arrowRotateLeft),
    redo: renderIconHtml(arrowRotateRight),
};

export const TOOLBAR_LABELS: Record<string, string> = {
    bold: 'Bold',
    italic: 'Italic',
    underline: 'Underline',
    strikethrough: 'Strikethrough',
    subscript: 'Subscript',
    superscript: 'Superscript',
    code: 'Inline code',
    'code-block': 'Code block',
    highlight: 'Highlight',
    h1: 'Heading 1',
    h2: 'Heading 2',
    h3: 'Heading 3',
    h4: 'Heading 4',
    h5: 'Heading 5',
    h6: 'Heading 6',
    paragraph: 'Paragraph',
    'unordered-list': 'Bullet list',
    'ordered-list': 'Numbered list',
    blockquote: 'Blockquote',
    'align-left': 'Align left',
    'align-center': 'Align center',
    'align-right': 'Align right',
    'align-justify': 'Justify',
    'clear-format': 'Clear format',
    hr: 'Horizontal rule',
    'line-break': 'Line break',
    link: 'Link',
    table: 'Table',
    undo: 'Undo',
    redo: 'Redo',
};

export function getToolbarMenuItemLabel(buttonName: string): string {
    return TOOLBAR_LABELS[buttonName] ?? buttonName;
}

/** Prefix icon for `pk-dropdown-item` — SVG must carry `slot="prefix"` directly. */
export function createToolbarPrefixIcon(buttonName: string): SVGSVGElement | null {
    const iconHtml = TOOLBAR_ICONS[buttonName];

    if (!iconHtml) {
        return null;
    }

    const template = document.createElement('template');
    template.innerHTML = iconHtml.trim();
    const icon = template.content.firstElementChild;

    if (!(icon instanceof SVGSVGElement)) {
        return null;
    }

    icon.setAttribute('slot', 'prefix');
    icon.setAttribute('aria-hidden', 'true');
    icon.setAttribute('width', '12');
    icon.setAttribute('height', '12');
    icon.classList.add('pk-dropdown-item__prefix-icon');

    return icon;
}
