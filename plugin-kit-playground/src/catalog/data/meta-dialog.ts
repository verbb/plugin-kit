export const dialogPlaygroundMeta = {
    eyebrow: 'Components',
    title: 'Dialog',
    description: 'Modal overlay with header, body, footer.',
} as const;

export const dialogPlaygroundSections = {
    basicUsage: {
        title: 'Basic usage',
        description: 'Trigger, header, body, footer. Backdrop click closes by default.',
        triggerLabel: 'Open dialog',
        titleText: 'Dialog title',
        descriptionText: 'Short description of the dialog content.',
        body: 'This is the dialog body area.',
        footer: [
            { label: 'Cancel', close: true },
            { label: 'Save', variant: 'primary' as const },
        ],
    },
    confirmation: {
        title: 'Confirmation',
        description: 'Destructive action — `disable-pointer-dismissal`.',
        triggerLabel: 'Delete entry',
        triggerVariant: 'primary' as const,
        titleText: 'Delete this entry?',
        descriptionText: 'This action cannot be undone. The entry will be removed from the current site.',
        body: 'Confirmation dialog body.',
        footer: [
            { label: 'Cancel', close: true },
            { label: 'Delete', variant: 'primary' as const },
        ],
    },
    scrollable: {
        title: 'Scrollable content',
        description: 'Long body with fixed header and footer.',
        triggerLabel: 'Open long dialog',
        titleText: 'Review settings',
        descriptionText: 'Long content constrained inside the body.',
        footer: [
            { label: 'Cancel', close: true },
            { label: 'Save settings', variant: 'primary' as const },
        ],
    },
    initialFocus: {
        title: 'Setting initial focus',
        description: '`autofocus` on the opening focus target.',
        triggerLabel: 'Edit field',
        titleText: 'Edit Field',
        footer: [
            { label: 'Cancel', close: true },
            { label: 'Save', variant: 'primary' as const },
        ],
    },
} as const;

type DialogFooterButton = {
    label: string;
    variant?: 'default' | 'primary';
    close?: boolean;
};
