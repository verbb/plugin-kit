import {
    buildCraftButtonGroupComparisonHtml,
    buttonGroupViewModeIcons,
} from '@verbb/plugin-kit-playground';

import { Button } from '@verbb/plugin-kit-react/components';
import { ButtonGroup } from '@verbb/plugin-kit-react/components';
import { DropdownItem, DropdownMenu, DropdownSeparator } from '@verbb/plugin-kit-react/components';
import { Icon } from '@verbb/plugin-kit-react/components';
import { Input } from '@verbb/plugin-kit-react/components';
import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
    InputGroupText,
} from '@verbb/plugin-kit-react/components';
import { Popover } from '@verbb/plugin-kit-react/components';
import type { PlaygroundSectionReactRendererMap } from '../../shared/PlaygroundFromSpec.js';

const buttonGroupVariantCoverage = ['primary', 'secondary', 'default', 'outline', 'dashed'] as const;

function LabeledGroup({ caption, children }: { caption: string; children: React.ReactNode }) {
    return (
        <div className="pg-demo-stack">
            <div className="pg-spinner-size-label">{caption}</div>
            {children}
        </div>
    );
}

function GroupButton({
    label,
    variant = 'default',
    size = 'default',
    icon,
    ariaLabel,
    withCaret = false,
    groupTrigger = false,
    pressed,
}: {
    label?: string;
    variant?: string;
    size?: string;
    icon?: string;
    ariaLabel?: string;
    withCaret?: boolean;
    groupTrigger?: boolean;
    pressed?: boolean;
}) {
    return (
        <Button
            variant={variant as never}
            size={size === 'default' ? undefined : (size as never)}
            aria-label={ariaLabel}
            {...(withCaret ? { 'with-caret': true } : {})}
            {...(groupTrigger ? { 'group-trigger': true } : {})}
            {...(pressed !== undefined ? { 'aria-pressed': pressed ? 'true' : 'false' } : {})}
        >
            {icon ? <Icon slot="start" icon={icon} /> : null}
            {groupTrigger || (icon && !label) ? null : label}
        </Button>
    );
}

function EditPreviewMenubtnGroup() {
    return (
        <ButtonGroup>
            <GroupButton label="Edit" variant="primary" icon="pen" />
            <GroupButton label="Preview" variant="primary" icon="eye" />
            <GroupButton variant="primary" ariaLabel="More actions" groupTrigger />
        </ButtonGroup>
    );
}

function IconOnlyToolbarGroup() {
    return (
        <ButtonGroup>
            <GroupButton variant="primary" icon="pen" ariaLabel="Edit" />
            <GroupButton variant="primary" icon="eye" ariaLabel="Preview" />
            <GroupButton variant="primary" icon="download" ariaLabel="Export" />
        </ButtonGroup>
    );
}

function ChevronIconSplitGroup() {
    return (
        <ButtonGroup>
            <GroupButton label="Edit" variant="primary" icon="pen" />
            <GroupButton label="Preview" variant="primary" icon="eye" />
            <GroupButton variant="primary" icon="chevron-down" ariaLabel="More actions" />
        </ButtonGroup>
    );
}

function NewEntryGroup() {
    return (
        <ButtonGroup>
            <GroupButton label="New entry" variant="primary" icon="plus" />
            <GroupButton variant="primary" ariaLabel="New entry, choose a section" groupTrigger />
        </ButtonGroup>
    );
}

function ViewModeGroup() {
    return (
        <ButtonGroup exclusive aria-label="View">
            <GroupButton icon={buttonGroupViewModeIcons.table} ariaLabel="Display in a table" pressed />
            <GroupButton icon={buttonGroupViewModeIcons.cards} ariaLabel="Display as cards" pressed={false} />
        </ButtonGroup>
    );
}

function PreviewViewGroup() {
    return (
        <ButtonGroup>
            <GroupButton label="Preview" icon="eye" />
            <GroupButton label="View" />
        </ButtonGroup>
    );
}

function VariantToolbarGroup({ variant }: { variant: (typeof buttonGroupVariantCoverage)[number] }) {
    return (
        <ButtonGroup>
            <GroupButton label="Edit" variant={variant} icon="pen" />
            <GroupButton label="Preview" variant={variant} icon="eye" />
            <GroupButton variant={variant} ariaLabel="More actions" groupTrigger />
        </ButtonGroup>
    );
}

/** React previews — one function per section id from buttonGroupPlaygroundSpec. */
export const buttonGroupReactSectionRenderers: PlaygroundSectionReactRendererMap = {
    craftComparison: () => (
        <div className="cmp-layout">
            <div className="cmp-column">
                <span className="cmp-column-title">Plugin Kit</span>
                <div className="cmp-rows">
                    {[
                        ['Edit + Preview + menubtn', <EditPreviewMenubtnGroup key="edit" />],
                        ['New entry + menubtn', <NewEntryGroup key="new" />],
                        ['View mode (exclusive)', <ViewModeGroup key="view" />],
                        ['Preview + View', <PreviewViewGroup key="preview" />],
                    ].map(([heading, group]) => (
                        <div className="cmp-row" key={String(heading)}>
                            <h3 className="cmp-row-heading">{heading}</h3>
                            <div className="cmp-row-items">{group}</div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="cmp-column">
                <span className="cmp-column-title">Craft</span>
                <div
                    className="cmp-craft-column"
                    dangerouslySetInnerHTML={{ __html: buildCraftButtonGroupComparisonHtml() }}
                />
            </div>
        </div>
    ),

    basicUsage: () => <EditPreviewMenubtnGroup />,

    menuTrigger: () => (
        <div className="pg-card__inner--stack">
            <LabeledGroup caption="Split toolbar — label actions + compact chevron (`group-trigger`)">
                <EditPreviewMenubtnGroup />
            </LabeledGroup>
            <LabeledGroup caption="Icon-only buttons — normal square controls (no `group-trigger`)">
                <IconOnlyToolbarGroup />
            </LabeledGroup>
            <LabeledGroup caption="Avoid — chevron passed as `icon` keeps full button padding">
                <ChevronIconSplitGroup />
            </LabeledGroup>
            <LabeledGroup caption="Use — `group-trigger` for the disclosure end-cap (Craft `.menubtn`)">
                <EditPreviewMenubtnGroup />
            </LabeledGroup>
        </div>
    ),

    regularButtons: () => (
        <ButtonGroup>
            <GroupButton label="Actions" />
            <GroupButton label="Edit" icon="pen" />
            <GroupButton label="Preview" icon="eye" />
            <GroupButton icon="chevron-down" ariaLabel="More actions" />
        </ButtonGroup>
    ),

    separators: () => (
        <div className="pg-card__inner--stack">
            <LabeledGroup caption="On (default) — 1px divider between controls">
                <EditPreviewMenubtnGroup />
            </LabeledGroup>
            <LabeledGroup caption="Off (`separators=&quot;false&quot;`) — flush join">
                <ButtonGroup separators={false}>
                    <GroupButton label="Edit" variant="primary" icon="pen" />
                    <GroupButton label="Preview" variant="primary" icon="eye" />
                    <GroupButton variant="primary" ariaLabel="More actions" groupTrigger />
                </ButtonGroup>
            </LabeledGroup>
        </div>
    ),

    variants: () => (
        <div className="pg-card__inner--stack">
            {buttonGroupVariantCoverage.map((variant) => (
                <LabeledGroup key={variant} caption={variant}>
                    <VariantToolbarGroup variant={variant} />
                </LabeledGroup>
            ))}
        </div>
    ),

    splitActions: () => (
        <div className="pg-card__inner--row">
            <ButtonGroup>
                <GroupButton label="Save changes" variant="primary" />
                <GroupButton variant="primary" ariaLabel="Open save options" groupTrigger />
            </ButtonGroup>
            <ButtonGroup>
                <GroupButton label="Export" variant="outline" icon="download" />
                <GroupButton variant="outline" ariaLabel="Open export options" groupTrigger />
            </ButtonGroup>
        </div>
    ),

    sizes: () => (
        <div className="pg-card__inner--row">
            {(['xs', 'sm', 'default', 'lg'] as const).map((size) => (
                <ButtonGroup key={size}>
                    <GroupButton label="Edit" variant="outline" size={size} />
                    <GroupButton label="Preview" variant="outline" size={size} />
                    <GroupButton
                        variant="outline"
                        size={size}
                        ariaLabel={`More ${size} actions`}
                        groupTrigger
                    />
                </ButtonGroup>
            ))}
        </div>
    ),

    orientation: () => (
        <ButtonGroup orientation="vertical">
            <GroupButton label="First" variant="outline" />
            <GroupButton label="Second" variant="outline" />
            <GroupButton label="Third" variant="outline" />
        </ButtonGroup>
    ),

    toolbarControls: () => (
        <div className="pg-card__inner--stack">
            <ButtonGroup>
                <Input placeholder="Search forms..." style={{ width: '18rem' }} />
                <GroupButton label="Search" variant="outline" icon="search" />
            </ButtonGroup>

            <ButtonGroup>
                <select className="button-group-select" style={{ width: '11rem' }} defaultValue="draft">
                    <option value="draft">Draft</option>
                    <option value="review">In Review</option>
                    <option value="published">Published</option>
                </select>
                <GroupButton label="Apply" variant="outline" />
            </ButtonGroup>

            <ButtonGroup>
                <InputGroup style={{ width: '20rem' }}>
                    <InputGroupInput placeholder="example.com/contact" />
                    <InputGroupAddon align="inline-start">
                        <InputGroupText>https://</InputGroupText>
                    </InputGroupAddon>
                    <InputGroupAddon align="inline-end">
                        <InputGroupButton>Go</InputGroupButton>
                    </InputGroupAddon>
                </InputGroup>
                <GroupButton label="Validate" variant="outline" />
            </ButtonGroup>
        </div>
    ),

    dropdown: () => (
        <ButtonGroup>
            <GroupButton label="Actions" variant="primary" />
            <DropdownMenu
                id="bg-react-dropdown-menu"
                placement="bottom-end"
            >
                <Button slot="trigger" variant="primary" group-trigger aria-label="Open actions" />
                <DropdownItem value="edit">Edit</DropdownItem>
                <DropdownItem value="duplicate">Duplicate</DropdownItem>
                <DropdownSeparator />
                <DropdownItem value="delete" destructive>
                    Delete
                </DropdownItem>
            </DropdownMenu>
        </ButtonGroup>
    ),

    popover: () => (
        <ButtonGroup>
            <GroupButton label="Filters" variant="outline" />
            <Popover id="bg-react-popover" placement="bottom-start">
                <Button slot="trigger" variant="outline" group-trigger aria-label="Open filters" />
                <div>
                    <div style={{ display: 'grid', gap: 4 }}>
                        <strong style={{ fontSize: 14, color: '#0f172a' }}>Quick Filters</strong>
                        <p style={{ margin: 0, fontSize: 13, color: '#64748b' }}>
                            Refine visible rows before editing.
                        </p>
                    </div>
                    <div style={{ marginTop: 12, display: 'grid', gap: 8, fontSize: 14, color: '#475569' }}>
                        <div>Show Active Forms</div>
                        <div>Show Forms With Submissions</div>
                        <div>Show Archived Forms</div>
                    </div>
                </div>
            </Popover>
        </ButtonGroup>
    ),
};
