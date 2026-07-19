import type { ReactNode } from 'react';
import {
    buildCraftCheckboxComparisonHtml,
    checkboxCheckedStates,
    checkboxPlaygroundSections,
    checkboxUncheckedStates,
} from '@verbb/plugin-kit-playground';

import { Checkbox } from '@verbb/plugin-kit-react/components';
import type { PlaygroundSectionReactRendererMap } from './shared/PlaygroundFromSpec.js';

function slugify(label: string): string {
    return label.replace(/\s+/g, '-').toLowerCase();
}

const checkboxGroupDemos = [
    {
        legend: 'Notifications',
        items: [
            { id: 'pg-cb-notify-updates', label: 'Product updates', checked: true },
            { id: 'pg-cb-notify-security', label: 'Security alerts', checked: true },
            { id: 'pg-cb-notify-marketing', label: 'Marketing tips' },
        ],
    },
    {
        legend: 'Preferences',
        items: [
            { id: 'pg-cb-pref-compact', label: 'Compact mode' },
            { id: 'pg-cb-pref-autosave', label: 'Auto-save', checked: true },
            { id: 'pg-cb-pref-offline', label: 'Offline access', disabled: true },
        ],
    },
] as const;

/** React previews — one function per section id from checkboxPlaygroundSpec. */
export const checkboxReactSectionRenderers: PlaygroundSectionReactRendererMap = {
    craftComparison: () => (
        <div className="cmp-layout">
            <div className="cmp-column">
                <span className="cmp-column-title">Plugin Kit</span>
                <div className="cmp-rows">
                    <div className="cmp-row">
                        <h3 className="cmp-row-heading">Unchecked</h3>
                        <div className="cmp-row-items cmp-row-items--state-matrix">
                            {checkboxUncheckedStates.map(({ label, invalid, disabled, focus }) => (
                                <div className="cmp-state-cell" key={label}>
                                    <Checkbox
                                        id={`pg-checkbox-unchecked-${slugify(label)}`}
                                        invalid={invalid}
                                        disabled={disabled}
                                        {...(focus ? { 'data-state': 'focus-visible' } : {})}
                                    >
                                        {label}
                                    </Checkbox>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="cmp-row">
                        <h3 className="cmp-row-heading">Checked</h3>
                        <div className="cmp-row-items cmp-row-items--state-matrix">
                            {checkboxCheckedStates.map(({ label, checked, invalid, disabled, focus }) => (
                                <div className="cmp-state-cell" key={label}>
                                    <Checkbox
                                        id={`pg-checkbox-checked-${slugify(label)}`}
                                        checked={checked}
                                        invalid={invalid}
                                        disabled={disabled}
                                        {...(focus ? { 'data-state': 'focus-visible' } : {})}
                                    >
                                        {label}
                                    </Checkbox>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className="cmp-column">
                <span className="cmp-column-title">Craft</span>
                <div dangerouslySetInnerHTML={{ __html: buildCraftCheckboxComparisonHtml() }} />
            </div>
        </div>
    ),

    groupSpacing: () => (
        <div className="pg-checkbox-groups">
            {checkboxGroupDemos.map(({ legend, items }) => (
                <fieldset className="pg-checkbox-group" key={legend}>
                    <legend className="pg-checkbox-group__legend">{legend}</legend>
                    {items.map((item) => (
                        <Checkbox
                            key={item.id}
                            id={item.id}
                            checked={'checked' in item ? item.checked : false}
                            disabled={'disabled' in item ? item.disabled : false}
                        >
                            {item.label}
                        </Checkbox>
                    ))}
                </fieldset>
            ))}
        </div>
    ),

    basicUsage: () => (
        <div className="pg-demo-narrow">
            <Checkbox id="checkbox-basic" aria-label={checkboxPlaygroundSections.basicUsage.ariaLabel} />
        </div>
    ),

    checked: () => (
        <div className="pg-demo-narrow">
            <Checkbox id="checkbox-checked" checked aria-label={checkboxPlaygroundSections.checked.ariaLabel} />
        </div>
    ),

    disabled: () => (
        <div className="pg-demo-narrow">
            <Checkbox
                id="checkbox-disabled"
                checked
                disabled
                aria-label={checkboxPlaygroundSections.disabled.ariaLabel}
            />
        </div>
    ),

    hint: () => (
        <div className="pg-demo-narrow">
            <Checkbox
                id="checkbox-hint"
                hint={checkboxPlaygroundSections.hint.hint}
            >
                {checkboxPlaygroundSections.hint.label}
            </Checkbox>
        </div>
    ),
};

export type CheckboxReactSectionRenderer = () => ReactNode;
