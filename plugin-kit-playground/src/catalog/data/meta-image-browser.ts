export const imageBrowserPlaygroundMeta = {
    eyebrow: 'Components',
    title: 'Image Browser',
    description: 'Presentational browser for static icons and images supplied by the host.',
} as const;

export const imageBrowserPlaygroundSections = {
    icons: {
        title: 'Icon mode',
        description: 'Defaults, then each label-mode.',
    },
    images: {
        title: 'Image mode',
        description: 'Same label-mode tour for photo tiles.',
    },
    groups: {
        title: 'Grouped catalogs',
        description: 'Named groups for icon and image modes.',
    },
    states: {
        title: 'States',
        description: 'Loading catalog, invalid, disabled, and cleared.',
    },
} as const;
