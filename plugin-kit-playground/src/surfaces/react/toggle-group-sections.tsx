import { toggleGroupPlaygroundSections } from '@verbb/plugin-kit-playground';

import { Icon } from '@verbb/plugin-kit-react/components';
import { Toggle } from '@verbb/plugin-kit-react/components';
import { ToggleGroup } from '@verbb/plugin-kit-react/components';
import type { PlaygroundSectionReactRendererMap } from './shared/PlaygroundFromSpec.js';

const {
    basicUsage,
    variants,
    sizes,
    orientation,
    spacing,
    selection,
} = toggleGroupPlaygroundSections;

const formatIcons = {
    bold: 'bold',
    italic: 'italic',
    underline: 'underline',
} as const;

const alignIcons = {
    left: 'align-left',
    center: 'align-center',
    right: 'align-right',
} as const;

function IconToggle({
    value,
    icon,
    label,
    ariaLabel,
    pressed,
}: {
    value: string;
    icon: string;
    label?: string;
    ariaLabel?: string;
    pressed?: boolean;
}) {
    return (
        <Toggle value={value} aria-label={ariaLabel ?? label} pressed={pressed}>
            <Icon icon={icon} aria-hidden />
            {label}
        </Toggle>
    );
}

function AlignToggleGroup({
    id,
    items,
    defaultValue,
    variant = 'outline',
    orientation,
    spacing: gap = 0,
    size,
}: {
    id: string;
    items: ReadonlyArray<{ value: string; ariaLabel: string }>;
    defaultValue: string[];
    variant?: 'default' | 'outline';
    orientation?: 'horizontal' | 'vertical';
    spacing?: number;
    size?: 'sm' | 'lg';
}) {
    return (
        <ToggleGroup
            id={id}
            variant={variant}
            spacing={gap}
            orientation={orientation}
            value={defaultValue}
            {...(size ? { size } : {})}
        >
            {items.map((item) => {
                const alignKey = item.value.replace(/^(h-|v-)/, '') as keyof typeof alignIcons;

                return (
                    <IconToggle
                        key={item.value}
                        value={item.value}
                        icon={alignIcons[alignKey] ?? 'align-left'}
                        ariaLabel={item.ariaLabel}
                        pressed={defaultValue.includes(item.value)}
                    />
                );
            })}
        </ToggleGroup>
    );
}

function FormatToggleGroup({
    id,
    items,
    variant,
    size,
    defaultValue,
}: {
    id: string;
    items: ReadonlyArray<{ value: string; ariaLabel?: string; label?: string }>;
    variant?: 'default' | 'outline';
    size?: 'sm' | 'lg';
    defaultValue?: string[];
}) {
    return (
        <ToggleGroup
            id={id}
            variant={variant}
            spacing={0}
            value={defaultValue}
            {...(size ? { size } : {})}
        >
            {items.map((item) => {
                const formatKey = item.value.replace(/^(sm-|md-|lg-|outline-)/, '') as keyof typeof formatIcons;

                return (
                    <IconToggle
                        key={item.value}
                        value={item.value}
                        icon={formatIcons[formatKey] ?? 'bold'}
                        label={item.label}
                        ariaLabel={item.ariaLabel}
                        pressed={defaultValue?.includes(item.value)}
                    />
                );
            })}
        </ToggleGroup>
    );
}

/** React previews — one function per section id from toggleGroupPlaygroundSpec. */
export const toggleGroupReactSectionRenderers: PlaygroundSectionReactRendererMap = {
    basicUsage: () => (
        <AlignToggleGroup
            id="pg-toggle-group-basic"
            items={basicUsage.items}
            defaultValue={['center']}
        />
    ),

    variants: () => (
        <div className="pg-demo-stack">
            <FormatToggleGroup
                id="pg-toggle-group-default"
                variant="default"
                items={variants.defaultItems}
            />
            <FormatToggleGroup
                id="pg-toggle-group-outline"
                variant="outline"
                items={variants.outlineItems}
            />
        </div>
    ),

    sizes: () => (
        <div className="pg-demo-stack">
            {(['sm', 'default', 'lg'] as const).map((size) => (
                <FormatToggleGroup
                    key={size}
                    id={`pg-toggle-group-size-${size}`}
                    size={size === 'default' ? undefined : size}
                    items={sizes.items.map((item) => ({
                        ...item,
                        value: `${size}-${item.value}`,
                    }))}
                />
            ))}
        </div>
    ),

    orientation: () => (
        <div className="pg-card__inner--row pg-toggle-group-orientation">
            <AlignToggleGroup
                id="pg-toggle-group-horizontal"
                items={orientation.horizontalItems}
                defaultValue={['h-center']}
            />
            <AlignToggleGroup
                id="pg-toggle-group-vertical"
                items={orientation.verticalItems}
                defaultValue={['v-center']}
                orientation="vertical"
            />
        </div>
    ),

    spacing: () => (
        <AlignToggleGroup
            id="pg-toggle-group-spacing"
            items={spacing.items}
            defaultValue={['center']}
            spacing={2}
        />
    ),

    selection: () => (
        <div className="pg-demo-stack">
            <ToggleGroup id="pg-toggle-group-single" value={['left']}>
                {selection.singleItems.map((item) => (
                    <Toggle key={item.value} value={item.value} pressed={item.value === 'left'}>
                        {item.label}
                    </Toggle>
                ))}
            </ToggleGroup>
            <ToggleGroup id="pg-toggle-group-multiple" multiple value={['bold']}>
                {selection.multipleItems.map((item) => (
                    <Toggle key={item.value} value={item.value} pressed={item.value === 'bold'}>
                        {item.label}
                    </Toggle>
                ))}
            </ToggleGroup>
        </div>
    ),
};
