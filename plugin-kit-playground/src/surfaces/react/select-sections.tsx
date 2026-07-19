import {
    buildCraftSelectComparisonHtml,
    selectFieldStates,
    selectFruitItems,
    selectLargeFruitItems,
    selectPlaygroundSections,
    selectStatusInputItems,
    selectStatusItems,
} from '@verbb/plugin-kit-playground';

import { Icon } from '@verbb/plugin-kit-react/components';
import { Option } from '@verbb/plugin-kit-react/components';
import { OptionGroup } from '@verbb/plugin-kit-react/components';
import { Select } from '@verbb/plugin-kit-react/components';
import { Separator } from '@verbb/plugin-kit-react/components';
import { Status } from '@verbb/plugin-kit-react/components';
import type { PlaygroundSectionReactRendererMap } from './shared/PlaygroundFromSpec.js';
import { ComparisonRow, StateMatrixCell } from './shared/sectionHelpers.js';

function FruitOptions() {
    return (
        <>
            {selectFruitItems.map(({ value, label }) => (
                <Option key={value} value={value}>{label}</Option>
            ))}
        </>
    );
}

function SelectSizeRow({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <div className="pg-select-size-row">
            <div className="pg-select-size-row__label">{label}</div>
            {children}
        </div>
    );
}

function DecoratedSelect({ size }: { size?: string }) {
    return (
        <Select value="demo" {...(size && size !== 'default' ? { size } : {})}>
            <Icon slot="start" icon="house" aria-hidden />
            <Option value="demo">Demo</Option>
            <Icon slot="end" icon="flag" aria-hidden />
        </Select>
    );
}

function GroupedSelect() {
    return (
        <Select placeholder="Select produce">
            <OptionGroup label="Fruits">
                {selectFruitItems.map(({ value, label }) => (
                    <Option key={value} value={value}>{label}</Option>
                ))}
            </OptionGroup>
            <Separator />
            <OptionGroup label="Vegetables">
                <Option value="carrot">Carrot</Option>
                <Option value="broccoli">Broccoli</Option>
                <Option value="spinach">Spinach</Option>
            </OptionGroup>
        </Select>
    );
}

/** React previews — one function per section id from selectPlaygroundSpec. */
export const selectReactSectionRenderers: PlaygroundSectionReactRendererMap = {
    craftComparison: () => (
        <div className="cmp-layout">
            <div className="cmp-column">
                <span className="cmp-column-title">Plugin Kit</span>
                <div className="cmp-rows">
                    <ComparisonRow heading="Field states" layout="stack">
                        {selectFieldStates.map(({ label, placeholder, invalid, disabled, focus }) => (
                            <StateMatrixCell key={label} label={label}>
                                <Select
                                    placeholder={placeholder}
                                    invalid={invalid}
                                    disabled={disabled}
                                    width="full"
                                    style={{ width: '9rem' }}
                                    {...(focus ? { 'data-state': 'focus-visible' } : {})}
                                >
                                    {selectStatusItems.map(({ value, label: optionLabel }) => (
                                        <Option key={value} value={value}>{optionLabel}</Option>
                                    ))}
                                </Select>
                            </StateMatrixCell>
                        ))}
                    </ComparisonRow>
                </div>
            </div>
            <div className="cmp-column">
                <span className="cmp-column-title">Craft</span>
                <div dangerouslySetInnerHTML={{ __html: buildCraftSelectComparisonHtml() }} />
            </div>
        </div>
    ),

    basicUsage: () => (
        <div className="pg-demo-narrow">
            <Select placeholder="Select a fruit">
                <FruitOptions />
            </Select>
        </div>
    ),

    sizes: () => (
        <div className="pg-demo-stack pg-demo-narrow">
            {selectPlaygroundSections.sizes.items.map(({ label, size }) => (
                <SelectSizeRow key={size} label={label}>
                    <Select value="apple" {...(size !== 'default' ? { size } : {})}>
                        <FruitOptions />
                    </Select>
                </SelectSizeRow>
            ))}
        </div>
    ),

    widths: () => (
        <div className="pg-demo-stack pg-demo-narrow">
            <div className="pg-select-width-fixed">
                <Select value="apple" width="full">
                    <FruitOptions />
                </Select>
            </div>
            <div className="pg-select-width-full">
                <Select value="banana" width="full">
                    <FruitOptions />
                </Select>
            </div>
        </div>
    ),

    grouped: () => (
        <div className="pg-demo-narrow">
            <GroupedSelect />
        </div>
    ),

    longList: () => (
        <div className="pg-demo-narrow">
            <Select placeholder="Select a fruit" value="apple">
                {selectLargeFruitItems.map(({ value, label }) => (
                    <Option key={value} value={value}>{label}</Option>
                ))}
            </Select>
        </div>
    ),

    decorations: () => (
        <div className="pg-demo-stack pg-demo-narrow">
            {selectPlaygroundSections.decorations.items.map(({ label, size }) => (
                <SelectSizeRow key={size} label={label}>
                    <DecoratedSelect size={size} />
                </SelectSizeRow>
            ))}
        </div>
    ),

    statusInput: () => (
        <div className="pg-demo-narrow">
            <Select placeholder="Select status" value="testing">
                {selectStatusInputItems.map(({ value, label, status }) => (
                    <Option key={value} value={value}>
                        <Status slot="start" status={status} aria-label={label} />
                        {label}
                    </Option>
                ))}
            </Select>
        </div>
    ),

    multiple: () => (
        <div className="pg-demo-narrow">
            <Select multiple placeholder="Choose statuses…">
                {selectStatusItems.map(({ value, label }) => (
                    <Option key={value} value={value}>{label}</Option>
                ))}
            </Select>
        </div>
    ),

    clearable: () => (
        <div className="pg-demo-narrow">
            <Select clearable placeholder="Choose status…">
                {selectStatusItems.map(({ value, label }) => (
                    <Option key={value} value={value}>{label}</Option>
                ))}
            </Select>
        </div>
    ),
};
