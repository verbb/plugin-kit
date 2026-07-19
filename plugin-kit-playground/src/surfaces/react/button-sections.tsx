import type { ReactNode } from 'react';
import {
    buttonIconPlacementExamples,
    buttonIconSections,
    buttonLoadingSections,
    buttonLoadingSpinnerSections,
    buttonMatrixSizes,
    buttonMatrixStates,
    buttonMatrixVariants,
} from '@verbb/plugin-kit-playground';

import { Button } from '@verbb/plugin-kit-react/components';
import { Icon } from '@verbb/plugin-kit-react/components';
import type { PlaygroundSectionReactRendererMap } from './shared/PlaygroundFromSpec.js';

function craftStateMatrixHtml(): string {
    return `
        <div class="cmp-rows">
            ${buttonMatrixVariants.map(({ label, craftClassName }) => {
        const baseClass = craftClassName ? ` class="${craftClassName}"` : '';

        return `
                    <div class="cmp-row">
                        <h3 class="cmp-row-heading">${label}</h3>
                        <div class="cmp-row-items">
                            <button type="button"${baseClass}>Normal</button>
                            <button type="button"${baseClass}>Hover</button>
                            <button type="button"${baseClass}>Focus</button>
                            <button type="button"${craftClassName ? ` class="${craftClassName} active"` : ' class="active"'}>Active</button>
                            <button type="button"${craftClassName ? ` class="${craftClassName} disabled"` : ' class="disabled"'} disabled>Disabled</button>
                        </div>
                    </div>
                `;
    }).join('')}
        </div>
    `;
}

/** React previews — one function per section id from buttonPlaygroundSpec. */
export const buttonReactSectionRenderers: PlaygroundSectionReactRendererMap = {
    craftComparison: () => (
        <div className="cmp-layout">
            <div className="cmp-column">
                <span className="cmp-column-title">Plugin Kit</span>

                <div className="cmp-rows">
                    {buttonMatrixVariants.map(({ label, variant }) => (
                        <div className="cmp-row" key={label}>
                            <h3 className="cmp-row-heading">{label}</h3>
                            <div className="cmp-row-items">
                                {buttonMatrixStates.map((matrixState) => (
                                    <Button
                                        key={matrixState.label}
                                        variant={variant}
                                        {...(matrixState.state ? { 'data-state': matrixState.state } : {})}
                                        disabled={matrixState.disabled}
                                    >
                                        {matrixState.label}
                                    </Button>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="cmp-column">
                <span className="cmp-column-title">Craft</span>
                <div dangerouslySetInnerHTML={{ __html: craftStateMatrixHtml() }} />
            </div>
        </div>
    ),

    variantsAndSizes: () => (
        <>
            {buttonMatrixSizes.map(({ label, size }) => (
                <div key={size}>
                    <h3 className="cmp-row-heading">{label}</h3>
                    <div className="cmp-row-items">
                        {buttonMatrixVariants.map(({ label: variantLabel, variant }) => (
                            <Button key={`${size}-${variant}`} size={size} variant={variant}>
                                {variantLabel}
                            </Button>
                        ))}
                    </div>
                </div>
            ))}
        </>
    ),

    icons: () => (
        <>
            {buttonIconSections.map((section) => (
                <div key={section.id}>
                    <h3 className="cmp-row-heading">{section.title}</h3>
                    <div className="cmp-row-items">
                        {section.bySize
                            ? buttonMatrixSizes.map(({ label, size }) => (
                                <Button
                                    key={`${section.id}-${size}`}
                                    size={size}
                                    aria-label={section.withLabel ? undefined : label}
                                >
                                    <Icon slot="start" icon={section.withLabel ? 'plus' : 'eye'} />
                                    {section.withLabel ? label : null}
                                </Button>
                            ))
                            : buttonMatrixVariants.map(({ label, variant }) => (
                                <Button
                                    key={`${section.id}-${variant}`}
                                    variant={variant}
                                    aria-label={section.withLabel ? undefined : label}
                                >
                                    <Icon slot="start" icon={section.withLabel ? 'plus' : 'eye'} />
                                    {section.withLabel ? label : null}
                                </Button>
                            ))}
                    </div>
                </div>
            ))}

            <div>
                <h3 className="cmp-row-heading">Icon placement</h3>
                <div className="cmp-row-items">
                    {buttonIconPlacementExamples.map((example) => (
                        <Button
                            key={example.id}
                            aria-label={'ariaLabel' in example ? example.ariaLabel : undefined}
                        >
                            {'startSlot' in example && example.startSlot === 'add' ? (
                                <Icon slot="start" icon="plus" />
                            ) : null}
                            {'startSlot' in example && example.startSlot === 'eye' ? (
                                <Icon slot="start" icon="eye" />
                            ) : null}
                            {'endSlot' in example && example.endSlot === 'eye' ? (
                                <Icon slot="end" icon="eye" />
                            ) : null}
                            {'endSlot' in example && example.endSlot === 'chevron' ? (
                                <Icon slot="end" icon="chevron-down" />
                            ) : null}
                            {'label' in example ? example.label : null}
                        </Button>
                    ))}
                </div>
            </div>

            {[
                { title: 'Icon with label by size (search)', icon: 'search' as const },
                { title: 'Icon with label by size (download)', icon: 'download' as const },
                { title: 'Icon with label by size (pen)', icon: 'pen' as const },
            ].map(({ title, icon }) => (
                <div key={title}>
                    <h3 className="cmp-row-heading">{title}</h3>
                    <div className="cmp-row-items">
                        {buttonMatrixSizes.map(({ label, size }) => (
                            <Button key={`${title}-${size}`} size={size}>
                                <Icon slot="start" icon={icon} />
                                {label}
                            </Button>
                        ))}
                    </div>
                </div>
            ))}

            <div>
                <h3 className="cmp-row-heading">Caret by size</h3>
                <div className="cmp-row-items">
                    {buttonMatrixSizes.map(({ label, size }) => (
                        <Button key={`caret-${size}`} size={size} with-caret>
                            {label}
                        </Button>
                    ))}
                </div>
            </div>

            <div>
                <h3 className="cmp-row-heading">Icon &amp; caret by size</h3>
                <div className="cmp-row-items">
                    {buttonMatrixSizes.map(({ label, size }) => (
                        <Button key={`icon-caret-size-${size}`} size={size} with-caret>
                            <Icon slot="start" icon="plus" />
                            {label}
                        </Button>
                    ))}
                </div>
            </div>

            <div>
                <h3 className="cmp-row-heading">Icon &amp; caret</h3>
                <div className="cmp-row-items">
                    {buttonMatrixVariants.map(({ label, variant }) => (
                        <Button key={`icon-caret-${variant}`} variant={variant} with-caret>
                            <Icon slot="start" icon="plus" />
                            {label}
                        </Button>
                    ))}
                </div>
            </div>
        </>
    ),

    loading: () => (
        <>
            {buttonLoadingSections.map((section) => {
                let buttons: ReactNode = null;

                if ('buttons' in section && section.buttons) {
                    buttons = section.buttons.map((buttonOptions) => (
                        <Button
                            key={`${section.id}-${buttonOptions.label}`}
                            variant={buttonOptions.variant}
                            loading
                            {...('state' in buttonOptions && buttonOptions.state ? { 'data-state': buttonOptions.state } : {})}
                            disabled={'disabled' in buttonOptions ? buttonOptions.disabled : undefined}
                        >
                            {buttonOptions.label}
                        </Button>
                    ));
                } else if ('fromMatrix' in section && section.fromMatrix === 'variants') {
                    buttons = buttonMatrixVariants.map(({ label, variant }) => (
                        <Button key={`${section.id}-${variant}`} loading variant={variant}>
                            {label}
                        </Button>
                    ));
                } else if ('fromMatrix' in section && section.fromMatrix === 'primarySizes') {
                    buttons = buttonMatrixSizes.map(({ label, size }) => (
                        <Button key={`${section.id}-${size}`} loading size={size} variant="primary">
                            {label}
                        </Button>
                    ));
                }

                return (
                    <div key={section.id}>
                        <h3 className="cmp-row-heading">{section.title}</h3>
                        <div className="cmp-row-items">{buttons}</div>
                    </div>
                );
            })}

            {buttonLoadingSpinnerSections.map((section) => (
                <div key={section.id}>
                    <h3 className="cmp-row-heading">{section.title}</h3>
                    <div className="cmp-row-items">
                        {section.buttons.map((buttonOptions) => (
                            <Button
                                key={buttonOptions.label}
                                variant={buttonOptions.variant}
                                loading
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
