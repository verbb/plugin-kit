import {
    buttonMatrixSizes,
    buttonMatrixStates,
    buttonMatrixVariants,
} from '../../../catalog/data/button-matrix.js';
import {
    buttonIconPlacementExamples,
    buttonIconSections,
    buttonLoadingSections,
    buttonLoadingSpinnerSections,
} from '../../../catalog/data/meta-button.js';
import {
    playgroundIconAdd,
    playgroundIconChevronDown,
    playgroundIconDownload,
    playgroundIconEye,
    playgroundIconPen,
    playgroundIconSearch,
} from '../../../catalog/data/icons.js';
import type { PlaygroundSectionRendererMap } from '../../../catalog/types.js';

import { createCraftStateMatrix, createMatrixRow, createPkButton } from '../../dom.js';

/** Web component previews — one function per section id from buttonPlaygroundSpec. */
export const buttonWebSectionRenderers: PlaygroundSectionRendererMap = {
    craftComparison(preview) {
        preview.append(createCraftStateMatrix(createPkButton, buttonMatrixVariants, buttonMatrixStates));
    },

    variantsAndSizes(preview) {
        for (const { label: sizeLabel, size } of buttonMatrixSizes) {
            preview.append(createMatrixRow(
                sizeLabel,
                buttonMatrixVariants.map(({ label: variantLabel, variant }) => createPkButton({
                    label: variantLabel,
                    variant,
                    size,
                })),
            ));
        }
    },

    icons(preview) {
        for (const sectionDef of buttonIconSections) {
            const icon = sectionDef.withLabel ? playgroundIconAdd : playgroundIconEye;
            const buttons: HTMLElement[] = [];

            if (sectionDef.bySize) {
                for (const { label, size } of buttonMatrixSizes) {
                    buttons.push(createPkButton({
                        label: sectionDef.withLabel ? label : undefined,
                        size,
                        startSlot: icon,
                        ariaLabel: sectionDef.withLabel ? undefined : label,
                    }));
                }
            } else {
                for (const { label, variant } of buttonMatrixVariants) {
                    buttons.push(createPkButton({
                        label: sectionDef.withLabel ? label : undefined,
                        variant,
                        startSlot: icon,
                        ariaLabel: sectionDef.withLabel ? undefined : label,
                    }));
                }
            }

            preview.append(createMatrixRow(sectionDef.title, buttons));
        }

        const placementIcons = {
            add: playgroundIconAdd,
            eye: playgroundIconEye,
            chevron: playgroundIconChevronDown,
        } as const;

        preview.append(createMatrixRow(
            'Icon placement',
            buttonIconPlacementExamples.map((example) => createPkButton({
                label: 'label' in example ? example.label : undefined,
                ariaLabel: 'ariaLabel' in example ? example.ariaLabel : undefined,
                startSlot: 'startSlot' in example ? placementIcons[example.startSlot] : undefined,
                endSlot: 'endSlot' in example ? placementIcons[example.endSlot] : undefined,
            })),
        ));

        for (const { title, icon } of [
            { title: 'Icon with label by size (search)', icon: playgroundIconSearch },
            { title: 'Icon with label by size (download)', icon: playgroundIconDownload },
            { title: 'Icon with label by size (pen)', icon: playgroundIconPen },
        ]) {
            preview.append(createMatrixRow(
                title,
                buttonMatrixSizes.map(({ label, size }) => createPkButton({
                    label,
                    size,
                    startSlot: icon,
                })),
            ));
        }

        preview.append(createMatrixRow(
            'Caret by size',
            buttonMatrixSizes.map(({ label, size }) => createPkButton({
                label,
                size,
                withCaret: true,
            })),
        ));

        preview.append(createMatrixRow(
            'Icon & caret by size',
            buttonMatrixSizes.map(({ label, size }) => createPkButton({
                label,
                size,
                startSlot: playgroundIconAdd,
                withCaret: true,
            })),
        ));

        preview.append(createMatrixRow(
            'Icon & caret',
            buttonMatrixVariants.map(({ label, variant }) => createPkButton({
                label,
                variant,
                startSlot: playgroundIconAdd,
                withCaret: true,
            })),
        ));
    },

    loading(preview) {
        for (const sectionDef of buttonLoadingSections) {
            const buttons: HTMLElement[] = [];

            if ('buttons' in sectionDef && sectionDef.buttons) {
                for (const buttonOptions of sectionDef.buttons) {
                    buttons.push(createPkButton({
                        label: buttonOptions.label,
                        variant: buttonOptions.variant,
                        state: 'state' in buttonOptions ? buttonOptions.state : undefined,
                        disabled: 'disabled' in buttonOptions ? buttonOptions.disabled : undefined,
                        loading: true,
                    }));
                }
            } else if ('fromMatrix' in sectionDef && sectionDef.fromMatrix === 'variants') {
                for (const { label, variant } of buttonMatrixVariants) {
                    buttons.push(createPkButton({ label, variant, loading: true }));
                }
            } else if ('fromMatrix' in sectionDef && sectionDef.fromMatrix === 'primarySizes') {
                for (const { label, size } of buttonMatrixSizes) {
                    buttons.push(createPkButton({ label, variant: 'primary', size, loading: true }));
                }
            }

            preview.append(createMatrixRow(sectionDef.title, buttons));
        }

        for (const sectionDef of buttonLoadingSpinnerSections) {
            const buttons: HTMLElement[] = [];

            for (const buttonOptions of sectionDef.buttons) {
                buttons.push(createPkButton({
                    label: buttonOptions.label,
                    variant: buttonOptions.variant,
                    loading: true,
                    spinnerVariant: 'spinnerVariant' in buttonOptions ? buttonOptions.spinnerVariant : undefined,
                    spinnerTone: 'spinnerTone' in buttonOptions ? buttonOptions.spinnerTone : undefined,
                }));
            }

            preview.append(createMatrixRow(sectionDef.title, buttons));
        }
    },
};
