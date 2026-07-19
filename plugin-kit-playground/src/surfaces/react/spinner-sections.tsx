import {
    buttonLoadingSpinnerSections,
    spinnerButtonVariants,
    spinnerMatrixSizes,
    spinnerMatrixTones,
} from '@verbb/plugin-kit-playground';

import { Button } from '@verbb/plugin-kit-react/components';
import { Spinner } from '@verbb/plugin-kit-react/components';
import type { PlaygroundSectionReactRendererMap } from './shared/PlaygroundFromSpec.js';

/** React previews — one function per section id from spinnerPlaygroundSpec. */
export const spinnerReactSectionRenderers: PlaygroundSectionReactRendererMap = {
    basic: () => <Spinner />,

    colors: () => (
        <div className="cmp-row-items">
            {spinnerMatrixTones.map(({ tone }) => (
                <Spinner key={tone} tone={tone} />
            ))}
        </div>
    ),

    buttonVariants: () => (
        <div className="cmp-row-items">
            {spinnerButtonVariants.map(({ label, variant }) => (
                <Button key={variant} variant={variant} loading>
                    {label}
                </Button>
            ))}
        </div>
    ),

    sizes: () => (
        <div className="cmp-row-items pg-spinner-size-row">
            {spinnerMatrixSizes.map(({ label, size }) => (
                <div className="pg-spinner-size-item" key={size}>
                    <Spinner size={size} />
                    <span className="pg-spinner-size-label">{label}</span>
                </div>
            ))}
        </div>
    ),

    buttonLoadingOverrides: () => (
        <>
            {buttonLoadingSpinnerSections.map((section) => (
                <div key={section.id}>
                    <h3 className="cmp-row-heading">{section.title}</h3>
                    <div className="cmp-row-items">
                        {section.buttons.map((buttonOptions) => (
                            <Button
                                key={buttonOptions.label}
                                variant={buttonOptions.variant}
                                loading
                                spinnerVariant={'spinnerVariant' in buttonOptions ? buttonOptions.spinnerVariant : undefined}
                                spinnerTone={'spinnerTone' in buttonOptions ? buttonOptions.spinnerTone : undefined}
                            >
                                {buttonOptions.label}
                            </Button>
                        ))}
                    </div>
                </div>
            ))}
        </>
    ),
};
