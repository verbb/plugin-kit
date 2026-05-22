import { Fragment } from 'react';
import { Button } from '@verbb/plugin-kit-react/components/Button';
import {
    Combobox,
    ComboboxChip,
    ComboboxChips,
    ComboboxChipsInput,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxItem,
    ComboboxList,
    ComboboxPrimitiveInput,
    ComboboxTrigger,
    ComboboxValue,
    useComboboxAnchor,
} from '@verbb/plugin-kit-react/components/Combobox';
import { VisualTestPage, VisualTestSection, VisualTestCard } from '../shared/visualTestLayouts';
import type { VisualTestDefinition } from '../types';

const frameworks = [
    { label: 'Next.js', value: 'next-js' },
    { label: 'SvelteKit', value: 'sveltekit' },
    { label: 'Nuxt.js', value: 'nuxt-js' },
    { label: 'Remix', value: 'remix' },
    { label: 'Astro', value: 'astro' },
];

const countries = [
    { code: 'ar', value: 'argentina', label: 'Argentina', continent: 'South America' },
    { code: 'au', value: 'australia', label: 'Australia', continent: 'Oceania' },
    { code: 'ca', value: 'canada', label: 'Canada', continent: 'North America' },
    { code: 'fr', value: 'france', label: 'France', continent: 'Europe' },
    { code: 'jp', value: 'japan', label: 'Japan', continent: 'Asia' },
];

const sizes: Array<'xs' | 'sm' | 'default' | 'lg' | 'xl'> = ['xs', 'sm', 'default', 'lg', 'xl'];

function MultipleComboboxSnapshot() {
    const anchor = useComboboxAnchor();

    return (
        <Combobox
            multiple
            autoHighlight
            items={frameworks}
            defaultValue={[frameworks[0], frameworks[2]]}
            itemToStringLabel={(item) => item.label}
            itemToStringValue={(item) => item.value}
        >
            <ComboboxChips ref={anchor} className="w-full max-w-xs">
                <ComboboxValue>
                    {(values) => (
                        <Fragment>
                            {values.map((value) => (
                                <ComboboxChip key={value.value}>{value.label}</ComboboxChip>
                            ))}
                            <ComboboxChipsInput />
                        </Fragment>
                    )}
                </ComboboxValue>
            </ComboboxChips>
            <ComboboxContent anchor={anchor}>
                <ComboboxEmpty>No items found.</ComboboxEmpty>
                <ComboboxList>
                    {(item) => (
                        <ComboboxItem key={item.value} value={item}>
                            {item.label}
                        </ComboboxItem>
                    )}
                </ComboboxList>
            </ComboboxContent>
        </Combobox>
    );
}

function ComboboxVisualTestPage() {
    return (
        <VisualTestPage
            eyebrow="Visual Tests"
            title="Combobox"
            description="Focused regression coverage for trigger sizing, open surfaces, and multi-value layout."
            maxWidth="1280px"
        >
            <VisualTestSection
                title="Input Mode Sizes"
                description="Check field height, trigger alignment, and list attachment across supported sizes."
            >
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {sizes.map((size) => (
                        <VisualTestCard key={size}>
                            <div className="space-y-2">
                                <div className="text-sm font-semibold text-slate-900">{size}</div>
                                <Combobox
                                    items={frameworks}
                                    size={size}
                                    itemToStringLabel={(item) => item.label}
                                    itemToStringValue={(item) => item.value}
                                >
                                    <ComboboxPrimitiveInput placeholder="Select a framework" className="w-[240px]" />
                                    <ComboboxContent>
                                        <ComboboxEmpty>No items found.</ComboboxEmpty>
                                        <ComboboxList>
                                            {(item) => (
                                                <ComboboxItem key={item.value} value={item}>
                                                    {item.label}
                                                </ComboboxItem>
                                            )}
                                        </ComboboxList>
                                    </ComboboxContent>
                                </Combobox>
                            </div>
                        </VisualTestCard>
                    ))}
                </div>
            </VisualTestSection>

            <VisualTestSection
                title="Open-State Snapshots"
                description="Use open-state fixtures to catch popover sizing, spacing, and selected-row rendering regressions."
            >
                <div className="grid gap-6 xl:grid-cols-2">
                    <VisualTestCard overflowVisible>
                        <div className="space-y-4">
                            <div className="text-sm font-semibold text-slate-900">Input mode open</div>
                            <div className="flex flex-wrap items-start gap-10">
                                {(['sm', 'default', 'lg'] as const).map((size) => (
                                    <div key={size} className="space-y-2">
                                        <div className="text-xs font-medium uppercase tracking-wide text-slate-500">{size}</div>
                                        <Combobox
                                            items={frameworks}
                                            size={size}
                                            defaultOpen
                                            defaultValue={frameworks[1]}
                                            itemToStringLabel={(item) => item.label}
                                            itemToStringValue={(item) => item.value}
                                        >
                                            <ComboboxPrimitiveInput placeholder="Select a framework" className="w-[220px]" />
                                            <ComboboxContent>
                                                <ComboboxEmpty>No items found.</ComboboxEmpty>
                                                <ComboboxList>
                                                    {(item) => (
                                                        <ComboboxItem key={item.value} value={item}>
                                                            {item.label}
                                                        </ComboboxItem>
                                                    )}
                                                </ComboboxList>
                                            </ComboboxContent>
                                        </Combobox>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </VisualTestCard>

                    <VisualTestCard overflowVisible>
                        <div className="space-y-4">
                            <div className="text-sm font-semibold text-slate-900">Popup mode open</div>
                            <Combobox
                                items={countries}
                                defaultOpen
                                defaultValue={countries[0]}
                                itemToStringLabel={(item) => item.label}
                                itemToStringValue={(item) => item.value}
                            >
                                <ComboboxTrigger
                                    render={(
                                        <Button variant="outline" className="w-64 justify-between font-normal">
                                            <ComboboxValue />
                                        </Button>
                                    )}
                                />
                                <ComboboxContent>
                                    <ComboboxPrimitiveInput showTrigger={false} placeholder="Search countries" />
                                    <ComboboxEmpty>No items found.</ComboboxEmpty>
                                    <ComboboxList>
                                        {(item) => (
                                            <ComboboxItem key={item.code} value={item}>
                                                <span className="flex flex-col">
                                                    <span>{item.label}</span>
                                                    <span className="text-xs text-slate-500">{item.continent}</span>
                                                </span>
                                            </ComboboxItem>
                                        )}
                                    </ComboboxList>
                                </ComboboxContent>
                            </Combobox>
                        </div>
                    </VisualTestCard>
                </div>
            </VisualTestSection>

            <VisualTestSection
                title="Multiple Selection"
                description="Chip wrapping and anchor positioning are important regression surfaces when the selected set grows."
            >
                <VisualTestCard overflowVisible>
                    <div className="space-y-3">
                        <div className="text-sm font-semibold text-slate-900">Multiple with chips</div>
                        <MultipleComboboxSnapshot />
                    </div>
                </VisualTestCard>
            </VisualTestSection>
        </VisualTestPage>
    );
}

export const comboboxVisualTest: VisualTestDefinition = {
    id: 'combobox',
    title: 'Combobox',
    description: 'Focused regression coverage for trigger sizing, open surfaces, and multi-value layout.',
    Component: ComboboxVisualTestPage,
};
