import { Lightswitch } from '@verbb/plugin-kit-react/components/Lightswitch';
import { VisualTestShadowRoot } from '../shared/VisualTestShadowRoot';
import { VisualTestPage, VisualTestSection, VisualTestCard } from '../shared/visualTestLayouts';
import type { VisualTestDefinition } from '../types';

const focusVisibleProps = { 'data-state': 'focus-visible' } as const;

const switchSizes = [
    { label: 'Extra small', size: 'xs' as const },
    { label: 'Small', size: 'sm' as const },
    { label: 'Default', size: 'default' as const },
];

const uncheckedStates = [
    { label: 'Default' },
    { label: 'Focus', focus: true },
    { label: 'Invalid', invalid: true },
    { label: 'Invalid Focus', invalid: true, focus: true },
    { label: 'Disabled', disabled: true },
];

const checkedStates = [
    { label: 'Checked', on: true },
    { label: 'Checked Focus', on: true, focus: true },
    { label: 'Checked Invalid', on: true, invalid: true },
    { label: 'Checked Invalid Focus', on: true, invalid: true, focus: true },
    { label: 'Checked Disabled', on: true, disabled: true },
];

function craftLightswitchMarkup(options: {
    id: string;
    on?: boolean;
    disabled?: boolean;
    invalid?: boolean;
}): string {
    const classes = ['lightswitch', options.on && 'on', options.disabled && 'noteditable'].filter(Boolean).join(' ');
    const pressed = options.on ? 'true' : 'false';
    const disabledAttr = options.disabled ? ' disabled' : '';
    const inner = '<div class="lightswitch-container"><div class="handle"></div></div>';
    const button = `<button type="button" id="${options.id}" class="${classes}" role="switch" aria-checked="${pressed}"${disabledAttr}>${inner}</button>`;

    if (options.invalid) {
        return `<div class="field lightswitch-field has-errors"><div class="input">${button}</div></div>`;
    }

    return button;
}

function craftLabeledRow(
    prefix: string,
    items: Array<{ label: string; on?: boolean; disabled?: boolean; invalid?: boolean }>,
): string {
    return items
        .map(({ label, on, disabled, invalid }, index) => {
            const control = craftLightswitchMarkup({ id: `${prefix}-${index}`, on, disabled, invalid });
            return `<div class="cmp-craft-ls-row"><div class="cmp-craft-ls-control">${control}</div><span class="cmp-craft-ls-label">${label}</span></div>`;
        })
        .join('');
}

function LightswitchVisualTestPage() {
    return (
        <VisualTestPage
            eyebrow="Visual Tests"
            title="Lightswitch"
            description="Visual regression and parity checking for lightswitches."
            maxWidth="1280px"
        >
            <VisualTestSection
                title="Craft Comparison"
                description="Unchecked and checked switch states are the clearest like-for-like comparison with Craft, especially for invalid and disabled rendering."
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
                                                <label className="flex items-center gap-2 text-sm" key={label}>
                                                    <Lightswitch
                                                        {...(focus ? focusVisibleProps : {})}
                                                        aria-invalid={invalid ? 'true' : undefined}
                                                        disabled={disabled}
                                                    />
                                                    {label}
                                                </label>
                                            );
                                        })}
                                    </div>
                                </div>

                                <div className="cmp-row">
                                    <h3 className="cmp-row-heading">Checked</h3>
                                    <div className="cmp-row-items cmp-row-items--stack">
                                        {checkedStates.map(({ label, on, invalid, disabled, focus }) => {
                                            return (
                                                <label className="flex items-center gap-2 text-sm" key={label}>
                                                    <Lightswitch
                                                        defaultChecked={on}
                                                        {...(focus ? focusVisibleProps : {})}
                                                        aria-invalid={invalid ? 'true' : undefined}
                                                        disabled={disabled}
                                                    />
                                                    {label}
                                                </label>
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
                                            ${craftLabeledRow('craft-ls-unchecked', uncheckedStates)}
                                        </div>
                                    </div>
                                    <div class="cmp-row">
                                        <h3 class="cmp-row-heading">Checked</h3>
                                        <div class="cmp-row-items cmp-row-items--stack">
                                            ${craftLabeledRow('craft-ls-checked', checkedStates)}
                                        </div>
                                    </div>
                                </div>`,
                            }}
                        />
                    </div>
                </div>
            </VisualTestSection>

            <VisualTestSection
                title="Sizes"
                description="The reduced switch scale is compact, so this matrix helps catch handle spacing and label alignment drift across sizes."
            >
                <VisualTestCard>
                    <div className="space-y-5 text-sm">
                        <div className="space-y-3">
                            <h3 className="text-sm font-semibold text-gray-900">Unchecked</h3>
                            <div className="flex flex-wrap items-center gap-6">
                                {switchSizes.map(({ label, size }) => {
                                    return (
                                        <label className="flex items-center gap-2" key={`off-${size}`}>
                                            <Lightswitch size={size} />
                                            {label}
                                        </label>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="space-y-3">
                            <h3 className="text-sm font-semibold text-gray-900">Checked</h3>
                            <div className="flex flex-wrap items-center gap-6">
                                {switchSizes.map(({ label, size }) => {
                                    return (
                                        <label className="flex items-center gap-2" key={`on-${size}`}>
                                            <Lightswitch defaultChecked size={size} />
                                            {label}
                                        </label>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </VisualTestCard>
            </VisualTestSection>
        </VisualTestPage>
    );
}

export const lightswitchVisualTest: VisualTestDefinition = {
    id: 'lightswitch',
    title: 'Lightswitch',
    description: 'Visual regression and parity checking for lightswitches.',
    Component: LightswitchVisualTestPage,
};
