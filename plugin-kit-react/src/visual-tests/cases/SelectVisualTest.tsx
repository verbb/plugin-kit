import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectSeparator,
    SelectTrigger,
    SelectValue,
} from '@verbb/plugin-kit-react/components';
import { VisualTestShadowRoot } from '../shared/VisualTestShadowRoot';
import { VisualTestPage, VisualTestSection, VisualTestCard } from '../shared/visualTestLayouts';
import type { VisualTestDefinition } from '../types';

const fruitItems = [
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
    { label: 'Blueberry', value: 'blueberry' },
    { label: 'Grapes', value: 'grapes' },
    { label: 'Pineapple', value: 'pineapple' },
];

const vegetableItems = [
    { label: 'Carrot', value: 'carrot' },
    { label: 'Broccoli', value: 'broccoli' },
    { label: 'Spinach', value: 'spinach' },
];

const allItems = [...fruitItems, ...vegetableItems];

const selectSizes = [
    { label: 'Extra small', size: 'xs' as const },
    { label: 'Small', size: 'sm' as const },
    { label: 'Default', size: 'default' as const },
    { label: 'Large', size: 'lg' as const },
    { label: 'Extra large', size: 'xl' as const },
];

const selectStates = [
    { label: 'Default', placeholder: 'Default state' },
    { label: 'Error', placeholder: 'Error state', invalid: true },
    { label: 'Disabled', placeholder: 'Disabled state', disabled: true },
];

function renderItems(items = fruitItems) {
    return items.map((item) => {
        return (
            <SelectItem key={item.value} value={item.value}>
                {item.label}
            </SelectItem>
        );
    });
}

function craftSelectStateHtml(): string {
    return `
        <div class="cmp-rows">
            ${selectStates.map(({ label, placeholder, invalid, disabled }) => {
        const wrapperClass = ['select', invalid ? 'error' : ''].filter(Boolean).join(' ');
        const disabledAttr = disabled ? ' disabled' : '';

        return `
                    <div class="cmp-row">
                        <h3 class="cmp-row-heading">${label}</h3>
                        <div class="cmp-row-items">
                            <div class="${wrapperClass}">
                                <select${disabledAttr}>
                                    <option value="">${placeholder}</option>
                                    <option value="apple">Apple</option>
                                    <option value="banana">Banana</option>
                                    <option value="blueberry">Blueberry</option>
                                </select>
                            </div>
                        </div>
                    </div>
                `;
    }).join('')}
        </div>
    `;
}

function SelectVisualTestPage() {
    return (
        <VisualTestPage
            eyebrow="Visual Tests"
            title="Select"
            description="Visual regression and parity checking for selects."
            maxWidth="1280px"
        >
            <VisualTestSection
                title="Craft Comparison"
                description="Closed trigger states are the clearest like-for-like comparison with Craft, so parity is most useful here."
            >
                <div className="cmp-layout">
                    <div className="cmp-column">
                        <h3 className="cmp-column-title">Plugin Kit</h3>

                        <VisualTestShadowRoot>
                            <div className="cmp-rows">
                                {selectStates.map(({ label, placeholder, invalid, disabled }) => {
                                    return (
                                        <div className="cmp-row" key={label}>
                                            <h3 className="cmp-row-heading">{label}</h3>
                                            <div className="cmp-row-items">
                                                <Select items={fruitItems} disabled={disabled}>
                                                    <SelectTrigger className="w-[240px]" aria-invalid={invalid ? 'true' : undefined}>
                                                        <SelectValue placeholder={placeholder} />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {renderItems()}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </VisualTestShadowRoot>
                    </div>

                    <div className="cmp-column">
                        <h3 className="cmp-column-title">Craft</h3>
                        <div dangerouslySetInnerHTML={{ __html: craftSelectStateHtml() }} />
                    </div>
                </div>
            </VisualTestSection>

            <VisualTestSection
                title="Sizes"
                description="The full trigger scale helps catch height drift, label clipping, and icon alignment differences across the complete size set."
            >
                <VisualTestCard>
                    {selectSizes.map(({ label, size }) => {
                        return (
                            <div className="space-y-3" key={size}>
                                <h3 className="text-sm font-semibold text-gray-900">{label}</h3>
                                <Select items={fruitItems} defaultValue="apple" size={size}>
                                    <SelectTrigger className="w-[240px]">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {renderItems()}
                                    </SelectContent>
                                </Select>
                            </div>
                        );
                    })}
                </VisualTestCard>
            </VisualTestSection>

            <VisualTestSection
                title="Open Surfaces"
                description="Open menus are where trigger width, item spacing, labels, and wrapping issues become obvious, so they deserve their own regression coverage."
            >
                <VisualTestCard overflowVisible>
                    <div className="space-y-5">
                        <h3 className="text-sm font-semibold text-gray-900">Open by size</h3>
                        <div className="flex flex-wrap items-start gap-x-24 gap-y-28 pb-36">
                            {selectSizes.map(({ label, size }) => {
                                return (
                                    <div className="min-w-[220px] space-y-2" key={size}>
                                        <div className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">
                                            {label}
                                        </div>
                                        <Select defaultOpen modal={false} items={fruitItems} size={size}>
                                            <SelectTrigger className="w-[220px]">
                                                <SelectValue placeholder="Select a fruit" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {renderItems()}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="space-y-5">
                        <h3 className="text-sm font-semibold text-gray-900">Open with groups</h3>
                        <div className="flex flex-wrap items-start gap-x-24 gap-y-28 pb-32">
                            {['sm', 'default', 'lg'].map((size) => {
                                return (
                                    <div className="min-w-[220px] space-y-2" key={size}>
                                        <div className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">
                                            {size}
                                        </div>
                                        <Select
                                            defaultOpen
                                            modal={false}
                                            items={allItems}
                                            size={size as 'sm' | 'default' | 'lg'}
                                            value="apple"
                                        >
                                            <SelectTrigger className="w-[220px]">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Fruits</SelectLabel>
                                                    {renderItems(fruitItems)}
                                                </SelectGroup>
                                                <SelectSeparator />
                                                <SelectGroup>
                                                    <SelectLabel>Vegetables</SelectLabel>
                                                    {renderItems(vegetableItems)}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </VisualTestCard>
            </VisualTestSection>
        </VisualTestPage>
    );
}

export const selectVisualTest: VisualTestDefinition = {
    id: 'select',
    title: 'Select',
    description: 'Visual regression and parity checking for selects.',
    Component: SelectVisualTestPage,
};
