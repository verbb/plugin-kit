import { CheckboxInput } from '@verbb/plugin-kit-react/components/CheckboxInput';
import { VisualTestShadowRoot } from '../shared/VisualTestShadowRoot';
import { VisualTestPage, VisualTestSection, VisualTestCard } from '../shared/visualTestLayouts';
import type { VisualTestDefinition } from '../types';

const focusVisibleProps = { 'data-state': 'focus-visible' } as const;

const uncheckedStates = [
    { label: 'Default' },
    { label: 'Focus', focus: true },
    { label: 'Invalid', invalid: true },
    { label: 'Invalid Focus', invalid: true, focus: true },
    { label: 'Disabled', disabled: true },
];

const checkedStates = [
    { label: 'Checked', checked: true },
    { label: 'Checked Focus', checked: true, focus: true },
    { label: 'Checked Invalid', checked: true, invalid: true },
    { label: 'Checked Invalid Focus', checked: true, invalid: true, focus: true },
    { label: 'Checked Disabled', checked: true, disabled: true },
];

function craftCheckboxControl(options: {
    id: string;
    label: string;
    checked?: boolean;
    disabled?: boolean;
    invalid?: boolean;
}): string {
    const labelId = `${options.id}-label`;
    const checkedAttr = options.checked ? ' checked' : '';
    const disabledAttr = options.disabled ? ' disabled' : '';
    const input = `<input type="checkbox" id="${options.id}" class="checkbox" aria-labelledby="${labelId}"${checkedAttr}${disabledAttr}>`;
    const lab = `<label for="${options.id}" id="${labelId}">${options.label}</label>`;
    const core = `${input}${lab}`;

    if (options.invalid) {
        return `<div class="field checkboxfield has-errors"><div class="input">${core}</div></div>`;
    }

    return core;
}

function craftCheckboxStack(
    prefix: string,
    items: Array<{ label: string; checked?: boolean; disabled?: boolean; invalid?: boolean }>,
): string {
    return items
        .map((item, index) => {
            const control = craftCheckboxControl({
                id: `${prefix}-${index}`,
                ...item,
            });

            return `<div class="cmp-craft-ls-row"><div class="cmp-craft-ls-control">${control}</div></div>`;
        })
        .join('');
}

function CheckboxVisualTestPage() {
    return (
        <VisualTestPage
            eyebrow="Visual Tests"
            title="Checkbox"
            description="Visual regression and parity checking for checkboxes."
            maxWidth="1280px"
        >
            <VisualTestSection
                title="Craft Comparison"
                description="Checkbox states are a strong like-for-like comparison with Craft, especially around invalid and disabled rendering."
            >
                <div className="cmp-layout">
                    <div className="cmp-column">
                        <h3 className="cmp-column-title">Plugin Kit</h3>

                        <VisualTestShadowRoot>
                            <div className="cmp-rows">
                                <div className="cmp-row">
                                    <h3 className="cmp-row-heading">Unchecked</h3>
                                    <div className="cmp-row-items cmp-row-items--stack">
                                        {uncheckedStates.map(({ label, invalid, disabled, focus }) => {
                                            return (
                                                <CheckboxInput
                                                    key={label}
                                                    label={label}
                                                    {...(focus ? focusVisibleProps : {})}
                                                    aria-invalid={invalid ? 'true' : undefined}
                                                    disabled={disabled}
                                                />
                                            );
                                        })}
                                    </div>
                                </div>

                                <div className="cmp-row">
                                    <h3 className="cmp-row-heading">Checked</h3>
                                    <div className="cmp-row-items cmp-row-items--stack">
                                        {checkedStates.map(({ label, checked, invalid, disabled, focus }) => {
                                            return (
                                                <CheckboxInput
                                                    key={label}
                                                    label={label}
                                                    defaultChecked={checked}
                                                    {...(focus ? focusVisibleProps : {})}
                                                    aria-invalid={invalid ? 'true' : undefined}
                                                    disabled={disabled}
                                                />
                                            );
                                        })}
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
                                        <h3 class="cmp-row-heading">Unchecked</h3>
                                        <div class="cmp-row-items cmp-row-items--stack">
                                            ${craftCheckboxStack('craft-cb-unchecked', uncheckedStates)}
                                        </div>
                                    </div>
                                    <div class="cmp-row">
                                        <h3 class="cmp-row-heading">Checked</h3>
                                        <div class="cmp-row-items cmp-row-items--stack">
                                            ${craftCheckboxStack('craft-cb-checked', checkedStates)}
                                        </div>
                                    </div>
                                </div>`,
                            }}
                        />
                    </div>
                </div>
            </VisualTestSection>

            <VisualTestSection
                title="Group Spacing"
                description="Grouped checkboxes help catch label alignment and vertical rhythm issues that are easy to miss in isolated state rows."
            >
                <VisualTestCard>
                    <div className="space-y-6 text-sm">
                        <fieldset className="space-y-2">
                            <legend className="text-sm font-semibold">Notifications</legend>
                            <CheckboxInput label="Product updates" defaultChecked />
                            <CheckboxInput label="Security alerts" defaultChecked />
                            <CheckboxInput label="Marketing tips" />
                        </fieldset>

                        <fieldset className="space-y-2">
                            <legend className="text-sm font-semibold">Preferences</legend>
                            <CheckboxInput label="Compact mode" />
                            <CheckboxInput label="Auto-save" defaultChecked />
                            <CheckboxInput label="Offline access" disabled />
                        </fieldset>
                    </div>
                </VisualTestCard>
            </VisualTestSection>
        </VisualTestPage>
    );
}

export const checkboxVisualTest: VisualTestDefinition = {
    id: 'checkbox',
    title: 'Checkbox',
    description: 'Visual regression and parity checking for checkboxes.',
    Component: CheckboxVisualTestPage,
};
