import { togglePlaygroundSections } from '@verbb/plugin-kit-playground';

import { Icon } from '@verbb/plugin-kit-react/components';
import { Toggle } from '@verbb/plugin-kit-react/components';
import type { PlaygroundSectionReactRendererMap } from './shared/PlaygroundFromSpec.js';

const { basicUsage, disabled } = togglePlaygroundSections;

function FormatToggle({
    id,
    icon,
    label,
    variant,
    size,
    pressed,
    disabled: isDisabled,
}: {
    id: string;
    icon: string;
    label?: string;
    variant?: 'default' | 'outline';
    size?: 'sm' | 'lg';
    pressed?: boolean;
    disabled?: boolean;
}) {
    return (
        <Toggle
            id={id}
            variant={variant}
            size={size}
            pressed={pressed}
            disabled={isDisabled}
            aria-label={label}
        >
            <Icon icon={icon} aria-hidden />
            {label}
        </Toggle>
    );
}

/** React previews — one function per section id from togglePlaygroundSpec. */
export const toggleReactSectionRenderers: PlaygroundSectionReactRendererMap = {
    basicUsage: () => (
        <FormatToggle id="pg-toggle-basic" icon="bold" label={basicUsage.label} />
    ),

    variants: () => (
        <div className="pg-card__inner--row">
            <FormatToggle id="pg-toggle-default" icon="bold" label="Bold" />
            <FormatToggle id="pg-toggle-outline" icon="italic" label="Italic" variant="outline" />
        </div>
    ),

    sizes: () => (
        <div className="pg-card__inner--row">
            <FormatToggle id="pg-toggle-sm" icon="bold" label="Bold" size="sm" />
            <FormatToggle id="pg-toggle-md" icon="italic" label="Italic" />
            <FormatToggle id="pg-toggle-lg" icon="underline" label="Underline" size="lg" />
        </div>
    ),

    pressed: () => (
        <div className="pg-card__inner--row">
            <FormatToggle id="pg-toggle-pressed-default" icon="italic" label="Italic" pressed />
            <FormatToggle id="pg-toggle-pressed-outline" icon="italic" label="Italic" variant="outline" pressed />
        </div>
    ),

    disabled: () => (
        <FormatToggle id="pg-toggle-disabled" icon="bold" label={disabled.label} disabled />
    ),
};
