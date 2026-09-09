import type {
    PkImageBrowserGroup,
    PkImageBrowserItem,
} from '@verbb/plugin-kit-web/components/image-browser/pk-image-browser.js';

/** Font Awesome Free solid glyphs for docs demos (inline SVG markup). */
export const docsIconSvg = {
    star: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 576 512\"><path d=\"M309.5-18.9c-4.1-8-12.4-13.1-21.4-13.1s-17.3 5.1-21.4 13.1L193.1 125.3 33.2 150.7c-8.9 1.4-16.3 7.7-19.1 16.3s-.5 18 5.8 24.4l114.4 114.5-25.2 159.9c-1.4 8.9 2.3 17.9 9.6 23.2s16.9 6.1 25 2L288.1 417.6 432.4 491c8 4.1 17.7 3.3 25-2s11-14.2 9.6-23.2L441.7 305.9 556.1 191.4c6.4-6.4 8.6-15.8 5.8-24.4s-10.1-14.9-19.1-16.3L383 125.3 309.5-18.9z\"/></svg>",
    heart: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\"><path d=\"M241 87.1l15 20.7 15-20.7C296 52.5 336.2 32 378.9 32 452.4 32 512 91.6 512 165.1l0 2.6c0 112.2-139.9 242.5-212.9 298.2-12.4 9.4-27.6 14.1-43.1 14.1s-30.8-4.6-43.1-14.1C139.9 410.2 0 279.9 0 167.7l0-2.6C0 91.6 59.6 32 133.1 32 175.8 32 216 52.5 241 87.1z\"/></svg>",
    bolt: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 448 512\"><path d=\"M338.8-9.9c11.9 8.6 16.3 24.2 10.9 37.8L271.3 224 416 224c13.5 0 25.5 8.4 30.1 21.1s.7 26.9-9.6 35.5l-288 240c-11.3 9.4-27.4 9.9-39.3 1.3s-16.3-24.2-10.9-37.8L176.7 288 32 288c-13.5 0-25.5-8.4-30.1-21.1s-.7-26.9 9.6-35.5l288-240c11.3-9.4 27.4-9.9 39.3-1.3z\"/></svg>",
    leaf: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\"><path d=\"M471.3 6.7C477.7 .6 487-1.6 495.6 1.2 505.4 4.5 512 13.7 512 24l0 186.9c0 131.2-108.1 237.1-238.8 237.1-77 0-143.4-49.5-167.5-118.7-35.4 30.8-57.7 76.1-57.7 126.7 0 13.3-10.7 24-24 24S0 469.3 0 456C0 381.1 38.2 315.1 96.1 276.3 131.4 252.7 173.5 240 216 240l80 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-80 0c-39.7 0-77.3 8.8-111 24.5 23.3-70 89.2-120.5 167-120.5 66.4 0 115.8-22.1 148.7-44 19.2-12.8 35.5-28.1 50.7-45.3z\"/></svg>",
    cube: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\"><path d=\"M224.3-2.5c19.8-11.4 44.2-11.4 64 0L464.2 99c19.8 11.4 32 32.6 32 55.4l0 203c0 22.9-12.2 44-32 55.4L288.3 514.5c-19.8 11.4-44.2 11.4-64 0L48.5 413c-19.8-11.4-32-32.6-32-55.4l0-203c0-22.9 12.2-44 32-55.4L224.3-2.5zm207.8 360l0-166.1-143.8 83 0 166.1 143.8-83z\"/></svg>",
} as const;

const pexelsThumb = (id: number): string => (
    `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=400`
);

export const docsIconItems: PkImageBrowserItem[] = [
    { value: 'star', label: 'Star', preview: docsIconSvg.star },
    { value: 'heart', label: 'Heart Outline', preview: docsIconSvg.heart },
    { value: 'bolt', label: 'Lightning Bolt', preview: docsIconSvg.bolt },
    { value: 'leaf', label: 'Add Parent Node', preview: docsIconSvg.leaf },
];

/** Image mode with curated catalog labels. */
export const docsImageLabeledItems: PkImageBrowserItem[] = [
    {
        value: 'seagulls.jpg',
        label: 'Seagulls',
        preview: pexelsThumb(36620445),
    },
    {
        value: 'sailboat.jpg',
        label: 'Sailboat',
        preview: pexelsThumb(14200079),
    },
    {
        value: 'flowers.jpg',
        label: 'Flower market',
        preview: pexelsThumb(39108184),
    },
    {
        value: 'mark.svg',
        label: 'Mark',
        preview: docsIconSvg.cube,
    },
];

export const docsImageGroups: PkImageBrowserGroup[] = [
    {
        name: 'Marks',
        items: [
            { value: 'star', label: 'Star', preview: docsIconSvg.star },
            { value: 'heart', label: 'Heart', preview: docsIconSvg.heart },
            { value: 'bolt', label: 'Bolt', preview: docsIconSvg.bolt },
        ],
    },
    {
        name: 'Nature',
        items: [
            { value: 'leaf', label: 'Leaf', preview: docsIconSvg.leaf },
        ],
    },
];

/** Image-mode groups — same `groups` API, photo tile geometry. */
export const docsImageModeGroups: PkImageBrowserGroup[] = [
    {
        name: 'Photos',
        items: docsImageLabeledItems.slice(0, 3),
    },
    {
        name: 'Marks',
        items: docsImageLabeledItems.slice(3),
    },
];

type ImageBrowserDemo = {
    htmlAttrs: string;
    items?: PkImageBrowserItem[];
    groups?: PkImageBrowserGroup[];
    mode?: 'icon' | 'image';
    labelMode?: 'tooltip' | 'inline' | 'none';
    loading?: boolean;
    selectedLabel?: string;
    selectedPreview?: string;
};

function serializeForPreview(value: unknown, indent = 0): string {
    const pad = '  '.repeat(indent);
    const next = '  '.repeat(indent + 1);

    if (typeof value === 'string' && value.includes('<svg')) {
        // Keep copyable source readable — inline SVG literals stay as named placeholders.
        if (value === docsIconSvg.star) return 'starSvg';
        if (value === docsIconSvg.heart) return 'heartSvg';
        if (value === docsIconSvg.bolt) return 'boltSvg';
        if (value === docsIconSvg.leaf) return 'leafSvg';
        if (value === docsIconSvg.cube) return 'markSvg';
        return JSON.stringify('<svg>…</svg>');
    }

    if (value === null || typeof value !== 'object') {
        return JSON.stringify(value);
    }

    if (Array.isArray(value)) {
        if (value.length === 0) {
            return '[]';
        }

        const items = value.map((item) => `${next}${serializeForPreview(item, indent + 1)},`);
        return `[\n${items.join('\n')}\n${pad}]`;
    }

    const entries = Object.entries(value as Record<string, unknown>);
    const fields = entries.map(([key, entry]) => {
        const safeKey = /^[A-Za-z_$][\w$]*$/.test(key) ? key : JSON.stringify(key);
        return `${next}${safeKey}: ${serializeForPreview(entry, indent + 1)},`;
    });

    return `{\n${fields.join('\n')}\n${pad}}`;
}

/** Copy-pastable JS for docs — same shape as Editable Table previews. */
export function imageBrowserPreviewSource(demo: ImageBrowserDemo): string {
    const attrSuffix = demo.htmlAttrs ? ` ${demo.htmlAttrs.trim()}` : '';
    const catalog = demo.groups ?? demo.items ?? [];
    const svgConsts = collectSvgConsts([
        ...catalog,
        ...(demo.selectedPreview
            ? [{ value: '', label: '', preview: demo.selectedPreview }]
            : []),
    ]);

    const lines: string[] = [
        `import '@verbb/plugin-kit-web/components/image-browser.js';`,
        '',
    ];

    if (svgConsts.length > 0) {
        lines.push(...svgConsts, '');
    }

    lines.push(
        `const browser = document.querySelector('pk-image-browser');`,
        '',
    );

    if (demo.mode === 'image') {
        lines.push(`browser.mode = 'image';`);
    }

    if (demo.labelMode && demo.labelMode !== 'tooltip') {
        lines.push(`browser.labelMode = ${JSON.stringify(demo.labelMode)};`);
    }

    if (demo.loading) {
        lines.push(`browser.loading = true;`);
    }

    if (demo.selectedLabel) {
        lines.push(`browser.selectedLabel = ${JSON.stringify(demo.selectedLabel)};`);
    }

    if (demo.selectedPreview) {
        // Prefer a named SVG const when the preview matches a docs glyph.
        const previewLiteral = serializeForPreview(demo.selectedPreview);
        lines.push(`browser.selectedPreview = ${previewLiteral};`);
    }

    if (demo.groups) {
        lines.push(`browser.groups = ${serializeForPreview(demo.groups)};`);
    } else if (demo.items) {
        lines.push(`browser.items = ${serializeForPreview(demo.items)};`);
    }

    if (demo.loading) {
        lines.push(
            '',
            `// Clear loading and assign items/groups when the catalog arrives.`,
        );
    }

    lines.push(
        '',
        `browser.addEventListener('pk-change', (event) => {`,
        `  console.log(event.detail.value);`,
        `});`,
        '',
        `// <pk-image-browser${attrSuffix}></pk-image-browser>`,
    );

    return lines.join('\n');
}

function collectSvgConsts(
    catalog: PkImageBrowserItem[] | PkImageBrowserGroup[],
): string[] {
    const needed = new Set<string>();

    const visitItem = (item: PkImageBrowserItem): void => {
        if (item.preview === docsIconSvg.star) needed.add('star');
        if (item.preview === docsIconSvg.heart) needed.add('heart');
        if (item.preview === docsIconSvg.bolt) needed.add('bolt');
        if (item.preview === docsIconSvg.leaf) needed.add('leaf');
        if (item.preview === docsIconSvg.cube) needed.add('mark');
    };

    for (const entry of catalog) {
        if ('items' in entry && Array.isArray((entry as PkImageBrowserGroup).items)) {
            (entry as PkImageBrowserGroup).items.forEach(visitItem);
        } else {
            visitItem(entry as PkImageBrowserItem);
        }
    }

    const consts: string[] = [];
    if (needed.has('star')) consts.push(`const starSvg = ${JSON.stringify(docsIconSvg.star)};`);
    if (needed.has('heart')) consts.push(`const heartSvg = ${JSON.stringify(docsIconSvg.heart)};`);
    if (needed.has('bolt')) consts.push(`const boltSvg = ${JSON.stringify(docsIconSvg.bolt)};`);
    if (needed.has('leaf')) consts.push(`const leafSvg = ${JSON.stringify(docsIconSvg.leaf)};`);
    if (needed.has('mark')) consts.push(`const markSvg = ${JSON.stringify(docsIconSvg.cube)};`);
    return consts;
}

type ImageBrowserEl = HTMLElement & {
    items: PkImageBrowserItem[];
    groups: PkImageBrowserGroup[];
    mode: string;
    labelMode: string;
    value: string;
    loading: boolean;
    selectedLabel: string;
    selectedPreview: string;
    open: boolean;
};

export function bindImageBrowser(
    root: HTMLElement,
    demo: ImageBrowserDemo & { value?: string; open?: boolean },
): void {
    const el = root.querySelector('pk-image-browser') as ImageBrowserEl | null;
    if (!el) {
        return;
    }

    if (demo.mode) {
        el.mode = demo.mode;
    }

    if (demo.labelMode) {
        el.labelMode = demo.labelMode;
    }

    if (demo.loading) {
        el.loading = true;
    }

    if (demo.selectedLabel) {
        el.selectedLabel = demo.selectedLabel;
    }

    if (demo.selectedPreview) {
        el.selectedPreview = demo.selectedPreview;
    }

    if (demo.groups) {
        el.groups = demo.groups;
    } else if (demo.items) {
        el.items = demo.items;
    }

    if (demo.value !== undefined) {
        el.value = demo.value;
    }

    if (demo.open) {
        el.open = true;
    }
}
