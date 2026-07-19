import React from 'react';
import {
    comboboxPlaygroundAsyncFruits,
    comboboxPlaygroundColorOptions,
    comboboxPlaygroundCountryOptions,
    comboboxPlaygroundFormOptions,
    comboboxPlaygroundFruitOptions,
    comboboxPlaygroundProduceGroups,
    comboboxPlaygroundSizes,
} from '@verbb/plugin-kit-playground';

import { Combobox } from '@verbb/plugin-kit-react/components';
import { Option } from '@verbb/plugin-kit-react/components';
import { OptionGroup } from '@verbb/plugin-kit-react/components';
import { Separator } from '@verbb/plugin-kit-react/components';
import type { PlaygroundSectionReactRendererMap } from './shared/PlaygroundFromSpec.js';

function SelectSizeRow({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <div className="pg-select-size-row">
            <div className="pg-select-size-row__label">{label}</div>
            {children}
        </div>
    );
}

function FormOptions() {
    return (
        <>
            {comboboxPlaygroundFormOptions.map(({ value, label }) => (
                <Option key={value} value={value}>{label}</Option>
            ))}
        </>
    );
}

function FruitOptions() {
    return (
        <>
            {comboboxPlaygroundFruitOptions.map(({ value, label }) => (
                <Option key={value} value={value}>{label}</Option>
            ))}
        </>
    );
}

function GroupedProduceOptions() {
    return (
        <>
            {comboboxPlaygroundProduceGroups.map((group, index) => (
                <React.Fragment key={group.label}>
                    {index > 0 ? <Separator /> : null}
                    <OptionGroup label={group.label}>
                        {group.options.map(({ value, label }) => (
                            <Option key={value} value={value}>{label}</Option>
                        ))}
                    </OptionGroup>
                </React.Fragment>
            ))}
        </>
    );
}

/** React previews — one function per section id from comboboxPlaygroundSpec. */
export const comboboxReactSectionRenderers: PlaygroundSectionReactRendererMap = {
    basic: () => (
        <Combobox style={{ minWidth: '16rem' }} placeholder="Search forms…">
            <FormOptions />
        </Combobox>
    ),

    withClear: () => (
        <Combobox style={{ minWidth: '16rem' }} placeholder="Search forms…" withClear value="contact">
            <FormOptions />
        </Combobox>
    ),

    grouped: () => (
        <Combobox style={{ minWidth: '16rem' }} placeholder="Select produce…">
            <GroupedProduceOptions />
        </Combobox>
    ),

    multiple: () => (
        <Combobox
            style={{ maxWidth: '20rem' }}
            multiple
            autoHighlight
            placeholder="Add frameworks…"
            values={['next-js']}
        >
            <Option value="next-js">Next.js</Option>
            <Option value="sveltekit">SvelteKit</Option>
            <Option value="nuxt-js">Nuxt.js</Option>
            <Option value="remix">Remix</Option>
            <Option value="astro">Astro</Option>
        </Combobox>
    ),

    popupMode: () => (
        <Combobox
            popupMode
            placeholder="Select a country"
            searchPlaceholder="Search"
            value="argentina"
        >
            {comboboxPlaygroundCountryOptions.map(({ value, label }) => (
                <Option key={value} value={value}>{label}</Option>
            ))}
        </Combobox>
    ),

    sizes: () => (
        <div className="pg-demo-stack pg-demo-narrow">
            {comboboxPlaygroundSizes.map(({ label, size }) => (
                <SelectSizeRow key={size} label={label}>
                    <Combobox size={size} placeholder="Select a fruit" value="apple">
                        <FruitOptions />
                    </Combobox>
                </SelectSizeRow>
            ))}
        </div>
    ),

    allowCreate: () => (
        <Combobox style={{ minWidth: '16rem' }} placeholder="Search or create tags…" allowCreate>
            <Option value="design">Design</Option>
            <Option value="engineering">Engineering</Option>
            <Option value="marketing">Marketing</Option>
        </Combobox>
    ),

    allowCustomValue: () => (
        <Combobox style={{ minWidth: '16rem' }} placeholder="Type or select a color…" allowCustomValue>
            {comboboxPlaygroundColorOptions.map(({ value, label }) => (
                <Option key={value} value={value}>{label}</Option>
            ))}
        </Combobox>
    ),

    asyncSearch: () => (
        <Combobox
            style={{ minWidth: '16rem' }}
            placeholder="Search fruits…"
            async
            withClear
            emptyMessage="Try a different search term."
            fetchOptions={async (query, signal) => {
                await new Promise((resolve, reject) => {
                    const timeout = window.setTimeout(resolve, 400);
                    signal.addEventListener('abort', () => {
                        window.clearTimeout(timeout);
                        reject(new DOMException('Aborted', 'AbortError'));
                    }, { once: true });
                });

                const normalized = query.trim().toLowerCase();
                if (!normalized) {
                    return [];
                }

                return comboboxPlaygroundAsyncFruits.filter((fruit) => {
                    return fruit.label.toLowerCase().includes(normalized);
                });
            }}
        />
    ),
};
