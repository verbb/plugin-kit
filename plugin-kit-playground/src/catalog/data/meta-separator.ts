export const separatorPlaygroundMeta = {
    eyebrow: 'Components',
    title: 'Separator',
    description: 'Visual divider — horizontal and vertical.',
} as const;

export const separatorPlaygroundSections = {
    horizontal: {
        title: 'Horizontal separators',
        description: 'Horizontal divider between stacked content.',
        above: 'Above',
        below: 'Below',
    },
    vertical: {
        title: 'Vertical separators',
        description: 'Vertical divider between inline items.',
        items: ['Draft', 'Published', 'Archived'],
    },
} as const;
