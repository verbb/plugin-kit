import { useState, type ReactNode } from 'react';

import { ImageBrowser } from '@verbb/plugin-kit-react/components';
import type {
    PkImageBrowserMode,
    PkImageBrowserGroup,
    PkImageBrowserItem,
    PkImageBrowserLabelMode,
} from '@verbb/plugin-kit-react/components';
import {
    demoIconGroups,
    demoIconItems,
    demoImageGroups,
    demoImageLabeledItems,
} from '../../catalog/data/image-browser-fixtures.js';
import type { PlaygroundSectionReactRendererMap } from './shared/PlaygroundFromSpec.js';
import { DemoValueReadout } from './shared/sectionHelpers.js';

function ImageBrowserDemo({
    initialValue = '',
    mode,
    items,
    groups,
    placeholder,
    searchPlaceholder,
    labelMode,
    disabled,
    invalid,
    loading,
    selectedLabel,
    selectedPreview,
    caption,
}: {
    initialValue?: string;
    mode?: PkImageBrowserMode;
    items?: PkImageBrowserItem[];
    groups?: PkImageBrowserGroup[];
    placeholder?: string;
    searchPlaceholder?: string;
    labelMode?: PkImageBrowserLabelMode;
    disabled?: boolean;
    invalid?: boolean;
    loading?: boolean;
    selectedLabel?: string;
    selectedPreview?: string;
    caption?: string;
}) {
    const [value, setValue] = useState(initialValue);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            {caption ? (
                <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--pk-color-gray-600)' }}>
                    {caption}
                </div>
            ) : null}
            <ImageBrowser
                value={value}
                mode={mode}
                items={items}
                groups={groups}
                placeholder={placeholder}
                searchPlaceholder={searchPlaceholder}
                labelMode={labelMode}
                disabled={disabled}
                invalid={invalid}
                loading={loading}
                selectedLabel={selectedLabel}
                selectedPreview={selectedPreview}
                onChange={setValue}
            />
            <DemoValueReadout value={value} />
        </div>
    );
}

function ComparisonRow({ children }: { children: ReactNode }) {
    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', alignItems: 'flex-start' }}>
            {children}
        </div>
    );
}

/** React previews — one function per section id from imageBrowserPlaygroundSpec. */
export const imageBrowserReactSectionRenderers: PlaygroundSectionReactRendererMap = {
    icons: () => (
        <ComparisonRow>
            <ImageBrowserDemo
                caption="Default (tooltip)"
                initialValue="star"
                items={demoIconItems}
                placeholder="Choose an icon"
                searchPlaceholder="Search icons"
            />
            <ImageBrowserDemo
                caption="Inline"
                initialValue="star"
                items={demoIconItems}
                labelMode="inline"
                placeholder="Choose an icon"
                searchPlaceholder="Search icons"
            />
            <ImageBrowserDemo
                caption="None"
                initialValue="star"
                items={demoIconItems}
                labelMode="none"
                placeholder="Choose an icon"
                searchPlaceholder="Search icons"
            />
        </ComparisonRow>
    ),

    images: () => (
        <ComparisonRow>
            <ImageBrowserDemo
                caption="Default (tooltip)"
                initialValue="seagulls.jpg"
                mode="image"
                items={demoImageLabeledItems}
                placeholder="Choose a preview image"
                searchPlaceholder="Search images"
            />
            <ImageBrowserDemo
                caption="Inline"
                initialValue="seagulls.jpg"
                mode="image"
                items={demoImageLabeledItems}
                labelMode="inline"
                placeholder="Choose a preview image"
                searchPlaceholder="Search images"
            />
            <ImageBrowserDemo
                caption="None"
                initialValue="seagulls.jpg"
                mode="image"
                items={demoImageLabeledItems}
                labelMode="none"
                placeholder="Choose a preview image"
                searchPlaceholder="Search images"
            />
        </ComparisonRow>
    ),

    groups: () => (
        <ComparisonRow>
            <ImageBrowserDemo
                caption="Icons"
                groups={demoIconGroups}
                placeholder="Choose an icon"
                searchPlaceholder="Search icons"
            />
            <ImageBrowserDemo
                caption="Images"
                initialValue="seagulls.jpg"
                mode="image"
                groups={demoImageGroups}
                placeholder="Choose a preview image"
                searchPlaceholder="Search images"
            />
        </ComparisonRow>
    ),

    states: () => {
        const loadingStar = demoIconItems.find((item) => item.value === 'star');

        return (
            <ComparisonRow>
                <ImageBrowserDemo
                    caption="Loading (open panel)"
                    initialValue="star"
                    loading
                    selectedLabel={loadingStar?.label}
                    selectedPreview={loadingStar?.preview}
                    placeholder="Choose an icon"
                    searchPlaceholder="Search icons"
                />
                <ImageBrowserDemo caption="Invalid" initialValue="bolt" items={demoIconItems} invalid />
                <ImageBrowserDemo caption="Disabled" initialValue="leaf" items={demoIconItems} disabled />
                <ImageBrowserDemo caption="Cleared" items={demoIconItems} />
            </ComparisonRow>
        );
    },
};
