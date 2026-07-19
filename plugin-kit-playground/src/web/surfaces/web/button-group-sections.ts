import type { PkDropdownMenu } from '../../../../plugin-kit-web/src/components/dropdown-menu/pk-dropdown-menu.js';
import {
    playgroundIconAdd,
    playgroundIconChevronDown,
    playgroundIconDownload,
    playgroundIconEye,
    playgroundIconPen,
    playgroundIconSearch,
} from '../../../catalog/data/icons.js';
import {
    buildCraftButtonGroupComparisonHtml,
    buttonGroupViewModeIcons,
    createButtonGroupComparisonRow,
    createComparisonLayout,
} from '../../../catalog/data/comparison.js';
import type { PlaygroundSectionRendererMap } from '../../../catalog/types.js';
import {
    createPkButton,
    createPkDropdownItem,
    createPkDropdownSeparator,
    createPkInput,
    createPkInputGroup,
    createPkInputGroupAddon,
    createPkInputGroupButton,
    createPkInputGroupInput,
    createPkInputGroupText,
} from '../../dom.js';

type GroupButtonOptions = {
    label?: string;
    variant?: string;
    size?: string;
    /** Inline SVG HTML for the start slot (legacy). */
    icon?: string;
    /** `<pk-icon icon="…">` name — preferred for parity with React/Vue. */
    iconName?: string;
    ariaLabel?: string;
    withCaret?: boolean;
    groupTrigger?: boolean;
    pressed?: boolean;
};

function createButtonGroup(
    orientation: 'horizontal' | 'vertical' = 'horizontal',
    { separators = true }: { separators?: boolean } = {},
): HTMLElement {
    const group = document.createElement('pk-button-group');

    if (orientation === 'vertical') {
        group.setAttribute('orientation', 'vertical');
    }

    if (!separators) {
        group.setAttribute('separators', 'false');
    }

    return group;
}

function createGroupButton({
    label = '',
    variant = 'default',
    size = 'default',
    icon,
    iconName,
    ariaLabel,
    withCaret = false,
    groupTrigger = false,
    pressed,
}: GroupButtonOptions = {}): HTMLElement {
    const button = createPkButton({
        label: groupTrigger ? undefined : (icon && !label ? undefined : label),
        variant,
        size: size === 'default' ? undefined : size,
        startSlot: iconName ? undefined : icon,
        ariaLabel,
    }) as HTMLElement & { withCaret?: boolean };

    if (iconName) {
        const pkIcon = document.createElement('pk-icon');
        pkIcon.setAttribute('icon', iconName);
        pkIcon.setAttribute('slot', 'start');
        pkIcon.setAttribute('aria-hidden', 'true');
        button.append(pkIcon);
    }

    if (withCaret) {
        button.setAttribute('with-caret', '');
    }

    if (groupTrigger) {
        button.setAttribute('group-trigger', '');
    }

    if (pressed !== undefined) {
        button.setAttribute('aria-pressed', pressed ? 'true' : 'false');
    }

    return button;
}

function createGroupSelect(options: {
    width?: string;
    value?: string;
    options: Array<{ value: string; label: string }>;
}): HTMLSelectElement {
    const select = document.createElement('select');
    select.className = 'button-group-select';

    if (options.width) {
        select.style.width = options.width;
    }

    for (const item of options.options) {
        const option = document.createElement('option');
        option.value = item.value;
        option.textContent = item.label;

        if (options.value === item.value) {
            option.selected = true;
        }

        select.append(option);
    }

    return select;
}

function createEditPreviewMenubtnGroup(): HTMLElement {
    const group = createButtonGroup();
    appendPrimaryToolbar(group);
    return group;
}

function createIconOnlyToolbarGroup(): HTMLElement {
    const group = createButtonGroup();
    group.append(
        createGroupButton({ variant: 'primary', icon: playgroundIconPen, ariaLabel: 'Edit' }),
        createGroupButton({ variant: 'primary', icon: playgroundIconEye, ariaLabel: 'Preview' }),
        createGroupButton({ variant: 'primary', icon: playgroundIconDownload, ariaLabel: 'Export' }),
    );
    return group;
}

function createChevronIconSplitGroup(): HTMLElement {
    const group = createButtonGroup();
    group.append(
        createGroupButton({ label: 'Edit', variant: 'primary', icon: playgroundIconPen }),
        createGroupButton({ label: 'Preview', variant: 'primary', icon: playgroundIconEye }),
        createGroupButton({
            variant: 'primary',
            icon: playgroundIconChevronDown,
            ariaLabel: 'More actions',
        }),
    );
    return group;
}

function createRowStack(...groups: HTMLElement[]): HTMLElement {
    const stack = document.createElement('div');
    stack.className = 'pg-card__inner--row';
    stack.append(...groups);
    return stack;
}

function createLabeledGroup(caption: string, group: HTMLElement): HTMLElement {
    const row = document.createElement('div');
    row.className = 'pg-demo-stack';

    const label = document.createElement('div');
    label.className = 'pg-spinner-size-label';
    label.textContent = caption;

    row.append(label, group);
    return row;
}

function appendPrimaryToolbar(group: HTMLElement): void {
    group.append(
        createGroupButton({ label: 'Edit', variant: 'primary', icon: playgroundIconPen }),
        createGroupButton({ label: 'Preview', variant: 'primary', icon: playgroundIconEye }),
        createGroupButton({
            variant: 'primary',
            ariaLabel: 'More actions',
            groupTrigger: true,
        }),
    );
}

const buttonGroupVariantCoverage = ['primary', 'secondary', 'default', 'outline', 'dashed'] as const;

function createVariantToolbarGroup(variant: (typeof buttonGroupVariantCoverage)[number]): HTMLElement {
    const group = createButtonGroup();
    group.append(
        createGroupButton({ label: 'Edit', variant, icon: playgroundIconPen }),
        createGroupButton({ label: 'Preview', variant, icon: playgroundIconEye }),
        createGroupButton({
            variant,
            ariaLabel: 'More actions',
            groupTrigger: true,
        }),
    );
    return group;
}

function createGroupDropdownMenu(options: {
    id: string;
    trigger: HTMLElement;
    placement?: string;
}): PkDropdownMenu {
    const menu = document.createElement('pk-dropdown-menu') as PkDropdownMenu;
    menu.id = options.id;

    if (options.placement) {
        menu.setAttribute('placement', options.placement);
    }

    options.trigger.setAttribute('slot', 'trigger');
    menu.append(
        options.trigger,
        createPkDropdownItem({ value: 'edit', label: 'Edit' }),
        createPkDropdownItem({ value: 'duplicate', label: 'Duplicate' }),
        createPkDropdownSeparator(),
        createPkDropdownItem({ value: 'delete', label: 'Delete', destructive: true }),
    );

    return menu;
}

function createGroupPopover(options: {
    id: string;
    trigger: HTMLElement;
    content: HTMLElement;
    placement?: string;
}): HTMLElement {
    const popover = document.createElement('pk-popover');
    popover.id = options.id;

    if (options.placement) {
        popover.setAttribute('placement', options.placement);
    }

    options.trigger.setAttribute('slot', 'trigger');

    const contentHost = document.createElement('div');
    contentHost.append(options.content);

    popover.append(options.trigger, contentHost);

    return popover;
}

function buildPopoverFiltersContent(): HTMLElement {
    const content = document.createElement('div');
    content.innerHTML = `
        <div style="display: grid; gap: 4px;">
            <strong style="font-size: 14px; color: #0f172a;">Quick Filters</strong>
            <p style="margin: 0; font-size: 13px; color: #64748b;">Refine visible rows before editing.</p>
        </div>
        <div style="margin-top: 12px; display: grid; gap: 8px; font-size: 14px; color: #475569;">
            <div>Show Active Forms</div>
            <div>Show Forms With Submissions</div>
            <div>Show Archived Forms</div>
        </div>
    `;
    return content;
}

function createNewEntryGroup(): HTMLElement {
    const group = createButtonGroup();
    group.append(
        createGroupButton({ label: 'New entry', variant: 'primary', icon: playgroundIconAdd }),
        createGroupButton({
            variant: 'primary',
            ariaLabel: 'New entry, choose a section',
            groupTrigger: true,
        }),
    );
    return group;
}

function createViewModeGroup(): HTMLElement {
    const group = createButtonGroup();
    group.setAttribute('exclusive', '');
    group.setAttribute('aria-label', 'View');

    group.append(
        createGroupButton({
            iconName: buttonGroupViewModeIcons.table,
            ariaLabel: 'Display in a table',
            pressed: true,
        }),
        createGroupButton({
            iconName: buttonGroupViewModeIcons.cards,
            ariaLabel: 'Display as cards',
            pressed: false,
        }),
    );

    return group;
}

function createPreviewViewGroup(): HTMLElement {
    const group = createButtonGroup();
    group.append(
        createGroupButton({ label: 'Preview', icon: playgroundIconEye }),
        createGroupButton({ label: 'View' }),
    );
    return group;
}

function createButtonGroupCraftComparison(): HTMLElement {
    const pkContent = document.createElement('div');
    pkContent.className = 'cmp-rows';
    pkContent.append(
        createButtonGroupComparisonRow('Edit + Preview + menubtn', createEditPreviewMenubtnGroup()),
        createButtonGroupComparisonRow('New entry + menubtn', createNewEntryGroup()),
        createButtonGroupComparisonRow('View mode (exclusive)', createViewModeGroup()),
        createButtonGroupComparisonRow('Preview + View', createPreviewViewGroup()),
    );

    const craftContent = document.createElement('div');
    craftContent.className = 'cmp-craft-column';
    craftContent.innerHTML = buildCraftButtonGroupComparisonHtml();

    return createComparisonLayout(pkContent, craftContent);
}

/** Web component previews — one function per section id from buttonGroupPlaygroundSpec. */
export const buttonGroupWebSectionRenderers: PlaygroundSectionRendererMap = {
    craftComparison(preview) {
        preview.append(createButtonGroupCraftComparison());
    },

    basicUsage(preview) {
        preview.append(createEditPreviewMenubtnGroup());
    },

    menuTrigger(preview) {
        const stack = document.createElement('div');
        stack.className = 'pg-card__inner--stack';
        stack.append(
            createLabeledGroup(
                'Split toolbar — label actions + compact chevron (`group-trigger`)',
                createEditPreviewMenubtnGroup(),
            ),
            createLabeledGroup(
                'Icon-only buttons — normal square controls (no `group-trigger`)',
                createIconOnlyToolbarGroup(),
            ),
            createLabeledGroup(
                'Avoid — chevron passed as `icon` keeps full button padding',
                createChevronIconSplitGroup(),
            ),
            createLabeledGroup(
                'Use — `group-trigger` for the disclosure end-cap (Craft `.menubtn`)',
                createEditPreviewMenubtnGroup(),
            ),
        );
        preview.append(stack);
    },

    regularButtons(preview) {
        const group = createButtonGroup();
        group.append(
            createGroupButton({ label: 'Actions' }),
            createGroupButton({ label: 'Edit', icon: playgroundIconPen }),
            createGroupButton({ label: 'Preview', icon: playgroundIconEye }),
            createGroupButton({
                icon: playgroundIconChevronDown,
                ariaLabel: 'More actions',
            }),
        );
        preview.append(group);
    },

    separators(preview) {
        const stack = document.createElement('div');
        stack.className = 'pg-card__inner--stack';
        const onGroup = createButtonGroup();
        appendPrimaryToolbar(onGroup);
        const offGroup = createButtonGroup('horizontal', { separators: false });
        appendPrimaryToolbar(offGroup);
        stack.append(
            createLabeledGroup('On (default) — 1px divider between controls', onGroup),
            createLabeledGroup('Off (`separators="false"`) — flush join', offGroup),
        );
        preview.append(stack);
    },

    variants(preview) {
        const stack = document.createElement('div');
        stack.className = 'pg-card__inner--stack';
        for (const variant of buttonGroupVariantCoverage) {
            stack.append(createLabeledGroup(variant, createVariantToolbarGroup(variant)));
        }
        preview.append(stack);
    },

    splitActions(preview) {
        const saveGroup = createButtonGroup();
        saveGroup.append(
            createGroupButton({ label: 'Save changes', variant: 'primary' }),
            createGroupButton({
                variant: 'primary',
                ariaLabel: 'Open save options',
                groupTrigger: true,
            }),
        );
        const exportGroup = createButtonGroup();
        exportGroup.append(
            createGroupButton({
                label: 'Export',
                variant: 'outline',
                icon: playgroundIconDownload,
            }),
            createGroupButton({
                variant: 'outline',
                ariaLabel: 'Open export options',
                groupTrigger: true,
            }),
        );
        preview.append(createRowStack(saveGroup, exportGroup));
    },

    sizes(preview) {
        const row = createRowStack();
        for (const size of ['xs', 'sm', 'default', 'lg'] as const) {
            const group = createButtonGroup();
            group.append(
                createGroupButton({ label: 'Edit', variant: 'outline', size }),
                createGroupButton({ label: 'Preview', variant: 'outline', size }),
                createGroupButton({
                    variant: 'outline',
                    size,
                    ariaLabel: `More ${size} actions`,
                    groupTrigger: true,
                }),
            );
            row.append(group);
        }
        preview.append(row);
    },

    orientation(preview) {
        const group = createButtonGroup('vertical');
        group.append(
            createGroupButton({ label: 'First', variant: 'outline' }),
            createGroupButton({ label: 'Second', variant: 'outline' }),
            createGroupButton({ label: 'Third', variant: 'outline' }),
        );
        preview.append(group);
    },

    toolbarControls(preview) {
        const stack = document.createElement('div');
        stack.className = 'pg-card__inner--stack';

        const searchGroup = createButtonGroup();
        searchGroup.append(
            createPkInput({
                placeholder: 'Search forms...',
                style: { width: '18rem' },
            }),
            createGroupButton({
                label: 'Search',
                variant: 'outline',
                icon: playgroundIconSearch,
            }),
        );

        const statusGroup = createButtonGroup();
        statusGroup.append(
            createGroupSelect({
                width: '11rem',
                value: 'draft',
                options: [
                    { value: 'draft', label: 'Draft' },
                    { value: 'review', label: 'In Review' },
                    { value: 'published', label: 'Published' },
                ],
            }),
            createGroupButton({ label: 'Apply', variant: 'outline' }),
        );

        const urlField = createPkInputGroup({ style: { width: '20rem' } });
        urlField.append(
            createPkInputGroupInput({ placeholder: 'example.com/contact' }),
            createPkInputGroupAddon({ align: 'inline-start' }, createPkInputGroupText('https://')),
            createPkInputGroupAddon({ align: 'inline-end' }, createPkInputGroupButton('Go')),
        );

        const urlGroup = createButtonGroup();
        urlGroup.append(
            urlField,
            createGroupButton({ label: 'Validate', variant: 'outline' }),
        );

        stack.append(searchGroup, statusGroup, urlGroup);
        preview.append(stack);
    },

    dropdown(preview) {
        const group = createButtonGroup();
        const dropdownTrigger = createGroupButton({
            variant: 'primary',
            ariaLabel: 'Open actions',
            groupTrigger: true,
        });
        group.append(
            createGroupButton({ label: 'Actions', variant: 'primary' }),
            createGroupDropdownMenu({
                id: 'bg-dropdown-menu',
                placement: 'bottom-end',
                trigger: dropdownTrigger,
            }),
        );
        preview.append(group);
    },

    popover(preview) {
        const group = createButtonGroup();
        const popoverTrigger = createGroupButton({
            variant: 'outline',
            ariaLabel: 'Open filters',
            groupTrigger: true,
        });
        group.append(
            createGroupButton({ label: 'Filters', variant: 'outline' }),
            createGroupPopover({
                id: 'bg-popover',
                placement: 'bottom-start',
                trigger: popoverTrigger,
                content: buildPopoverFiltersContent(),
            }),
        );
        preview.append(group);
    },
};
