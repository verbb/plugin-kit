import { useState } from 'react';

import { ColorInput } from '@verbb/plugin-kit-react/components';
import type { PlaygroundSectionReactRendererMap } from './shared/PlaygroundFromSpec.js';
import { DemoValueReadout } from './shared/sectionHelpers.js';

function ColorInputDemo({
    initialValue = '#35e533',
    showValue = true,
    ...props
}: {
    initialValue?: string;
    showValue?: boolean;
    size?: 'xs' | 'sm' | 'default' | 'lg' | 'xl';
    invalid?: boolean;
    disabled?: boolean;
}) {
    const [value, setValue] = useState(initialValue);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            <ColorInput
                value={value}
                {...props}
                onPkChange={(event) => { setValue(event.detail.value); }}
            />
            {showValue ? <DemoValueReadout value={value} /> : null}
        </div>
    );
}

/** React previews — one function per section id from colorInputPlaygroundSpec. */
export const colorInputReactSectionRenderers: PlaygroundSectionReactRendererMap = {
    basic: () => (
        <div className="pg-demo-narrow">
            <ColorInputDemo initialValue="#35e533" />
        </div>
    ),

    resolved: () => (
        <div className="pg-demo-narrow" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <ColorInputDemo initialValue="" />
            <ColorInputDemo initialValue="#a9" />
            <ColorInputDemo initialValue="#9c4" />
            <ColorInputDemo initialValue="#35e533" />
            <ColorInputDemo initialValue="#35e533" invalid />
            <ColorInputDemo initialValue="#35e533" disabled />
        </div>
    ),

    sizes: () => (
        <div className="pg-demo-narrow" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {(['xs', 'sm', 'default', 'lg'] as const).map((size) => (
                <div key={size} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span
                        style={{
                            flexShrink: 0,
                            width: '4rem',
                            fontSize: 12,
                            color: 'var(--pk-color-gray-500)',
                        }}
                    >
                        {size}
                    </span>
                    <ColorInputDemo
                        initialValue="#35e533"
                        {...(size !== 'default' ? { size } : {})}
                    />
                </div>
            ))}
        </div>
    ),

    states: () => (
        <div className="pg-card__inner--row">
            <ColorInputDemo initialValue="#e64d4c" showValue={false} />
            <ColorInput value="#ff" invalid />
            <ColorInput value="#64748b" disabled />
        </div>
    ),
};
