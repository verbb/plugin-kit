import { Button } from '@verbb/plugin-kit-react/components/Button';
import { VisualTestShadowRoot } from '../shared/VisualTestShadowRoot';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faEye } from '@fortawesome/pro-solid-svg-icons';
import { VisualTestPage, VisualTestSection, VisualTestCard } from '../shared/visualTestLayouts';
import type { VisualTestDefinition } from '../types';

const buttonVariants = [
    { label: 'Primary', variant: 'primary' as const, craftClassName: 'btn submit' },
    { label: 'Secondary', variant: 'secondary' as const, craftClassName: 'btn secondary' },
    { label: 'Default', variant: 'default' as const, craftClassName: 'btn' },
    { label: 'Outline', variant: 'outline' as const, craftClassName: 'btn hairline-dark' },
    { label: 'Dashed', variant: 'dashed' as const, craftClassName: 'btn dashed' },
    { label: 'Transparent', variant: 'transparent' as const, craftClassName: 'btn' },
    { label: 'None', variant: 'none' as const, craftClassName: '' },
];

const buttonSizes = [
    { label: 'XX Small', size: 'xxs' as const },
    { label: 'X Small', size: 'xs' as const },
    { label: 'Small', size: 'sm' as const },
    { label: 'Default', size: 'default' as const },
    { label: 'Large', size: 'lg' as const },
    { label: 'Extra Large', size: 'xl' as const },
];

function craftStateMatrixHtml(): string {
    return `
        <div class="cmp-rows">
            ${buttonVariants.map(({ label, craftClassName }) => {
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

function ButtonVisualTestPage() {
    return (
        <VisualTestPage
            eyebrow="Visual Tests"
            title="Button"
            description="Visual regression and parity checking for buttons."
            maxWidth="1280px"
        >
            <VisualTestSection
                title="Craft Comparison"
                description="Interaction states are the clearest like-for-like comparison with Craft, so parity is most useful here."
            >
                <div className="cmp-layout">
                    <div className="cmp-column">
                        <h3 className="cmp-column-title">Plugin Kit</h3>

                        <VisualTestShadowRoot>
                            <div className="cmp-rows">
                                {buttonVariants.map(({ label, variant }) => {
                                    const buttonProps = variant === 'default' ? {} : { variant };

                                    return (
                                        <div className="cmp-row" key={label}>
                                            <h3 className="cmp-row-heading">{label}</h3>
                                            <div className="cmp-row-items">
                                                <Button {...buttonProps}>Normal</Button>
                                                <Button {...buttonProps} data-state="hover">Hover</Button>
                                                <Button {...buttonProps} data-state="focus-visible">Focus</Button>
                                                <Button {...buttonProps} data-state="active">Active</Button>
                                                <Button {...buttonProps} disabled>Disabled</Button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </VisualTestShadowRoot>
                    </div>

                    <div className="cmp-column">
                        <h3 className="cmp-column-title">Craft</h3>
                        <div dangerouslySetInnerHTML={{ __html: craftStateMatrixHtml() }} />
                    </div>
                </div>
            </VisualTestSection>

            <VisualTestSection
                title="Variants and Sizes"
                description="Full size coverage makes spacing, text fit, and visual weight differences obvious across the complete variant set."
            >
                <VisualTestCard>
                    {buttonSizes.map(({ label, size }) => {
                        return (
                            <div className="space-y-3" key={size}>
                                <h3 className="text-sm font-semibold text-gray-900">{label}</h3>
                                <div className="flex flex-wrap items-center gap-3">
                                    {buttonVariants.map(({ label: variantLabel, variant }) => {
                                        return (
                                            <Button
                                                key={`${size}-${variant}`}
                                                size={size}
                                                variant={variant === 'default' ? undefined : variant}
                                            >
                                                {variantLabel}
                                            </Button>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </VisualTestCard>
            </VisualTestSection>

            <VisualTestSection
                title="Icons"
                description="These matrices help check icon sizing, spacing, and alignment across variant and size combinations."
            >
                <VisualTestCard>
                    <div className="space-y-3">
                        <h3 className="text-sm font-semibold text-gray-900">Icon only by variant</h3>
                        <div className="flex flex-wrap items-center gap-3">
                            {buttonVariants.map(({ variant }) => {
                                return (
                                    <Button key={`icon-${variant}`} variant={variant === 'default' ? undefined : variant}>
                                        <FontAwesomeIcon icon={faEye} />
                                    </Button>
                                );
                            })}
                        </div>
                    </div>

                    <div className="space-y-3">
                        <h3 className="text-sm font-semibold text-gray-900">Icon only by size</h3>
                        <div className="flex flex-wrap items-center gap-3">
                            {buttonSizes.map(({ size }) => {
                                return (
                                    <Button key={`icon-size-${size}`} size={size}>
                                        <FontAwesomeIcon icon={faEye} />
                                    </Button>
                                );
                            })}
                        </div>
                    </div>

                    <div className="space-y-3">
                        <h3 className="text-sm font-semibold text-gray-900">Icon with label by variant</h3>
                        <div className="flex flex-wrap items-center gap-3">
                            {buttonVariants.map(({ label, variant }) => {
                                return (
                                    <Button key={`icon-text-${variant}`} variant={variant === 'default' ? undefined : variant}>
                                        <FontAwesomeIcon icon={faAdd} />
                                        {label}
                                    </Button>
                                );
                            })}
                        </div>
                    </div>

                    <div className="space-y-3">
                        <h3 className="text-sm font-semibold text-gray-900">Icon with label by size</h3>
                        <div className="flex flex-wrap items-center gap-3">
                            {buttonSizes.map(({ label, size }) => {
                                return (
                                    <Button key={`icon-text-size-${size}`} size={size}>
                                        <FontAwesomeIcon icon={faAdd} />
                                        {label}
                                    </Button>
                                );
                            })}
                        </div>
                    </div>
                </VisualTestCard>
            </VisualTestSection>

            <VisualTestSection
                title="Loading"
                description="Loading is where label length, spinner placement, and variant contrast often drift, so it deserves broader coverage than the public docs page."
            >
                <VisualTestCard>
                    <div className="space-y-3">
                        <h3 className="text-sm font-semibold text-gray-900">Text length</h3>
                        <div className="flex flex-wrap items-center gap-3">
                            <Button variant="primary" loading>Save</Button>
                            <Button variant="primary" loading>Save changes and continue</Button>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <h3 className="text-sm font-semibold text-gray-900">Variants</h3>
                        <div className="flex flex-wrap items-center gap-3">
                            {buttonVariants.map(({ label, variant }) => {
                                return (
                                    <Button key={`loading-${variant}`} loading variant={variant === 'default' ? undefined : variant}>
                                        {label}
                                    </Button>
                                );
                            })}
                        </div>
                    </div>

                    <div className="space-y-3">
                        <h3 className="text-sm font-semibold text-gray-900">Primary size scale</h3>
                        <div className="flex flex-wrap items-center gap-3">
                            {buttonSizes.map(({ label, size }) => {
                                return (
                                    <Button key={`loading-size-${size}`} loading size={size} variant="primary">
                                        {label}
                                    </Button>
                                );
                            })}
                        </div>
                    </div>

                    <div className="space-y-3">
                        <h3 className="text-sm font-semibold text-gray-900">Spinner overrides</h3>
                        <div className="flex flex-wrap items-center gap-3">
                            <Button variant="primary" loading spinnerVariant="outline">Primary</Button>
                            <Button variant="secondary" loading spinnerVariant="default">Secondary</Button>
                            <Button variant="none" loading spinnerClassName="border-t-red-600 border-r-red-600">
                                None
                            </Button>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <h3 className="text-sm font-semibold text-gray-900">Demo states</h3>
                        <div className="flex flex-wrap gap-3">
                            <Button variant="primary" loading>Normal</Button>
                            <Button variant="primary" data-state="hover" loading>Hover</Button>
                            <Button variant="primary" data-state="focus-visible" loading>Focus</Button>
                            <Button variant="primary" data-state="active" loading>Active</Button>
                            <Button variant="primary" disabled loading>Disabled</Button>
                        </div>
                    </div>
                </VisualTestCard>
            </VisualTestSection>
        </VisualTestPage>
    );
}

export const buttonVisualTest: VisualTestDefinition = {
    id: 'button',
    title: 'Button',
    description: 'Visual regression and parity checking for buttons.',
    Component: ButtonVisualTestPage,
};
