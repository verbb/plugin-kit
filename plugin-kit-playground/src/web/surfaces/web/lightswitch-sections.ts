import {
    buildCraftLightswitchComparisonHtml,
    createComparisonLayout,
    createComparisonMatrixItem,
    createStateMatrixRow,
    lightswitchCheckedStates,
    lightswitchUncheckedStates,
} from '../../../catalog/data/comparison.js';
import { lightswitchPlaygroundSections } from '../../../catalog/data/meta-lightswitch.js';
import type { PlaygroundSectionRendererMap } from '../../../catalog/types.js';

import { createPkLightswitch } from '../../dom.js';

function createComparisonLightswitch(
    id: string,
    label: string,
    options: {
        checked?: boolean;
        disabled?: boolean;
        invalid?: boolean;
        focus?: boolean;
        size?: 'default' | 'sm' | 'xs' | 'xxs';
    } = {},
): HTMLElement {
    return createComparisonMatrixItem(
        createPkLightswitch({
            id,
            checked: options.checked,
            disabled: options.disabled,
            invalid: options.invalid,
            size: options.size,
            state: options.focus ? 'focus-visible' : undefined,
        }),
        label,
    );
}

function createLabelRow(control: HTMLElement, label: string): HTMLElement {
    const row = document.createElement('div');
    row.className = 'cmp-craft-ls-row pg-lightswitch-row';

    const controlWrap = document.createElement('div');
    controlWrap.className = 'cmp-craft-ls-control';
    controlWrap.append(control);

    const text = document.createElement('span');
    text.className = 'cmp-craft-ls-label';
    text.textContent = label;

    row.append(controlWrap, text);
    return row;
}

function slugify(label: string): string {
    return label.replace(/\s+/g, '-').toLowerCase();
}

/** Web component previews — one function per section id from lightswitchPlaygroundSpec. */
export const lightswitchWebSectionRenderers: PlaygroundSectionRendererMap = {
    craftComparison(preview) {
        const pkRows = document.createElement('div');
        pkRows.className = 'cmp-rows';
        pkRows.append(
            createStateMatrixRow(
                'Unchecked',
                lightswitchUncheckedStates.map(({ label, disabled: isDisabled, invalid, focus }) => createComparisonLightswitch(
                    `pg-ls-unchecked-${slugify(label)}`,
                    label,
                    { disabled: isDisabled, invalid, focus },
                )),
            ),
            createStateMatrixRow(
                'Checked',
                lightswitchCheckedStates.map(({ label, on, disabled: isDisabled, invalid, focus }) => createComparisonLightswitch(
                    `pg-ls-checked-${slugify(label)}`,
                    label,
                    { checked: on, disabled: isDisabled, invalid, focus },
                )),
            ),
        );

        const craftRows = document.createElement('div');
        craftRows.innerHTML = buildCraftLightswitchComparisonHtml();

        preview.append(createComparisonLayout(pkRows, craftRows));
    },

    basicUsage(preview) {
        preview.append(createPkLightswitch({ id: 'lightswitch-basic' }));
    },

    sizes(preview) {
        const stack = document.createElement('div');
        stack.className = 'pg-demo-stack';

        for (const { label, size } of lightswitchPlaygroundSections.sizes.items) {
            stack.append(createLabelRow(
                createPkLightswitch({ id: `lightswitch-size-${size}`, size }),
                label,
            ));
        }

        preview.append(stack);
    },

    checked(preview) {
        preview.append(createPkLightswitch({ id: 'lightswitch-checked', checked: true }));
    },

    disabled(preview) {
        preview.append(createPkLightswitch({ id: 'lightswitch-disabled', checked: true, disabled: true }));
    },

    labels(preview) {
        const { simpleLabel, titleLabel, descriptionLabel } = lightswitchPlaygroundSections.labels;
        preview.className = 'pg-card__inner pg-demo-stack';
        preview.append(
            createPkLightswitch({ id: 'lightswitch-label-simple', checked: true }, simpleLabel),
            createPkLightswitch({ id: 'lightswitch-label-hint', checked: true }, titleLabel, descriptionLabel),
        );
    },
};
