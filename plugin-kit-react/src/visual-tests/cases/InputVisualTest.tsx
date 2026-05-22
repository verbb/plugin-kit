import { Input } from '@verbb/plugin-kit-react/components/Input';
import { VisualTestShadowRoot } from '../shared/VisualTestShadowRoot';
import { VisualTestPage, VisualTestSection, VisualTestCard } from '../shared/visualTestLayouts';
import type { VisualTestDefinition } from '../types';

const inputSizes = [
    { label: 'Extra small', size: 'xs' as const },
    { label: 'Small', size: 'sm' as const },
    { label: 'Default', size: 'default' as const },
    { label: 'Large', size: 'lg' as const },
    { label: 'Extra large', size: 'xl' as const },
];

const inputStates = [
    { label: 'Default', placeholder: 'Default' },
    { label: 'Focus', placeholder: 'Focus', state: 'focus-visible' as const },
    { label: 'Invalid', placeholder: 'Invalid', invalid: true },
    { label: 'Disabled', placeholder: 'Disabled', disabled: true },
];

function craftInputStateHtml(): string {
    return `
        <div class="cmp-rows">
            ${inputStates.map(({ label, placeholder, invalid, disabled }) => {
        const classes = ['text', invalid ? 'error' : ''].filter(Boolean).join(' ');
        const disabledAttr = disabled ? ' disabled' : '';
        const invalidAttr = invalid ? ' aria-invalid="true"' : '';

        return `
                    <div class="cmp-row">
                        <h3 class="cmp-row-heading">${label}</h3>
                        <div class="cmp-row-items">
                            <div class="field" style="margin: 0; width: 240px;">
                                <input class="${classes}" type="text" placeholder="${placeholder}"${disabledAttr}${invalidAttr}>
                            </div>
                        </div>
                    </div>
                `;
    }).join('')}
        </div>
    `;
}

function InputVisualTestPage() {
    return (
        <VisualTestPage
            eyebrow="Visual Tests"
            title="Input"
            description="Visual regression and parity checking for inputs."
            maxWidth="1280px"
        >
            <VisualTestSection
                title="Craft Comparison"
                description="Closed field states are the clearest like-for-like comparison with Craft, so parity is most useful here."
            >
                <div className="cmp-layout">
                    <div className="cmp-column">
                        <h3 className="cmp-column-title">Plugin Kit</h3>

                        <VisualTestShadowRoot>
                            <div className="cmp-rows">
                                {inputStates.map(({ label, placeholder, state, invalid, disabled }) => {
                                    return (
                                        <div className="cmp-row" key={label}>
                                            <h3 className="cmp-row-heading">{label}</h3>
                                            <div className="cmp-row-items">
                                                <div className="w-[240px]">
                                                    <Input
                                                        placeholder={placeholder}
                                                        data-state={state}
                                                        aria-invalid={invalid ? 'true' : undefined}
                                                        disabled={disabled}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </VisualTestShadowRoot>
                    </div>

                    <div className="cmp-column">
                        <h3 className="cmp-column-title">Craft</h3>
                        <div dangerouslySetInnerHTML={{ __html: craftInputStateHtml() }} />
                    </div>
                </div>
            </VisualTestSection>

            <VisualTestSection
                title="Sizes"
                description="The full size range helps catch vertical rhythm drift and text clipping across the complete field scale."
            >
                <VisualTestCard>
                    {inputSizes.map(({ label, size }) => {
                        return (
                            <div className="space-y-3" key={size}>
                                <h3 className="text-sm font-semibold text-gray-900">{label}</h3>
                                <div className="w-[280px]">
                                    <Input size={size} placeholder={`${label} input`} />
                                </div>
                            </div>
                        );
                    })}
                </VisualTestCard>
            </VisualTestSection>

            <VisualTestSection
                title="Value Handling"
                description="Different content lengths should stay stable without collapsing padding, clipping text, or changing overall input shape."
            >
                <VisualTestCard>
                    <div className="space-y-3">
                        <h3 className="text-sm font-semibold text-gray-900">Short and long values</h3>
                        <div className="max-w-[420px] space-y-3">
                            <Input defaultValue="Acme" />
                            <Input defaultValue="A much longer organization name used to check value spacing" />
                            <Input aria-invalid="true" defaultValue="Invalid value example" />
                        </div>
                    </div>
                </VisualTestCard>
            </VisualTestSection>
        </VisualTestPage>
    );
}

export const inputVisualTest: VisualTestDefinition = {
    id: 'input',
    title: 'Input',
    description: 'Visual regression and parity checking for inputs.',
    Component: InputVisualTestPage,
};
