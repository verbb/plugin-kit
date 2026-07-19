export const tooltipPlaygroundMeta = {
    eyebrow: 'Components',
    title: 'Tooltip',
    description: 'Hover/focus hint on a trigger.',
} as const;

export const tooltipPlaygroundSections = {
    basicUsage: {
        title: 'Basic usage',
        description: 'Trigger with tooltip content.',
        triggerLabel: 'Hover me',
        content: 'Tooltip content',
    },
    actionHints: {
        title: 'Action hints',
        description: 'Icon and utility action triggers.',
        triggerLabel: 'Archive',
        content: 'Move this item out of the active list.',
    },
    placement: {
        title: 'Placement',
        description: 'top, right, bottom, left.',
        sides: ['top', 'right', 'bottom', 'left'] as const,
    },
    keyboard: {
        title: 'Keyboard trigger',
        description: 'Shown on keyboard focus.',
        triggerLabel: 'Focus or hover',
        content: 'Tooltips are available from both pointer and keyboard focus.',
    },
} as const;
