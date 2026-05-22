import { RadioGroup, RadioGroupItem } from '@verbb/plugin-kit-react/components/RadioGroup';
import { VisualTestShadowRoot } from '../shared/VisualTestShadowRoot';
import { VisualTestPage, VisualTestSection, VisualTestCard } from '../shared/visualTestLayouts';
import type { VisualTestDefinition } from '../types';

const focusVisibleProps = { 'data-state': 'focus-visible' } as const;

const radioStates = [
    { label: 'Default', value: 'default', checked: true },
    { label: 'Focus', value: 'focus', focus: true },
    { label: 'Invalid', value: 'invalid', invalid: true },
    { label: 'Invalid Focus', value: 'invalid-focus', invalid: true, focus: true },
    { label: 'Disabled', value: 'disabled', disabled: true },
];

function craftRadioControl(options: {
    name: string;
    id: string;
    label: string;
    checked?: boolean;
    disabled?: boolean;
    invalid?: boolean;
}): string {
    const labelId = `${options.id}-label`;
    const checkedAttr = options.checked ? ' checked' : '';
    const disabledAttr = options.disabled ? ' disabled' : '';
    const input = `<input type="radio" name="${options.name}" id="${options.id}" class="radio" aria-labelledby="${labelId}"${checkedAttr}${disabledAttr}>`;
    const lab = `<label for="${options.id}" id="${labelId}">${options.label}</label>`;
    const core = `${input}${lab}`;

    if (options.invalid) {
        return `<div class="field lightswitchfield has-errors"><div class="input">${core}</div></div>`;
    }

    return core;
}

function craftRadioStack(): string {
    return radioStates
        .map((item, index) => {
            const control = craftRadioControl({
                name: 'craft-radio-states',
                id: `craft-radio-${index}`,
                label: item.label,
                checked: item.checked,
                disabled: item.disabled,
                invalid: item.invalid,
            });

            return `<div class="cmp-craft-ls-row"><div class="cmp-craft-ls-control">${control}</div></div>`;
        })
        .join('');
}

function RadioGroupVisualTestPage() {
    return (
        <VisualTestPage
            eyebrow="Visual Tests"
            title="RadioGroup"
            description="Visual regression and parity checking for radio groups."
            maxWidth="1280px"
        >
            <VisualTestSection
                title="Craft Comparison"
                description="Single-select radio states are easy to compare directly with Craft, especially for invalid and disabled rendering."
            >
                <div className="cmp-layout">
                    <div className="cmp-column">
                        <h3 className="cmp-column-title">Plugin Kit</h3>

                        <VisualTestShadowRoot>
                            <div className="cmp-rows">
                                <div className="cmp-row">
                                    <div className="cmp-row-items cmp-row-items--stack">
                                        <RadioGroup defaultValue="default">
                                            {radioStates.map(({ label, value, focus, invalid, disabled }) => {
                                                return (
                                                    <label className="flex items-center gap-2 text-sm" key={value}>
                                                        <RadioGroupItem
                                                            value={value}
                                                            {...(focus ? focusVisibleProps : {})}
                                                            aria-invalid={invalid ? 'true' : undefined}
                                                            disabled={disabled}
                                                        />
                                                        {label}
                                                    </label>
                                                );
                                            })}
                                        </RadioGroup>
                                    </div>
                                </div>
                            </div>
                        </VisualTestShadowRoot>
                    </div>

                    <div className="cmp-column">
                        <h3 className="cmp-column-title">Craft</h3>
                        <div
                            dangerouslySetInnerHTML={{
                                __html: `<div class="cmp-rows">
                                    <div class="cmp-row">
                                        <div class="cmp-row-items cmp-row-items--stack">
                                            ${craftRadioStack()}
                                        </div>
                                    </div>
                                </div>`,
                            }}
                        />
                    </div>
                </div>
            </VisualTestSection>

            <VisualTestSection
                title="Group Layouts"
                description="Longer labels and supporting descriptions help surface alignment issues that do not appear in a bare state list."
            >
                <VisualTestCard>
                    <div className="space-y-6">
                        <RadioGroup defaultValue="team">
                            <label className="flex items-start gap-2 text-sm">
                                <RadioGroupItem value="team" className="mt-0.5" />
                                <span>
                                    <span className="font-medium">Team</span>
                                    <span className="block text-slate-500">Visible to the whole team.</span>
                                </span>
                            </label>
                            <label className="flex items-start gap-2 text-sm">
                                <RadioGroupItem value="private" className="mt-0.5" />
                                <span>
                                    <span className="font-medium">Private</span>
                                    <span className="block text-slate-500">Only visible to you.</span>
                                </span>
                            </label>
                        </RadioGroup>

                        <RadioGroup defaultValue="starter">
                            <label className="flex items-center gap-2 text-sm">
                                <RadioGroupItem value="starter" />
                                Starter
                            </label>
                            <label className="flex items-center gap-2 text-sm">
                                <RadioGroupItem value="pro" />
                                Pro
                            </label>
                            <label className="flex items-center gap-2 text-sm">
                                <RadioGroupItem value="enterprise" disabled />
                                Enterprise
                            </label>
                        </RadioGroup>
                    </div>
                </VisualTestCard>
            </VisualTestSection>
        </VisualTestPage>
    );
}

export const radioGroupVisualTest: VisualTestDefinition = {
    id: 'radio-group',
    title: 'RadioGroup',
    description: 'Visual regression and parity checking for radio groups.',
    Component: RadioGroupVisualTestPage,
};
