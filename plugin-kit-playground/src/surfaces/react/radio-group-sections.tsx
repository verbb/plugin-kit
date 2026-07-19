import {
    buildCraftRadioComparisonHtml,
    radioCheckedStates,
    radioGroupPlaygroundSections,
    radioUncheckedStates,
} from '@verbb/plugin-kit-playground';

import { Radio } from '@verbb/plugin-kit-react/components';
import { RadioGroup } from '@verbb/plugin-kit-react/components';
import type { PlaygroundSectionReactRendererMap } from './shared/PlaygroundFromSpec.js';
import { ComparisonRow, slugify, StateMatrixCell } from './shared/sectionHelpers.js';

function RichRadioLabel({ title, description }: { title: string; description: string }) {
    return (
        <span>
            <span style={{ fontWeight: 500 }}>{title}</span>
            <span style={{ display: 'block', color: 'var(--pk-color-slate-500)' }}>{description}</span>
        </span>
    );
}

/** React previews — one function per section id from radioGroupPlaygroundSpec. */
export const radioGroupReactSectionRenderers: PlaygroundSectionReactRendererMap = {
    craftComparison: () => (
        <div className="cmp-layout">
            <div className="cmp-column">
                <span className="cmp-column-title">Plugin Kit</span>
                <div className="cmp-rows">
                    <ComparisonRow heading="Unchecked">
                        {radioUncheckedStates.map(({ label, invalid, disabled, focus }) => (
                            <StateMatrixCell key={label} label={label}>
                                <Radio
                                    value={`pg-radio-unchecked-${slugify(label)}`}
                                    invalid={invalid}
                                    disabled={disabled}
                                    {...(focus ? { 'data-state': 'focus-visible' } : {})}
                                />
                            </StateMatrixCell>
                        ))}
                    </ComparisonRow>
                    <ComparisonRow heading="Checked">
                        {radioCheckedStates.map(({ label, checked, invalid, disabled, focus }) => (
                            <StateMatrixCell key={label} label={label}>
                                <Radio
                                    value={`pg-radio-checked-${slugify(label)}`}
                                    checked={checked}
                                    invalid={invalid}
                                    disabled={disabled}
                                    {...(focus ? { 'data-state': 'focus-visible' } : {})}
                                />
                            </StateMatrixCell>
                        ))}
                    </ComparisonRow>
                </div>
            </div>
            <div className="cmp-column">
                <span className="cmp-column-title">Craft</span>
                <div dangerouslySetInnerHTML={{ __html: buildCraftRadioComparisonHtml() }} />
            </div>
        </div>
    ),

    basicUsage: () => (
        <div className="pg-demo-narrow">
            <RadioGroup id="pg-radio-basic" name="pg-radio-frequency" value="daily">
                <Radio value="daily">Daily</Radio>
                <Radio value="weekly">Weekly</Radio>
                <Radio value="monthly">Monthly</Radio>
            </RadioGroup>
        </div>
    ),

    supportingDescriptions: () => (
        <div className="pg-demo-narrow">
            <RadioGroup id="pg-radio-descriptions" name="pg-radio-visibility" value="team">
                <Radio value="team">
                    <RichRadioLabel title="Team" description="Visible to the whole team." />
                </Radio>
                <Radio value="private">
                    <RichRadioLabel title="Private" description="Only visible to you." />
                </Radio>
            </RadioGroup>
        </div>
    ),

    disabledOptions: () => (
        <div className="pg-demo-narrow">
            <RadioGroup id="pg-radio-disabled" name="pg-radio-plan" value="starter">
                <Radio value="starter">Starter</Radio>
                <Radio value="pro">Pro</Radio>
                <Radio value="enterprise" disabled>Enterprise</Radio>
            </RadioGroup>
        </div>
    ),

    layoutAndError: () => {
        const { errorMessage } = radioGroupPlaygroundSections.layoutAndError;

        return (
            <div className="pg-demo-narrow" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <RadioGroup id="pg-radio-horizontal" name="pg-radio-layout" value="daily" orientation="horizontal">
                    <Radio value="daily">Daily</Radio>
                    <Radio value="weekly">Weekly</Radio>
                    <Radio value="monthly">Monthly</Radio>
                </RadioGroup>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <RadioGroup id="pg-radio-invalid" name="pg-radio-channel" value="email" invalid>
                        <Radio value="email">Email</Radio>
                        <Radio value="sms">SMS</Radio>
                    </RadioGroup>
                    <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--pk-color-rose-600)' }}>
                        {errorMessage}
                    </p>
                </div>
            </div>
        );
    },
};
