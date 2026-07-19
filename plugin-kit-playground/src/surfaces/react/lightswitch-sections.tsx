import {
    buildCraftLightswitchComparisonHtml,
    lightswitchCheckedStates,
    lightswitchUncheckedStates,
} from '@verbb/plugin-kit-playground';
import { lightswitchPlaygroundSections } from '@verbb/plugin-kit-playground';

import { Lightswitch } from '@verbb/plugin-kit-react/components';
import type { PlaygroundSectionReactRendererMap } from './shared/PlaygroundFromSpec.js';
import { ComparisonRow, slugify, StateMatrixCell } from './shared/sectionHelpers.js';

function LabelRow({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <div className="cmp-craft-ls-row pg-lightswitch-row">
            <div className="cmp-craft-ls-control">{children}</div>
            <span className="cmp-craft-ls-label">{label}</span>
        </div>
    );
}

/** React previews — one function per section id from lightswitchPlaygroundSpec. */
export const lightswitchReactSectionRenderers: PlaygroundSectionReactRendererMap = {
    craftComparison: () => (
        <div className="cmp-layout">
            <div className="cmp-column">
                <span className="cmp-column-title">Plugin Kit</span>
                <div className="cmp-rows">
                    <ComparisonRow heading="Unchecked">
                        {lightswitchUncheckedStates.map(({ label, disabled, invalid, focus }) => (
                            <StateMatrixCell key={label} label={label}>
                                <Lightswitch
                                    id={`pg-ls-unchecked-${slugify(label)}`}
                                    disabled={disabled}
                                    invalid={invalid}
                                    {...(focus ? { 'data-state': 'focus-visible' } : {})}
                                />
                            </StateMatrixCell>
                        ))}
                    </ComparisonRow>
                    <ComparisonRow heading="Checked">
                        {lightswitchCheckedStates.map(({ label, on, disabled, invalid, focus }) => (
                            <StateMatrixCell key={label} label={label}>
                                <Lightswitch
                                    id={`pg-ls-checked-${slugify(label)}`}
                                    checked={on}
                                    disabled={disabled}
                                    invalid={invalid}
                                    {...(focus ? { 'data-state': 'focus-visible' } : {})}
                                />
                            </StateMatrixCell>
                        ))}
                    </ComparisonRow>
                </div>
            </div>
            <div className="cmp-column">
                <span className="cmp-column-title">Craft</span>
                <div dangerouslySetInnerHTML={{ __html: buildCraftLightswitchComparisonHtml() }} />
            </div>
        </div>
    ),

    basicUsage: () => <Lightswitch id="lightswitch-basic" />,

    sizes: () => (
        <div className="pg-demo-stack">
            {lightswitchPlaygroundSections.sizes.items.map(({ label, size }) => (
                <LabelRow key={size} label={label}>
                    <Lightswitch
                        id={`lightswitch-size-${size}`}
                        {...(size !== 'default' ? { size } : {})}
                    />
                </LabelRow>
            ))}
        </div>
    ),

    checked: () => <Lightswitch id="lightswitch-checked" checked />,

    disabled: () => <Lightswitch id="lightswitch-disabled" checked disabled />,

    labels: () => {
        const { simpleLabel, titleLabel, descriptionLabel } = lightswitchPlaygroundSections.labels;

        return (
            <div className="pg-card__inner pg-demo-stack">
                <Lightswitch id="lightswitch-label-simple" checked>
                    {simpleLabel}
                </Lightswitch>
                <Lightswitch id="lightswitch-label-hint" checked instructions={descriptionLabel}>
                    {titleLabel}
                </Lightswitch>
            </div>
        );
    },
};
