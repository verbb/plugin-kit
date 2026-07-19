import { icons } from '@verbb/plugin-kit-icons';

export const iconPlaygroundMeta = {
    eyebrow: 'Components',
    title: 'Icon',
    description: 'Raw-SVG icons — no icon font, no Font Awesome. Style with font-size and currentColor.',
} as const;

export const iconPlaygroundSections = {
    gallery: {
        title: 'Gallery',
        description: 'Every icon in the set. Click a tile to copy its <pk-icon> tag.',
    },
    common: {
        title: 'Common icons',
        description: 'The handful most plugins reach for.',
    },
    sizing: {
        title: 'Sizing',
        description: 'Size follows font-size (defaults to 1em), so it scales with surrounding text.',
    },
    color: {
        title: 'Color',
        description: 'Fill follows currentColor — set color on the element or an ancestor.',
    },
    accessibility: {
        title: 'Accessibility',
        description: 'Decorative by default (hidden from screen readers). Add label to expose meaning.',
    },
    inContext: {
        title: 'In context',
        description: 'Slot icons into other components — components stay icon-agnostic.',
    },
} as const;

const camelToKebab = (value: string): string => {
    return value.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
};

/** Canonical kebab-case names, sorted. */
export const iconGalleryNames: string[] = Object.keys(icons)
    .map(camelToKebab)
    .sort();

export const iconCommonNames: string[] = [
    'plus',
    'xmark',
    'chevron-down',
    'pen',
    'gear',
    'ellipsis',
    'ellipsis-vertical',
    'trash',
    'check',
    'search',
];

export const iconSizeScale: { label: string; size: number }[] = [
    { label: '12px', size: 12 },
    { label: '16px', size: 16 },
    { label: '20px', size: 20 },
    { label: '24px', size: 24 },
    { label: '32px', size: 32 },
    { label: '48px', size: 48 },
];

export const iconColorSwatches: { label: string; color: string }[] = [
    { label: 'Ink', color: '#1c2e36' },
    { label: 'Slate', color: '#64748b' },
    { label: 'Sky', color: '#0ea5e9' },
    { label: 'Emerald', color: '#10b981' },
    { label: 'Amber', color: '#f59e0b' },
    { label: 'Red', color: '#ef4444' },
];
